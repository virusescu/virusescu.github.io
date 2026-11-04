# Presentation Engine v2 — Mobile Stories, Interactive & Code Slides

> **Source:** grill-me interview, 2026-11-04
> **Builds on:** [implementation_plan.md](../tutorials/implementation_plan.md) (v1 engine) and the `presentation-creator` skill
> **Constraints (unchanged):** vanilla HTML/CSS/JS, zero runtime deps, works under `file:///`, local TTS → static MP3s.
> **Status:** 📝 Draft, awaiting approval. Nothing built yet.

---

## 0. Interview Decisions (what was asked for)

| Topic | Decision |
| :--- | :--- |
| Main pain | Decks look great on desktop, bad on phones. Don't make one layout fit everything; add a **dedicated mobile template**. |
| Next decks | Kids/family tutorials and tech/dev talks. |
| Scope | Skill **and** engine may change. |
| Skill behaviour | **Interview the user first** before building: format + audience, language + voice, length + interactivity, look & brand. Skill must know what the engine supports per format. |
| Format model | **One format per deck**: `desktop` (16:9) or `mobile` (9:16 Stories). No runtime auto-switching. |
| Mobile feel | **Stories-style**: full-screen vertical cards, segmented progress bar, tap/swipe. Tap-to-start cover, then narration autoplays per card; **no auto-advance** (Next pulses, like desktop). **No captions.** |
| Desktop deck opened on a phone | Leave as is. |
| Interactive slides | Optional, can be **mixed anywhere** in the deck: multiple-choice quiz, tap-to-reveal flashcards, **typed answer** (new), hands-on mission (existing). Skill asks whether/where to use them. |
| Wrong answers | Shake + "try again" → 2nd miss shows hint → 3rd miss reveals answer + explanation. Never blocks Next. |
| Typed-answer matching | Several accepted answers per question, plus default leniency: case + whitespace, ignore diacritics, singular/plural tolerance. |
| Scoring | Light: first-try score on a final results slide with confetti. No persistence. |
| Voice on interactions | Only the **explanation** is voiced. Everything else gets **engine sound effects** (tap, question, hint, wrong, correct, results). |
| Code slides | Syntax highlighting + **step-through line highlights advanced by click/tap**. |
| Mobile slide types | hero, cards, compare, code, all interactive types. **Not** mockup. |
| Desktop auto-fit / overflow guards | Not wanted. |
| Delivery | Plan first (this doc), then build. |

---

## 1. Data Model Changes (`slides.js`)

```javascript
window.PRESENTATION_DATA = {
  id: "html-basics",
  format: "desktop",          // NEW: "desktop" (default, 1600×900) | "mobile" (Stories 9:16)
  lang: "ro",                 // NEW: used for UI strings ("Încearcă din nou") and plural rules
  sfx: true,                  // NEW: engine sound effects on/off (default true)
  title: "...", subtitle: "...", theme: { ... },
  slides: [ ... ]
};
```

Existing decks have no `format` → treated as `desktop` → render exactly as today (regression requirement).

### New slide types

**`quiz`**: multiple choice, single correct answer
```javascript
{ id: "slide-04", type: "quiz", badge: "ÎNTREBARE", title: "Ce tag creează un link?",
  audio: "audio/slide-04.mp3", narration: "Hai să vedem dacă ții minte! ...",
  content: {
    options: [ { text: "<p>" }, { text: "<a>", correct: true }, { text: "<img>" } ],
    hint: "Gândește-te la «anchor», o ancoră care te leagă de altă pagină.",
    explanation: "Corect: <a>, de la «anchor». Atributul href spune unde duce linkul.",
    explanationTts: "..."      // optional phonetic override
  } }
```

**`input`**: typed answer (on-screen keyboard aware)
```javascript
{ id: "slide-06", type: "input", badge: "SCRIE RĂSPUNSUL", title: "Cum se numesc <p>, <a>, <img>?",
  audio: "audio/slide-06.mp3", narration: "...",
  content: {
    placeholder: "Scrie aici…",
    answers: ["tag", "taguri", "etichete", "eticheta"],   // any match = correct
    match: { caseSensitive: false, diacritics: false, plural: true },  // optional, these are the defaults
    hint: "Începe cu litera T…",
    explanation: "Da! Se numesc taguri (tags): etichete care îi spun browserului ce este fiecare bucată." }
}
```

**`reveal`**: tap-to-reveal flashcards (not scored)
```javascript
content: { cards: [ { front: "<ul>", back: "Listă cu buline", tts: "..." }, ... ] }   // 2–4 cards
```
Tapping a card flips it and plays its back-side clip (`slide-XX-card-Y.mp3`).

