"""Fill the unpainted parts of a panorama with a soft continuation of their surroundings.

    D:/Programs/PythonLibs/flux/Scripts/python.exe tools/fill_holes.py <workdir> <out.png>

Uses <workdir>/pano.png and known.png (white = painted). Pull-push fill: the painted pixels are
averaged down a pyramid, then holes are filled from coarser levels on the way back up, so
colours flow smoothly in from the edges. Plain and blurry by design; used for the ground
right under the visitor's feet, which FLUX did not get to.
"""

import sys
from pathlib import Path

import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from geom import cam_to_world, cut_view, pano_dirs, view_to_pano  # noqa: E402

Image.MAX_IMAGE_PIXELS = None
FOV, SIZE = 150.0, 2048  # wide enough to reach the painted edge of the cap


def pull_push(rgb, m):
    """rgb (3,H,W), m (1,H,W) in [0,1]. Returns rgb with holes filled."""
    levels = [(rgb * m, m)]
    while min(levels[-1][1].shape[-2:]) > 1:  # down to one row, so every hole gets a value
        c, w = levels[-1]
        # wrap horizontally (360 panorama) by pooling a padded copy
        c2 = F.avg_pool2d(c[None], 2)[0]
        w2 = F.avg_pool2d(w[None], 2)[0]
        levels.append((c2, w2))
    c, w = levels[-1]
    filled = c / w.clamp(min=1e-6)
    for c, w in reversed(levels[:-1]):
        up = F.interpolate(filled[None], size=c.shape[-2:], mode="bilinear", align_corners=False)[0]
        own = c / w.clamp(min=1e-6)
        a = w.clamp(0, 1)
        filled = own * a + up * (1 - a)
    return filled


def main():
    wd, out = Path(sys.argv[1]), Path(sys.argv[2])
    pano = torch.from_numpy(np.array(Image.open(wd / "pano.png").convert("RGB"))).permute(2, 0, 1).float() / 255
    known = torch.from_numpy(np.array(Image.open(wd / "known.png").convert("L"))).float()[None] / 255
    m = (known > 0.5).float()
    print(f"unpainted: {(1 - m).mean().item() * 100:.1f}% of the panorama")
    H, W = pano.shape[1:]
    dirs = pano_dirs(H, W, "cpu")
    # The holes are the caps around straight up/down. Fill each in an undistorted camera view
    # looking at it (on the flat panorama the poles are stretched and the fill shows streaks).
    for pitch in (-90, 90):
        R = cam_to_world(0, pitch)
        v, _ = cut_view(pano, R, FOV, SIZE)
        mv, _ = cut_view(m, R, FOV, SIZE)
        mv = (mv > 0.99).float()
        if mv.mean() > 0.999:
            continue
        fill = pull_push(v, mv)
        for _ in range(3):  # smooth away the blocky steps of the coarse pyramid levels
            fill = F.avg_pool2d(F.pad(fill[None], (24, 24, 24, 24), mode="replicate"), 49, stride=1)[0]
        vals, inside = view_to_pano(fill, dirs, R, FOV, margin=0.0)
        hole = (1 - m) * inside[None].float()
        k = 33  # feather into the painted area a little so the edge does not show a line
        soft = F.avg_pool2d(F.pad(hole[None], (k // 2,) * 4, mode="replicate"), k, stride=1)[0]
        w = torch.maximum(hole, soft * 0.6)
        pano = pano * (1 - w) + vals * w
        m = torch.maximum(m, hole)
    Image.fromarray((pano.clamp(0, 1) * 255).round().byte().permute(1, 2, 0).numpy()).save(out)
    print("wrote", out)


if __name__ == "__main__":
    main()
