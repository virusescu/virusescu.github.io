(function () {
  // Line icons (stroke="currentColor" picks up the accent from theme.css)
  const svg = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  const ICONS = {
    code: svg('<polyline points="8 6 2 12 8 18"/><polyline points="16 6 22 12 16 18"/><line x1="14" y1="4" x2="10" y2="20"/>'),
    blueprint: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'),
    cap: svg('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>'),
    rocket: svg('<path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2"/><path d="M9 15l-3-3c1.5-5 5.5-9 13-9 0 7.5-4 11.5-9 13z"/><circle cx="14.5" cy="9.5" r="1.6"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>'),
    layers: svg('<polygon points="12 3 22 8 12 13 2 8"/><polyline points="2 12 12 17 22 12"/><polyline points="2 16 12 21 22 16"/>')
  };

  window.PRESENTATION_DATA = {
    id: "the-lup",
    format: "mobile",
    lang: "en",
    sfx: true,
    title: "The Lup",
    subtitle: "Christian Lup · Lead C++ Software Engineer at EA Bucharest",
    theme: {
      accent: "#4f8cff",
      accentGlow: "rgba(79, 140, 255, 0.32)",
      badgeColor: "#8fb8ff"
    },
    slides: [
      {
        id: "slide-01",
        type: "hero",
        badge: "PROFILE • EA BUCHAREST",
        title: "Meet The Lup",
        subtitle: "Christian Lup, Lead C++ Software Engineer",
        audio: "audio/slide-01.mp3",
        narration: "Meet Christian Lup, lead C++ software engineer at EA in Bucharest. He has been writing software since 1999, spent more than twelve years designing system architecture, and along the way picked up a PhD. This is The Lup.",
        narrationTts: "Meet Christian Loop, lead C plus plus software engineer at E A in Bucharest. He has been writing software since nineteen ninety nine, spent more than twelve years designing system architecture, and along the way picked up a P H D. This is The Loop.",
        content: {
          highlights: [
            { icon: ICONS.code, title: "Coding since 1999", text: "More than 25 years of shipping software, at EA since 2018.", tts: "Coding since nineteen ninety nine. More than twenty five years of shipping software, at E A since twenty eighteen." },
            { icon: ICONS.blueprint, title: "Architect at heart", text: "12+ years of system architecture and high-level design.", tts: "Architect at heart. More than twelve years of system architecture and high level design." },
            { icon: ICONS.cap, title: "Dr. Lup", text: "PhD in Computer Science, Politehnica University of Bucharest.", tts: "Doctor Loop. P H D in Computer Science, from the Polytechnic University of Bucharest." }
          ]
        }
      },
      {
        id: "slide-02",
        type: "cards",
        badge: "THE ROAD TO EA",
        title: "Before the Pack Found EA",
        subtitle: "Two decades of building teams and products",
        audio: "audio/slide-02.mp3",
        narration: "The Lup's path started at G3 Nova, coding and then building two teams and a product line for Panasonic. At Ixia he led development across the US, Romania and India. Then came almost nine years as architect and director at Zoltes.",
        narrationTts: "The Loop's path started at G three Nova, coding and then building two teams and a product line for Panasonic. At Icksia he led development across the U S, Romania and India. Then came almost nine years as architect and director at Zoltes.",
        content: {
          cards: [
            { icon: ICONS.rocket, tag: "1999 · G3 NOVA", title: "Developer → Project Manager", text: "Built two dev teams and a product line for Panasonic.", tts: "G three Nova. Developer, then project manager. Built two dev teams and a product line for Panasonic." },
            { icon: ICONS.globe, tag: "2004 · IXIA", title: "Manager, App Development", text: "Led projects and teams across the US, Romania and India.", tts: "Icksia. Manager of application development. Led projects and teams across the U S, Romania and India." },
            { icon: ICONS.layers, tag: "2006–2017 · ZOLTES & POLTYS", title: "Architect & Director", text: "Senior architect, then director of software development.", tts: "Zoltes and Poltys. Senior architect, then director of software development." }
          ]
        }
      },
      {
        id: "slide-03",
        type: "reveal",
        badge: "LUP BY THE NUMBERS",
        title: "Guess the Number",
        subtitle: "Think first, then tap a card",
        audio: "audio/slide-03.mp3",
        narration: "Time for a little game. Each card hides a number from The Lup's story. Guess what it stands for, then tap the card to see if you were right.",
        narrationTts: "Time for a little game. Each card hides a number from The Loop's story. Guess what it stands for, then tap the card to see if you were right.",
        content: {
          cards: [
            { front: "3", back: "University degrees: M.Eng, MBA and PhD", tts: "Three university degrees: a master's in engineering, an M B A, and a P H D." },
            { front: "3", back: "Countries he led teams in: US, Romania, India", tts: "Three countries where he led teams: the U S, Romania and India." },
            { front: "4K", back: "LinkedIn followers", tts: "Four thousand LinkedIn followers." },
            { front: "2026", back: "CodinGame-certified in C++ and C#", tts: "Twenty twenty six: CodinGame certified in C plus plus and C sharp." }
          ]
        }
      },
      {
        id: "slide-04",
        type: "quiz",
        badge: "QUICK QUESTION",
        title: "Which is NOT on his CV?",
        subtitle: "Tap your answer",
        audio: "audio/slide-04.mp3",
        narration: "Quick question. The Lup has collected quite a few diplomas. Which one of these is not on his CV? Tap the answer you think is right.",
        narrationTts: "Quick question. The Loop has collected quite a few diplomas. Which one of these is not on his C V? Tap the answer you think is right.",
        content: {
          options: [
            { text: "A PhD in Computer Science" },
            { text: "An MBA" },
            { text: "A Master's in Engineering" },
            { text: "A law degree", correct: true }
          ],
          hint: "He collected degrees in engineering, business and research.",
          explanation: "No law degree! He has a Master's in Engineering and a PhD from Politehnica Bucharest, plus an MBA from Tiffin University.",
          explanationTts: "Correct, no law degree! He has a master's in engineering and a P H D from the Polytechnic University of Bucharest, plus an M B A from Tiffin University."
        }
      },
      {
        id: "slide-05",
        type: "results",
        badge: "THAT'S A WRAP",
        title: "Thanks, Lup!",
        subtitle: "“Lup” is Romanian for wolf. Leader of the pack.",
        audio: "audio/slide-05.mp3",
        narration: "In Romanian, lup means wolf, and it fits. More than twenty five years of software, three degrees, teams on three continents, and still writing C++ every day. Christian, thank you from the whole pack!",
        narrationTts: "In Romanian, loop means wolf, and it fits. More than twenty five years of software, three degrees, teams on three continents, and still writing C plus plus every day. Christian, thank you from the whole pack!",
        content: {
          icon: "🐺",
          tiers: [
            { min: 1, text: "You know The Lup well! 🐺" },
            { min: 0, text: "Now you know The Lup a bit better. 🐺" }
          ]
        }
      }
    ]
  };
})();
