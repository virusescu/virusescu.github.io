# `slides.js` Schema & Slide Types

```javascript
window.PRESENTATION_DATA = {
  id: "course-slug",
  format: "desktop",          // "desktop" (default, 16:9 stage) | "mobile" (Stories 9:16, needs stories.css)
  lang: "ro",                 // "ro" | "en": engine UI strings (try again, hint, check, score…)
  sfx: true,                  // engine sound effects (default true)
  title: "Course Main Title", // also used on the mobile tap-to-start cover
  subtitle: "Short engaging subtitle",
  theme: {                    // optional; applied inline and WINS over theme.css; keep them equal
    accent: "#185abd",
    accentGlow: "rgba(24, 90, 189, 0.35)",
    badgeColor: "#00ff85"
  },
  slides: [ /* slide objects below */ ]
};
```

Every slide shares these fields:

| Field | Notes |
| :--- | :--- |
| `id` | `slide-01`, `slide-02`, … (audio file names derive from it) |
| `type` | one of the types below (default `hero`) |
| `badge`, `title`, `subtitle` | header; all escaped text |
| `audio` | `audio/<id>.mp3` |
| `narration` | what the voice says (and the source of truth for the script) |
| `narrationTts` | optional phonetic version read by TTS instead of `narration` |

Text fields are HTML-escaped (write `<h1>` literally). Raw HTML is only allowed in `icon`, `mockupHtml`, and `results.content.icon`.
Extra audio clips are derived automatically by `generate_audio.py`; the suffixes are listed per type.

---

## Content types

### `hero`: high-impact intro / section opener
Clips: `-card-1..3` (click-to-read, text = `tts` or `title. text`)
```javascript
{
  id: "slide-01", type: "hero",
  badge: "MODULUL 1 • INTRODUCERE",
  title: "Superputerile unui Document",
  subtitle: "De ce folosim Word și nu WhatsApp sau Notepad?",
  audio: "audio/slide-01.mp3",
  narration: "Salutare! Te-ai întrebat vreodată de ce scriem referate sau proiecte în Microsoft Word, și nu direct pe WhatsApp? Hai să descoperim împreună!",
  content: {
    highlights: [
      { icon: "⚡", title: "Control Total", text: "Aranjezi titluri, pagini și fonturi exact cum vrei." },
      { icon: "📄", title: "Gata de Print", text: "Fiecare pagină arată impecabil pe orice ecran sau imprimantă." },
      { icon: "🪄", title: "Automatizare", text: "Cuprinsul și numerotarea se fac singure în 3 secunde.", tts: "Automatizare. Cuprinsul se face singur." }
    ]
  }
}
```

### `cards`: 3–4 concept cards with analogies (mobile: max 3)
Clips: `-card-N`
```javascript
{
  id: "slide-02", type: "cards",
  badge: "CONCEPT CHEIE", title: "Aplicația vs Fișierul .docx", subtitle: "Bucătarul și Caietul cu Rețete",
  audio: "audio/slide-02.mp3",
  narration: "Gândește-te la Microsoft Word ca la un bucătar priceput, iar la fișierul punct docx ca la caietul cu rețete...",
  content: {
    cards: [
      { icon: "👨‍🍳", tag: "PROGRAMUL", title: "Microsoft Word (Bucătarul)", text: "Aplicația care știe să aranjeze textul." },
      { icon: "📓", tag: "FIȘIERUL", title: "Documentul .docx (Rețeta)", text: "Fișierul salvat, pe care îl trimiți oriunde." },
      { icon: "🌍", tag: "COMPATIBILITATE", title: "Liber pe orice dispozitiv", text: "Se deschide și în Google Docs sau LibreOffice." }
    ]
  }
}
```

### `compare`: two columns "Așa NU vs Așa DA" (stacked top/bottom on mobile)
No extra clips.
```javascript
{
  id: "slide-04", type: "compare",
  badge: "REGULA DE AUR", title: "Capcana Colorării Manuale", subtitle: "De ce nu vopsim titlurile de mână?",
  audio: "audio/slide-04.mp3",
  narration: "Mulți fac greșeala să selecteze textul, să-l mărească și să-l coloreze manual...",
  content: {
    left:  { tag: "❌ AȘA NU • Formatare Manuală", title: "Text doar „vopsit”", points: ["…", "…", "…"] },
    right: { tag: "✅ AȘA DA • Stiluri Inteligente", title: "Eticheta Heading 1", points: ["…", "…", "…"] }
  }
}
```

### `mockup`: simulated app UI + callouts (**desktop only**)
Clips: `-card-N` (callouts). `mockupHtml` is raw HTML styled with course-prefixed classes in `theme.css`.
```javascript
{
  id: "slide-05", type: "mockup",
  badge: "SECRETELE WORD", title: "Magia Stilurilor: Heading 1 & 2", subtitle: "Etichete inteligente pentru capitole",
  audio: "audio/slide-05.mp3",
  narration: "Sus în panglica Home găsești caseta Styles...",
  content: {
    callouts: [
      { step: "1", title: "Selectează rândul titlului", text: "Pune cursorul pe titlul capitolului tău." },
      { step: "2", title: "Apasă pe Heading 1", text: "Din meniul Home → galeria Styles." }
    ],
    mockupHtml: `<div class="word-window">...</div>`
  }
}
```

