#!/usr/bin/env python3
"""Place a flat painting into an empty equirectangular canvas, ready for AI outpainting.

The painting is treated as a perspective view (gnomonic projection) looking straight
ahead, with its horizon line mapped to the canvas equator. Output:
  canvas.png  RGBA, painting reprojected in the centre, everything else transparent
  mask.png    white = area the AI must fill, black = painting to keep

Usage: make_canvas.py painting.jpg outdir [--width 8192] [--fov 70] [--horizon 0.44]
  --fov      horizontal field of view the painting covers, in degrees
  --horizon  horizon height in the painting, as a fraction from the top (0..1)
"""
import argparse
import math
import os

from PIL import Image

p = argparse.ArgumentParser()
p.add_argument("painting")
p.add_argument("outdir")
p.add_argument("--width", type=int, default=8192)
p.add_argument("--fov", type=float, default=70.0)
p.add_argument("--horizon", type=float, default=0.44)
a = p.parse_args()

src = Image.open(a.painting).convert("RGB")
sw, sh = src.size
spx = src.load()
W, H = a.width, a.width // 2

f = (sw / 2) / math.tan(math.radians(a.fov / 2))  # focal length in source pixels
cx, cy = sw / 2, sh * a.horizon

canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
mask = Image.new("L", (W, H), 255)
cpx, mpx = canvas.load(), mask.load()

# Only scan the part of the canvas the painting can reach.
half_lon = math.radians(a.fov / 2)
lat_top = math.atan(cy / f)
lat_bot = -math.atan((sh - cy) / f)
x0 = int((0.5 - half_lon / (2 * math.pi)) * W) - 2
x1 = int((0.5 + half_lon / (2 * math.pi)) * W) + 2
y0 = int((0.5 - lat_top / math.pi) * H) - 2
y1 = int((0.5 - lat_bot / math.pi) * H) + 2

for y in range(y0, y1):
    lat = (0.5 - (y + 0.5) / H) * math.pi
    tl, cl = math.tan(lat), math.cos(lat)
    for x in range(x0, x1):
        lon = ((x + 0.5) / W - 0.5) * 2 * math.pi
        cz = math.cos(lon)
        if cz <= 0:
            continue
        u = cx + f * math.tan(lon) - 0.5
        v = cy - f * tl / cz - 0.5
        if u < 0 or v < 0 or u > sw - 1 or v > sh - 1:
            continue
        iu, iv = int(u), int(v)
        fu, fv = u - iu, v - iv
        iu2, iv2 = min(iu + 1, sw - 1), min(iv + 1, sh - 1)
        a00, a10, a01, a11 = spx[iu, iv], spx[iu2, iv], spx[iu, iv2], spx[iu2, iv2]
        px = tuple(
            int(round(
                (a00[c] * (1 - fu) + a10[c] * fu) * (1 - fv)
                + (a01[c] * (1 - fu) + a11[c] * fu) * fv
            ))
            for c in range(3)
        )
        cpx[x, y] = px + (255,)
        mpx[x, y] = 0

os.makedirs(a.outdir, exist_ok=True)
canvas.save(os.path.join(a.outdir, "canvas.png"))
mask.save(os.path.join(a.outdir, "mask.png"))
print(f"{W}x{H}; painting occupies x {x0}..{x1}, y {y0}..{y1}")
