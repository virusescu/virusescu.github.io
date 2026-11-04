---
name: presentation-creator
description: >-
  Scaffold, author, and synthesize voice-over audio for interactive HTML5/CSS3/JS
  presentations and tutorials inside the `tutorials/` module of virusescu.github.io,
  as desktop 16:9 decks or mobile Stories-style 9:16 decks, with optional quizzes,
  typed-answer questions, flashcards, step-through code slides and a final score.
  Use this skill whenever the user asks to create a presentation, add a tutorial,
  build a course deck, make a mobile/phone version, or update slides/voice-overs
  ("creează o prezentare", "adaugă un tutorial", "generează un curs nou").
---

# Presentation Creator Skill (`tutorials/`)

Builds narrated, data-driven decks on the shared engine in `tutorials/_engine/`. A deck is a folder with
`index.html`, `theme.css`, `slides.js` (`window.PRESENTATION_DATA`) and `audio/*.mp3`.

**Skill resources (read when the step needs them):**
| File | Read it when |
| :--- | :--- |
| [`references/slide-types.md`](references/slide-types.md) | Writing `slides.js`: schema + every slide type with examples |
| [`references/interactive.md`](references/interactive.md) | Adding `quiz`, `input`, `reveal`, `results` slides: answer flow, matching rules, writing hints/explanations |
| [`references/mobile-stories.md`](references/mobile-stories.md) | Building a `format: "mobile"` deck: Stories UX, text budgets, phone pitfalls |
| [`references/engine-dom.md`](references/engine-dom.md) | Before writing **any** non-token CSS: real DOM/class map, tokens, hardcoded dark values |
| [`templates/theme-light.css`](templates/theme-light.css) | Light, corporate or brand-guideline themes (desktop) |
| [`scripts/validate-course.mjs`](scripts/validate-course.mjs) | Always, before reporting a deck as done |
| [`scripts/screenshot-slides.mjs`](scripts/screenshot-slides.mjs) | Visual QA (desktop or real phone emulation, normal or answered state) |

---

## 1. Engine Capabilities (what you can build)

| Slide type | Desktop 16:9 | Mobile 9:16 | Voiced extras (besides slide narration) | Scored |
| :--- | :---: | :---: | :--- | :---: |
| `hero` (intro, 3 highlight cards) | ✅ | ✅ | click-to-read cards → `-card-N` | |
| `cards` (3–4 concept cards / analogies) | ✅ | ✅ (≤3) | click-to-read cards → `-card-N` | |
| `compare` (Așa NU vs Așa DA) | ✅ | ✅ stacked | | |
| `mockup` (simulated app UI + callouts) | ✅ | ❌ **never on mobile** | click-to-read callouts → `-card-N` | |
| `code` (highlighted, step-through lines) | ✅ | ✅ wraps | each step note → `-step-N` | |
| `quiz` (multiple choice, 1 correct) | ✅ | ✅ | explanation → `-explain` | ✅ |
| `input` (typed answer, lenient matching) | ✅ | ✅ | explanation → `-explain` | ✅ |
| `reveal` (tap-to-flip flashcards) | ✅ | ✅ | card backs → `-card-N` | |
| `mission` (hands-on challenge, anywhere) | ✅ | ✅ | click-to-read steps → `-step-N` | |
| `results` (first-try score + confetti) | ✅ | ✅ | | shows score |

Engine behaviours you get for free:
- **No auto-advance.** When narration ends, the Next button pulses (HUD on desktop, `›` on mobile).
- **Sound effects** (`sfx.js`, synthesized, no files): tap, flip, question, hint, wrong, correct, results. Disable per deck with `sfx: false`.
- **Code steps consume Next.** Next/→/tap advances the highlight first and leaves the slide after the last step. Prev steps back, and entering backwards lands on the last step.
- **Answer flow:** wrong → "try again" + shake → 2nd wrong shows the hint → 3rd wrong reveals the answer + voiced explanation. Next is never blocked.
- **Keyboard:** ←/→/PageUp/PageDown navigate, Space play/pause, R replay (re-runs animations), M mute, F fullscreen (desktop), 1–4 answer a quiz. Keys typed into an answer box never navigate.
- **Mobile Stories:** tap-to-start cover (unlocks audio), segmented progress bar, tap left third = back / rest = forward, swipe, no captions.
- Staggered entrance animations per layout, plus author classes `anim-slide-up|down|left|right|zoom|fade` + `delay-1..8`.

---

## 2. Core Rules

1. **Zero dependencies, offline `file:///`.** Vanilla HTML/CSS/JS only: no npm runtime packages, bundlers or CDNs. Slide data lives in `slides.js`, never fetched JSON.
2. **One format per deck.** `format: "desktop"` (default) or `"mobile"`. If both are wanted, build two decks (`<slug>` and `<slug>-mobile`) sharing the same content and audio.
3. **Shared engine.** Every deck loads `tutorials/_engine/` files. Never copy engine code into a course.
4. **1 MP3 per slide** at `audio/<slide-id>.mp3`, plus the extra clips in §1. `generate_audio.py` derives all of them from `slides.js`.
5. **Interactivity is optional and placed on purpose.** Ask the user (Step 0). Kids decks: roughly one interaction every 3–4 slides, ending with `results` if any `quiz`/`input` exist. Tech talks: `code` slides plus an occasional `quiz`. A `mission` can sit anywhere, not only last.
6. **Secret hub isolation.** Register decks in `tutorials/index.html`. **Never** link `tutorials/` from the root `index.html`, `school/` or `habits/`.

