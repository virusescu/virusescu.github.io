---
name: presentation-creator
description: >-
  Scaffold, author, and synthesize voice-over audio for interactive HTML5/CSS3/JS
  presentations and tutorials inside the `tutorials/` module of virusescu.github.io.
  Use this skill whenever the user asks to create a presentation, add a tutorial,
  build a course deck, or update slides/voice-overs ("creează o prezentare",
  "adaugă un tutorial", "generează un curs nou").
---

# Presentation Creator Skill (`tutorials/`)

This skill defines the exact architecture, data schema, visual rules, and local TTS audio pipeline for building presentations inside `tutorials/`.

**Skill resources:**
| File | Use it when |
| :--- | :--- |
| [`references/engine-dom.md`](references/engine-dom.md) | Before writing **any** CSS: the real DOM/class map, tokens, and the engine's hardcoded dark-mode values |
| [`templates/theme-light.css`](templates/theme-light.css) | Starting point for light, corporate or brand-guideline themes (copy it to `tutorials/<slug>/theme.css`) |
| [`scripts/screenshot-slides.ps1`](scripts/screenshot-slides.ps1) | Optional: renders every slide to PNG for visual inspection when requested or when diagnosing layout issues |

---

## 1. Core Architectural Rules

1. **Zero Dependencies:** Use pure Vanilla HTML5, CSS3, and ES6+ JavaScript. Never introduce NPM runtime packages, bundlers, or external CSS/JS CDNs.
2. **Offline `file:///` Compatibility:** Slide data is defined on `window.PRESENTATION_DATA` inside `slides.js` (never fetched via `fetch('slides.json')`, which fails under `file:///` CORS).
3. **Shared Engine:** All courses mount the shared runtime from `tutorials/_engine/player.css` and `tutorials/_engine/player.js`.
4. **1 MP3 Per Slide:** Every slide references `audio/slide-XX.mp3`. When audio finishes (`ended` event), the player does **not** auto-advance; it triggers a neon pulse on the `Next` button (`→`) for manual learner control.
5. **No In-Slide Quizzes:** Keep presentations visual, story-driven, and analogy-rich. Place a practical real-world challenge on the final `mission` slide.
6. **Secret Hub Isolation:** Register new courses in `tutorials/index.html`, but **never** link `tutorials/` from the root `index.html`, `school/`, or `habits/`.
7. **Click-to-Read Interactive Main Cards:** Primary card components (`.hero-card`, `.concept-card`, `.callout-card`, `.mission-step-card`) play matching pre-rendered `.mp3` clips using the identical narration voice when clicked. Clicking an active card pauses it; switching slides stops playback.
8. **Staggered Keynote Entrance Animations:** Child elements animate automatically into place when `.slide.active` is applied, with spring curves and staggered delays (cards sliding up from lower, split tiles zooming from center, list points fading in). Pressing `R` or Replay resets and re-triggers animations synchronously with audio.

---

## 2. Step-by-Step Course Creation Workflow

When asked to create a new course `<slug>` (kebab-case, e.g., `word-crash-course`):

### Step 1: Scaffold Course Directory
Create `tutorials/<slug>/` with the following structure:
```text
tutorials/<slug>/
├── index.html          # Course player shell
├── theme.css           # Course theme variables & custom mockup styles
├── slides.js           # window.PRESENTATION_DATA definition
└── audio/              # Per-slide MP3 voice-over files
    ├── slide-01.mp3
    └── ...
```

### Step 2: Create `tutorials/<slug>/index.html`
Maintain the exact stylesheet and script load order:
```html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Course Title | virusescu Tutorials</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><polygon points='20,36 4,8 36,8' fill='%2300ff85'/></svg>">
  <link rel="stylesheet" href="../_engine/player.css">
  <link rel="stylesheet" href="./theme.css">
</head>
<body>
  <div id="deck-viewport" class="deck-viewport"></div>
  <script src="./slides.js"></script>
  <script src="../_engine/player.js"></script>
</body>
</html>
```

