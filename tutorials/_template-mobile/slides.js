// Mobile Stories template (9:16). Copy this folder to tutorials/<slug>/ to start a phone-first deck.
// Supported types here: hero, cards, compare, code, quiz, input, reveal, mission, results (NOT mockup).
window.PRESENTATION_DATA = {
  id: "template-mobile",
  format: "mobile",
  lang: "en",
  sfx: true,
  title: "Mobile Course Template",
  subtitle: "Stories-style deck blueprint",
  theme: {
    accent: "#00ff85",
    accentGlow: "rgba(0, 255, 133, 0.25)",
    badgeColor: "#00ff85"
  },
  slides: [
    {
      id: "slide-01",
      type: "hero",
      badge: "MODULE 1",
      title: "Your Course Title",
      subtitle: "One short line that hooks the learner",
      audio: "audio/slide-01.mp3",
      narration: "Welcome! This is the opening story card. Keep it short, warm and curious, and tell the learner what they will be able to do by the end.",
      content: {
        highlights: [
          { icon: "⚡", title: "Point one", text: "Max ~90 characters per card on mobile." },
          { icon: "🧩", title: "Point two", text: "Three cards fit a phone screen comfortably." },
          { icon: "🎯", title: "Point three", text: "Tap a card to hear it read aloud." }
        ]
      }
    },
    {
      id: "slide-02",
      type: "quiz",
      badge: "QUESTION",
      title: "Which option is correct?",
      subtitle: "Tap your answer",
      audio: "audio/slide-02.mp3",
      narration: "Quick check! Read the options and tap the one you think is right. Do not worry, you get a hint if you miss.",
      content: {
        options: [{ text: "Option A" }, { text: "Option B", correct: true }, { text: "Option C" }],
        hint: "A gentle nudge toward the right answer.",
        explanation: "Option B is right because… (this sentence is voiced)."
      }
    },
    {
      id: "slide-03",
      type: "results",
      badge: "FINISH",
      title: "All done!",
      audio: "audio/slide-03.mp3",
      narration: "You made it to the end! Here is how many questions you got right on the first try.",
      content: {
        tiers: [
          { min: 1, text: "Perfect score! 🥇" },
          { min: 0, text: "Nice work, try again for a perfect run! 💪" }
        ]
      }
    }
  ]
};
