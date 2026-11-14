window.PRESENTATION_DATA = {
  id: "word-crash-course",
  title: "Crash Course: Microsoft Word",
  subtitle: "Document structure, smart heading styles, templates, and automatic tables of contents",
  theme: {
    accent: "#185abd",
    accentGlow: "rgba(24, 90, 189, 0.4)",
    badgeColor: "#38bdf8"
  },
  slides: [
    {
      id: "slide-01",
      type: "hero",
      badge: "MODULE 1 • INTRODUCTION",
      title: "The Superpowers of a Real Document",
      subtitle: "Why do we use Microsoft Word instead of Notepad or WhatsApp?",
      audio: "audio/slide-01.mp3",
      narration: "Welcome! Have you ever wondered why we write reports and documents in Microsoft Word, instead of just sending a text message? Word is not just a typewriter; it is a full digital printing studio. Let us explore its true superpowers!",
      content: {
        highlights: [
          {
            icon: "📐",
            title: "Total Layout Control",
            text: "Precisely organize margins, page breaks, headings, and images so everything looks spotless."
          },
          {
            icon: "🖨️",
            title: "Print & PDF Ready",
            text: "Every page prints exactly as you see it on screen, across every computer and device."
          },
          {
            icon: "🪄",
            title: "Instant Automation",
            text: "Generate page numbers, bullet points, and full tables of contents in just two clicks."
          }
        ]
      }
    },
    {
      id: "slide-02",
      type: "cards",
      badge: "KEY MENTAL MODEL",
      title: "The Application vs The .docx File",
      subtitle: "The Master Chef and the Recipe Notebook",
      audio: "audio/slide-02.mp3",
      narration: "Here is an easy way to understand Word: think of Microsoft Word as a master chef, and your docx file as the recipe notebook. The chef reads your recipe and prepares the pages, but the recipe itself belongs to you.",
      content: {
        cards: [
          {
            icon: "👨‍🍳",
            tag: "THE APPLICATION",
            title: "Microsoft Word (The Chef)",
            text: "The software program installed on your computer. It knows all the rules of formatting, layouts, and typography."
          },
          {
            icon: "📓",
            tag: "THE FILE FORMAT",
            title: "Your .docx File (The Recipe)",
            text: "The actual saved document containing your text, images, and styles. You can attach it to emails or back it up on USB."
          },
          {
            icon: "🌍",
            tag: "UNIVERSAL COMPATIBILITY",
            title: "Open Anywhere",
            text: "Because dot-docx is an open standard, your recipe opens cleanly in Google Docs, LibreOffice, or on any mobile phone."
          }
        ]
      }
    },
    {
      id: "slide-03",
      type: "cards",
      badge: "DESIGN FOUNDATIONS",
      title: "Templates & Themes: The Designer's Blueprint",
      subtitle: "Why start from scratch when you can use smart layouts and coordinated colors?",
      audio: "audio/slide-03.mp3",
      narration: "Why stare at a blank white page when Word offers hundreds of pre-built templates? From school projects to resumes, templates set up the design for you. Even better, Document Themes let you restyle colors and fonts across the whole document with one single click!",
      content: {
        cards: [
          {
            icon: "📋",
            tag: "STARTING POINT",
            title: "Blank Page vs Pre-Made Templates",
            text: "A blank document starts from zero. A template comes pre-packaged with professional margins, color schemes, and sample headings for reports or resumes."
          },
          {
            icon: "🎨",
            tag: "COORDINATED STYLE",
            title: "What is a Document Theme?",
            text: "A theme is a matched set of font pairings and harmonious color palettes that automatically styles your titles, bullet points, and tables."
          },
          {
            icon: "🪄",
            tag: "ONE-CLICK MAGIC",
            title: "The Design Tab Superpower",
            text: "Want your document to look warm, modern, or executive? Open the Design tab, click Themes, and Word transforms the entire look without touching your written text!"
          }
        ]
      }
    },
    {
      id: "slide-04",
      type: "mockup",
      badge: "TYPOGRAPHY SECRETS",
      title: "What is a Font? The Clothes of Letters",
      subtitle: "Choosing clean, readable typefaces for school and work",
      audio: "audio/slide-04.mp3",
      narration: "Fonts are like clothes for your letters. A wild, fancy font might look cool on a birthday card, but in a school report or business document, it hurts the reader's eyes. Stick to clean, modern fonts like Aptos or Calibri.",
      content: {
        callouts: [
          {
            step: "1",
            title: "Pick Modern Body Fonts",
            text: "Fonts like Aptos, Calibri, and Arial are designed for effortless reading on screens and paper."
          },
          {
            step: "2",
            title: "Save Wild Fonts for Posters",
            text: "Decorative handwriting or comic fonts distract readers and look amateur in serious documents."
          },
          {
            step: "3",
            title: "Stick to Two Fonts Max",
            text: "One font for headings and one font for body text is the golden rule of great designers."
          }
        ],
        mockupHtml: `
          <div class="word-window">
            <div class="word-titlebar">
              <div class="word-titlebar-left">
                <span class="word-icon-badge">W</span>
                <span>Typography Specimen — Word</span>
              </div>
              <div class="word-window-controls"><span>—</span><span>□</span><span>✕</span></div>
            </div>
            <div class="word-canvas-area">
              <div class="font-specimen-grid">
                <div class="font-card good">
                  <span class="font-tag">Clean & Professional</span>
                  <span class="font-name" style="font-family: Calibri, sans-serif;">Calibri / Aptos</span>
                  <p class="font-sample">Clear letters, balanced spacing, and great readability at any size.</p>
                </div>
                <div class="font-card bad">
                  <span class="font-tag">Hard to Read</span>
                  <span class="font-name" style="font-family: 'Comic Sans MS', cursive;">Comic Decorative</span>
                  <p class="font-sample">Tires the eyes quickly and looks unprofessional in homework or reports.</p>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: "slide-05",
      type: "compare",
      badge: "THE GOLDEN RULE",
      title: "The Manual Formatting Trap",
      subtitle: "Why highlighting text and picking colors by hand always fails",
      audio: "audio/slide-05.mp3",
      narration: "Almost everyone starts Word with the same mistake: selecting text, making it size twenty, and painting it blue. But Word still thinks that is regular body text! When you have twenty chapters, you waste an entire hour fixing each one.",
      content: {
        left: {
          tag: "❌ DON'T DO THIS • Manual Painting",
          title: "Just 'Painted' Text",
          points: [
            "You highlight text and manually choose size 18, bold, and blue.",
            "Word has zero clue that this text is actually a chapter title.",
            "If your teacher wants green headings instead, you have to redo every single one by hand."
          ]
        },
        right: {
          tag: "✅ BEST PRACTICE • Smart Styles",
          title: "Smart Semantic Headings",
          points: [
            "Click a single button: Heading 1 from the Home ribbon.",
            "Word recognizes the structural hierarchy of your entire document.",
            "Change the style once, and all twenty chapters update simultaneously across the document!"
          ]
        }
      }
    },
    {
      id: "slide-06",
      type: "mockup",
      badge: "WORD SUPERPOWERS",
      title: "The Magic of Heading Styles",
      subtitle: "Giving smart structural labels to chapters and sections",
      audio: "audio/slide-06.mp3",
      narration: "Right in the Home ribbon sits the Styles gallery. When you click Heading 1, you attach a smart label to your chapter. When you use Heading 2, you label a subsection. You write faster, and your document stays perfectly consistent.",
      content: {
        callouts: [
          {
            step: "1",
            title: "Place Cursor on Your Title",
            text: "No need to highlight the entire sentence; just click anywhere inside the title line."
          },
          {
            step: "2",
            title: "Click Heading 1",
            text: "From the Home ribbon Styles gallery. This marks it as a primary chapter."
          },
          {
            step: "3",
            title: "Use Heading 2 for Subsections",
            text: "Sub-points inside a chapter get Heading 2 for clear visual hierarchy."
          }
        ],
        mockupHtml: `
          <div class="word-window">
            <div class="word-titlebar">
              <div class="word-titlebar-left">
                <span class="word-icon-badge">W</span>
                <span>Document1 - Word</span>
              </div>
              <div class="word-window-controls"><span>—</span><span>□</span><span>✕</span></div>
            </div>
            <div class="word-ribbon-tabs">
              <div class="ribbon-tab active">Home</div>
              <div class="ribbon-tab">Insert</div>
              <div class="ribbon-tab">Layout</div>
              <div class="ribbon-tab">References</div>
            </div>
            <div class="word-ribbon-bar">
              <div class="ribbon-group style-gallery">
                <div class="style-pill">
                  <span class="preview">AaBbCc</span>
                  <span class="label">Normal</span>
                </div>
                <div class="style-pill highlight">
                  <span class="preview">AaBbCc</span>
                  <span class="label">Heading 1</span>
                </div>
                <div class="style-pill">
                  <span class="preview">AaBbCc</span>
                  <span class="label">Heading 2</span>
                </div>
              </div>
            </div>
            <div class="word-canvas-area">
              <div class="word-page">
                <div class="page-title">Chapter 1: The Solar System</div>
                <p class="page-p">Our solar system consists of our star, the Sun, and everything bound to it by gravity...</p>
                <div class="page-section">1.1 Terrestrial Planets</div>
                <p class="page-p">Mercury, Venus, Earth, and Mars are rocky planets made of rock and metal.</p>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: "slide-07",
      type: "mockup",
      badge: "INSTANT AUTOMATION",
      title: "The Ultimate Superpower: Table of Contents",
      subtitle: "Generating and updating page numbers in three seconds",
      audio: "audio/slide-07.mp3",
      narration: "Because you used Heading styles, Word knows exactly where every chapter lives and what page it is on. Go to the References tab, click Table of Contents, and boom! An instant, beautifully formatted table of contents appears with zero typing.",
      content: {
        callouts: [
          {
            step: "1",
            title: "Open the References Tab",
            text: "Click References on the top ribbon and choose Table of Contents."
          },
          {
            step: "2",
            title: "Pick Automatic Table 1",
            text: "Word instantly compiles every Heading 1 and 2 with dotted leader lines."
          },
          {
            step: "3",
            title: "Update Anytime",
            text: "Added new chapters or pages? Just click Update Table and page numbers fix themselves!"
          }
        ],
        mockupHtml: `
          <div class="word-window">
            <div class="word-titlebar">
              <div class="word-titlebar-left">
                <span class="word-icon-badge">W</span>
                <span>Automatic Table of Contents</span>
              </div>
              <div class="word-window-controls"><span>—</span><span>□</span><span>✕</span></div>
            </div>
            <div class="word-canvas-area">
              <div class="word-page">
                <div style="font-weight:800; font-size:1.1rem; color:#0f172a; margin-bottom:8px;">Table of Contents</div>
                <div class="toc-preview">
                  <div class="toc-row">
                    <span class="toc-item-title">Chapter 1: The Solar System</span>
                    <span class="toc-leader"></span>
                    <span class="toc-page-num">page 1</span>
                  </div>
                  <div class="toc-row" style="padding-left:14px;">
                    <span style="color:#475569;">1.1 Terrestrial Planets</span>
                    <span class="toc-leader"></span>
                    <span class="toc-page-num">page 2</span>
                  </div>
                  <div class="toc-row">
                    <span class="toc-item-title">Chapter 2: The Gas Giants</span>
                    <span class="toc-leader"></span>
                    <span class="toc-page-num">page 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: "slide-08",
      type: "compare",
      badge: "FORMATTING HABITS",
      title: "The Sin of the Spacebar & Smart Lists",
      subtitle: "Why we never use repeated spaces to align text",
      audio: "audio/slide-08.mp3",
      narration: "Never press the spacebar ten times to push words to the middle! Different fonts and printers will turn your text into a zig-zag mess. Use the Tab key for indents, and let Word's automatic bulleted lists handle spacing for you.",
      content: {
        left: {
          tag: "❌ THE SPACEBAR TRAP",
          title: "Tapping Space 15 Times",
          points: [
            "Pressing Space repeatedly to push text to the center or right.",
            "Different computer screens render letter widths differently, ruining alignment.",
            "Changing the font makes your entire layout jump out of place."
          ]
        },
        right: {
          tag: "✅ THE SMART WAY",
          title: "Tabs & Automated Lists",
          points: [
            "Use the Tab key for crisp, exact millimeter column alignment.",
            "Click the Bullets or Numbering button; Word automatically indents every line.",
            "Pressing Enter creates the next number automatically!"
          ]
        }
      }
    },
    {
      id: "slide-09",
      type: "mission",
      badge: "PRACTICAL MISSION • 5 MINUTES",
      title: "Your Hands-On Mission in Microsoft Word",
      subtitle: "Close the deck, open Word, and test your superpowers!",
      audio: "audio/slide-09.mp3",
      narration: "Now it is your turn! Open Microsoft Word and follow the three steps below. Write three chapter titles with a short paragraph of text under each, apply Heading 1, and insert your automatic table of contents. You've got this!",
      content: {
        goal: "Write three chapter titles with body paragraphs about your favorite topics and generate an automatic table of contents.",
        steps: [
          {
            number: "01",
            title: "Write 3 Chapter Titles & Body Paragraphs",
            text: "Open a blank document. Type three chapter titles on separate lines. Under each title, write 2 to 3 sentences explaining your topic (like your favorite games, recipes, or pets). A real document always has body text between headings!"
          },
          {
            number: "02",
            title: "Apply Heading 1 to Each Title",
            text: "Click on each title line and click Heading 1 in the Home ribbon. Watch them turn into smart structural headers."
          },
          {
            number: "03",
            title: "Insert Table of Contents at the Top",
            text: "Place your cursor at the very top of your document, go to References → Table of Contents, and select Automatic Table 1!"
          }
        ],
        reward: "🏆 Mission Accomplished! You now know the document secret that most people only learn in college."
      }
    }
  ]
};