### `code`: syntax-highlighted code with step-through line highlights
Clips: `-step-N` (each step `note`, or its `tts`). Languages: `html`, `css`, `js`, `python`, `bash`, `json` (others render as plain text).
Next/→/tap highlights the next step's lines (others dim) and only leaves the slide after the last step. Steps are optional.
Budgets: desktop ≤ 60 chars/line and ≤ 20 lines (13+ lines switch to a denser font); mobile ≤ 34 chars/line (longer lines wrap) and ≤ 16 lines.
```javascript
{
  id: "slide-06", type: "code",
  badge: "LINKURI", title: "Cum faci un link", subtitle: "Apasă → ca să descoperi fiecare bucată",
  audio: "audio/slide-06.mp3",
  narration: "Linkurile sunt ca niște portaluri magice... Apasă pe săgeată ca să vezi fiecare parte.",
  content: {
    language: "html",
    filename: "link.html",                         // optional title-bar label
    code: "<a href=\"https://wikipedia.org\">\n  Mergi la Wikipedia\n</a>",
    steps: [
      { lines: "1",   note: "Deschidem tagul a. În href scriem adresa.", tts: "Deschidem tagul a. În h ref scriem adresa." },
      { lines: "2",   note: "Textul pe care dai click." },
      { lines: "3",   note: "Închidem tagul cu </a>.", tts: "Închidem tagul cu bară a." }
    ]                                              // lines: "4", "2,7", "3-5", "1,4-6"
  }
}
```
Tip: tell the learner in the subtitle that the arrow/tap reveals steps (the counter `Pas 1 / 3` also shows it).

### `mission`: hands-on challenge in the real software (can sit anywhere)
Clips: `-step-N`.
```javascript
{
  id: "slide-08", type: "mission",
  badge: "MISIUNEA TA PRACTICĂ • 5 MINUTE", title: "Testează Superputerile în Word!", subtitle: "Parcurge cei 3 pași",
  audio: "audio/slide-08.mp3",
  narration: "Acum e rândul tău! Deschide Microsoft Word...",
  content: {
    goal: "Creează o mini-poveste și generează cuprinsul automat.",
    steps: [
      { number: "01", title: "Scrie 3 Titluri", text: "…" },
      { number: "02", title: "Aplică Heading 1", text: "…" },
      { number: "03", title: "Generează Cuprinsul", text: "…" }
    ],
    reward: "🏆 Misiune îndeplinită!"
  }
}
```

---

## Interactive types

Full behaviour, matching rules and writing guidance: [`interactive.md`](interactive.md).

### `quiz`: multiple choice, exactly one correct (2–4 options, keys 1–4 on desktop)
Clips: `-explain`. Scored.
```javascript
{
  id: "slide-04", type: "quiz",
  badge: "ÎNTREBARE • 1", title: "Ce tag face cel mai MARE titlu?", subtitle: "Alege un răspuns (sau apasă 1–4)",
  audio: "audio/slide-04.mp3",
  narration: "Hai să vedem dacă ai fost atent! Ce tag alegi pentru cel mai mare titlu?",
  content: {
    options: [{ text: "<p>" }, { text: "<h1>", correct: true }, { text: "<h6>" }, { text: "<img>" }],
    hint: "Titlurile merg de la 1 (cel mai mare) până la 6 (cel mai mic).",
    explanation: "Corect: <h1>! Litera h vine de la heading, adică titlu.",
    explanationTts: "Răspunsul corect este h unu! Litera h vine de la heading, adică titlu."
  }
}
```

### `input`: typed answer (any accepted answer counts)
Clips: `-explain`. Scored.
```javascript
{
  id: "slide-07", type: "input",
  badge: "SCRIE RĂSPUNSUL", title: "Ce literă are tagul pentru link?", subtitle: "Scrie răspunsul și apasă Enter",
  audio: "audio/slide-07.mp3",
  narration: "Acum scrii tu! Ce literă folosim pentru tagul de link?",
  content: {
    placeholder: "Scrie litera aici…",
    answers: ["a", "<a>"],                         // first one is shown when the answer is revealed
    displayAnswer: "<a>",                          // optional: what to show instead of answers[0]
    match: { caseSensitive: false, diacritics: false, plural: true },  // optional; these are the defaults
    hint: "Este prima literă din alfabet!",
    explanation: "Bravo: tagul <a>! Vine de la anchor, adică ancoră.",
    explanationTts: "Bravo, tagul a! Vine de la anchor, adică ancoră."
  }
}
```

### `reveal`: tap-to-flip flashcards (1–4 cards, not scored)
Clips: `-card-N` (back side, or `tts`), played when a card is flipped.
```javascript
{
  id: "slide-05", type: "reveal",
  badge: "CARTONAȘE", title: "Ghicește ce face fiecare tag", subtitle: "Gândește-te întâi, apoi atinge cartonașul",
  audio: "audio/slide-05.mp3",
  narration: "Încearcă să ghicești ce face fiecare tag, apoi atinge cartonașul ca să-l întorci.",
  content: {
    cards: [
      { front: "<p>", back: "Un paragraf de text", tts: "p înseamnă un paragraf de text." },
      { front: "<img>", back: "O imagine (o poză)", icon: "🖼️" }   // icon optional (raw HTML)
    ]
  }
}
```

### `results`: first-try score + confetti (put it last, after the scored slides)
No extra clips. Counts `quiz` + `input` slides answered correctly on the **first** try.
```javascript
{
  id: "slide-11", type: "results",
  badge: "FINAL", title: "Gata, ai terminat!", subtitle: "Uite cum te-ai descurcat la întrebări",
  audio: "audio/slide-11.mp3",
  narration: "Felicitări, ai ajuns la final! Aici vezi la câte întrebări ai răspuns corect din prima încercare.",
  content: {
    icon: "🏆",
    tiers: [                                       // highest min ≤ ratio wins
      { min: 1,   text: "Campion! Toate din prima! 🥇" },
      { min: 0.6, text: "Foarte bine! 🎉" },
      { min: 0,   text: "Bun început! Mai încearcă o dată. 💪" }
    ]
  }
}
```
Narration can't know the score, so keep it score-neutral.
