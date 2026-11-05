(function () {
  // Line icons (stroke="currentColor" picks up the accent from theme.css)
  const svg = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  const ICONS = {
    code: svg('<polyline points="8 6 2 12 8 18"/><polyline points="16 6 22 12 16 18"/><line x1="14" y1="4" x2="10" y2="20"/>'),
    team: svg('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2c3 .2 5.5 2.7 5.5 5.8"/>'),
    shield: svg('<path d="M12 3l8 3v6c0 4.6-3.4 8.2-8 9-4.6-.8-8-4.4-8-9V6z"/><polyline points="8.5 12 11 14.5 15.5 9.5"/>'),
    target: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
    search: svg('<circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/>'),
    route: svg('<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6"/>')
  };

  window.PRESENTATION_DATA = {
    id: "the-lup",
    format: "mobile",
    lang: "en",
    sfx: true,
    title: "The Lup",
    subtitle: "A profile of Christian Lup, Senior Software Engineer",
    theme: {
      accent: "#4f8cff",
      accentGlow: "rgba(79, 140, 255, 0.32)",
      badgeColor: "#8fb8ff"
    },
    slides: [
      {
        id: "slide-01",
        type: "hero",
        badge: "PROFILE • SENIOR SOFTWARE ENGINEER",
        title: "Meet The Lup",
        subtitle: "Christian Lup: engineer by trade, wolf by name",
        audio: "audio/slide-01.mp3",
        narration: "Welcome! Today we're putting the spotlight on Christian Lup, senior software engineer, trusted teammate, and the man behind the legend we simply call The Lup. Let's see what makes him so good at what he does.",
        narrationTts: "Welcome! Today we're putting the spotlight on Christian Loop, senior software engineer, trusted teammate, and the man behind the legend we simply call The Loop. Let's see what makes him so good at what he does.",
        content: {
          highlights: [
            { icon: ICONS.code, title: "Senior Engineer", text: "Writes code that holds up exactly when it matters most." },
            { icon: ICONS.team, title: "Pack Player", text: "Leads by helping everyone around him level up." },
            { icon: ICONS.shield, title: "Calm Under Pressure", text: "When the build breaks, he's the one still smiling." }
          ]
        }
      },
      {
        id: "slide-02",
        type: "cards",
        badge: "WHY “THE LUP”",
        title: "Why We Call Him The Lup",
        subtitle: "In Romanian, “lup” means wolf",
        audio: "audio/slide-02.mp3",
        narration: "Here's a fun fact: in Romanian, lup means wolf. And honestly, it fits. Sharp instincts, a strong sense of the pack, and he never gives up the hunt until the problem is solved.",
        narrationTts: "Here's a fun fact: in Romanian, loop means wolf. And honestly, it fits. Sharp instincts, a strong sense of the pack, and he never gives up the hunt until the problem is solved.",
        content: {
          cards: [
            { icon: ICONS.target, tag: "INSTINCT", title: "Sharp Instincts", text: "Senses a bug before the tests even finish running." },
            { icon: ICONS.team, tag: "THE PACK", title: "Runs With the Pack", text: "Code reviews that make the whole team stronger." },
            { icon: ICONS.search, tag: "THE HUNT", title: "Never Drops the Trail", text: "Tracks every issue down to its real root cause." }
          ]
        }
      },
      {
        id: "slide-03",
        type: "compare",
        badge: "FIELD NOTES",
        title: "Debugging, Two Ways",
        subtitle: "What a tricky bug looks like with and without The Lup",
        audio: "audio/slide-03.mp3",
        narration: "We've all been there. A strange bug appears, and panic mode kicks in: restart, blame the cache, add another print statement. The Lup does it differently. He reproduces it, reads the logs calmly, and fixes the real cause, once.",
        narrationTts: "We've all been there. A strange bug appears, and panic mode kicks in: restart, blame the cache, add another print statement. The Loop does it differently. He reproduces it, reads the logs calmly, and fixes the real cause, once.",
        content: {
          left: {
            tag: "❌ PANIC MODE",
            title: "Guess and hope",
            points: ["Restart and hope it goes away.", "Blame the cache.", "Add one more print statement."]
          },
          right: {
            tag: "✅ THE LUP WAY",
            title: "Hunter mode",
            points: ["Reproduce it first.", "Read the logs, calmly.", "Fix the root cause, once."]
          }
        }
      },
      {
        id: "slide-04",
        type: "quiz",
        badge: "QUICK QUESTION",
        title: "What does “lup” mean?",
        subtitle: "Tap your answer",
        audio: "audio/slide-04.mp3",
        narration: "Quick check, to see if you were paying attention. In Romanian, what does the word lup actually mean? Tap the answer you think is right.",
        narrationTts: "Quick check, to see if you were paying attention. In Romanian, what does the word loop actually mean? Tap the answer you think is right.",
        content: {
          options: [
            { text: "A bug" },
            { text: "A wolf", correct: true },
            { text: "A loop" },
            { text: "Lunch break" }
          ],
          hint: "Think of the pack… and howling at the moon.",
          explanation: "A wolf! In Romanian, lup means wolf: fitting for someone who hunts bugs and runs with the pack.",
          explanationTts: "A wolf! In Romanian, loop means wolf. Fitting for someone who hunts bugs and runs with the pack."
        }
      },
      {
        id: "slide-05",
        type: "results",
        badge: "THAT'S A WRAP",
        title: "Thanks, Lup!",
        subtitle: "From the whole pack",
        audio: "audio/slide-05.mp3",
        narration: "That's a wrap! Christian, thank you for the sharp instincts, the patient code reviews, and for always running with the pack. Here's to many more successful hunts together!",
        content: {
          icon: "🐺",
          tiers: [
            { min: 1, text: "True member of the pack! 🐺" },
            { min: 0, text: "Now you know: lup = wolf. 🐺" }
          ]
        }
      }
    ]
  };
})();
