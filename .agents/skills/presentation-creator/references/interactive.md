# Interactive Slides: `quiz`, `input`, `reveal`, `results`

Schemas are in [`slide-types.md`](slide-types.md). This file covers behaviour and how to write good questions.

## 1. Answer flow (quiz + input)

| Event | What the learner sees/hears |
| :--- | :--- |
| Slide opens | narration + `question` sfx |
| Wrong #1 | `wrong` sfx, shake, "Nu chiar… mai încearcă!" (quiz: that option is greyed out) |
| Wrong #2 | hint panel slides in + `hint` sfx (if no `hint`, just "try again" again) |
| Wrong #3 | correct answer revealed (quiz: highlighted option; input: answer filled in + "Răspunsul corect" panel), explanation panel + voiced `-explain` clip |
| Correct (any attempt) | `correct` sfx, "Corect!", explanation panel + voiced `-explain` clip |

- **Next is never blocked.** Skipping counts as not-correct for the score.
- Only the **explanation** is voiced. Hint/try-again/correct are text + sound effects.
- Clicking the explanation panel replays its clip.
- State persists while navigating back and forth and resets on reload (no localStorage).
- `results` counts first-try correct answers across all `quiz` + `input` slides.

## 2. Typed-answer matching (`input`)

The learner's text matches if it equals **any** entry in `answers` after normalisation:

| Rule | Default | Example |
| :--- | :--- | :--- |
| Trim + collapse spaces | always | `"  tag  "` = `"tag"` |
| Case-insensitive | `caseSensitive: false` | `"TAG"` = `"tag"` |
| Ignore diacritics | `diacritics: false` | `"eticheta"` = `"etichetă"` |
| English plural `-s` / `-es` | `plural: true` (words ≥ 3 letters) | `"tags"` = `"tag"`, `"boxes"` = `"box"` |
| Strip `< >` / `</ >` if the answer has none | always | `"<a>"` = `"a"` |
| Strip trailing `. ! ? , ; :` if the answer has none | always | `"tag."` = `"tag"` |

Not automatic, so **list these explicitly in `answers`**:
- **Romanian plurals and articles** (irregular): `["tag", "taguri", "tagurile", "etichetă", "etichete", "etichetele"]`.
- Synonyms and the English term: `["a", "anchor", "ancora"]`.
- Typos are not forgiven. Keep expected answers short (1–2 words) so they're easy to type on a phone.

Override per slide with `match: { caseSensitive: true }` (e.g. code identifiers) or `plural: false`.

## 3. Writing good interactive slides

- **One idea per question**, tested right after it was taught (a quiz after the slide that explains it).
- **Question in the title**, instruction in the subtitle ("Alege un răspuns (sau apasă 1–4)" on desktop, "Atinge răspunsul corect" on mobile).
- **Distractors** should be plausible (`<h6>` vs `<h1>`), never jokes that give the answer away.
- **Hint** nudges without giving the answer ("Începe cu litera T…", "Titlurile merg de la 1 la 6").
- **Explanation** says *why* in one or two sentences, starting with the answer ("Corect: `<h1>`! …"). It's shown and voiced whether the learner got it right or not, so don't write "Bravo" only for winners. A short "Corect:" works for both.
- Use `explanationTts` whenever the explanation contains tags, code, symbols or English words.
- **Narration** for interactive slides is 15–45 words: set up the challenge, then stop talking.
- **Kids pacing:** about one interaction every 3–4 content slides; mix `quiz`, `reveal`, `input`; end with `results`.
- **Flashcards (`reveal`)**: front = the thing to recall (a tag, a term, an icon), back = a short answer (≤ 40 chars). The back is voiced on flip, so add `tts` for code on the front/back.

## 4. Desktop vs mobile

- Desktop: quiz options in a 2×2 grid (3 options → one row); keys `1–4` answer; the input is never autofocused (so arrow keys keep navigating until the learner clicks it).
- Mobile: options stack full-width; tapping an option, card or the input never triggers tap-to-navigate. The first tap outside an open keyboard only closes it. The input uses `enterkeyhint="done"` and no autocorrect/autocapitalize, and the stage follows `visualViewport` so the field stays above the keyboard.

## 5. QA (only when the user asks for a review or reports a problem)

`node scripts/screenshot-slides.mjs <slug> --state answered` renders every interactive slide solved (explanation visible, code on the last step, flashcards flipped, results at full score), which is the quickest way to check feedback panels fit.
