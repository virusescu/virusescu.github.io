"""Contact sheet of ordinary camera views from inside a panorama, for judging it as a visitor would.

    D:/Programs/PythonLibs/flux/Scripts/python.exe tools/pano_views.py <pano.png> <sheet.jpg>

Runs on the CPU, so it can be used while the GPU is busy.
"""

import sys
from pathlib import Path

import numpy as np
import torch
from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).parent))
from geom import cam_to_world, cut_view  # noqa: E402

Image.MAX_IMAGE_PIXELS = None
VIEWS = [(0, 0), (90, 0), (180, 0), (-90, 0), (0, 60), (180, 60), (0, -60), (180, -60)]
SIZE, FOV = 480, 80


def main():
    pano = torch.from_numpy(np.array(Image.open(sys.argv[1]).convert("RGB"))).permute(2, 0, 1).float() / 255
    tiles = []
    for yaw, pitch in VIEWS:
        v, _ = cut_view(pano, cam_to_world(yaw, pitch), FOV, SIZE)
        im = Image.fromarray((v.clamp(0, 1) * 255).round().byte().permute(1, 2, 0).numpy())
        ImageDraw.Draw(im).text((6, 4), f"yaw {yaw} pitch {pitch}", fill=(0, 0, 0))
        tiles.append(im)
    sheet = Image.new("RGB", (SIZE * 4, SIZE * 2))
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % 4) * SIZE, (i // 4) * SIZE))
    sheet.save(sys.argv[2], quality=88)


if __name__ == "__main__":
    main()
