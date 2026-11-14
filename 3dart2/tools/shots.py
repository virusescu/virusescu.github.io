"""Render screenshots of the viewer from fixed camera poses, using the installed Edge headless.

    D:/Programs/shot-venv/Scripts/python.exe tools/shots.py <extra-query-or-""> <out.jpg> [pose ...]

extra-query: e.g. "splat=work/world.ply" or "budget=1000000" (phone-sized splat budget).

pose = x,y,z,yawDeg,pitchDeg   (yaw 0 = the painting, positive = turn right)
Needs the site served at http://127.0.0.1:8123/. All poses go into one contact sheet.
"""

import sys
import time
from io import BytesIO

from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8123/3dart2/index.html"
W, H = 960, 600


def main():
    extra, out = sys.argv[1], sys.argv[2]
    poses = sys.argv[3:] or ["0,0,0,0,0"]
    tiles = []
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="msedge",
            headless=True,
            args=["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader=false"],
        )
        page = browser.new_page(viewport={"width": W, "height": H})
        logs = []
        page.on("console", lambda m: logs.append(f"{m.type}: {m.text}"))
        page.on("pageerror", lambda e: logs.append(f"pageerror: {e}"))
        for pose in poses:
            q = f"?shot={pose}" + (f"&{extra}" if extra else "")
            t0 = time.time()
            page.goto(URL + q)
            page.wait_for_function("window.__ready === true", timeout=300000)
            page.wait_for_timeout(1500)
            img = Image.open(BytesIO(page.locator("#view").screenshot(type="png"))).convert("RGB")
            ImageDraw.Draw(img).text((8, 6), pose, fill=(0, 0, 0))
            tiles.append(img)
            mb = page.evaluate("performance.getEntriesByType('resource').reduce((a, e) => a + (e.decodedBodySize || 0), 0) / 1e6")
            print(pose, f"{time.time() - t0:.1f}s", f"{mb:.1f} MB fetched", flush=True)
        renderer = page.evaluate(
            "(() => { const gl = document.createElement('canvas').getContext('webgl2');"
            " const e = gl.getExtension('WEBGL_debug_renderer_info');"
            " return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'unknown'; })()"
        )
        print("GPU:", renderer)
        for line in logs[-15:]:
            print(line)
        browser.close()
    cols = 2 if len(tiles) > 1 else 1
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (W * cols, H * rows), "white")
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % cols) * W, (i // cols) * H))
    sheet.save(out, quality=88)


if __name__ == "__main__":
    main()
