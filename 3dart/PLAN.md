# 3D Art: a 360° painted landscape with parallax

Technical plan, written 2026-11-14. The site itself is not built yet; the outpainting canvas for the first scene is ready.

## Goal

A site for a painter. The visitor stands inside a painting and can look in every direction: on a phone by turning the phone or dragging, on desktop by dragging the mouse. The visitor cannot walk. The scene must not look like a flat picture glued inside a ball: near things shift slightly against far things.

**First scene:** *Peisaj de iarnă* by Ecaterina Staicu, an oil painting (1582 × 1600 photo of the canvas). One scene for now, as a test; a gallery of several scenes later.

## Decisions so far

| Topic | Decision |
|---|---|
| Image source | The real painting, extended to a full 360° panorama with AI outpainting |
| Style | Painterly, which hides depth-edge stretching well |
| Scenes | One now, gallery later |
| Text | Painter's name and the title, placed in the 3D space, not as a flat overlay |
| Sound | Ambient music (calm piano). None in the first pass; an MP3 made later (Suno) drops in |
| Hotspots | None |

## How it works

Two images are needed:

1. **Colour panorama**: the landscape in equirectangular projection, the standard 360° photo format.
2. **Depth map**: the same panorama in greyscale, where brightness says how far each point is.

The site builds a sphere around the viewer and pushes every point of it inward or outward according to the depth map. The result is real 3D relief seen from inside, textured with the panorama.

### Parallax without moving

Parallax appears only when the eye changes position; a pure rotation around the eye gives none. So the camera sits about 10 cm in front of the pivot, the way eyes sit in front of the neck. When the visitor turns, the eye travels a small circle and near objects slide against the background. A very slow idle sway of a few centimetres keeps the scene alive when nothing is touched. Both amounts are tuned by eye.

### The limit

The relief is one continuous surface. At the edge of a near object in front of a far one (a tree against the sky) the surface stretches like a rubber sheet. With small camera offsets it is barely visible, and brush strokes hide it further. If it still bothers us, the next step is **layers**: two to four panoramas with transparency on separate spheres. We start without that.

## Extending the painting to 360°

A flat painting cannot simply be pasted into a panorama; it has to be bent into the panorama's projection first. `tools/make_canvas.py` does that and produces the starting point for outpainting:

| File | What it is |
|---|---|
| `scenes/winter-landscape/outpaint-8k/canvas.png` | 8192 × 4096, the painting in the centre, the rest transparent |
| `scenes/winter-landscape/outpaint-8k/mask.png` | White = area for the AI to fill, black = keep |
| `scenes/winter-landscape/outpaint-4k/` | The same at 4096 × 2048, for tools that cannot take 8K |

Assumptions baked into the canvas, both adjustable by re-running the script:

- The painting covers a **70° field of view**. A larger value makes the painting a bigger part of the world and the scene feel wider; a smaller one makes it a small window.
- The painting's **horizon** (the far shore, 44% from the top) sits on the panorama's equator.

### What the outpainting must deliver

| Property | Value |
|---|---|
| Projection | Equirectangular, 360° × 180° |
| Aspect ratio | Exactly 2:1 |
| Resolution | 8192 × 4096 ideal, 4096 × 2048 minimum |
| Original painting | Left untouched in the centre |
| Left and right edges | Continue into each other with no seam |
| Horizon | Stays on the middle row all the way around |
| Top | Sky only, colours converging smoothly towards the top edge |
| Bottom | Snow only, converging smoothly towards the bottom edge |
| Format | PNG or high-quality JPEG; I convert for the web |

Composition advice for the generated part:

- Continue the frozen river behind the viewer or close it with a snowy bank; both read naturally.
- More tree groups like the existing ones at mid distance, a far tree line, open sky. Keep the same palette: orange and violet trees, pink and blue sky.
- **Nothing closer than about 2 metres**, and no thin bare branches against the sky in the new areas. The tall thin tree on the left of the original is already the hardest case.
- Keep the signature where it is; it will end up low on the ground in front.

Work outward in steps (sides first, then behind, then sky and ground) instead of filling everything in one pass; results stay closer to the original style. Prompt wording that helps: "equirectangular 360 degree panorama, oil painting, visible palette knife strokes, winter landscape at sunset, frozen river, snow".

Generators often leave a seam at the left/right edge. Send me the result anyway: I can shift the image by half its width so the seam lands in the middle, for a final touch-up pass.

### Depth map

Nothing to deliver. Once the panorama exists I estimate depth on the server with a depth model (Depth Anything family) and clean it: flat black sky, smooth ground, fixed poles and seam. Convention: white = near, black = far, 2048 × 1024.

## The site

| Part | Choice |
|---|---|
| Rendering | three.js (WebGL), vendored in the folder, no CDN |
| Build step | None. Plain HTML, CSS and JavaScript like the rest of the site |
| Geometry | Sphere of about 512 × 256 segments, displaced in the shader by the depth map |
| Phone | Gyroscope to look around, plus finger drag |
| Desktop | Mouse drag, wheel for a slight zoom |
| Start screen | Title, painter's name and an "Enter" button. Required anyway: iOS grants gyroscope access and browsers allow sound only after a tap |
| No gyroscope or access refused | Finger drag still works |
| Text in space | Name and title drawn on a curved surface floating in the scene, so they move with parallax like everything else. Position chosen once the panorama exists (probably opposite the original painting) |
| Sound | Looping `ambient.mp3` with a fade-in and a mute button. If the file is absent the button is hidden |
| Loading | Small blurred image first, then the full one. A 4096 × 2048 version for phones that cannot hold 8192 textures |
| Address | `https://virusescu.github.io/3dart/` |

For music before the Suno track exists, a public-domain piano recording (for example Satie from Musopen) would fit; say so and I will add one.

### Files

```
3dart/
  PLAN.md
  index.html
  style.css
  main.js              scene, controls, shader
  vendor/three.module.min.js
  tools/make_canvas.py painting -> outpainting canvas
  scenes/winter-landscape/
    source/painting.jpg
    outpaint-8k/, outpaint-4k/   working files, not published in the end
    color.webp         final panorama, 8192 x 4096
    color-4k.webp
    depth.png
    ambient.mp3        optional
    scene.json         title, painter, start direction, parallax strength, text position
```

`scene.json` is what makes the later gallery a matter of adding folders.

## Steps

1. **Canvas for outpainting**: done.
2. **Outpaint to 360°**: first attempt done with Gemini Nano Banana from the original painting (`source/panorama-v1.jpg`, 2752 × 1536). It is a wide painting more than a true 360° panorama, and the original was repainted, not preserved. Good enough to test the viewer.
3. **Depth map and prototype**: built (`tools/build_scene.py`, `index.html`, `main.js`), not yet seen in a browser. Next: tune parallax on phone and desktop. Testing before publishing can go through the home server over Tailscale, which has the HTTPS the gyroscope needs.
4. **Finish**: start screen, text in space, sound, progressive loading.
5. **Publish** with `git push`, after you confirm.

I can build the viewer in parallel with step 2, using the unextended painting on a partial sphere as a stand-in.

## Open questions

1. **Outpainting tool**: which one, and what is the largest canvas it accepts? That decides whether we use the 8K or the 4K canvas.
2. **Field of view**: is 70° right, or should the painting fill more of the world?
3. **The painter's consent** to an AI-extended version of the work being published under her name, and how to credit it (for example "original painting by Ecaterina Staicu, extended digitally").
