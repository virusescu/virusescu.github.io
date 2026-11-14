window.PRESENTATION_DATA = {
  id: "_template",
  title: "Course Template Blueprint",
  subtitle: "Reference deck demonstrating all slide layout archetypes and voice sync",
  theme: {
    accent: "#00ff85",
    accentGlow: "rgba(0, 255, 133, 0.25)",
    badgeColor: "#00ff85"
  },
  slides: [
    {
      id: "slide-01",
      type: "hero",
      badge: "MODULE 1 • BLUEPRINT OVERVIEW",
      title: "Interactive Course Template",
      subtitle: "Full-screen 16:9 presentation canvas with local neural narration",
      audio: "audio/slide-01.mp3",
      narration: "Welcome to the course template blueprint! This system is designed for interactive, high-impact tutorials with synchronized voice-over narration and keyboard navigation. Let us look at how it works.",
      content: {
        highlights: [
          {
            icon: "⚡",
            title: "Zero Dependencies",
            text: "Pure Vanilla HTML5, CSS3, and ES6 JavaScript. Works offline under file protocol with zero build tools."
          },
          {
            icon: "🎙️",
            title: "Local Voice Narration",
            text: "Per-slide audio synthesized locally on your GPU using Kokoro-82M or neural speech models."
          },
          {
            icon: "🎮",
            title: "Full Keyboard HUD",
            text: "Navigate with Arrow keys, toggle Play or Pause with Space, and press F for fullscreen."
          }
        ]
      }
    },
    {
      id: "slide-02",
      type: "compare",
      badge: "CORE PRINCIPLE",
      title: "Clean Design vs Cluttered Slides",
      subtitle: "Why we focus on punchy visual cards instead of walls of bullet text",
      audio: "audio/slide-02.mp3",
      narration: "Great presentations avoid boring walls of text. By contrasting common mistakes against best practices in side-by-side cards, learners instantly understand the key lesson.",
      content: {
        left: {
          tag: "❌ DON'T DO THIS",
          title: "Overloaded Text Walls",
          points: [
            "Cramming 50 lines of bullet points on a single slide.",
            "Using tiny unreadable fonts that strain the audience's eyes.",
            "Interrupting the story with boring multiple choice quiz traps."
          ]
        },
        right: {
          tag: "✅ BEST PRACTICE",
          title: "Visual Cards & Clear Mental Models",
          points: [
            "Focus each slide on one single core takeaway or analogy.",
            "Use clear bold cards with contrasting accents and clean spacing.",
            "Provide a concrete 5-minute real world challenge at the very end."
          ]
        }
      }
    },
    {
      id: "slide-03",
      type: "mission",
      badge: "PRACTICAL MISSION • 3 STEPS",
      title: "Your First Hands-On Challenge",
      subtitle: "Put what you learned into practice in just three simple steps",
      audio: "audio/slide-03.mp3",
      narration: "Here is your first mission! Take what you have learned and create your own presentation deck by following the three action steps below.",
      content: {
        goal: "Duplicate the template folder, edit slides.js with your lesson, and synthesize your narration.",
        steps: [
          {
            number: "01",
            title: "Duplicate the Template",
            text: "Copy the _template folder to a new slug inside tutorials, like my-first-course."
          },
          {
            number: "02",
            title: "Author Your Slides",
            text: "Open slides.js and customize the titles, bullet points, and narration scripts."
          },
          {
            number: "03",
            title: "Run Audio Generator",
            text: "Run the generate audio script to create all voice-over tracks with one single command."
          }
        ],
        reward: "🏆 Congratulations! You have successfully mastered the course creation workflow."
      }
    }
  ]
};
