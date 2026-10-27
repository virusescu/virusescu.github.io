# Engine DOM & Styling Reference (`tutorials/_engine/`)

Read this before writing any `theme.css`. All selectors below are what `player.js` really generates.
**Do not invent class names**: a selector that doesn't match engine markup silently does nothing.

> Source of truth: `player.js` → `buildStageAndSlides()`, `renderSlideContent()`, `buildHUD()`.
> If the engine changes, re-run:
> `Select-String -Path tutorials\_engine\player.js -Pattern 'className|class="'`

---

## 1. Generated DOM Tree

```text
html  (inline style: --theme-accent, --theme-accent-glow, --theme-badge, --stage-scale)
└── body
    └── #deck-viewport.deck-viewport              ← full-window backdrop
        ├── .deck-stage                            ← fixed 1600×900 canvas, scaled via transform
        │   ├── (::before = 2px accent line at top)
        │   └── .slide.layout-{hero|compare|cards|mockup|mission}   (+ .active on current)
        │       ├── .slide-header
        │       │   ├── .slide-badge               (::before = dot)
        │       │   ├── h2.slide-title
        │       │   └── p.slide-subtitle
        │       └── .slide-body                    ← layout-specific content (see §2)
        ├── .deck-hud                              ← bottom control pill (absolute, inside viewport)
        │   ├── .hud-left   → a.btn-hud-exit, span.hud-slide-count
        │   ├── .hud-center → button.btn-hud#btn-play-pause, .btn-hud#btn-replay,
        │   │                 .audio-timeline-wrap > .audio-progress-bar > .audio-progress-fill,
        │   │                 span.audio-time-label, .btn-hud#btn-mute
        │   └── .hud-right  → .btn-hud#btn-fullscreen, button.btn-nav.btn-prev, button.btn-nav.btn-next
        └── .voice-prompt-pill                     ← only when autoplay is blocked
```

Free pseudo-elements you can use: `.slide::before`, `.slide::after`, `.slide-header::after`,
`.concept-card::before`, `.mission-step-card::before`, `.mission-goal-bar::before`.
Already used by the engine (override carefully): `.deck-stage::before`, `.slide-badge::before`,
`.hero-card::before`, `.compare-col.wrong::before`, `.compare-col.right::before`, `.interactive-card::after` (🔊 hint).

## 2. Per-Layout Body Markup

| Layout (`slide.type`) | Body structure |
| :--- | :--- |
| `hero` | `.hero-highlights` > `.hero-card.interactive-card` × N > `.hero-card-icon`, `.hero-card-title`, `.hero-card-text` |
| `compare` | `.compare-col.wrong` + `.compare-col.right` > `.compare-tag`, `.compare-title`, `ul.compare-points` > `li.compare-point` > `span.point-icon` (✕ / ✓) + `span` |
| `cards` | `.concept-card.interactive-card` × N (direct children of `.slide-body`) > `.concept-icon`, `.concept-tag` (optional), `.concept-title`, `.concept-text` |
| `mockup` | `.mockup-callouts` > `.callout-card.interactive-card` > `.callout-step`, `.callout-info` > `.callout-title`, `.callout-text`; plus `.mockup-display` (contains raw `mockupHtml`) |
| `mission` | `.mission-goal-bar` > `span.mission-goal-icon` (🎯) + `span`; `.mission-steps` > `.mission-step-card.interactive-card` > `.mission-step-number`, `.mission-step-title`, `.mission-step-text`; `.mission-reward` > `span` |

Scope layout-specific overrides with `.layout-<type>` (e.g. `.layout-hero .slide-title`) or `.slide.layout-hero` for the slide itself.

**Injected as raw HTML (not escaped):** `icon` fields (hero/cards) and `mockupHtml`. So you can use inline `<svg>` icons and custom classed markup. Text fields (`title`, `text`, `points`, `tag`, `goal`, `reward`) are escaped.

## 3. Runtime State Classes

| Class | Set on | When |
| :--- | :--- | :--- |
| `.active` | `.slide` | current slide (drives entrance animations) |
| `.is-speaking` | `.interactive-card` | while its click-to-read clip plays |
| `.pulse-ready` | `.btn-nav.btn-next` | narration finished, prompting the learner to advance |
| `:disabled` | `.btn-prev` / `.btn-next` | first / last slide |

