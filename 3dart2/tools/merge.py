"""Stitch the per-view SHARP Gaussians (from sharp360.py) into one 360 degree splat.

Run with the SHARP environment:
    D:/Programs/ml-sharp/.venv/Scripts/python.exe tools/merge.py <viewsdir> <out.ply>

Per view:
  1. Scale: SHARP's metric scale drifts from view to view. Each horizon view is scaled so
     its ground (pixels 8-40 degrees below the horizon) sits on a plane EYE metres below
     the eye.
  2. Floor: nothing may sit below that plane. Reflections in the river, which SHARP reads
     as holes into the distance, get pulled up onto the water surface.
  3. Sky: everything above the horizon and further than SKY_FROM metres goes onto a dome
     of radius SKY_R, so neighbouring views agree on where the sky is.
  4. The straight-up view is put on the dome, the straight-down view on the ground plane.
  5. Each Gaussian is kept only by the view whose axis is closest to its direction, so
     every direction is covered once.
Moving a Gaussian along its ray by a factor k and scaling its size by k leaves the image
seen from the centre unchanged; only the parallax changes.

Output: standard 3DGS PLY in three.js world coordinates (+Y up, -Z forward).
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
import torch
from plyfile import PlyData, PlyElement

from sharp.utils import color_space as cs_utils
from sharp.utils import linalg

EYE = 1.6  # metres above the ground
SKY_FROM = 80.0
SKY_R = 250.0
NEAR_MIN = 0.6  # nothing closer than this to the eye
FEATHER_DEG = 0.0  # overlap band at view seams (0 = hard cut)
SKY_THIN = 2.0  # size multiplier for the thinned-out sky splats


def sh_from_rgb(rgb):
    return (rgb - 0.5) / np.sqrt(1.0 / (4.0 * np.pi))


def process_view(npz, axes, idx, dev):
    d = np.load(npz)
    R = torch.tensor(d["R"], dtype=torch.float32, device=dev)
    means = torch.tensor(d["means"], device=dev)
    scales = torch.tensor(d["scales"], device=dev)
    quats = torch.tensor(d["quats"], device=dev)
    colors = torch.tensor(d["colors"], device=dev)
    opac = torch.tensor(d["opacities"], device=dev)
    name = Path(npz).stem

    w = means @ R.T  # world positions
    r = w.norm(dim=1)
    dirs = w / r[:, None]
    sin_el = dirs[:, 1]

    # Ground-plane range along each ray (inf above the horizon).
    ground_r = torch.where(sin_el < -1e-3, EYE / (-sin_el).clamp(min=1e-3), torch.full_like(r, float("inf")))

    if name == "up":
        r_new = torch.full_like(r, SKY_R)
        s = float("nan")
    elif name == "down":
        r_new = ground_r.clamp(max=SKY_R)
        s = float("nan")
    else:
        half = len(r) // 2
        el = torch.rad2deg(torch.asin(sin_el[:half]))
        sel = (el < -8) & (el > -40)
        implied_h = r[:half][sel] * (-sin_el[:half][sel])
        s = EYE / implied_h.median().item()
        r_new = r * s
        r_new = torch.minimum(r_new, ground_r)  # floor
        sky = (sin_el > 0.02) & (r_new > SKY_FROM)
        r_new = torch.where(sky, torch.full_like(r_new, SKY_R), r_new)
        r_new = r_new.clamp(NEAR_MIN, SKY_R)

    k = r_new / r
    w = dirs * r_new[:, None]
    scales = scales * k[:, None]

    # Sky is soft: on the dome keep only the front layer and every second pixel in each
    # direction, each splat twice as big. Cuts about a quarter of the file.
    n_layer = len(r) // 2
    side = int(round(n_layer ** 0.5))
    ids = torch.arange(len(r), device=dev)
    pix = ids % n_layer
    on_dome = r_new >= SKY_R - 1e-3
    sparse = (ids < n_layer) & ((pix // side) % 2 == 0) & ((pix % side) % 2 == 0)
    scales = torch.where(on_dome[:, None], scales * SKY_THIN, scales)

    # Ownership: keep where this view's axis is the closest one.
    cos = dirs @ axes.T  # (N, V)
    best = cos.argmax(dim=1)
    keep = (best == idx) & (~on_dome | sparse)
    if FEATHER_DEG > 0:
        mine = cos[:, idx]
        other = cos.clone()
        other[:, idx] = -2
        ang = torch.rad2deg(torch.acos(other.max(dim=1).values.clamp(-1, 1))) - torch.rad2deg(
            torch.acos(mine.clamp(-1, 1))
        )
        keep = ang > -FEATHER_DEG
        fade = ((ang + FEATHER_DEG) / (2 * FEATHER_DEG)).clamp(0, 1)
        opac = opac * torch.where(ang < FEATHER_DEG, fade, torch.ones_like(fade))

    # Rotate the Gaussians' orientation into world space.
    rot = linalg.rotation_matrices_from_quaternions(quats)
    quats_w = linalg.quaternions_from_rotation_matrices(R[None] @ rot)

    print(f"{name:8s} scale {s:6.2f}  kept {int(keep.sum()):8d} / {len(keep)}", flush=True)
    sel = keep
    return dict(
        xyz=w[sel].cpu().numpy(),
        scales=scales[sel].cpu().numpy(),
        quats=quats_w[sel].cpu().numpy(),
        colors=colors[sel].cpu().numpy(),
        opac=opac[sel].cpu().numpy(),
    )


def write_ply(path, xyz, scales, quats, colors_lin, opac):
    srgb = cs_utils.linearRGB2sRGB(torch.tensor(colors_lin)).numpy()
    fdc = sh_from_rgb(srgb)
    op = np.clip(opac, 1e-6, 1 - 1e-6)
    op_logit = np.log(op / (1 - op))
    names = ["x", "y", "z", "f_dc_0", "f_dc_1", "f_dc_2", "opacity", "scale_0", "scale_1", "scale_2",
             "rot_0", "rot_1", "rot_2", "rot_3"]
    arr = np.concatenate([xyz, fdc, op_logit[:, None], np.log(scales), quats], axis=1).astype(np.float32)
    el = np.empty(len(arr), dtype=[(n, "f4") for n in names])
    for i, n in enumerate(names):
        el[n] = arr[:, i]
    PlyData([PlyElement.describe(el, "vertex")]).write(str(path))


def main():
    vdir, out = Path(sys.argv[1]), Path(sys.argv[2])
    dev = torch.device("cuda")
    views = json.loads((vdir / "views.json").read_text())
    axes = torch.tensor(np.array([np.array(v["R"])[:, 2] for v in views]), dtype=torch.float32, device=dev)
    parts = [process_view(vdir / f"{v['name']}.npz", axes, i, dev) for i, v in enumerate(views)]
    merged = {k: np.concatenate([p[k] for p in parts]) for k in parts[0]}
    print("total gaussians:", len(merged["xyz"]))
    out.parent.mkdir(parents=True, exist_ok=True)
    write_ply(out, merged["xyz"], merged["scales"], merged["quats"], merged["colors"], merged["opac"])
    print("wrote", out, f"{out.stat().st_size / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