### Step 3: Create `tutorials/<slug>/theme.css`
Pick the starting point that matches the requested look, then follow **Section 6 (Theming)**:

| Desired look | Start from |
| :--- | :--- |
| Dark stage (site default), just a different accent color | Token-only override (below). Nothing else needed. |
| Light / white / corporate / brand-guideline deck | Copy [`templates/theme-light.css`](templates/theme-light.css) and edit its `BRAND TOKENS` block. |

Token-only override for dark decks:
```css
:root {
  --theme-accent: #185abd;
  --theme-accent-glow: rgba(24, 90, 189, 0.35);
  --theme-badge: #00ff85;
}
```

> [!IMPORTANT]
> Changing tokens alone **cannot** produce a light theme. The engine hardcodes white text and dark surfaces in about 25 places.
> Read [`references/engine-dom.md`](references/engine-dom.md) before writing any non-token override.

### Step 4: Author `tutorials/<slug>/slides.js`
Populate `window.PRESENTATION_DATA` using the schema and slide type taxonomy in **Section 3**.

### Step 5: Generate Voice-Over Audio
Run the audio generator from the repository root:

* **For Romanian (`ro`):** ALWAYS use Edge-TTS with `ro-RO-EmilNeural` (Kokoro does NOT support Romanian phonetics and outputs unintelligible phonemes):
  ```bash
  python tutorials/_engine/generate_audio.py --course <slug> --engine edge --voice ro-RO-EmilNeural
  ```
* **For English (`en`):** Use local **Kokoro-82M** with voice `am_michael` (100% offline, studio cadence):
  ```bash
  python tutorials/_engine/generate_audio.py --course <slug> --engine kokoro --voice am_michael
  ```
- Verify that every slide's `audio/slide-XX.mp3` exists and is non-empty.

### Step 6: Register Course in `tutorials/index.html`
Add a glassmorphic course card inside the `.courses-grid` container in `tutorials/index.html` with title, subtitle, slide count badge, estimated duration, and link to `./<slug>/index.html`.

### Step 7: Visual QA (Optional / On-Demand)
*Only execute this step if the user requests visual evaluation or complains about the layout/styling*:
```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/presentation-creator/scripts/screenshot-slides.ps1 -Course <slug>
```
PNGs are saved to `tutorials/<slug>/.screenshots/`. Inspect each slide for contrast, alignment, and spacing against the design tokens, and fix any styling issues.

---

## 3. `slides.js` Schema & Slide Type Taxonomy

```javascript
window.PRESENTATION_DATA = {
  id: "course-slug",
  title: "Course Main Title",
  subtitle: "Short engaging subtitle",
  theme: {
    accent: "#185abd",
    accentGlow: "rgba(24, 90, 189, 0.35)",
    badgeColor: "#00ff85"
  },
  slides: [
    // Array of slide objects (see 5 layout types below)
  ]
};
```

### Supported Slide Types (`slide.type`)

#### 1. `hero` — High-Impact Introduction
Used for Slide 01 or major section openers.
```javascript
{
  id: "slide-01",
  type: "hero",
  badge: "MODULUL 1 • INTRODUCERE",
  title: "Superputerile unui Document",
  subtitle: "De ce folosim Word și nu WhatsApp sau Notepad?",
  audio: "audio/slide-01.mp3",
  narration: "Salutare! Te-ai întrebat vreodată de ce scriem referate sau proiecte în Microsoft Word, și nu direct pe WhatsApp? Hai să descoperim împreună!",
  content: {
    highlights: [
      { icon: "⚡", title: "Control Total", text: "Aranjezi titluri, pagini și fonturi exact cum vrei." },
      { icon: "📄", title: "Gata de Print", text: "Fiecare pagină arată impecabil pe orice ecran sau imprimantă." },
      { icon: "🪄", title: "Automatizare", text: "Cuprinsul și numerotarea se fac singure în 3 secunde." }
    ]
  }
}
```

