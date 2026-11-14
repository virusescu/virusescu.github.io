#!/usr/bin/env python3
"""Turn a panorama into the files the viewer needs: color.jpg and depth.png.

Steps: resize to 2:1, hide the left/right wrap seam, estimate depth with
Depth Anything V2 (ONNX), clean the depth map (seam, poles, light blur).

Run with the depth venv:
  ~/homelab/.venvs/depth/bin/python tools/build_scene.py SRC SCENE_DIR \
      [--model ~/homelab/.models/depth-anything-v2-small.onnx] [--width 4096]
Depth convention: white = near, black = far.
"""
import argparse
import os

import numpy as np
import onnxruntime as ort
from PIL import Image, ImageFilter

p = argparse.ArgumentParser()
p.add_argument("src")
p.add_argument("scene_dir")
p.add_argument("--model", default=os.path.expanduser("~/homelab/.models/depth-anything-v2-small.onnx"))
p.add_argument("--width", type=int, default=4096)
p.add_argument("--seam", type=float, default=0.05, help="seam blend band, fraction of width")
a = p.parse_args()


def blend_seam(arr, band):
    """Cross-fade each edge towards the mirrored opposite edge so column 0 meets column W-1."""
    out = arr.astype(np.float32).copy()
    w = arr.shape[1]
    b = max(2, int(w * band))
    t = np.linspace(0.5, 0.0, b) ** 1.0  # 0.5 at the edge, 0 at the inner end of the band
    t = t.reshape((1, b) + (1,) * (arr.ndim - 2))
    left = arr[:, :b].astype(np.float32)
    right = arr[:, w - b:][:, ::-1].astype(np.float32)  # mirrored: index 0 is the edge column
    out[:, :b] = left * (1 - t) + right * t
    out[:, w - b:] = (right * (1 - t) + left * t)[:, ::-1]
    return out


W, H = a.width, a.width // 2
img = Image.open(a.src).convert("RGB").resize((W, H), Image.LANCZOS)
color = blend_seam(np.asarray(img), a.seam).clip(0, 255).astype(np.uint8)
Image.fromarray(color).save(os.path.join(a.scene_dir, "color.jpg"), quality=88, optimize=True)

# --- depth ---
dw, dh = 1036, 518  # multiples of 14, as the model requires
small = np.asarray(Image.fromarray(color).resize((dw, dh), Image.LANCZOS)).astype(np.float32) / 255
mean, std = np.array([0.485, 0.456, 0.406], np.float32), np.array([0.229, 0.224, 0.225], np.float32)
x = ((small - mean) / std).transpose(2, 0, 1)[None]
sess = ort.InferenceSession(a.model, providers=["CPUExecutionProvider"])
d = sess.run(None, {sess.get_inputs()[0].name: x})[0].squeeze().astype(np.float32)

lo, hi = np.percentile(d, 1), np.percentile(d, 99)
d = ((d - lo) / (hi - lo)).clip(0, 1)  # model output is inverse depth: larger = nearer
d = blend_seam(d, a.seam)

# Poles: every column must agree at the top and bottom rows, or the sphere tears there.
rows = d.shape[0]
k = int(rows * 0.10)
ramp = np.linspace(1.0, 0.0, k)[:, None] ** 2
d[:k] = d[:k] * (1 - ramp) + d[:k].mean(axis=1, keepdims=True) * ramp
d[rows - k:] = d[rows - k:] * (1 - ramp[::-1]) + d[rows - k:].mean(axis=1, keepdims=True) * ramp[::-1]

dimg = Image.fromarray((d * 255).round().astype(np.uint8)).resize((1024, 512), Image.LANCZOS)
dimg = dimg.filter(ImageFilter.GaussianBlur(1.2))
dimg.save(os.path.join(a.scene_dir, "depth.png"), optimize=True)
print("color.jpg", (W, H), "depth.png", dimg.size, "depth range", float(d.min()), float(d.max()))
