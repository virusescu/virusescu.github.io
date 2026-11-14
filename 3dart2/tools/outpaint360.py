"""Grow a 360 degree panorama around the original painting with FLUX.1 Fill, view by view.

Run with the FLUX environment:
    D:/Programs/PythonLibs/flux/Scripts/python.exe tools/outpaint360.py <painting.jpg> <workdir> [--from N] [--only N,M]

The painting is placed straight ahead (70 degree field of view, its horizon on the
panorama's equator) and is never repainted. Then a list of perspective views is filled
one after the other: each view shows what is already painted plus an empty part, FLUX
paints the empty part, and the result is projected back onto the panorama. Working in
ordinary perspective views (not on the distorted panorama) keeps FLUX on familiar ground.

<workdir> gets pano.png (the panorama so far), known.png (white = painted), one
NN-name-in.jpg / NN-name-out.jpg pair per view for checking, and state.npz to resume.
"""

from __future__ import annotations

import argparse
import gc
import math
import os
import sys
from pathlib import Path

os.environ.setdefault("HF_HOME", r"D:\Programs\AIModels\huggingface")

import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from geom import cam_to_world, cut_view, pano_dirs, view_to_pano  # noqa: E402

MODEL = "black-forest-labs/FLUX.1-Fill-dev"
PANO_W = 8192  # matches the painting's own resolution (about 22 px per degree)
VIEW = 1024  # FLUX view size in pixels
FOV = 90.0
PAINTING_FOV = 70.0
PAINTING_HORIZON = 0.44  # far shore, fraction from the top of the painting

# CLIP only reads 77 tokens, so it gets a short prompt with the style first; T5 gets the full one.
STYLE = (
    "loose impressionist oil painting, thick impasto, bold visible palette knife and brush strokes, "
    "painterly soft edges, no fine photographic detail, pastel pink, lavender, peach and icy blue palette, "
    "no text, no signature"
)
LAND = ("a winter river landscape: snowy banks, a frozen river winding through open snowy fields, scattered "
        "groups of orange and violet trees, a soft blue tree line far away, nothing close to the viewer")
# The sun sets behind the painting (straight ahead). Views facing elsewhere must not invent their own
# sunset, or the panorama ends up with several suns.
SUBJECTS = {
    "ring_front": LAND + ", warm sunset glow low in the sky, pink and blue sky with soft clouds",
    "ring_back": LAND + ", evening sky facing away from the sunset, no sun, no light rays, "
                        "soft pink and lavender clouds over pale blue",
    "sky_top": "the sky overhead at dusk, loosely painted pink, peach and lavender clouds continuing from the "
               "horizon, patches of pale blue between them, visible brush strokes in the sky, no sun",
    "ground": "untouched snow on a river bank close to the viewer, smooth soft drifts, pale blue shadows, "
              "a few small dry reeds",
}
PROMPTS = {k: ("loose impasto oil painting, palette knife, " + v[:120], v + ". " + STYLE) for k, v in SUBJECTS.items()}
EDGE_PX = 28  # panorama pixels along the painting's border that FLUX may repaint, so the join is invisible
BAND = 24  # view pixels of already-painted area that each new view repaints and blends into


def schedule():
    """(name, yaw, pitch, prompt key, fov, size). Horizon ring first, starting at the painting and
    alternating sides so the back closes last. Then the whole sky in ONE wide view and the whole
    ground in another: patching them from many small views left visible straight seams, because
    FLUX mostly copies its surroundings when it only gets small holes."""
    v = [(f"ring{y:+04d}", y, 0, "ring_front" if abs(y) <= 60 else "ring_back", FOV, VIEW)
         for y in (50, -50, 100, -100, 145, -145)]
    v.append(("sky", 0, 90, "sky_top", 120.0, 1024))
    v.append(("ground", 0, -90, "ground", 120.0, 1024))  # 1280 overflows 16 GB
    return v