#### 2. `compare` — Two-Column "Așa NU vs Așa DA"
Used to contrast a common mistake against the smart workflow.
```javascript
{
  id: "slide-04",
  type: "compare",
  badge: "REGULA DE AUR",
  title: "Capcana Colorării Manuale",
  subtitle: "De ce nu vopsim titlurile de mână?",
  audio: "audio/slide-04.mp3",
  narration: "Mulți fac greșeala să selecteze textul, să-l mărească și să-l coloreze manual. Dar pentru Word, acela rămâne un simplu text vopsit!",
  content: {
    left: {
      tag: "❌ AȘA NU • Formatare Manuală",
      title: "Text doar „vopsit”",
      points: [
        "Selectezi textul, pui mărimea 20 și culoarea albastră.",
        "Word NU știe că acela este un capitol real.",
        "Dacă ai 20 de capitole, pierzi o oră să le modifici pe toate."
      ]
    },
    right: {
      tag: "✅ AȘA DA • Stiluri Inteligente",
      title: "Eticheta Heading 1",
      points: [
        "Apeși un singur buton: Heading 1 (Titlu 1).",
        "Word înțelege structura documentului tău.",
        "Schimbi stilul o dată și toate cele 20 de capitole se actualizează instant!"
      ]
    }
  }
}
```

#### 3. `cards` — 3 to 4 Concept Cards with Analogies
Used to explain mental models (e.g., Chef vs Recipe, App vs File Format).
```javascript
{
  id: "slide-02",
  type: "cards",
  badge: "CONCEPT CHEIE",
  title: "Aplicația vs Fișierul .docx",
  subtitle: "Bucătarul și Caietul cu Rețete",
  audio: "audio/slide-02.mp3",
  narration: "Gândește-te la Microsoft Word ca la un bucătar priceput, iar la fișierul punct docx ca la caietul cu rețete...",
  content: {
    cards: [
      { icon: "👨‍🍳", tag: "PROGRAMUL", title: "Microsoft Word (Bucătarul)", text: "Este aplicația instalată pe calculator care știe să gătească și să aranjeze textul." },
      { icon: "📓", tag: "FIȘIERUL", title: "Documentul .docx (Rețeta)", text: "Este fișierul salvat de tine, pe care îl poți trimite pe email sau deschide oriunde." },
      { icon: "🌍", tag: "COMPATIBILITATE", title: "Liber pe orice dispozitiv", text: "Aceeași rețetă .docx poate fi deschisă și în Google Docs, LibreOffice sau pe telefon." }
    ]
  }
}
```

#### 4. `mockup` — Simulated App UI + Visual Callouts
Used to demonstrate real application interfaces (e.g., Word Ribbon, A4 page preview, TOC generator).
```javascript
{
  id: "slide-05",
  type: "mockup",
  badge: "SECRETELE WORD",
  title: "Magia Stilurilor: Heading 1 & 2",
  subtitle: "Etichete inteligente pentru capitole și subcapitole",
  audio: "audio/slide-05.mp3",
  narration: "Sus în panglica Home găsești caseta Styles. Când apeși pe Heading 1, îi pui textului o etichetă inteligentă de capitol principal!",
  content: {
    callouts: [
      { step: "1", title: "Selectează rândul titlului", text: "Pune cursorul pe titlul capitolului tău." },
      { step: "2", title: "Apasă pe Heading 1", text: "Din meniul Home → galeria Styles." },
      { step: "3", title: "Folosește Heading 2", text: "Pentru subcapitolele din interiorul capitolului." }
    ],
    mockupHtml: `<div class="word-window">...</div>`
  }
}
```

