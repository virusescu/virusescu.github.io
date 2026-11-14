"""Cut perspective views from an equirectangular panorama and run Apple SHARP on each.

Run with the SHARP environment:
    D:/Programs/PythonLibs/sharp/Scripts/python.exe tools/sharp360.py <panorama> <outdir>

World convention (three.js): +Y up, -Z forward (panorama centre), +X right.
Panorama pixel (u, v) in [0,1): lon = (u - 0.5) * 2pi, lat = (0.5 - v) * pi.

For every view this writes <outdir>/<name>.png (the cut view) and <name>.npz with the
raw Gaussians in that view's OpenCV camera frame (x right, y down, z forward), plus the
camera-to-world rotation. merge.py does the depth remap and the stitching.
"""

from __future__ import annotations

import json
import math
import os
import sys
from pathlib import Path

os.environ.setdefault("TORCH_HOME", r"D:\Programs\AIModels\torch")  # SHARP checkpoint lives here

import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

from sharp.cli.predict import DEFAULT_MODEL_URL, predict_image
from sharp.models import PredictorParams, create_predictor

SIZE = 1536  # SHARP's internal resolution; cut views at exactly this size.


def view_list():
    """8 views around the horizon plus one up and one down, 100 degree field of view."""
    views = [dict(name=f"ring{int(y):03d}", yaw=y, pitch=0.0, fov=100.0) for y in range(0, 360, 45)]
    views.append(dict(name="up", yaw=0.0, pitch=90.0, fov=110.0))
    views.append(dict(name="down", yaw=0.0, pitch=-90.0, fov=110.0))
    return views


def direction(yaw_deg, pitch_deg):
    lon, lat = math.radians(yaw_deg), math.radians(pitch_deg)
    return np.array([math.sin(lon) * math.cos(lat), math.sin(lat), -math.cos(lon) * math.cos(lat)])


def cam_to_world(yaw, pitch):
    """3x3 matrix whose columns are the OpenCV camera axes (right, down, forward) in world."""
    fwd = direction(yaw, pitch)
    if abs(pitch) > 89.0:
        # Looking straight up/down: keep "right" pointing along the yaw-rotated +X.
        right = np.array([math.cos(math.radians(yaw)), 0.0, math.sin(math.radians(yaw))])
    else:
        right = np.cross(fwd, [0.0, 1.0, 0.0])
        right /= np.linalg.norm(right)
    cam_up = np.cross(right, fwd)
    return np.stack([right, -cam_up, fwd], axis=1)


def cut_view(pano: torch.Tensor, R: np.ndarray, fov: float) -> tuple[torch.Tensor, float]:
    """Sample a SIZE x SIZE perspective view. pano: (3, H, W) float on device."""
    dev = pano.device
    f = (SIZE / 2) / math.tan(math.radians(fov) / 2)
    c = (SIZE - 1) / 2
    j, i = torch.meshgrid(torch.arange(SIZE, device=dev), torch.arange(SIZE, device=dev), indexing="xy")
    rays = torch.stack([(j - c) / f, (i - c) / f, torch.ones_like(j, dtype=torch.float32)], -1).float()
    world = rays @ torch.tensor(R.T, dtype=torch.float32, device=dev)
    world = world / world.norm(dim=-1, keepdim=True)
    lon = torch.atan2(world[..., 0], -world[..., 2])
    lat = torch.asin(world[..., 1].clamp(-1, 1))
    # Pad the panorama horizontally so bilinear sampling wraps around the seam.
    H, W = pano.shape[1:]
    pad = 4
    padded = torch.cat([pano[:, :, -pad:], pano, pano[:, :, :pad]], dim=2)
    x = (lon / (2 * math.pi) + 0.5) * W + pad  # pixel coordinate in padded image
    y = (0.5 - lat / math.pi) * H
    gx = x / padded.shape[2] * 2 - 1
    gy = y / H * 2 - 1
    grid = torch.stack([gx, gy], -1)[None]
    out = F.grid_sample(padded[None], grid, mode="bilinear", padding_mode="border", align_corners=False)
    return out[0], f


def main():
    pano_path, outdir = Path(sys.argv[1]), Path(sys.argv[2])
    only = set(sys.argv[3:])
    outdir.mkdir(parents=True, exist_ok=True)
    dev = torch.device("cuda")

    pano = torch.from_numpy(np.asarray(Image.open(pano_path).convert("RGB"))).permute(2, 0, 1).float().to(dev) / 255

    state = torch.hub.load_state_dict_from_url(DEFAULT_MODEL_URL, progress=True)
    model = create_predictor(PredictorParams())
    model.load_state_dict(state)
    model.eval().to(dev)

    meta = []
    for v in view_list():
        R = cam_to_world(v["yaw"], v["pitch"])
        meta.append({**v, "R": R.tolist()})
        if only and v["name"] not in only:
            continue
        img, f = cut_view(pano, R, v["fov"])
        img_u8 = (img.clamp(0, 1) * 255).round().byte().permute(1, 2, 0).cpu().numpy()
        Image.fromarray(img_u8).save(outdir / f"{v['name']}.png")
        g = predict_image(model, img_u8, f, dev)
        np.savez(
            outdir / f"{v['name']}.npz",
            means=g.mean_vectors[0].float().cpu().numpy(),
            scales=g.singular_values[0].float().cpu().numpy(),
            quats=g.quaternions[0].float().cpu().numpy(),
            colors=g.colors[0].float().cpu().numpy(),  # linear RGB
            opacities=g.opacities[0].float().cpu().numpy(),
            R=R,
            f=f,
            size=SIZE,
        )
        print(v["name"], "gaussians:", g.mean_vectors.shape[1], flush=True)

    (outdir / "views.json").write_text(json.dumps(meta, indent=1))


if __name__ == "__main__":
    main()