def place_painting(path, H, W, dev):
    """Project the painting into an empty panorama. Returns (rgb (3,H,W), mask (1,H,W))."""
    src = torch.from_numpy(np.array(Image.open(path).convert("RGB"))).permute(2, 0, 1).float().to(dev) / 255
    sh, sw = src.shape[1:]
    f = (sw / 2) / math.tan(math.radians(PAINTING_FOV / 2))
    cx, cy = sw / 2, sh * PAINTING_HORIZON
    d = pano_dirs(H, W, dev)
    z = -d[..., 2]
    zs = z.clamp(min=1e-6)
    u = cx + f * d[..., 0] / zs
    v = cy - f * d[..., 1] / zs
    e = 6  # drop the outermost pixels of the photo: canvas edge, frame or wall may show there
    inside = (z > 1e-6) & (u >= e) & (u <= sw - e) & (v >= e) & (v <= sh - e)
    grid = torch.stack([u / sw * 2 - 1, v / sh * 2 - 1], -1)
    rgb = F.grid_sample(src[None], grid[None], mode="bicubic", padding_mode="border", align_corners=False)[0]
    m = inside.float()[None]
    return rgb.clamp(0, 1) * m, m


def dilate(mask, px):
    """Separable max filter (square), for (C, H, W) masks."""
    if px <= 0:
        return mask
    k = 2 * px + 1
    m = F.max_pool2d(mask[None], (1, k), stride=1, padding=(0, px))
    return F.max_pool2d(m, (k, 1), stride=1, padding=(px, 0))[0]


def blur(mask, px):
    """Separable box blur, for (C, H, W) masks."""
    k = 2 * px + 1
    m = F.avg_pool2d(F.pad(mask[None], (px, px, 0, 0), mode="replicate"), (1, k), stride=1)
    return F.avg_pool2d(F.pad(m, (0, 0, px, px), mode="replicate"), (k, 1), stride=1)[0]


def to_pil(t):
    return Image.fromarray((t.clamp(0, 1) * 255).round().byte().permute(1, 2, 0).cpu().numpy())