---

## 3. Workflow

### Step 0: Interview the user first
Before scaffolding, ask (question tool, 2–4 questions per round) about anything the request doesn't already answer. **Always cover:**
1. **Format + audience:** desktop 16:9 or mobile Stories 9:16, and who's watching (kid's age, family, devs, client).
2. **Language + voice:** RO or EN; brand names, acronyms or English loanwords that need phonetic `tts` spellings.
3. **Length + interactivity:** number of slides; whether to include quizzes, typed answers, flashcards, a mission, a final score, and roughly where.
4. **Look & brand:** default dark site theme, a different accent, light/corporate, or a brand guide/screenshots to match.

If the user wants a mobile deck with app-UI demos, explain that `mockup` is desktop-only and offer `code`, `cards` or a desktop deck instead.
Then summarise the brief in one short block (format, audience, language/voice, slide list with types, theme) and build.

### Step 1: Scaffold from a template
```bash
cp -r tutorials/_template/        tutorials/<slug>/   # desktop 16:9
cp -r tutorials/_template-mobile/ tutorials/<slug>/   # mobile Stories 9:16
rm -f tutorials/<slug>/audio/*.mp3                    # template clips don't belong to the new deck
```
Then edit `index.html`: `<title>`, `lang`. Keep the stylesheet/script order exactly:
- CSS: `../_engine/player.css` → (mobile only) `../_engine/stories.css` → `./theme.css`
- JS: `./slides.js` → `../_engine/sfx.js` → `../_engine/highlight.js` → `../_engine/player.js`
- Mobile viewport meta: `width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content`

### Step 2: Theme (`theme.css`)
| Desired look | Do |
| :--- | :--- |
| Dark site stage, different accent | Token-only override: `--theme-accent`, `--theme-accent-glow`, `--theme-badge` |
| Light / corporate / brand guide (desktop) | Copy `templates/theme-light.css`, edit its `BRAND TOKENS`; follow §5 |

Keep `slides.js` `theme` equal to the CSS tokens (or omit it): it is applied inline and wins.

### Step 3: Author `slides.js`
Set `format`, `lang`, `sfx`, then the slides. See [`references/slide-types.md`](references/slide-types.md) for every type, and [`references/interactive.md`](references/interactive.md) / [`references/mobile-stories.md`](references/mobile-stories.md) when relevant.

### Step 4: Generate voice-over
```bash
# Romanian: ALWAYS Edge-TTS (Kokoro has no Romanian phonetics and outputs gibberish)
python tutorials/_engine/generate_audio.py --course <slug> --engine edge --voice ro-RO-EmilNeural
# English: local Kokoro-82M
python tutorials/_engine/generate_audio.py --course <slug> --engine kokoro --voice am_michael
```
Existing non-empty files are skipped. After editing slides, regenerate only those: `--only slide-05,slide-07 --force`.
For a `<slug>-mobile` twin with identical narration, copy `audio/*.mp3` instead of synthesizing twice.

### Step 5: Register in the hub
Add a card inside `.courses-grid` in `tutorials/index.html` (newest first):
```html
<a href="./<slug>/index.html" class="course-card" style="--card-accent: #ff7a3d; --card-glow: rgba(255, 122, 61, 0.32);">
  <div class="course-card-top">
    <div class="course-icon-box" style="color: #ff7a3d;">🏷️</div>
    <div class="course-badges">
      <span class="course-badge mobile">📱 Mobil</span>          <!-- mobile decks only -->
      <span class="course-badge">11 Slide-uri</span>
      <span class="course-badge highlight">Interactiv</span>     <!-- or Voice-Over -->
    </div>
  </div>
  <h2 class="course-title">Course Title</h2>
  <p class="course-desc">One or two sentences on what the learner gets.</p>
  <div class="course-tags"><span class="course-tag">Topic</span> …</div>
  <div class="course-action" style="color: #ff7a3d;"><span>Începe Prezentarea (~6 min)</span><span class="course-action-arrow">→</span></div>
</a>
```

### Step 6: Validate (always)
```bash
node .agents/skills/presentation-creator/scripts/validate-course.mjs <slug>
```
Fix every `ERROR`. Fix `WARN`s unless there is a reason not to, and mention any you leave.

### Step 7: Visual QA
Run it for new decks, new slide types or layouts, theme work, and whenever the user reports visual problems:
```bash
S=.agents/skills/presentation-creator/scripts/screenshot-slides.mjs
node $S <slug>                       # desktop 1600×900
node $S <slug> --mobile              # real phone emulation 390×844 @2x
node $S <slug> --state answered      # quiz/input solved, code on last step, cards flipped
node $S <slug> --mobile --cover      # the tap-to-start cover
node $S <slug> --slides 3,5-7        # subset
```
PNGs go to `tutorials/<slug>/.screenshots/` (git-ignored). Look at every slide for clipping, overflow, contrast and empty space, and check the answered state of interactive slides.
Don't use plain `msedge --headless --screenshot` for phone sizes: headless windows can't go below ~484px wide and give misleading results.