#### 5. `mission` — Final Real-World Practical Challenge
Used as the final slide of a course. Never put quizzes inside the presentation; give a concrete 5-minute hands-on mission in the real software.
```javascript
{
  id: "slide-08",
  type: "mission",
  badge: "MISIUNEA TA PRACTICĂ • 5 MINUTE",
  title: "Testează Superputerile în Word!",
  subtitle: "Deschide Microsoft Word și parcurge cei 3 pași de mai jos",
  audio: "audio/slide-08.mp3",
  narration: "Acum e rândul tău! Deschide Microsoft Word și hai să facem împreună un document cu cuprins automat în mai puțin de cinci minute!",
  content: {
    goal: "Creează o mini-poveste sau o listă cu 3 jocuri/rețete preferate și generează cuprinsul automat.",
    steps: [
      { number: "01", title: "Scrie 3 Titluri de Capitole", text: "Deschide un document gol în Word și scrie 3 titluri pe rânduri diferite, cu câte o propoziție sub fiecare." },
      { number: "02", title: "Aplică Stilul Heading 1", text: "Selectează fiecare titlu și apasă pe butonul Heading 1 (Titlu 1) din bara Home." },
      { number: "03", title: "Generează Cuprinsul Magic", text: "Mergi la primul rând, intră în meniul References → Table of Contents și alege primul model!" }
    ],
    reward: "🏆 Misiune îndeplinită! Acum știi secretul pe care 90% dintre utilizatori îl descoperă abia la facultate."
  }
}
```

---

## 4. Voice-Over Strategy & Pedagogy Guidelines

1. **Target Language Engine Selection (Strict Rule):**
   - **Romanian (`ro`):** **MANDATORY**: Always synthesize via Edge-TTS using `ro-RO-EmilNeural` (`--engine edge --voice ro-RO-EmilNeural`). **NEVER use Kokoro for Romanian text**, as Kokoro lacks Romanian G2P (grapheme-to-phoneme) models and outputs garbled gibberish ("Sims language").
   - **English (`en`):** Default to local **Kokoro-82M** with voice `am_michael` (`--engine kokoro --voice am_michael`) for 100% offline studio-grade narration.
2. **Setup Script & Local Weights:**
   - New environments run `tutorials/_engine/setup_voices.bat` to install `kokoro-onnx`, `soundfile`, `edge-tts`, and download weights into `tutorials/_engine/models/`.
   - Downloaded models (`*.onnx`, `*.bin`) are strictly excluded from git tracking via `.gitignore`.
3. **Voice & Tone:** Enthusiastic, clear, warm mentor addressing family/learners (including a 12-year-old). Use relatable analogies (*The Chef vs The Recipe*, *Clothes of Letters*, *Smart Labels*).
4. **Length per Slide:** Keep `narration` between **30 and 55 words** (~15–25 seconds of spoken audio).
5. **TTS Prosody & Phonetic Respelling:**
   - Use commas, exclamation marks, and ellipses (`...`) to create natural breathing pauses.
   - When writing Romanian, always use proper diacritics (`ă, â, î, ș, ț`).
   - **Phonetic overrides for brand names and acronyms:**
     TTS engines often butcher brand names, English loanwords, or Romanian acronyms (e.g. pronouncing *Agricover* as "agri-co-ver" instead of "Agri Covăr", *APIA* as individual letters, or *Crop360* as English words).
     Use optional `narrationTts` on slides and `tts` on card items:
     - `narration`: Displayed visually to the user on the slide.
     - `narrationTts`: Read exclusively by the TTS engine (e.g. `"Bine ați venit la Agri Covăr!"`).
     - `tts`: Read by the TTS engine for cards/callouts/steps (e.g. `tts: "Distribuție Agri Biznis..."`).
     Common phonetic fakes:
     - `Agricover` → `Agri Covăr`
     - `AgriFinance` → `Agri Fainans`
     - `AgriBusiness` → `Agri Biznis`
     - `Technology` → `Tehnologii`
     - `APIA` → `apia` (reads as a single word instead of spelling A-P-I-A)
     - `IFN` → `I F N` (spaces ensure each letter is pronounced distinctly)
     - `NDVI` → `N D V I`
     - `Crop360` → `Crop trei sute șaizeci`

