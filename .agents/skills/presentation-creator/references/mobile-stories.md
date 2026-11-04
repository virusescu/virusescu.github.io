# Mobile Stories Format (`format: "mobile"`)

A phone-first deck: full-screen vertical cards like Instagram/TikTok Stories. Use it when the audience
will watch on a phone. Desktop decks are **not** adapted for phones, so build a separate `<slug>-mobile` deck.

## 1. Setup

- Scaffold from `tutorials/_template-mobile/`.
- `slides.js`: `format: "mobile"`.
- `index.html` must load `../_engine/stories.css` **after** `player.css` and before `theme.css`, and use:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content">
  <meta name="theme-color" content="#0a0d14">
  ```
- Twin of a desktop deck: copy `slides.js`, change `id` + `format`, adjust device wording
  ("apasă →" → "atinge ›", "apasă 1–4" → "atinge răspunsul"), and copy `audio/*.mp3` if narration is unchanged.

## 2. What the learner gets

- **Tap-to-start cover** (deck title, subtitle, slide count, ~minutes, ▶ button). Phones block audio until a tap, and the cover provides it.
- **Segmented progress bar** at the top; the current segment fills with the narration.
- Top row: ✕ (back to hub), `03 / 11`, ↺ replay, 🔊 mute.
- **Navigation:** tap the left third = back, the rest = forward; swipe left/right; the round `›` button bottom-right pulses when narration ends. No auto-advance.
- Taps on cards, quiz options, flashcards, buttons, links and inputs **never** navigate.
- **No captions:** slides carry the content, narration is audio-only.
- Layouts reflow vertically (see table). The stage is fluid (`100dvh`, safe-area insets); on a desktop browser it shows as a centred phone-width column for previewing.

| Type | Mobile layout |
| :--- | :--- |
| `hero`, `cards` | compact list: icon left, title + text right |
| `compare` | ❌ column on top, ✅ column below |
| `code` | full-width panel, long lines wrap; only the current step note shows under the code |
| `quiz` | options stacked full-width |
| `input` | input + Check button in one row; feedback below |
| `reveal` | 2×2 grid for 2 or 4 cards, a single column for 1 or 3 |
| `mission` | steps stacked |
| `results` | full-width score card |
| `mockup` | ❌ not supported (the validator errors and the engine shows a warning card) |

## 3. Text budgets (390×844 phone, no scrolling)

| Element | Budget |
| :--- | :--- |
| Slide title | ≤ 40 characters (2 lines max) |
| Subtitle | ≤ 60 characters |
| Cards per `hero`/`cards` slide | ≤ 3 |
| Card / step text | ≤ 90 characters |
| `compare` points | ≤ 3 per side, ≤ 50 characters each |
| Quiz options | ≤ 4, ≤ 30 characters each |
| Code | ≤ 34 characters per line (longer wraps), ≤ 16 lines |
| Flashcard back | ≤ 40 characters |

Slides do scroll vertically if content overflows, but a story that needs scrolling is too long, so split it into two slides.
`validate-course.mjs` checks the title, card count, card text and code budgets.

## 4. QA

```bash
node .agents/skills/presentation-creator/scripts/screenshot-slides.mjs <slug> --mobile
node .agents/skills/presentation-creator/scripts/screenshot-slides.mjs <slug> --mobile --state answered
node .agents/skills/presentation-creator/scripts/screenshot-slides.mjs <slug> --mobile --cover
```
These use real device emulation (390×844 CSS px @2x). Plain headless `--window-size=390,…` silently renders ~484px wide, so don't trust it.
On a real phone, also check the tap zones, that the keyboard doesn't cover the answer field, and that sound and mute work.

## 5. Theming

Token overrides (`--theme-accent`, `--theme-accent-glow`, `--theme-badge`) work exactly as on desktop.
`stories.css` is scoped to `html.format-mobile`. For mobile-specific overrides in `theme.css`, prefix with `.format-mobile`.
Light themes haven't been designed for mobile yet. If a brand needs one, override the Stories chrome too:
`.stories-top` gradient, `.stories-btn`, `.stories-next`, `.stories-cover`, `.stories-seg`.