def load_pipe(dev):
    from diffusers import FluxFillPipeline, FluxTransformer2DModel

    # Text encoders only long enough to encode the few prompts, then freed: the whole
    # pipeline in bf16 would not fit in 32 GB of RAM next to the transformer.
    enc = FluxFillPipeline.from_pretrained(MODEL, transformer=None, vae=None, torch_dtype=torch.bfloat16).to(dev)
    embeds = {}
    with torch.no_grad():
        for k, p in PROMPTS.items():
            pe, pooled, _ = enc.encode_prompt(prompt=p[0], prompt_2=p[1], device=dev, max_sequence_length=512)
            embeds[k] = (pe, pooled)
    # Free T5 (9.5 GB) for real before the transformer arrives; otherwise the two together
    # overflow 16 GB and Windows quietly spills into system RAM, about 50x slower.
    enc.to("cpu")
    del enc
    gc.collect()
    torch.cuda.empty_cache()
    print(f"text encoders freed, {torch.cuda.memory_allocated() / 1e9:.1f} GB still on the GPU", flush=True)

    # 12B transformer stored in fp8 (about 12 GB of VRAM), computed in bf16.
    tr = FluxTransformer2DModel.from_pretrained(MODEL, subfolder="transformer", torch_dtype=torch.bfloat16)
    # FLUX's default skip list ("norm") also keeps every block's big modulation layer in
    # bf16 (15 GB in all, too much for 16 GB). Only the small entry/exit layers stay bf16.
    tr._skip_layerwise_casting_patterns = None  # otherwise diffusers always adds "norm" back
    tr.enable_layerwise_casting(
        storage_dtype=torch.float8_e4m3fn, compute_dtype=torch.bfloat16,
        skip_modules_pattern=("pos_embed", "time_text_embed", "^x_embedder$", "^context_embedder$",
                              "^norm_out", "^proj_out$"),
    )
    pipe = FluxFillPipeline.from_pretrained(
        MODEL, transformer=tr, text_encoder=None, text_encoder_2=None, tokenizer=None, tokenizer_2=None,
        torch_dtype=torch.bfloat16,
    ).to(dev)
    pipe.set_progress_bar_config(disable=True)
    return pipe, embeds


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("painting")
    ap.add_argument("workdir")
    ap.add_argument("--from", dest="start", type=int, default=0, help="resume at this view index")
    ap.add_argument("--only", default="", help="comma-separated view indices to (re)do")
    ap.add_argument("--count", type=int, default=0, help="stop after this many views")
    ap.add_argument("--steps", type=int, default=40)
    ap.add_argument("--seed", type=int, default=7, help="view i uses seed + i")
    ap.add_argument("--seed-for", default="", help="per-view overrides, e.g. 1=22,5=40 (chosen by eye)")
    a = ap.parse_args()

    dev = torch.device("cuda")
    # The 8K panorama and its masks live on the CPU: next to FLUX on a 16 GB card they
    # eventually push it into system RAM, which slows it down about 50x.
    pdev = torch.device("cpu")
    wd = Path(a.workdir)
    wd.mkdir(parents=True, exist_ok=True)
    H, W = PANO_W // 2, PANO_W
    dirs = pano_dirs(H, W, pdev)

    state = wd / "state.npz"
    if a.start > 0 or a.only:
        s = np.load(state)
        pano = torch.from_numpy(s["pano"]).float()
        known = torch.from_numpy(s["known"]).float()
        protected = torch.from_numpy(s["protected"]).float()
    else:
        pano, protected = place_painting(a.painting, H, W, pdev)
        known = protected.clone()
        to_pil(pano).save(wd / "pano.png")

    # How much of the painting to keep at each pixel: 1 inside, ramping to 0 at its border.
    keep = blur(1 - dilate(1 - protected, EDGE_PX // 2), EDGE_PX // 2)

    seed_for = {int(k): int(v) for k, v in (x.split("=") for x in a.seed_for.split(",") if x)}

    pipe, embeds = load_pipe(dev)
    views = schedule()
    todo = [int(i) for i in a.only.split(",")] if a.only else list(range(a.start, len(views)))
    if a.count:
        todo = todo[: a.count]

    for idx in todo:
        name, yaw, pitch, key, fov, size = views[idx]
        R = cam_to_world(yaw, pitch)
        img, _ = cut_view(pano, R, fov, size)
        kv, _ = cut_view(known, R, fov, size, mode="bilinear")
        hole = (kv < 0.5).float()
        if hole.mean() < 0.01:
            print(f"{idx:2d} {name}: nothing to fill", flush=True)
            continue
        # Let FLUX also repaint a thin band around the hole (generated pixels and the painting's
        # outermost edge), so seams blend instead of showing as lines.
        fill = dilate(hole, BAND)

        pe, pooled = embeds[key]
        gen = torch.Generator(device=dev).manual_seed(seed_for.get(idx, a.seed + idx))
        out = pipe(
            prompt_embeds=pe, pooled_prompt_embeds=pooled,
            image=to_pil(img * (1 - hole) + 0.5 * hole), mask_image=to_pil(fill.repeat(3, 1, 1)),
            height=size, width=size, num_inference_steps=a.steps, guidance_scale=30.0, generator=gen,
        ).images[0]
        res = torch.from_numpy(np.array(out)).permute(2, 0, 1).float() / 255
        torch.cuda.empty_cache()

        # Back onto the panorama: full weight inside the hole, fading out across the band;
        # the painting itself only changes in its outermost EDGE_PX.
        weight = torch.maximum(blur(fill, BAND // 2), hole)
        vals, inside = view_to_pano(torch.cat([res, weight]), dirs, R, fov, margin=0.01)
        w = vals[3:4] * inside[None].float() * (1 - keep)
        pano = pano * (1 - w) + vals[:3] * w
        known = torch.maximum(known, (w > 0.5).float())

        preview = img * (1 - 0.5 * fill) + torch.tensor([1.0, 0, 0.6])[:, None, None] * 0.5 * fill
        to_pil(preview).resize((512, 512)).save(wd / f"{idx:02d}-{name}-in.jpg", quality=88)
        out.save(wd / f"{idx:02d}-{name}-out.jpg", quality=92)
        to_pil(pano).save(wd / "pano.png")
        to_pil(known.repeat(3, 1, 1)).save(wd / "known.png")
        np.savez(state, pano=pano.half().cpu().numpy(), known=known.half().cpu().numpy(),
                 protected=protected.half().cpu().numpy())
        print(f"{idx:2d} {name}: filled {hole.mean().item() * 100:.0f}% of the view, panorama "
              f"{known.mean().item() * 100:.0f}% done", flush=True)


if __name__ == "__main__":
    main()
