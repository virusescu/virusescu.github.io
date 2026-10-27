# Tutorials & Presentations Engine — Implementation Plan

> **Source Brief:** [tutorialsguide.md](file:///d:/Work/virusescu.github.io/tutorials/tutorialsguide.md)  
> **Total Estimated Build Time:** ~2 hours 20 minutes across 7 deliverables  
> **Tech Constraints:** Pure Vanilla HTML5 / CSS3 / ES6+ JS, zero NPM/runtime dependencies, offline-capable via `file:///`, static `.mp3` per slide generated locally on RTX 5080.

---

## Progress Tracker

- [x] **Deliverable 1:** Antigravity Presentation Skill (`.agents/skills/presentation-creator/SKILL.md`) — *~10 min*
- [x] **Deliverable 2:** Engine Styles & 16:9 Canvas (`tutorials/_engine/player.css`) — *~20 min*
- [x] **Deliverable 3:** Engine Runtime, Audio Sync & Controls (`tutorials/_engine/player.js`) — *~25 min*
- [x] **Deliverable 4:** Local GPU/CPU Voice-Over Generator (`tutorials/_engine/generate_audio.py` + `setup_voices.bat` + `download_models.py` + `requirements.txt`) — *~20 min*
- [x] **Deliverable 5:** Starter Course Template (`tutorials/_template/`) — *~15 min*
- [x] **Deliverable 6:** First Production Course: Word Crash Course (`tutorials/word-crash-course/`) — *~35 min*
- [x] **Deliverable 7:** Secret Tutorials Hub (`tutorials/index.html`) — *~15 min*

---

## Deliverable 1: Antigravity Presentation Skill
**Target File:** `.agents/skills/presentation-creator/SKILL.md`  
**Estimated Time:** ~10 minutes  
**Goal:** Enable any AI agent in the repository to scaffold a complete, narrated tutorial course from a topic prompt.

### Implementation Tasks
1. **Create YAML frontmatter (`~2 min`):**
   - Set `name: presentation-creator` and a trigger `description` matching requests like *"creează o prezentare"*, *"adaugă un tutorial"*, or *"generează un curs nou"*.
2. **Document directory & file contract (`~2 min`):**
   - Enforce target structure `tutorials/<course-slug>/` containing `index.html`, `slides.js`, `theme.css`, and `audio/slide-XX.mp3`.
   - Enforce script loading order in `index.html`: `../_engine/player.css` $\rightarrow$ `./theme.css` $\rightarrow$ `./slides.js` $\rightarrow$ `../_engine/player.js`.
3. **Define `window.PRESENTATION_DATA` schema & 5 slide layout types (`~3 min`):**
   - Document required top-level properties: `id`, `title`, `subtitle`, `theme` (`accent`, `accentGlow`, `badgeColor`), and `slides[]`.
   - Specify exact `content` payloads for the 5 supported slide types:
     1. `hero` — Big title, subtitle badge, 1–3 intro highlight cards.
     2. `compare` — Two-column split (`left` = "Așa NU" / warning red, `right` = "Așa DA" / neon green).
     3. `cards` — Grid of 3–4 glassmorphic cards (`icon`, `title`, `text`, `tag`).
     4. `mockup` — Simulated application frame (e.g., Word Ribbon + A4 page preview) with callout badges.
     5. `mission` — Final hands-on challenge outside the browser with 3–4 numbered action steps.
4. **Write narration & TTS execution rules (`~3 min`):**
   - Constrain `narration` strings to 30–55 spoken Romanian words per slide (~15–25 seconds audio), friendly mentor tone, natural commas/ellipses for TTS prosody, zero in-slide quizzes.
   - Specify the post-authoring CLI command: `python tutorials/_engine/generate_audio.py --course <course-slug>` and hub registration in `tutorials/index.html`.

---

## Deliverable 2: Shared Presentation Engine — Styles & Layout
**Target File:** `tutorials/_engine/player.css`  
**Estimated Time:** ~20 minutes  
**Goal:** Render a responsive, zero-scrollbar 16:9 presentation stage matching the site's dark EA FC aesthetic (`#0a0d14`, `#00ff85`) with per-course CSS variable theming.

### Implementation Tasks
1. **Define root tokens & theme override hooks (`~4 min`):**
   - Mirror [style.css](file:///d:/Work/virusescu.github.io/style.css) variables (`--bg-primary: #0a0d14`, `--bg-card: rgba(18, 24, 38, 0.75)`, `--bg-card-border: rgba(255, 255, 255, 0.08)`, `--accent-green: #00ff85`, `--text-main: #f3f4f6`, `--text-muted: #94a3b8`).
   - Add course-level override variables: `--theme-accent` (defaults to `#00ff85`), `--theme-accent-glow` (defaults to `rgba(0, 255, 133, 0.25)`), and `--theme-badge`.
2. **Build the 16:9 fixed-aspect stage (`~5 min`):**
   - Style `.deck-viewport` as `100vw × 100vh`, `overflow: hidden`, flexbox centered, dark radial-gradient backdrop.
   - Style `.deck-stage` at fixed virtual resolution `1600px × 900px` (`transform-origin: center center`), scaled dynamically via CSS variable `--stage-scale: 1`.
3. **Style the 5 slide layout templates (`~6 min`):**
   - Implement `.slide` transition states (`.active`, `.prev`, `.next`) with smooth opacity + `translateY(12px)`/scale entrance animations.
   - Build layout grids for `.layout-hero`, `.layout-compare` (red vs green glass borders), `.layout-cards` (3-column/2x2 auto grid), `.layout-mockup` (window chrome + canvas split), and `.layout-mission` (numbered step cards with checkboxes).
4. **Style bottom HUD bar & pulsing Next button (`~5 min`):**
   - Create a floating bottom glassmorphic HUD bar containing: slide counter (`01 / 08`), audio play/pause/replay buttons, mute button, thin audio progress track (`.audio-progress-fill`), fullscreen button, and Prev/Next arrows.
   - Define `.btn-next.pulse-ready` keyframe animation (`@keyframes nextPulse`) with a breathing neon `--accent-green` box-shadow triggered when slide narration finishes.

---

## Deliverable 3: Shared Presentation Engine — Runtime & Audio Player
**Target File:** `tutorials/_engine/player.js`  
**Estimated Time:** ~25 minutes  
**Goal:** Render slides from `window.PRESENTATION_DATA`, manage 16:9 auto-scaling, synchronize per-slide `.mp3` playback, and bind keyboard/touch controls.

### Implementation Tasks
1. **Bootstrap data & apply theme tokens (`~5 min`):**
   - Read `window.PRESENTATION_DATA` on `DOMContentLoaded`.
   - Inject `theme.accent`, `theme.accentGlow`, and `theme.badgeColor` onto `document.documentElement.style`.
   - Support URL hash deep-linking (`#slide-03` or `#3`) so refreshing stays on the active slide.
2. **Implement 16:9 viewport scaler (`~4 min`):**
   - Compute `scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900)` on `resize` and `fullscreenchange`.
   - Set `--stage-scale` on `.deck-stage`.
3. **Build declarative slide DOM renderer (`~6 min`):**
   - Write dedicated render helpers for `hero`, `compare`, `cards`, `mockup`, and `mission` slide types.
   - Escape plain text fields while allowing an optional `customHtml` slot inside `mockup` or `custom` slides for rich visual diagrams.
4. **Implement single-instance Audio Controller (`~6 min`):**
   - Manage a single `new Audio()` instance. On `goToSlide(index)`: stop current track, reset `.btn-next.pulse-ready`, set `audio.src = slide.audio`, and play.
   - Handle missing `.mp3` files or browser autoplay blocks gracefully: if autoplay is blocked, show a prominent "Apasă Space sau Play pentru voce" pill; if an `.mp3` file does not exist yet, mark audio state as unavailable without throwing console errors.
   - Update `.audio-progress-fill` width on `timeupdate` and add `.pulse-ready` to the Next button on `ended`.
5. **Bind keyboard & touch navigation (`~4 min`):**
   - Bind `ArrowRight` / `PageDown` (Next), `ArrowLeft` / `PageUp` (Prev), `Space` (Play/Pause audio), `KeyR` (Replay slide audio), `KeyM` (Mute/Unmute), `KeyF` (Toggle Fullscreen), and horizontal touch swipe (`> 50px` delta) for tablet/mobile viewing.

---

## Deliverable 4: Local RTX 5080 Voice-Over Pipeline
**Target Files:** `tutorials/_engine/generate_audio.py`, `tutorials/_engine/requirements.txt`  
**Estimated Time:** ~20 minutes  
**Goal:** Synthesize natural Romanian `.mp3` narration files per slide from `slides.js` using local GPU compute or neural Edge-TTS.

### Implementation Tasks
1. **Create `tutorials/_engine/requirements.txt` (`~2 min`):**
   - List `edge-tts>=6.1.12` (zero-config Romanian neural voice `ro-RO-EmilNeural`) and optional local GPU packages (`TTS>=0.22.0`, `pydub`) alongside existing PyTorch `2.14.1+cu130`.
2. **Parse `slides.js` without Node.js (`~5 min`):**
   - Write a parser in `generate_audio.py` that extracts the `slides` array (`id`, `audio`, `narration`) from `tutorials/<course>/slides.js` using regex/JSON-block extraction or Python `ast`/evaluation so no JS runtime is needed.
3. **Implement primary & GPU TTS engines (`~9 min`):**
   - **`edge` engine (default fast/high-prosody male mentor):** Synthesize Romanian speech via `edge-tts` using `ro-RO-EmilNeural` with configurable rate (`+0%`) and pitch.
   - **`xtts` engine (local RTX 5080 CUDA):** Load Coqui XTTS-v2 on `cuda:0` (`torch.cuda.get_device_name(0)` check), using a reference `.wav` voice sample to synthesize high-intonation audio locally.
4. **Add CLI flags & incremental caching (`~4 min`):**
   - Support `--course <slug>`, `--engine [edge|xtts]`, `--voice <voice-id>`, `--ref-audio <path>`, and `--force`.
   - Skip existing `audio/slide-XX.mp3` files unless `--force` is passed so manual ElevenLabs overrides are never accidentally overwritten.

---

## Deliverable 5: Starter Course Blueprint (`_template/`)
**Target Directory:** `tutorials/_template/` (`index.html`, `slides.js`, `theme.css`, `audio/`)  
**Estimated Time:** ~15 minutes  
**Goal:** Provide a clean 3-slide reference deck that validates every engine feature and acts as the copy-paste starter for future courses.

### Implementation Tasks
1. **Create `tutorials/_template/index.html` & `theme.css` (`~5 min`):**
   - Build the minimal HTML shell mounting `#deck-viewport` and loading `../_engine/player.css`, `./theme.css`, `./slides.js`, and `../_engine/player.js`.
   - Set default neon green theme tokens in `theme.css` with commented examples for custom course overrides.
2. **Author 3 sample slides in `tutorials/_template/slides.js` (`~5 min`):**
   - `slide-01` (`hero`): Template overview & keyboard shortcuts showcase.
   - `slide-02` (`compare`): Sample "Așa NU vs Așa DA" visual comparison card.
   - `slide-03` (`mission`): Sample 3-step hands-on mission checklist.
3. **Generate sample audio in `tutorials/_template/audio/` (`~5 min`):**
   - Run `python tutorials/_engine/generate_audio.py --course _template` to produce `slide-01.mp3`, `slide-02.mp3`, and `slide-03.mp3`.

---

## Deliverable 6: First Production Course — Microsoft Word Crash Course
**Target Directory:** `tutorials/word-crash-course/` (`index.html`, `slides.js`, `theme.css`, `audio/`)  
**Estimated Time:** ~35 minutes  
**Goal:** Deliver the complete 8-slide Romanian tutorial on Microsoft Word for the author's wife and 12-year-old child, ending with a hands-on mission in Word.

### Implementation Tasks
1. **Create `index.html` & Microsoft Word `theme.css` (`~10 min`):**
   - Set Word theme tokens (`--theme-accent: #185abd`, `--theme-accent-glow: rgba(24, 90, 189, 0.35)`, `--theme-badge: #00ff85`).
   - Build reusable CSS UI mockups in `theme.css`: `.word-window` (simulated Word titlebar + Ribbon with `Home` / `References` tabs, `Heading 1` / `Heading 2` style gallery pills) and `.word-page` (miniature A4 sheet showing live typography, headings, and dotted Table of Contents leaders).
2. **Author Slides 01–04 in `tutorials/word-crash-course/slides.js` (`~10 min`):**
   - **Slide 01 (`intro` — `hero`):** *Superputerile unui Document* — WhatsApp/Notepad vs Microsoft Word as a digital print studio.
   - **Slide 02 (`app-vs-file` — `cards`):** *Aplicația vs Fișierul `.docx`* — "Bucătarul (Word) vs Rețeta (`.docx`)" analogy; why `.docx` works across Windows, phone, and Google Docs.
   - **Slide 03 (`fonts` — `mockup`):** *Ce este un Font? Haina Literelor* — Side-by-side preview of clean fonts (Calibri, Aptos, Arial) vs hard-to-read decorative fonts on an A4 mockup.
   - **Slide 04 (`manual-trap` — `compare`):** *Capcana Colorării Manuale* — Why manually selecting text + changing size/color fails when editing a 20-chapter document.
3. **Author Slides 05–08 in `tutorials/word-crash-course/slides.js` (`~10 min`):**
   - **Slide 05 (`styles` — `mockup`):** *Magia Stilurilor (`Heading 1` & `Heading 2`)* — Visual Ribbon mockup highlighting `Heading 1` / `Titlu 1` as smart semantic labels that update all chapters at once.
   - **Slide 06 (`toc` — `mockup`):** *Superputerea Supremă: Cuprinsul Automat* — Visual flow: `References` $\rightarrow$ `Table of Contents` $\rightarrow$ instant page-numbered chapter list + `Update Table` button.
   - **Slide 07 (`tabs-lists` — `compare`):** *Păcatul Tastei Space & Liste Inteligente* — "10x Spacebar" (broken alignment) vs `Tab` key and automatic Bulleted/Numbered lists.
   - **Slide 08 (`mission` — `mission`):** *Misiunea Ta Practică în Microsoft Word* — 5-minute real Word challenge: (1) Open Word & write 3 chapter titles about a favorite game or recipe, (2) Apply `Heading 1` to each and add 1–2 sentences underneath, (3) Insert an automatic Table of Contents from `References -> Table of Contents`.
4. **Synthesize all 8 Romanian voice-over tracks (`~5 min`):**
   - Run `python tutorials/_engine/generate_audio.py --course word-crash-course` to generate `audio/slide-01.mp3` through `audio/slide-08.mp3` and verify playback duration and pronunciation.

---

## Deliverable 7: Secret Tutorials Hub (`tutorials/index.html`)
**Target File:** `tutorials/index.html`  
**Estimated Time:** ~15 minutes  
**Goal:** Provide a private, unlinked landing page at `/tutorials/` displaying available courses in the site's signature dark glassmorphic style.

### Implementation Tasks
1. **Build hub layout & header (`~5 min`):**
   - Reuse root `../style.css` base tokens and the triangular `virusescu` SVG brand header with a `"SECRET TUTORIALS HUB"` neon badge.
   - Add `<meta name="robots" content="noindex, nofollow">` so search engines do not index the private hub.
2. **Create course card grid (`~7 min`):**
   - Render a glassmorphic card for **Crash Course: Microsoft Word** linking to `./word-crash-course/index.html`, displaying slide count (`8 Slide-uri`), audio badge (`Voice-Over RO`), estimated time (`~5 min + Misiune Practică`), and topic tags (`Formatul .docx`, `Heading Styles`, `Cuprins Automat`).
   - Include a secondary muted dev link to `./_template/index.html` (`Template Blueprint`).
3. **Verify zero-link isolation from main site (`~3 min`):**
   - Confirm root [index.html](file:///d:/Work/virusescu.github.io/index.html), [school/index.html](file:///d:/Work/virusescu.github.io/school/index.html), and [habits/index.html](file:///d:/Work/virusescu.github.io/habits/index.html) contain zero links to `/tutorials/`.