**`code`**: highlighted, step-through
```javascript
{ id: "slide-07", type: "code", badge: "COD", title: "Primul tău link",
  audio: "audio/slide-07.mp3", narration: "...",
  content: {
    language: "html",            // html | css | js | python | bash | json
    filename: "index.html",      // optional tab label
    code: `<a href="https://example.com">\n  Apasă aici\n</a>`,
    steps: [                      // optional; Next/tap reveals one step at a time
      { lines: "1", note: "Deschidem tagul a și îi dăm adresa în href." },
      { lines: "2", note: "Textul pe care se dă click." },
      { lines: "3", note: "Închidem tagul." }
    ] } }
```
Behaviour: Next/→/tap advances the highlight through `steps` first (other lines dim) and goes to the next slide only after the last step. Prev steps back. Each step `note` gets an optional voiced clip (`slide-XX-step-Y.mp3`), consistent with click-to-read cards.

**`results`**: final score (place last, or after a quiz block)
```javascript
{ id: "slide-10", type: "results", title: "Gata!", audio: "...", narration: "...",
  content: { tiers: [ { min: 0.8, text: "Campion HTML! 🏆" }, { min: 0.5, text: "Foarte bine!" }, { min: 0, text: "Mai încearcă o dată!" } ] } }
```
Shows "X / Y corecte din prima" counting `quiz` + `input` slides, plus confetti and a fanfare sfx. Score resets on reload.

**`mission`**: unchanged schema, but no longer required to be last.

### Answer flow (`quiz` + `input`)
1. Question slide plays its narration and a "question" sfx.
2. Wrong #1: shake + wrong sfx + "Încearcă din nou".
3. Wrong #2: hint panel slides in + hint sfx.
4. Wrong #3: correct answer highlighted, explanation panel + `slide-XX-explain.mp3`.
5. Correct at any point: success sfx + explanation panel + explanation clip; record first-try result.
6. Next is never blocked; skipping counts as not-correct.

### Typed-answer normalisation (default)
`trim` → collapse inner whitespace → lowercase → strip diacritics (NFD + remove combining marks) → strip surrounding `<>` and punctuation only if the accepted answer has none. Plural tolerance: English `s`/`es` suffix stripped on both sides before compare. Romanian plurals are irregular (`etichetă` / `etichete`), so the skill tells authors to **list Romanian plural forms explicitly** in `answers`.

---

## 2. Engine Work (`tutorials/_engine/`)

| # | Task | Files |
| :--- | :--- | :--- |
| E1 | **Renderer registry refactor.** Replace the `switch` in `renderSlideContent` with a `SLIDE_TYPES` map `{ render, supports: ["desktop","mobile"], onEnter, onLeave, onNext }`. `onNext` lets `code` consume Next presses. Unknown/unsupported type → visible placeholder card + console warning. | `player.js` |
| E2 | **Format switch.** Read `data.format`, set `format-desktop` / `format-mobile` on `<html>`. Desktop keeps the 1600×900 scaled stage. Mobile uses a **fluid full-viewport stage** (`100dvh`, safe-area insets, centred 480px max-width column on desktop browsers for testing) with type sizes in `clamp()`/`vmin`, so there's no letterboxing on 19.5:9 phones. | `player.js`, new `stories.css` |
| E3 | **Stories shell (mobile).** Segmented progress bars at top; tap zones (left third = prev, right two-thirds = next) that ignore taps on interactive elements; swipe; small top bar (Hub ✕, mute, replay); tap-to-start cover that unlocks audio; Next affordance pulses when narration ends. Desktop HUD is not rendered in mobile. | `player.js`, `stories.css` |
| E4 | **Mobile layouts** for hero, cards, compare (stacked top/bottom), code, quiz, input, reveal, mission, results. | `stories.css` |
| E5 | **Keyboard-safe input.** Global key handler ignores navigation keys while an `<input>` is focused; Enter submits; `enterkeyhint="done"`, `autocapitalize="off"`, `autocorrect="off"`, `spellcheck=false`; on mobile use `visualViewport` resize to keep the input + feedback above the on-screen keyboard. | `player.js`, `stories.css` |
| E6 | **Interactive types**: `quiz`, `input`, `reveal`, `results` + answer flow + scoring state + confetti (CSS/canvas, no lib). | `player.js`, `player.css`, `stories.css` |
| E7 | **Code slide** + a small hand-written tokenizer (~150 lines, regex per language → `.tok-keyword/string/comment/tag/attr/number/punct`), colours as theme tokens (`--code-*`). Step dimming + highlight animation. Desktop: code ~60% left, step notes right. Mobile: code top (wraps), note below. | new `highlight.js`, `player.js`, both CSS |
| E8 | **Sound effects** synthesised with the Web Audio API (oscillator + envelope, no audio files): `tap`, `question`, `hint`, `wrong`, `correct`, `results`. Respects mute and `sfx:false`; low default volume; AudioContext unlocked on first gesture. | new `sfx.js` |
| E9 | **Audio pipeline**: `generate_audio.py` collects `quiz`/`input` explanations → `slide-XX-explain.mp3`, `reveal` backs → `slide-XX-card-Y.mp3`, `code` step notes → `slide-XX-step-Y.mp3`. Add `--only slide-05[,slide-07]` to regenerate selected slides. | `generate_audio.py` |
| E10 | **Templates**: keep `_template/` (desktop) and add `_template-mobile/` (index.html loads `stories.css`, `highlight.js`, `sfx.js`; viewport meta with `viewport-fit=cover`). | `_template*/` |

