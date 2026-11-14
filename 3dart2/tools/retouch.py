"""Hand retouching of the panorama in Photoshop (or any editor), as ordinary square images.

    D:/Programs/PythonLibs/flux/Scripts/python.exe tools/retouch.py export <workdir> <retouchdir>
    D:/Programs/PythonLibs/flux/Scripts/python.exe tools/retouch.py import <workdir> <retouchdir>

export: cuts sky.png (looking straight up), ground.png (straight down) and back.png (behind the
        viewer) from <workdir>/pano.png. Untouched copies go to <retouchdir>/_orig/.
import: for every image that was edited (overwritten in place, same name, PNG or JPG), finds
        the pixels that changed, and blends just those back into the panorama with a soft
        edge. The original painting is never overwritten. Writes <workdir>/pano.png (the
        previous one is kept as pano-before-retouch.png).
"""

import json
import shutil
import sys
from pathlib import Path

import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from geom import cam_to_world, cut_view, pano_dirs, view_to_pano  # noqa: E402
from outpaint360 import EDGE_PX, blur, dilate  # noqa: E402

Image.MAX_IMAGE_PIXELS = None
SIZE = 3072  # about the panorama's own sharpness (22 px per degree) at these fields of view
FACES = {  # name: (yaw, pitch, fov)
    "sky": (0, 90, 130.0),
    "ground": (0, -90, 130.0),
    "back": (180, 0, 100.0),
}


def load_rgb(path):
    return torch.from_numpy(np.array(Image.open(path).convert("RGB"))).permute(2, 0, 1).float() / 255


def save_rgb(t, path):
    Image.fromarray((t.clamp(0, 1) * 255).round().byte().permute(1, 2, 0).numpy()).save(path)


def export(wd, rd):
    pano = load_rgb(wd / "pano.png")
    (rd / "_orig").mkdir(parents=True, exist_ok=True)
    for name, (yaw, pitch, fov) in FACES.items():
        v, _ = cut_view(pano, cam_to_world(yaw, pitch), fov, SIZE)
        save_rgb(v, rd / f"{name}.png")
        shutil.copy(rd / f"{name}.png", rd / "_orig" / f"{name}.png")
        print("exported", rd / f"{name}.png")
    (rd / "_orig" / "faces.json").write_text(json.dumps({**FACES, "size": SIZE}))


def find_edit(rd, name):
    for ext in (".png", ".jpg", ".jpeg", ".PNG", ".JPG"):
        p = rd / f"{name}{ext}"
        if p.exists():
            return p
    return None


def import_(wd, rd):
    pano = load_rgb(wd / "pano.png")
    H, W = pano.shape[1:]
    protected = torch.from_numpy(np.load(wd / "state.npz")["protected"]).float()
    keep = blur(1 - dilate(1 - protected, EDGE_PX // 2), EDGE_PX // 2)
    dirs = pano_dirs(H, W, "cpu")
    shutil.copy(wd / "pano.png", wd / "pano-before-retouch.png")
    for name, (yaw, pitch, fov) in FACES.items():
        p = find_edit(rd, name)
        if p is None:
            continue
        orig, edit = load_rgb(rd / "_orig" / f"{name}.png"), load_rgb(p)
        if edit.shape != orig.shape:  # resized in the editor: bring it back to the exported size
            edit = F.interpolate(edit[None], size=orig.shape[1:], mode="bicubic", align_corners=False)[0].clamp(0, 1)
        changed = ((edit - orig).abs().amax(0, keepdim=True) > 6 / 255).float()
        if changed.mean() < 1e-4:
            print(f"{name}: unchanged")
            continue
        # Close small gaps in the change mask, then fade it out over ~1% of the image.
        weight = blur(dilate(changed, 12), 24).clamp(0, 1)
        weight = torch.maximum(weight, changed)
        vals, inside = view_to_pano(torch.cat([edit, weight]), dirs, cam_to_world(yaw, pitch), fov, margin=0.005)
        w = vals[3:4] * inside[None].float() * (1 - keep)
        pano = pano * (1 - w) + vals[:3] * w
        print(f"{name}: {changed.mean().item() * 100:.1f}% of the image changed, blended in")
    save_rgb(pano, wd / "pano.png")
    print("wrote", wd / "pano.png")


if __name__ == "__main__":
    cmd, wd, rd = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
    {"export": export, "import": import_}[cmd](wd, rd)