---

## 5. Staggered Animation System & Author Guidelines

The shared engine (`tutorials/_engine/player.css`) provides a built-in entrance animation system powered by CSS keyframes and spring timing curves (`cubic-bezier(0.175, 0.885, 0.32, 1.15)`):

### 1. Automatic Timing by Layout Archetype
Whenever a slide receives `.active`, the engine automatically sequences child elements:
- **`hero`**: Category badge pops first (`0.04s`), title slides in from left (`0.12s`), subtitle fades up (`0.22s`), and the 3 hero cards slide up from lower position one by one (`0.24s`, `0.38s`, `0.52s`).
- **`compare`**: The two large split columns zoom in from the center with a delayed spring pop (Wrong column at `0.22s`, Right column at `0.40s`). Comparison list points then slide up one by one (`0.48s`, `0.62s`, `0.76s`, `0.90s`).
- **`cards`**: Concept cards zoom into place staggered (`0.22s`, `0.38s`, `0.54s`, `0.70s`).
- **`mockup`**: Left action callouts slide in from the left sequentially (`0.22s`, `0.38s`, `0.54s`), while the right application chrome / document preview zooms in from the right (`0.32s`).
- **`mission`**: Goal banner slides down (`0.18s`), the 3 action steps spring up one by one (`0.30s`, `0.46s`, `0.62s`), and the reward banner fades in last (`0.80s`).

### 2. Manual Utility Classes for Custom Slides
When building custom slide content, authors can apply these utility classes directly:
```html
<!-- Entrance styles -->
<div class="anim-slide-up delay-2">Slides from 70px lower</div>
<div class="anim-slide-left delay-3">Slides in from left</div>
<div class="anim-slide-right delay-4">Slides in from right</div>
<div class="anim-zoom delay-1">Zooms in from center with spring</div>
<div class="anim-fade delay-5">Gentle opacity fade</div>

<!-- Timing delays -->
.delay-1 /* 0.1s */  .delay-2 /* 0.2s */  .delay-3 /* 0.3s */  .delay-4 /* 0.4s */
.delay-5 /* 0.5s */  .delay-6 /* 0.6s */  .delay-7 /* 0.7s */  .delay-8 /* 0.8s */
```

### 3. Replay Synchronization
When a user presses `R` or clicks the HUD replay button, `player.js` forces a DOM reflow on the active slide, cleanly resetting and re-running all staggered animations synchronously with the audio narration.

---

## 6. Theming: Writing Correct `theme.css` Overrides

`theme.css` loads **after** `player.css`, so a selector with the same specificity wins without `!important`. The work is mostly about targeting the **right selectors** and overriding **every** hardcoded color.

### 6.1 Golden Rules
1. **Only use selectors the engine actually renders.** The full DOM/class map is in [`references/engine-dom.md`](references/engine-dom.md). Never guess names like `.stage`, `.slide-category`, `.concept-card-title`, `.hud-btn` or `.compare-col-title`: they don't exist and fail silently. The real names are `.deck-stage`, `.slide-badge`, `.concept-title`, `.btn-hud`, `.compare-title`.
2. **Tokens are only half the theme.** `--bg-card`, `--text-muted`, `--theme-accent` and the rest cover the shared surfaces. About 25 declarations hardcode `#ffffff` text, dark gradients and neon-green borders (listed in `engine-dom.md` §5). A light theme must override all of them, which [`templates/theme-light.css`](templates/theme-light.css) already does.
3. **`slides.js` `theme` overrides `theme.css`.** `applyThemeTokens()` writes `theme.accent / accentGlow / badgeColor` as inline styles on `<html>`. Keep these equal to the CSS values, or leave them out.
4. **Avoid `!important`.** Matching the engine's selector is enough. The one place it's needed is `.interactive-card.is-speaking`, because the engine itself uses `!important` there.
5. **Never touch geometry tokens**: `--stage-scale` and the 1600×900 `.deck-stage` size. Keep the slide's bottom padding at 110px or more so content clears the HUD.
6. **Contrast check per surface:** every text color must be chosen for the background it actually sits on. Light text on light cards was exactly the "barely readable" failure. Brand accents like neon green and bright orange are for titles, icons and bars, not for body text on white.
7. **No external fonts or CDNs.** Put the brand font first in `--font-family`, followed by local fallbacks (`"Segoe UI", Arial, sans-serif`).