## 4. CSS Custom Properties (Tokens)

Defined on `:root` in `player.css`:

| Token | Default | Used by |
| :--- | :--- | :--- |
| `--bg-primary` | `#0a0d14` | `html, body`, `.deck-viewport` background-color |
| `--bg-card` | `rgba(18,24,38,.75)` | hero/concept/callout/mission-step/compare cards |
| `--bg-card-border` | `rgba(255,255,255,.08)` | card borders, stage outline |
| `--text-main` | `#f3f4f6` | body text |
| `--text-muted` | `#94a3b8` | subtitles, card body text, HUD labels |
| `--font-family` / `--font-mono` | system stacks | everything / numbers, timers |
| `--accent-red`, `--accent-red-glow` | rose | `.compare-col.wrong` top bar |
| `--theme-accent`, `--theme-accent-glow` | neon green | step numbers, progress fill, speaking glow, pulse, compare right bar |
| `--theme-badge` | neon green | `.slide-badge` text + dot |
| `--stage-scale` | runtime | **never override** |

> [!IMPORTANT]
> **`slides.js` `theme` beats `theme.css`.** `applyThemeTokens()` writes `theme.accent`, `theme.accentGlow`, `theme.badgeColor`
> as *inline styles on `<html>`*, which override any `:root { --theme-accent: … }` in `theme.css`.
> Keep the two in sync, or leave those keys out of `slides.js`.

## 5. Hardcoded Dark-Mode Values (tokens alone will NOT fix these)

The engine was designed for a dark stage. These declarations use literal colors, so **a light theme must override every one of them explicitly**.

| Selector | Hardcoded value(s) |
| :--- | :--- |
| `.deck-viewport` | `background-image` with green/cyan radial glows |
| `.deck-stage` | dark radial `background`, black `box-shadow` |
| `.deck-stage::before` | accent line at the top |
| `.slide-title` | `color: #ffffff` |
| `.slide-badge` | translucent white pill `background` / `border` |
| `.hero-card-title`, `.concept-title`, `.callout-title`, `.compare-title`, `.mission-step-title` | `color: #ffffff` |
| `.hero-card-icon`, `.concept-icon` | translucent white `background` / `border` |
| `.hero-card:hover`, `.concept-card:hover`, `.callout-card:hover` | white-alpha `border-color`, black shadow |
| `.compare-col.wrong` / `.right` | gradients ending in `rgba(18,24,38,.75)`; red / **neon-green** borders |
| `.compare-col.right .compare-tag` | neon-green `background` / `border` |
| `.compare-point` | `color: #e2e8f0` |
| `.callout-step` | translucent white `background` |
| `.mission-goal-bar` | neon-green → dark gradient, `color: #f3f4f6` |
| `.mission-step-card:hover` | neon-green `border-color` |
| `.mission-reward` | white-alpha `background`, dashed border, `color: #cbd5e1` |
| `.deck-hud` | `background: rgba(12,17,28,.88)`, white-alpha border |
| `.btn-hud-exit`, `.btn-hud`, `.btn-nav` | white-alpha backgrounds/borders, light text (`#e2e8f0`, `#ffffff`) |
| `.audio-progress-bar` | `rgba(255,255,255,.12)` track |
| `.btn-nav.btn-next.pulse-ready` | `color: #05160d` (dark text on accent) |
| `.voice-prompt-pill` | dark `background`, `color: #ffffff` |

## 6. Layout Geometry

- Stage is a fixed **1600 × 900** canvas; design in px/rem against that, never against `vw/vh`.
- `.slide` padding: `52px 72px 110px` — the bottom 110px is reserved for the HUD (HUD = 64px tall, 24px from the bottom). Keep content above ~790px.
- Body grids: `hero` = 3 columns; `cards` = `auto-fit minmax(320px,1fr)` (cards **stretch to full height** by default); `compare` = 2 columns stretched; `mockup` = `1fr 1.25fr`; `mission` = column with `.mission-steps { flex: 1 }` (stretched).
  With short text, stretched cards look empty → set `align-items: center` + a `min-height` on the cards.
- `.mockup-display` max-height 540px.