### Editing an existing deck
- Change text → edit `slides.js` → `generate_audio.py --only <ids> --force` → validate.
- Adding/removing slides: ids are `slide-XX` and audio names derive from ids. When renumbering, rename the matching `audio/slide-XX*.mp3` files too (or regenerate with `--force`), then validate.

---

## 4. Voice-Over & Pedagogy

1. **Engines (strict):** Romanian → Edge-TTS `ro-RO-EmilNeural`, **never Kokoro**. English → Kokoro `am_michael`.
2. **Setup:** new machines run `tutorials/_engine/setup_voices.bat` (installs `kokoro-onnx`, `soundfile`, `edge-tts`, downloads weights to `tutorials/_engine/models/`, which is git-ignored).
3. **Tone:** enthusiastic, warm mentor; relatable analogies (*The Chef vs The Recipe*, *tags are boxes*). Kids: short sentences, "tu", a challenge feel.
4. **Narration length:** 30–55 words for content slides (~15–25 s); 15–45 for `quiz`/`input`/`reveal` (the learner should act, not listen).
5. **Prosody:** commas, exclamation marks and ellipses for pauses; always Romanian diacritics (`ă â î ș ț`).
6. **Phonetic overrides:** `narration` is the slide text; `narrationTts` (slide), `tts` (cards, steps, flashcards, code steps) and `explanationTts` (quiz/input) are what the TTS reads. Use them for brands, acronyms, English words and **code** (TTS reads `<h1>` badly → `"h unu"`).
   Common fixes: `Agricover → Agri Covăr`, `AgriFinance → Agri Fainans`, `AgriBusiness → Agri Biznis`, `APIA → apia`, `IFN → I F N`, `NDVI → N D V I`, `Crop360 → Crop trei sute șaizeci`, `HTML → H T M L`, `YouTube → Iutub`, `href → h ref`, `</a> → bară a`.

---

## 5. Theming (desktop decks)

`theme.css` loads after the engine CSS, so matching the engine's selector is enough. No `!important`, except `.interactive-card.is-speaking`.

1. **Only use selectors the engine renders** ([`references/engine-dom.md`](references/engine-dom.md)). Invented names (`.stage`, `.slide-category`, `.hud-btn`) fail silently.
2. **Tokens are half the theme.** About 25 declarations hardcode white text and dark surfaces (`engine-dom.md` §5). A light theme must override all of them; `templates/theme-light.css` does. The interactive/code types use tokens (`--bg-card`, `--text-main`, `--answer-wrong`, `--answer-hint`, `--code-*`), and code panels stay dark on purpose.
3. **Never touch geometry:** `--stage-scale`, the 1600×900 stage, and the ≥110px bottom padding that clears the HUD.
4. **Contrast per surface:** pick each text color for the background it actually sits on. Bright brand accents are for titles, icons and bars, not body text on white.
5. **No external fonts/CDNs:** brand font first in `--font-family`, then `"Segoe UI", Arial, sans-serif`.
6. **Brand template → theme:** extract the tokens (dark primary, title color, 1–3 accents, grays, font, radius, motif). Map the template's slides to engine layouts (cover → `hero`, pillars → `cards`, insight panel → `compare`/`mission-goal-bar`, screenshots → `mockup`). Put logos/art in `tutorials/<slug>/assets/` (SVG) and reference them via `url("./assets/…")`. Say so when a logo is a placeholder.
7. **Icons & custom markup:** `icon` fields and `mockupHtml` are raw HTML, so prefer inline SVG (`stroke="currentColor"`) for corporate decks. Style mockups with course-prefixed classes (`.c360-*`, `.word-*`) in the course's `theme.css`. `slides.js` may use an IIFE for icon/mockup constants (`generate_audio.py` evaluates it with Node).

Layout pitfalls seen in practice:
| Symptom | Fix |
| :--- | :--- |
| Huge mostly-empty cards/columns | `align-items: center` on `.slide-body` + `min-height` on cards; `.mission-steps { flex: 0 0 auto }` |
| Dark halo behind a light slide | `.deck-viewport { background-image: none }`, plain `.deck-stage` background |
| Thin accent line atop every slide | `.deck-stage::before { display: none }` |
| 🎯 ✕ ✓ glyphs clash with the brand | hide `.mission-goal-icon`; restyle `.point-icon` |
| Logo overlaps the title | `.slide-header { max-width: ~1150px }` |

---

## 6. Done Checklist

- [ ] Step 0 interview done; brief summarised to the user.
- [ ] `validate-course.mjs <slug>` passes with 0 errors (remaining warnings explained).
- [ ] Screenshots reviewed in the deck's format, including `--state answered` for interactive decks.
- [ ] `tutorials/index.html` has the card (with `📱 Mobil` badge for mobile decks).
- [ ] Root `index.html` untouched (no public link to `tutorials/`).