Script load order for both formats: `slides.js` → `sfx.js` → `highlight.js` → `player.js`. Desktop loads `player.css`. Mobile loads `stories.css`, a standalone file that shares only the token block, so desktop CSS stays untouched.

**Regression rule:** the 3 existing decks (`word-crash-course`, `agricover-presentation`, `agricover-presentation-ro`) must screenshot identically before vs after E1–E10.

---

## 3. Skill Work (`.agents/skills/presentation-creator/`)

| # | Task |
| :--- | :--- |
| S1 | **Step 0: Interview** before scaffolding. Always ask (via the question tool, 2–4 questions per round): **format + audience**, **language + voice**, **length + interactivity** (how many interactive slides, which kinds, where), **look & brand**. Ask more only when the request is unclear. Summarise the brief back in one block before building. |
| S2 | **Capability matrix** in SKILL.md: slide type × format (✅/❌), plus which types are voiced, scored and click-to-read. The skill must never put a `mockup` in a mobile deck. |
| S3 | **Rewrite the rules**: drop "No in-slide quizzes" and "mission must be last"; add interactivity guidance (kids: one interaction every 3–4 slides, end with `results` if any scored slides; tech talks: `code` + occasional `quiz`). |
| S4 | **Progressive disclosure**: slim SKILL.md to workflow + rules + matrix. Move schemas to `references/slide-types.md` (incl. new types), add `references/interactive.md` (answer flow, matching rules, writing good hints/explanations, Romanian plural lists) and `references/mobile-stories.md` (format rules, text budgets per card, tap zones). Update `references/engine-dom.md` with the new DOM/classes. |
| S5 | **Scaffold from templates**: Step 1 copies `_template/` or `_template-mobile/` instead of hand-writing files. |
| S6 | **Text budgets** per format (e.g. mobile: title ≤ 40 chars, ≤ 3 cards, card text ≤ 90 chars, code lines ≤ 34 chars; desktop code lines ≤ 60 chars). |
| S7 | **Visual QA**: `screenshot-slides.ps1` gets `-Mobile` (390×844 @ DPR 3). Also screenshot interactive slides in their answered state via a `?state=answered` debug param. |
| S8 | **Validator** `scripts/validate-course.mjs` (Node, already a dependency): type supported for format, every expected MP3 exists and is >5 KB, narration 30–55 words, `quiz` has exactly one correct option, `input` has ≥1 answer, code line-length budget, text budgets. The skill runs it before reporting done. |
| S9 | **Hub card**: give the exact card snippet in the skill; mobile decks get a `📱 Mobile` badge in `tutorials/index.html`. |
| S10 | **Editing existing decks** (short section): change one slide → `generate_audio.py --only slide-XX --force`; renumbering rules. |

---

## 4. Demo / Acceptance Deck

`tutorials/html-basics/` (desktop) and `tutorials/html-basics-mobile/` (mobile). Same Romanian kids content, ~10 slides each, exercising every type supported by its format: hero → cards → code (step-through) → quiz → reveal → input (`<a>` / "taguri") → compare → mission → results.

**Acceptance checks**
- [ ] Both demo decks pass `validate-course.mjs` and render without overflow (desktop 1600×900, mobile 390×844 screenshots).
- [ ] On a real phone: tap-to-start unlocks audio, tap zones and swipe work, input stays visible above the keyboard, Enter submits, sfx audible and muted by mute.
- [ ] Wrong-answer flow: try again → hint → reveal + voiced explanation. Results slide shows the correct first-try score.
- [ ] Code steps advance on Next/tap/→, then move to the next slide; Prev steps back.
- [ ] Existing 3 decks: screenshots unchanged.
- [ ] Skill end-to-end: "make a short mobile deck about X" → interview → scaffold from template → audio → validator → hub card.

---

## 5. Build Order

1. E1 registry refactor + regression screenshots of existing decks (baseline).
2. E8 sfx + E6 interactive types (desktop first).
3. E7 code slides.
4. E2–E5 mobile Stories shell + layouts.
5. E9 audio pipeline, E10 templates.
6. Demo decks + QA.
7. S1–S10 skill rewrite (written last so it documents what the engine actually does).

---

## 6. Open Points (defaults applied unless you object)

1. **Demo topic/language**: Romanian "HTML basics" for kids (matches your `<a>` / "tags" example).
2. **Mobile stage**: fluid full-viewport rather than a fixed scaled 9:16 canvas, to avoid letterboxing on tall phones.
3. **Romanian plurals**: authors list them in `answers`; automatic plural tolerance covers English `-s/-es` only.
4. **Hub**: mobile decks are listed in the same hub with a badge, not on a separate page.