### 6.2 Brand Template → Theme Workflow
When the user supplies a brand guide or template screenshots:
1. **Extract the tokens**: primary dark color, title color, 1–3 accent colors, gray surfaces, font, corner radius, and any signature motif (e.g. a tri-color strip).
2. **Map the template's slide types to engine layouts**: cover → `hero` (dark brand background, logo top-left), "three pillars" → `cards`, rules/insight panel → the dark side of `compare` or `mission-goal-bar`, app screenshots → `mockup`.
3. Copy `templates/theme-light.css` and fill in the `BRAND TOKENS`. Change the per-layout rules only where the template differs.
4. **Logo and art** go in `tutorials/<slug>/assets/` (SVG preferred) and are referenced from CSS as `url("./assets/…")`, which works under `file:///`. Use `.slide::after` for the logo, with a light variant on the dark `hero` slide. Tell the user when a logo is a placeholder.
5. Run **Step 7: Visual QA**, then iterate.

### 6.3 Icons & Custom Markup
- `icon` fields (hero/cards) and `mockupHtml` are injected as **raw HTML**, so prefer inline SVG line icons (`stroke="currentColor"`) over emojis for corporate decks. The icon circle's `color` then sets the stroke.
- `slides.js` may wrap its content in an IIFE to define icon or mockup constants (`(function(){ const ICONS = {...}; window.PRESENTATION_DATA = {...}; })();`). `generate_audio.py` reads the file through Node `eval`, so this works as long as Node is installed. Keep `narration` and card text as plain strings.
- Style `mockupHtml` with **course-prefixed classes** (e.g. `.c360-*`, `.word-*`) defined in that course's `theme.css`. Never use inline styles for a full mockup, and remember these classes are not part of the starter template.

### 6.4 Layout Pitfalls (seen in practice)
| Symptom | Cause | Fix |
| :--- | :--- | :--- |
| Huge, mostly empty cards or columns | `cards` / `compare` / `mission` stretch to fill the body | `align-items: center` on `.slide-body` + `min-height` on cards; `.mission-steps { flex: 0 0 auto }` |
| Dark halo behind a light slide | `.deck-viewport` background-image and `.deck-stage` radial gradient | Set `background-image: none` and give the stage a plain background |
| Thin accent line at the top of every slide | `.deck-stage::before` | `display: none`, or restyle it |
| 🎯 / ✕ / ✓ glyphs clash with the brand | Hardcoded engine glyphs | Hide `.mission-goal-icon`; restyle `.point-icon` as filled circles |
| Logo overlaps the title | Long title under a top-right logo | `.slide-header { max-width: ~1150px }` |

---

## 7. Validation Checklist Before Completing a Course

- [ ] `tutorials/<slug>/index.html`, `theme.css`, and `slides.js` exist and follow the schema.
- [ ] Every slide in `slides.js` has a corresponding `tutorials/<slug>/audio/slide-XX.mp3` file (> 5 KB).
- [ ] Every `theme.css` selector exists in `references/engine-dom.md` (or is a course-prefixed mockup class).
- [ ] `slides.js` `theme` values match the `theme.css` accent and badge tokens.
- [ ] If user reported styling or visual complaints, `scripts/screenshot-slides.ps1` was executed and screenshots reviewed.
- [ ] Opening `tutorials/<slug>/index.html` renders all slides at 16:9 without scrollbars.
- [ ] `tutorials/index.html` includes a card linking to `./<slug>/index.html`.
- [ ] Root `index.html` remains untouched (zero public links to `tutorials/`).
