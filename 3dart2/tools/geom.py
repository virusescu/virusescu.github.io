"""Panorama <-> perspective-view geometry shared by sharp360.py and outpaint360.py.

World convention (three.js): +Y up, -Z forward (panorama centre), +X right.
Panorama pixel (u, v) in [0,1): lon = (u - 0.5) * 2pi, lat = (0.5 - v) * pi.
Views use the OpenCV camera convention: x right, y down, z forward.
"""

from __future__ import annotations

import math

import numpy as np
import torch
import torch.nn.functional as F


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


def focal(size, fov):
    return (size / 2) / math.tan(math.radians(fov) / 2)


def sample_pano(pano: torch.Tensor, lon: torch.Tensor, lat: torch.Tensor, mode="bilinear") -> torch.Tensor:
    """Sample a (C, H, W) panorama at the given angles (any shape). Wraps around the seam."""
    C, H, W = pano.shape
    pad = 4
    padded = torch.cat([pano[:, :, -pad:], pano, pano[:, :, :pad]], dim=2)
    x = (lon / (2 * math.pi) + 0.5) * W + pad
    y = (0.5 - lat / math.pi) * H
    grid = torch.stack([x / padded.shape[2] * 2 - 1, y / H * 2 - 1], -1).reshape(1, -1, 1, 2)
    out = F.grid_sample(padded[None], grid, mode=mode, padding_mode="border", align_corners=False)
    return out[0, :, :, 0].reshape(C, *lon.shape)


def cut_view(pano: torch.Tensor, R: np.ndarray, fov: float, size: int, mode="bilinear"):
    """Sample a size x size perspective view from a (C, H, W) panorama. Returns (view, f)."""
    dev = pano.device
    f = focal(size, fov)
    c = (size - 1) / 2
    j, i = torch.meshgrid(torch.arange(size, device=dev), torch.arange(size, device=dev), indexing="xy")
    rays = torch.stack([(j - c) / f, (i - c) / f, torch.ones_like(j, dtype=torch.float32)], -1).float()
    world = rays @ torch.tensor(R.T, dtype=torch.float32, device=dev)
    world = world / world.norm(dim=-1, keepdim=True)
    lon = torch.atan2(world[..., 0], -world[..., 2])
    lat = torch.asin(world[..., 1].clamp(-1, 1))
    return sample_pano(pano, lon, lat, mode), f


def pano_dirs(H: int, W: int, dev) -> torch.Tensor:
    """(H, W, 3) unit directions for every panorama pixel centre."""
    v = (torch.arange(H, device=dev) + 0.5) / H
    u = (torch.arange(W, device=dev) + 0.5) / W
    lat = (0.5 - v) * math.pi
    lon = (u - 0.5) * 2 * math.pi
    lat, lon = torch.meshgrid(lat, lon, indexing="ij")
    return torch.stack([torch.sin(lon) * torch.cos(lat), torch.sin(lat), -torch.cos(lon) * torch.cos(lat)], -1)


def view_to_pano(view: torch.Tensor, dirs: torch.Tensor, R: np.ndarray, fov: float, margin: float = 0.0):
    """Project a (C, s, s) perspective view back onto the panorama grid.

    Returns (values (C, H, W), inside (H, W) bool). `margin` is a fraction of the view
    size trimmed from each edge, so the least reliable border is not used.
    """
    dev = view.device
    size = view.shape[-1]
    f = focal(size, fov)
    c = (size - 1) / 2
    cam = dirs @ torch.tensor(R, dtype=torch.float32, device=dev)  # world -> camera: d @ R
    z = cam[..., 2]
    zs = z.clamp(min=1e-6)
    x = cam[..., 0] / zs * f + c
    y = cam[..., 1] / zs * f + c
    lo, hi = margin * size, (1 - margin) * size - 1
    inside = (z > 1e-6) & (x >= lo) & (x <= hi) & (y >= lo) & (y <= hi)
    grid = torch.stack([(x + 0.5) / size * 2 - 1, (y + 0.5) / size * 2 - 1], -1)
    vals = F.grid_sample(view[None], grid[None], mode="bilinear", padding_mode="border", align_corners=False)[0]
    return vals, inside
