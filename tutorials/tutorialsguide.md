# Tutorials & Presentations Engine: Feature Brief & Implementation Guide

> **Project:** virusescu.github.io  
> **Module:** `tutorials/`  
> **Status:** Architecture & Feature Brief Approved  
> **Target Audience for First Course:** Family (Wife & 12-year-old child)  
> **Author:** virusescu  

---

## 1. Executive Summary & Scope

The goal of this module is to create a lightweight, high-performance, **data-driven presentation and tutorial system** hosted directly within [virusescu.github.io](file:///d:/Work/virusescu.github.io). The system allows presenting complex or introductory tech topics in an engaging, full-screen, audiovisual format.

### Key Tenets
1. **Zero Bloat, Pure Web Fundamentals:** Built with Vanilla HTML5, CSS3, and JavaScript. No external runtime frameworks, no heavy NPM dependencies, no build steps.
2. **Data-Driven Slide Architecture:** Slide content, layout types, animations, and voice narration texts are defined cleanly in a structured data file (`slides.js`), easily readable and writable by humans and AI models.
3. **Local GPU-Accelerated Voice-Over (TTS):** Audio narration is synthesized offline in Romanian using an NVIDIA GeForce RTX 5080 GPU via a Python script, outputting static `.mp3` files (1 file per slide).
4. **Site Aesthetic Alignment with Custom Theming:** Preserves the dark EA FC-inspired aesthetic (`#0a0d14`, glowing neon green/cyan, glassmorphic cards) while providing CSS custom properties (`--theme-accent`, etc.) to theme individual tutorials (e.g., Microsoft Word Blue `#185abd`).
5. **Private / Unlinked Hub:** The `tutorials/` section is an isolated, unlinked sub-module on the site (accessible only to those who possess the direct URL).
6. **Reusable AI Skill:** An Antigravity Skill (`.agents/skills/presentation-creator/SKILL.md`) will be placed in the repository root so any AI assistant can scaffold and generate new presentations following identical standards.

---

## 2. Directory & File Structure

```text
virusescu.github.io/
├── .agents/
│   └── skills/
│       └── presentation-creator/
│           └── SKILL.md                 # Antigravity skill for autonomous AI course creation
├── tutorials/
│   ├── tutorialsguide.md                # This comprehensive architecture and feature brief
│   ├── index.html                       # Secret landing hub listing all available courses
│   ├── _engine/                         # Shared runtime presentation engine
│   │   ├── player.js                    # Presentation player, navigation, audio sync & scale engine
│   │   ├── player.css                   # Responsive layout, glassmorphic controls, neon animations
│   │   ├── generate_audio.py            # Local TTS generator (PyTorch CUDA RTX 5080 / XTTS / Edge-TTS)
│   │   └── requirements.txt             # Python dependencies for offline TTS generation
│   ├── _template/                       # Starter blueprint for generating new courses
│   │   ├── index.html                   # Lightweight slide deck container
│   │   ├── slides.js                    # 2-3 sample slides demonstrating card, compare, and mission types
│   │   ├── theme.css                    # Theme configuration and custom styling overrides
│   │   └── audio/                       # Directory containing per-slide static MP3s
│   │       ├── slide-01.mp3
│   │       ├── slide-02.mp3
│   │       └── slide-03.mp3
│   └── word-crash-course/               # First production tutorial (Word Crash Course)
│       ├── index.html                   # Word tutorial player entrypoint
│       ├── slides.js                    # Complete 8-slide data definition & narration texts
│       ├── theme.css                    # Word blue accents + custom Word UI mockups
│       └── audio/                       # Generated Romanian voice-over files
│           ├── slide-01.mp3
│           ├── ...
│           └── slide-08.mp3
```

---

## 3. Presentation Engine Architecture (`_engine/`)

### 3.1 Data Format: `slides.js` vs `slides.json`
To allow opening tutorials directly in local development via `file:///` without triggering browser CORS restrictions associated with local `fetch('slides.json')`, slides are defined via a global variable in `slides.js`:

```javascript
window.PRESENTATION_DATA = {
  id: "word-crash-course",
  title: "Crash Course: Microsoft Word",
  subtitle: "De ce Word, secretele stilurilor și cuprinsul automat",
  theme: {
    accent: "#185abd",
    accentGlow: "rgba(24, 90, 189, 0.35)",
    badgeColor: "#00ff85"
  },
  slides: [
    {
      id: "slide-01",
      type: "hero", // hero | cards | compare | mission | custom
      title: "Superputerile unui Document",
      subtitle: "De ce folosim Word și nu Notepad?",
      audio: "audio/slide-01.mp3",
      narration: "Salutare! Te-ai întrebat vreodată de ce toată lumea vorbește despre Microsoft Word...",
      content: { ... }
    }
  ]
};
```

### 3.2 Viewport & Scaling Engine
- **Aspect Ratio:** Fixed 16:9 virtual canvas (`1280px × 720px` or `1920px × 1080px`).
- **Responsive Fit:** `player.js` calculates `transform: scale(min(widthRatio, heightRatio))` dynamically on window resize. The slide is centered perfectly with zero scrollbars, regardless of screen resolution or orientation.
- **Fullscreen API:** Toggleable via keyboard shortcut (`F` or `F11`) and an on-screen fullscreen icon.

### 3.3 Audio Player & Sincronizare Narativă
- **1 MP3 per Slide:** Clean separation. When a slide is navigated to, the player loads and plays `audio/<slide-id>.mp3`.
- **Playback Controls:**
  - Progress bar at the top or bottom of the slide canvas indicating audio elapsed/total time.
  - Play / Pause / Replay toggle buttons in the bottom control HUD.
  - Mute / Unmute (`M`).
- **Pulsing Next Button (Manual Advance):**
  - Audio ends $\rightarrow$ event `ended` triggers on `<audio>`.
  - The `Next` navigation button (`→`) receives a subtle neon breathing glow (`box-shadow` keyframe), inviting the user to move forward whenever they are ready.
  - The user can also advance early or replay the slide at any point.

### 3.4 Keyboard & Touch Shortcuts
- `Right Arrow` / `PageDown`: Next slide
- `Left Arrow` / `PageUp`: Previous slide
- `Space`: Play / Pause audio narration
- `R`: Replay current slide audio
- `F`: Toggle Fullscreen mode
- `M`: Mute / Unmute audio
- `Esc`: Exit Fullscreen

---

## 4. Local Voice-Over & Audio Pipeline (`generate_audio.py`)

### 4.1 Hardware & Environment Target
- **GPU:** NVIDIA GeForce RTX 5080 (16GB VRAM, Blackwell architecture).
- **CUDA:** PyTorch with CUDA enabled (`torch.cuda.is_available() == True`).
- **Language & Persona:** Romanian (`ro`), clear, dynamic male mentor voice (confident, enthusiastic, patient for a 12-year-old learner).

### 4.2 Script Architecture & Fallbacks
The Python script `tutorials/_engine/generate_audio.py` can be invoked from the CLI for any course:

```bash
# Generate audio for all missing slides in the Word tutorial
python tutorials/_engine/generate_audio.py --course word-crash-course

# Force regenerate all audio files using Edge-TTS Romanian neural voice
python tutorials/_engine/generate_audio.py --course word-crash-course --engine edge --force

# Run high-end local voice cloning via XTTS-v2 on RTX 5080
python tutorials/_engine/generate_audio.py --course word-crash-course --engine xtts --ref-audio sample.wav
```

#### Engines Supported:
1. **Local XTTS-v2 (Coqui / Torch CUDA):** 
   - State-of-the-art multilingual neural voice with voice cloning and emotional intonation.
   - Leverages RTX 5080 compute for sub-second generation.
2. **Microsoft Edge Neural Voice (`edge-tts`):**
   - Built-in zero-setup pipeline using `ro-RO-EmilNeural` (male dynamic mentor) or `ro-RO-AlinaNeural` (female friendly teacher).
   - High quality, natural prosody, handles diacritics and technical punctuation cleanly.
3. **Manual Drop-In Support:**
   - The user or external tool (e.g. ElevenLabs) can directly place `slide-XX.mp3` files in the course's `audio/` directory.

---

## 5. First Course Syllabus: Microsoft Word Crash Course

**Course Directory:** `tutorials/word-crash-course/`  
**Target Learners:** Wife & 12-year-old child  
**Pedagogy:** Engaging, no tedious jargon, vivid visual comparisons, relatable analogies (e.g. Cooking recipes, LEGO bricks). Pure presentation without in-slide test interruptions; followed by a real hands-on mission inside Microsoft Word.

| Slide # | Slide ID | Title & Visual Theme | Key Concepts & Metaphor |
| :--- | :--- | :--- | :--- |
| **01** | `intro` | **Superputerile unui Document** | *WhatsApp vs Word.* De ce nu scriem un referat sau o carte pe WhatsApp/Notepad? Word este atelierul de tipografie digitală care controlează structura, fonturile și paginația. |
| **02** | `app-vs-file` | **Aplicația vs Fișierul `.docx`** | *Bucătarul vs Rețeta.* Word este bucătarul (programul). Fișierul `.docx` este caietul cu rețete. Poți deschide rețeta și în Word pe Windows, și pe telefon, și în Google Docs sau LibreOffice. |
| **03** | `fonts` | **Ce este un Font? Haina Literelor** | *Personalitatea literelor.* Un font este stilul în care sunt desenate caracterele. Evităm fonturile greu de citit pentru școală/serviciu; alegem fonturi moderne și lizibile (Aptos, Calibri, Arial). |
| **04** | `manual-trap` | **Capcana Colorării Manuale** | *De ce să NU selectezi textul pentru a-l face 'Titlu' manual.* Dacă schimbi fontul, culoarea sau mărimea de mână, pentru Word textul e doar vopsit, nu știe că e un capitol! Dacă ai 20 de capitole, pierzi o oră să le modifici. |
| **05** | `styles` | **Magia Stilurilor (Heading 1 & 2)** | *Etichete inteligente.* Îi spunem lui Word: *"Acesta este Titlu 1"*. Dacă modifici stilul Titlu 1, toate cele 20 de capitole se schimbă instantaneu, la o singură apăsare de buton! |
| **06** | `toc` | **Superputerea Supremă: Cuprinsul Automat** | *Generare în 3 secunde.* Pentru că am folosit Stiluri, mergem la *References -> Table of Contents*. Word știe exact unde e fiecare capitol și pagina lui. Adaugi text nou? Apeși *Update Table* și gata! |
| **07** | `tabs-lists` | **Păcatul Tastei Space & Liste Inteligente** | *Space x 10 vs Tasta Tab.* De ce nu aliniem cu tasta Space (se decalează pe alte ecrane). Folosirea tastei Tab și a listelor automate cu buline sau numere care știu să indenteze singure textul. |
| **08** | `mission` | **Misiunea Ta Practică în Microsoft Word** | *Testul real în Word!* Închide prezentarea, deschide Microsoft Word pe ecran și parcurge provocarea de 5 minute: scrie 3 titluri, aplică-le `Heading 1` și inserează un cuprins automat. |

---

## 6. Antigravity Skill Specification

**Location:** `.agents/skills/presentation-creator/SKILL.md`

### Skill Contents & Directives
The skill instructs AI agents on how to autonomously construct and update tutorial decks:
1. **Trigger Context:** When asked to "creează o prezentare", "adaugă un tutorial", or "generează un curs nou".
2. **Directory Rules:** Must scaffold inside `tutorials/<slug>/`, creating `index.html`, `slides.js`, `theme.css`, and `audio/`.
3. **Slide Type Taxonomy:**
   - `hero`: Title, subtitle, high-impact introductory cards.
   - `compare`: Two-column comparison ("Așa NU" vs "Așa DA").
   - `cards`: 3-4 feature cards with icons and key bullet points.
   - `code-or-mockup`: Visual simulated UI (Word ribbon, document page preview).
   - `mission`: Final actionable real-world checklist.
4. **Narration Rules:** Romanian narration must be concise (30-50 words per slide), conversational, upbeat, using natural punctuation and pauses for the TTS model.
5. **Post-Scaffold Action:** Run `python tutorials/_engine/generate_audio.py --course <slug>` to synthesize missing audio files.
6. **Hub Update:** Append the newly created course to `tutorials/index.html`.

---

## 7. Implementation Roadmap

- [ ] **Phase 1: Shared Engine & Styles**
  - Implement `tutorials/_engine/player.css` (glassmorphic theme, responsive 16:9 canvas, neon glowing elements).
  - Implement `tutorials/_engine/player.js` (slide state management, audio controller, keyboard shortcuts, fullscreen).
  - Implement `tutorials/_engine/generate_audio.py` (CLI for RTX 5080 CUDA TTS + Edge-TTS fallback).
- [ ] **Phase 2: Antigravity Skill**
  - Create `.agents/skills/presentation-creator/SKILL.md` with complete agent operational guidelines.
- [ ] **Phase 3: Reusable Template (`tutorials/_template/`)**
  - Create minimal 3-slide template demonstrating `hero`, `compare`, and `mission` layouts.
- [ ] **Phase 4: Word Crash Course (`tutorials/word-crash-course/`)**
  - Author complete `slides.js` with all 8 slides and detailed narration scripts.
  - Implement `theme.css` with Word ribbon and document mockups.
  - Synthesize Romanian narration `.mp3` files.
- [ ] **Phase 5: Secret Tutorials Hub (`tutorials/index.html`)**
  - Build private directory page with glassmorphic cards linking to available courses.
