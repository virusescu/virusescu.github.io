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
import os
import sys
from pathlib import Path

os.environ.setdefault("TORCH_HOME", r"D:\Programs\AIModels\torch")  # SHARP checkpoint lives here

import numpy as np
import torch
from PIL import Image

from sharp.cli.predict import DEFAULT_MODEL_URL, predict_image
from sharp.models import PredictorParams, create_predictor

sys.path.insert(0, str(Path(__file__).parent))
from geom import cam_to_world, cut_view  # noqa: E402

SIZE = 1536  # SHARP's internal resolution; cut views at exactly this size.


def view_list():
    """8 views around the horizon plus one up and one down, 100 degree field of view."""
    views = [dict(name=f"ring{int(y):03d}", yaw=y, pitch=0.0, fov=100.0) for y in range(0, 360, 45)]
    views.append(dict(name="up", yaw=0.0, pitch=90.0, fov=110.0))
    views.append(dict(name="down", yaw=0.0, pitch=-90.0, fov=110.0))
    return views


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
        img, f = cut_view(pano, R, v["fov"], SIZE)
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
