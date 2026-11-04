window.PRESENTATION_DATA = {
  id: "html-css-crash-course",
  format: "mobile",
  lang: "en",
  sfx: true,
  title: "Masterclass: HTML & CSS",
  subtitle: "Full-semester guide: files, tags, forms, Google Fonts, Box Model & Flexbox",
  theme: {
    accent: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.32)",
    badgeColor: "#00ff85"
  },
  slides: [
    // =========================================================================
    // MODULE 1: FILES, DOCUMENT TREE & CORE SEMESTER HTML (SLIDES 01–07)
    // =========================================================================
    {
      id: "slide-01",
      type: "hero",
      badge: "MODULE 1 • ARCHITECTURE",
      title: "How Real Websites Are Built",
      subtitle: "Structure, styles, and assets working inside one folder",
      audio: "audio/slide-01.mp3",
      narration: "Welcome to the full HTML and CSS masterclass! Since you already know programming, web code will click fast. Every site keeps its files inside one project folder: HTML builds the structure, CSS paints the visual design, and Chrome renders them live.",
      narrationTts: "Welcome to the full H T M L and C S S masterclass! Since you already know programming, web code will click fast. Every site keeps its files inside one project folder: H T M L builds the structure, C S S paints the visual design, and Chrome renders them live.",
      content: {
        highlights: [
          {
            icon: "📄",
            title: "index.html (Structure)",
            text: "Defines every element on screen: headings, cards, images, inputs, and buttons.",
            tts: "index dot H T M L, the structure. Defines every element on screen: headings, cards, images, inputs, and buttons."
          },
          {
            icon: "🎨",
            title: "style.css (Visual Rules)",
            text: "Controls fonts, colors, background textures, rounded corners, and centering.",
            tts: "style dot C S S, the visual rules. Controls fonts, colors, background textures, rounded corners, and centering."
          },
          {
            icon: "📁",
            title: "VS Code + Chrome Workflow",
            text: "Save both files in one folder with Ctrl+S, double-click index.html, and hit F5!",
            tts: "V S Code plus Chrome workflow. Save both files in one folder with Control S, double click index dot H T M L, and press F five!"
          }
        ]
      }
    },
    {
      id: "slide-02",
      type: "cards",
      badge: "HTML ANATOMY",
      title: "Tags, Nodes & Attributes",
      subtitle: "How HTML creates elements and configures their behavior",
      audio: "audio/slide-02.mp3",
      narration: "When Chrome opens your HTML file, it reads tags to build a tree of page nodes. Container tags open and close around inner content, void tags stand alone with no closing tag, and attributes pass key-value settings right inside the opening tag.",
      narrationTts: "When Chrome opens your H T M L file, it reads tags to build a tree of page nodes. Container tags open and close around inner content, void tags stand alone with no closing tag, and attributes pass key value settings right inside the opening tag.",
      content: {
        cards: [
          {
            icon: "📦",
            tag: "CONTAINER TAG",
            title: "<div> ... </div>",
            text: "Opens with <tag> and closes with </tag> to wrap text or child elements.",
            tts: "Container tag, like div. Opens with a tag and closes with a forward slash tag to wrap text or child elements."
          },
          {
            icon: "⚡",
            tag: "VOID / STANDALONE TAG",
            title: "<img>, <input>, <hr>",
            text: "Self-contained elements that hold no inner text, so they never need </tag>.",
            tts: "Void or standalone tags, like image, input, and H R. Self-contained elements that hold no inner text, so they never need a closing tag."
          },
          {
            icon: "⚙️",
            tag: "HTML ATTRIBUTE",
            title: "name=\"value\"",
            text: "Written inside the opening tag to configure src, href, type, id, or class.",
            tts: "H T M L attribute: name equals value in quotes. Written inside the opening tag to configure source, H ref, type, I D, or class."
          }
        ]
      }
    },
    {
      id: "slide-03",
      type: "code",
      badge: "DOCUMENT SKELETON",
      title: "Inside Every HTML5 File",
      subtitle: "Tap › to inspect <head> vs. <body> line by line",
      audio: "audio/slide-03.mp3",
      narration: "Pro tip in VS Code: type an exclamation mark and press Tab to generate this skeleton instantly! Notice how the document splits into two zones: the invisible head for settings and links, and the visible body stage.",
      narrationTts: "Pro tip in V S Code: type an exclamation mark and press Tab to generate this skeleton instantly! Notice how the document splits into two zones: the invisible head for settings and links, and the visible body stage.",
      content: {
        language: "html",
        filename: "index.html",
        code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Alex | Home</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>Built in VS Code.</p>\n</body>\n</html>",
        steps: [
          {
            lines: "1-2",
            note: "Switches Chrome into modern HTML5 mode and opens the root <html> node.",
            tts: "Switches Chrome into modern H T M L five mode and opens the root document node."
          },
          {
            lines: "3-6",
            note: "<head> is invisible on the page! UTF-8 enables emojis & Romanian letters.",
            tts: "The head section is invisible on the page! U T F eight enables emojis and special letters."
          },
          {
            lines: "5",
            note: "<title> names the browser tab at the top of Chrome—NOT a page heading!",
            tts: "The title tag names the browser tab at the top of Chrome, not a visible heading on the page!"
          },
          {
            lines: "7-10",
            note: "<body> is the visible stage: every heading, box, image, and button goes here.",
            tts: "The body tag is the visible stage: every heading, box, image, and button goes inside here."
          }
        ]
      }
    },
    {
      id: "slide-04",
      type: "code",
      badge: "SEMESTER CORE HTML",
      title: "Text, Lists & Hyperlinks",
      subtitle: "Tap › to tour the core content tags taught in class",
      audio: "audio/slide-04.mp3",
      narration: "Before building cards and inputs, let's lock down the essential content tags from school: headings from h1 down to h6, bold and italic inline text, divider lines, bullet lists, and clickable links that open in a new tab.",
      narrationTts: "Before building cards and inputs, let's lock down the essential content tags from school: headings from H one down to H six, bold and italic inline text, divider lines, bullet lists, and clickable links that open in a new tab.",
      content: {
        language: "html",
        filename: "index.html",
        code: "<h1>About Me</h1>\n<p>I build <strong>games</strong>\n   and <em>websites</em>.</p>\n<hr>\n<h2>My Hobbies</h2>\n<ul>\n  <li>Coding Python & Web</li>\n  <li>Competitive Gaming</li>\n</ul>\n<a href=\"https://github.com\"\n   target=\"_blank\">My GitHub</a>",
        steps: [
          {
            lines: "1-3",
            note: "<h1> is the main title. <strong> (or <b>) bolds text; <em> (or <i>) italicizes.",
            tts: "H one is the main title. Strong or B makes text bold, while E M or I makes text italic."
          },
          {
            lines: "4-5",
            note: "<hr> draws a horizontal divider line; <h2> starts a smaller section heading.",
            tts: "H R draws a horizontal divider line, and H two starts a smaller section heading."
          },
          {
            lines: "6-9",
            note: "<ul> creates a bulleted list (<ol> numbers it), with each item inside <li>.",
            tts: "U L creates a bulleted list, while O L numbers it, with each list item wrapped inside L I."
          },
          {
            lines: "10-11",
            note: "<a> makes a link via href. target=\"_blank\" opens it in a fresh browser tab!",
            tts: "The A tag makes a link using H ref, and target equals underscore blank opens it in a fresh browser tab!"
          }
        ]
      }
    },
    {
      id: "slide-05",
      type: "reveal",
      badge: "FLASHCARDS • HTML",
      title: "Quick Tag Recall",
      subtitle: "Guess what each tag does, then tap to flip",
      audio: "audio/slide-05.mp3",
      narration: "Warm up your HTML memory! Predict what each tag pair or standalone element produces on screen, then tap all four cards to check yourself.",
      narrationTts: "Warm up your H T M L memory! Predict what each tag pair or standalone element produces on screen, then tap all four cards to check yourself.",
      content: {
        cards: [
          {
            front: "<h1> vs <h6>",
            back: "Largest vs. smallest heading",
            tts: "H one creates the largest main heading, while H six creates the smallest sub-heading."
          },
          {
            front: "<ul> + <li>",
            back: "Bullet list + list items",
            tts: "U L starts an unordered bullet list, and each L I creates one bullet point inside it."
          },
          {
            front: "<br> vs <hr>",
            back: "Line break vs. divider line",
            tts: "B R jumps to a new line without a closing tag, while H R draws a horizontal divider line."
          },
          {
            front: "<a href=\"...\">",
            back: "Clickable link to a URL",
            tts: "The anchor tag A with an H ref attribute creates a clickable link to another address."
          }
        ]
      }
    },
    {
      id: "slide-06",
      type: "quiz",
      badge: "TRICKY CHECK • 1",
      title: "The Blank White Page Trap!",
      subtitle: "You wrote <title>Welcome</title> in <head>—why is the page blank?",
      audio: "audio/slide-06.mp3",
      narration: "Watch out, this tricks half the class on tests! You typed title Welcome inside head, saved, opened Chrome, and the page canvas is completely empty white. Why?",
      narrationTts: "Watch out, this tricks half the class on tests! You typed title Welcome inside head, saved, opened Chrome, and the page canvas is completely empty white. Why?",
      content: {
        options: [
          { text: "It only names the browser tab", correct: true },
          { text: "<title> belongs inside <body>" },
          { text: "Chrome requires style.css" },
          { text: "<h1> belongs inside <head>" }
        ],
        hint: "Look up at the very top bar of your browser window—where did 'Welcome' appear?",
        explanation: "Gotcha avoided! <title> inside <head> only labels the browser tab. To show a visible title on the page, put <h1> inside <body>.",
        explanationTts: "Gotcha avoided! The title tag inside head only labels the browser tab at the top of Chrome. To show a visible heading on the page, put an H one tag inside body."
      }
    },
    {
      id: "slide-07",
      type: "input",
      badge: "CHECKPOINT • 2",
      title: "Link Destination Attribute",
      subtitle: "Images use src—which attribute sets an <a> link's URL?",
      audio: "audio/slide-07.mp3",
      narration: "Tricky pair alert: images load files with S R C, while anchor links use a different four-letter attribute to set their destination URL. Type that attribute name!",
      narrationTts: "Tricky pair alert: images load files with S R C, while anchor links use a different four letter attribute to set their destination U R L. Type that attribute name!",
      content: {
        placeholder: "4-letter attribute...",
        answers: ["href"],
        match: { caseSensitive: false, plural: false },
        hint: "Starts with 'h' and stands for Hypertext REFerence.",
        explanation: "Spot on: href! Remember the pair: <img src=\"...\"> loads an image source, while <a href=\"...\"> points to a link reference.",
        explanationTts: "Spot on: H ref! Remember the pair: image uses S R C to load an image source, while A uses H ref to point to a link reference."
      }
    },

    // =========================================================================
    // MODULE 2: HERO CARDS, IMAGES & FORM INPUTS (SLIDES 08–12)
    // =========================================================================
    {
      id: "slide-08",
      type: "code",
      badge: "MODULE 2 • HERO CARD",
      title: "Building a Hero Profile Box",
      subtitle: "Tap › to group your photo, name, and bio inside a <div>",
      audio: "audio/slide-08.mp3",
      narration: "In web design, that top showcase box with your circular photo and intro is called a Hero Card! In HTML, you build a card by wrapping an image, heading, and bio paragraph inside a div container with an ID and class.",
      narrationTts: "In web design, that top showcase box with your circular photo and intro is called a Hero Card! In H T M L, you build a card by wrapping an image, heading, and bio paragraph inside a div container with an I D and class.",
      content: {
        language: "html",
        filename: "index.html",
        code: "<div id=\"hero\" class=\"card\">\n  <img id=\"avatar\"\n       src=\"me.jpg\"\n       alt=\"Alex portrait\">\n  <h1>Alex</h1>\n  <p>Coder • Gamer • Builder</p>\n</div>",
        steps: [
          {
            lines: "1,7",
            note: "<div> is a generic layout box. class=\"card\" shares card styles; id=\"hero\" is unique.",
            tts: "Div is a generic layout box. Class equals card shares card styles, while I D equals hero is unique."
          },
          {
            lines: "2-4",
            note: "<img> loads me.jpg from your folder. alt describes the photo if it fails to load.",
            tts: "The image tag loads me dot J P G from your folder, and alt describes the photo if the file is missing."
          },
          {
            lines: "5-6",
            note: "<h1> displays your name big and bold, with a clean tagline paragraph underneath.",
            tts: "H one displays your name big and bold, with a clean tagline paragraph right underneath."
          }
        ]
      }
    },
    {
      id: "slide-09",
      type: "code",
      badge: "FORM CONTROLS",
      title: "Text, Password & Button Box",
      subtitle: "Tap › to build the interactive VIP Login Card",
      audio: "audio/slide-09.mp3",
      narration: "Now let's build the exact kind of interactive form box schools love testing—done cleanly! Inside a second card div, we pair labels with a text input, a masked password input, and a clickable submit button.",
      narrationTts: "Now let's build the exact kind of interactive form box schools love testing, done cleanly! Inside a second card div, we pair labels with a text input, a masked password input, and a clickable submit button.",
      content: {
        language: "html",
        filename: "index.html",
        code: "<div id=\"vip\" class=\"card\">\n  <h2>VIP Club Login</h2>\n  <label>Name</label>\n  <input type=\"text\"\n         placeholder=\"Your name\">\n  <label>Password</label>\n  <input type=\"password\"\n         placeholder=\"Secret\">\n  <button>Unlock VIP</button>\n</div>",
        steps: [
          {
            lines: "1-2",
            note: "Notice class=\"card\" again! Both #hero and #vip automatically share .card styles.",
            tts: "Notice class equals card again! Both hero and V I P will automatically share all dot card styles."
          },
          {
            lines: "3-5",
            note: "<label> names the field; <input type=\"text\"> lets visitors type plain text.",
            tts: "Label names the field above it, and input type equals text lets visitors type plain text."
          },
          {
            lines: "6-8",
            note: "type=\"password\" hides every typed character behind black security dots!",
            tts: "Input type equals password hides every typed character behind black security dots!"
          },
          {
            lines: "9",
            note: "<button> creates a clickable button with its visible label between the tags.",
            tts: "The button tag creates a clickable button with its visible text placed between opening and closing tags."
          }
        ]
      }
    },
    {
      id: "slide-10",
      type: "quiz",
      badge: "CHECKPOINT • 3",
      title: "Masking Secret Passwords",
      subtitle: "Which HTML element hides typed letters as dots?",
      audio: "audio/slide-10.mp3",
      narration: "Quick form check! Which of these four tags is valid HTML for a password box that masks characters as you type?",
      narrationTts: "Quick form check! Which of these four tags is valid H T M L for a password box that masks characters as you type?",
      content: {
        options: [
          { text: "<input type=\"text\">" },
          { text: "<input type=\"password\">", correct: true },
          { text: "<password>" },
          { text: "<textbox secret=\"true\">" }
        ],
        hint: "HTML uses one universal <input> tag and switches behavior with its type attribute.",
        explanation: "Correct: <input type=\"password\">! Changing type from \"text\" to \"password\" tells Chrome to mask every keystroke.",
        explanationTts: "Correct: input type equals password! Changing the type attribute from text to password tells Chrome to mask every keystroke."
      }
    },
    {
      id: "slide-11",
      type: "quiz",
      badge: "TRICKY CHECK • 4",
      title: "Why Did My Photo Break?",
      subtitle: "me.jpg is inside an images/ subfolder, and <img> shows broken!",
      audio: "audio/slide-11.mp3",
      narration: "Bug hunt! Your index dot html sits in your main folder, your selfie me dot jpg sits inside an images subfolder, and img src equals me dot jpg shows a broken icon. What fixes it?",
      narrationTts: "Bug hunt! Your index dot H T M L sits in your main folder, your selfie me dot J P G sits inside an images subfolder, and image source equals me dot J P G shows a broken icon. What fixes it?",
      content: {
        options: [
          { text: "src=\"images/me.jpg\"", correct: true },
          { text: "href=\"images/me.jpg\"" },
          { text: "url=\"images/me.jpg\"" },
          { text: "Move <img> into <head>" }
        ],
        hint: "<img> uses src, and relative paths start from the folder where index.html lives.",
        explanation: "Exact fix: src=\"images/me.jpg\"! Always include the subfolder path relative to index.html—or keep me.jpg in the same folder.",
        explanationTts: "Exact fix: source equals images slash me dot J P G! Always include the subfolder path relative to index dot H T M L, or keep the photo right in the same folder."
      }
    },
    {
      id: "slide-12",
      type: "compare",
      badge: "CRITICAL DISTINCTION",
      title: "Attributes vs. CSS Properties",
      subtitle: "Don't mix up HTML tag settings with CSS visual rules",
      audio: "audio/slide-12.mp3",
      narration: "Beginners often mix up HTML attributes and CSS properties because both assign values. Keep this distinction sharp: HTML attributes use equals and quotes inside angle brackets, while CSS properties use colons and semicolons inside curly braces.",
      narrationTts: "Beginners often mix up H T M L attributes and C S S properties because both assign values. Keep this distinction sharp: H T M L attributes use equals and quotes inside angle brackets, while C S S properties use colons and semicolons inside curly braces.",
      content: {
        left: {
          tag: "⚙️ HTML ATTRIBUTES",
          title: "type=\"password\"",
          points: [
            "Lives inside HTML tag: <input ...>",
            "Syntax uses = and quotes.",
            "Configures src, href, type, id, class."
          ]
        },
        right: {
          tag: "🎨 CSS PROPERTIES",
          title: "border-radius: 16px;",
          points: [
            "Lives in style.css inside { } braces.",
            "Syntax uses : colon and ; semicolon.",
            "Controls colors, fonts, size, spacing."
          ]
        }
      }
    },

    // =========================================================================
    // MODULE 3: CONNECTING CSS, GOOGLE FONTS & SELECTORS (SLIDES 13–19)
    // =========================================================================
    {
      id: "slide-13",
      type: "cards",
      badge: "MODULE 3 • CONNECTING CSS",
      title: "3 Ways to Attach CSS",
      subtitle: "Schools test all three—pros use External stylesheets",
      audio: "audio/slide-13.mp3",
      narration: "Teachers love asking the three ways to add CSS to a page. Inline styles paint a single tag, internal style blocks live inside head for quick single-file tests, and external CSS files keep your project clean and scalable.",
      narrationTts: "Teachers love asking the three ways to add C S S to a page. Inline styles paint a single tag, internal style blocks live inside head for quick single file tests, and external C S S files keep your project clean and scalable.",
      content: {
        cards: [
          {
            icon: "1️⃣",
            tag: "INLINE CSS (MESSY)",
            title: "<div style=\"color: blue;\">",
            text: "Written on one tag. Quick test hack, painful if you have 20 elements.",
            tts: "One: Inline C S S. Written inside a style attribute on one tag. Fine for a quick test, painful if you have twenty elements."
          },
          {
            icon: "2️⃣",
            tag: "INTERNAL CSS (BACKUP)",
            title: "<style> ... </style>",
            text: "Placed inside <head>. Handy backup when a test wants just one .html file!",
            tts: "Two: Internal C S S. A style block placed inside head. Handy backup when a school test asks for just a single H T M L file!"
          },
          {
            icon: "3️⃣",
            tag: "EXTERNAL CSS (PRO)",
            title: "<link href=\"style.css\">",
            text: "Separate style.css file linked in <head>. Cleanest architecture!",
            tts: "Three: External C S S. A separate style dot C S S file linked inside head. The cleanest professional architecture!"
          }
        ]
      }
    },
    {
      id: "slide-14",
      type: "code",
      badge: "GOOGLE FONTS + CSS",
      title: "Loading Cool Google Fonts",
      subtitle: "Tap › to load custom fonts and style.css in <head>",
      audio: "audio/slide-14.mp3",
      narration: "Want your page to look like a real gaming or tech site instead of default Arial? Visit fonts dot google dot com, copy a font link like Orbitron or Poppins into head right above your style dot css link, and use its name in CSS!",
      narrationTts: "Want your page to look like a real gaming or tech site instead of default Arial? Visit fonts dot google dot com, copy a font link like Orbitron or Poppins into head right above your style dot C S S link, and use its name in C S S!",
      content: {
        language: "html",
        filename: "index.html",
        code: "<head>\n  <meta charset=\"UTF-8\">\n  <title>Alex | Portfolio</title>\n  <link rel=\"stylesheet\"\nhref=\"https://fonts.googleapis.com/css2?family=Poppins\">\n  <link rel=\"stylesheet\"\n    href=\"style.css\">\n</head>",
        steps: [
          {
            lines: "4-5",
            note: "First <link> fetches the 'Poppins' font family straight from Google Fonts.",
            tts: "The first link tag fetches the Poppins font family straight from Google Fonts."
          },
          {
            lines: "6-7",
            note: "Second <link> loads YOUR local style.css—spell the filename identically!",
            tts: "The second link tag loads your local style dot C S S file. Make sure the filename spelling matches identically!"
          },
          {
            lines: "1-8",
            note: "rel=\"stylesheet\" is mandatory! Without rel, Chrome ignores your CSS file.",
            tts: "R E L equals stylesheet is mandatory! If you forget rel equals stylesheet, Chrome completely ignores your C S S file."
          }
        ]
      }
    },
    {
      id: "slide-15",
      type: "cards",
      badge: "CSS SELECTORS",
      title: "3 Flat Style Selectors",
      subtitle: "Targeting by node name, .class, or #id (no nesting needed)",
      audio: "audio/slide-15.mp3",
      narration: "In style dot css, every rule starts with a selector telling Chrome which elements to paint. Without nesting selectors inside each other yet, three flat selector types handle everything: bare node names, dot-classes, and hash-IDs.",
      narrationTts: "In style dot C S S, every rule starts with a selector telling Chrome which elements to paint. Without nesting selectors inside each other yet, three flat selector types handle everything: bare node names, dot classes, and hash I Ds.",
      content: {
        cards: [
          {
            icon: "🏷️",
            tag: "NODE / TAG NAME",
            title: "input { ... }",
            text: "No symbol prefix. Styles EVERY <input> node across the whole page.",
            tts: "Node or tag name selector: write input with no prefix symbol. It styles every input element across the whole page."
          },
          {
            icon: "✨",
            tag: "CLASS SELECTOR (.)",
            title: ".card { ... }",
            text: "Dot prefix. Reusable style shared by every box with class=\"card\".",
            tts: "Class selector: starts with a dot, like dot card. A reusable style shared by every box wearing class equals card."
          },
          {
            icon: "🎯",
            tag: "ID SELECTOR (#)",
            title: "#vip { ... }",
            text: "Hash prefix. Targets the ONE unique element with id=\"vip\"—highest priority!",
            tts: "I D selector: starts with a hash symbol, like hash V I P. Targets the one unique element with I D equals V I P, and carries the highest priority!"
          }
        ]
      }
    },
    {
      id: "slide-16",
      type: "code",
      badge: "CSS RULE ANATOMY",
      title: "Writing Clean style.css Rules",
      subtitle: "Tap › to see Google Fonts and all 3 selectors in action",
      audio: "audio/slide-16.mp3",
      narration: "Let's put our Google Font and all three selector types into style dot css. Watch the punctuation carefully: curly braces wrap the block, a colon separates property from value, and every single line ends with a semicolon.",
      narrationTts: "Let's put our Google Font and all three selector types into style dot C S S. Watch the punctuation carefully: curly braces wrap the block, a colon separates property from value, and every single line ends with a semicolon.",
      content: {
        language: "css",
        filename: "style.css",
        code: "body {\n  font-family: \"Poppins\", Arial;\n  color: #f8fafc;\n}\n.card {\n  background-color: #1e293b;\n  text-align: center;\n}\n#vip {\n  background-color: #0f172a;\n}",
        steps: [
          {
            lines: "1-4",
            note: "Applies Google's 'Poppins' font (with Arial fallback) and crisp white text to body.",
            tts: "Applies Google's Poppins font, with Arial as an offline fallback, plus crisp light text on body."
          },
          {
            lines: "5-8",
            note: ".card paints BOTH #hero and #vip slate-blue and centers text inside them.",
            tts: "Dot card paints both the hero box and the V I P box slate blue, and centers text inside them."
          },
          {
            lines: "9-11",
            note: "#vip overrides background-color on JUST the VIP card because #id beats .class!",
            tts: "Hash V I P overrides background color on just the V I P card, because an I D selector is more specific than a class!"
          }
        ]
      }
    },
    {
      id: "slide-17",
      type: "reveal",
      badge: "FLASHCARDS • SELECTORS",
      title: "Selector & Syntax Drill",
      subtitle: "Think first, then tap each card to flip",
      audio: "audio/slide-17.mp3",
      narration: "Check your CSS reflexes! Predict what each selector targets—and what happens when a semicolon goes missing—then flip all four cards.",
      narrationTts: "Check your C S S reflexes! Predict what each selector targets, and what happens when a semicolon goes missing, then flip all four cards.",
      content: {
        cards: [
          {
            front: "button",
            back: "Every <button> tag on page",
            tts: "A bare word with no dot or hash is a tag selector: it styles every button tag on the page."
          },
          {
            front: ".card",
            back: "All elements with class=\"card\"",
            tts: "Dot card is a class selector: it targets every element that has class equals card."
          },
          {
            front: "#hero",
            back: "The single id=\"hero\" element",
            tts: "Hash hero is an I D selector: it targets the single unique element with I D equals hero."
          },
          {
            front: "Missing ;",
            back: "Breaks the NEXT CSS line!",
            tts: "Forgetting a semicolon at the end of a line causes Chrome to misread and break the very next C S S property!"
          }
        ]
      }
    },
    {
      id: "slide-18",
      type: "input",
      badge: "CHECKPOINT • 5",
      title: "Target id=\"hero\" in CSS",
      subtitle: "Type the exact selector that goes before { }",
      audio: "audio/slide-18.mp3",
      narration: "Your profile box is written as div id equals hero. Type the exact CSS selector you put in front of the curly braces to target only that hero box.",
      narrationTts: "Your profile box is written as div I D equals hero. Type the exact C S S selector you put in front of the curly braces to target only that hero box.",
      content: {
        placeholder: "Type selector...",
        answers: ["#hero"],
        match: { caseSensitive: false, plural: false },
        hint: "Class selectors use a dot (.); unique ID selectors use a hash (#).",
        explanation: "Nailed it: #hero! id=\"hero\" in HTML pairs with #hero in CSS, while class=\"card\" pairs with .card.",
        explanationTts: "Nailed it: hash hero! I D equals hero in H T M L pairs with hash hero in C S S, while class equals card pairs with dot card."
      }
    },
    {
      id: "slide-19",
      type: "quiz",
      badge: "TRICKY CHECK • 6",
      title: "Specificity Color Battle!",
      subtitle: "<div id=\"vip\" class=\"card\">: div=gray, .card=blue, #vip=purple",
      audio: "audio/slide-19.mp3",
      narration: "Tricky brain-teaser! One box matches three CSS rules at the same time: div sets gray, dot card sets blue, and hash vip sets purple. Which background color wins on screen?",
      narrationTts: "Tricky brain teaser! One box matches three C S S rules at the same time: div sets gray, dot card sets blue, and hash V I P sets purple. Which background color wins on screen?",
      content: {
        options: [
          { text: "Gray (div is the tag)" },
          { text: "Blue (.card is reusable)" },
          { text: "Purple (#vip wins)", correct: true },
          { text: "Browser throws an error" }
        ],
        hint: "Think about precision: general tag vs. shared group vs. one-of-a-kind serial number.",
        explanation: "Purple (#vip) wins! CSS specificity ranks #id strongest, .class second, and bare tag names third—regardless of order!",
        explanationTts: "Purple wins! C S S specificity ranks hash I D strongest, dot class second, and bare tag names third, regardless of which rule comes first in the file!"
      }
    },

    // =========================================================================
    // MODULE 4: BOX MODEL, ROUNDED CORNERS & CIRCULAR PHOTO (SLIDES 20–24)
    // =========================================================================
    {
      id: "slide-20",
      type: "cards",
      badge: "MODULE 4 • THE BOX MODEL",
      title: "Every Element Is a 4-Layer Box",
      subtitle: "Content → Padding → Border → Margin",
      audio: "audio/slide-20.mp3",
      narration: "Yes, the CSS Box Model is still one hundred percent foundational! Every element has content at its core, wrapped by padding on the inside, a border wall around the edge, and margin pushing other elements away outside.",
      narrationTts: "Yes, the C S S Box Model is still one hundred percent foundational! Every element has content at its core, wrapped by padding on the inside, a border wall around the edge, and margin pushing other elements away outside.",
      content: {
        cards: [
          {
            icon: "🛋️",
            tag: "1. PADDING (INNER)",
            title: "padding: 24px;",
            text: "Breathing room INSIDE the box between your content and the border wall.",
            tts: "Padding: twenty-four pixels. Breathing room inside the box between your content and the border wall."
          },
          {
            icon: "🖼️",
            tag: "2. BORDER (THE WALL)",
            title: "border: 2px solid #38bdf8;",
            text: "Visible frame around the box: line thickness, style (solid/dashed), and color.",
            tts: "Border: two pixels solid blue. The visible frame around the box: thickness, line style, and color."
          },
          {
            icon: "↔️",
            tag: "3. MARGIN (OUTER)",
            title: "margin-bottom: 16px;",
            text: "Transparent personal space OUTSIDE the border pushing neighbors away.",
            tts: "Margin bottom: sixteen pixels. Transparent personal space outside the border pushing neighboring elements away."
          }
        ]
      }
    },
    {
      id: "slide-21",
      type: "code",
      badge: "HIGH-IMPACT CARDS",
      title: "Rounded Cards & border-box",
      subtitle: "Tap › to give .card pro spacing, glow, and smooth corners",
      audio: "audio/slide-21.mp3",
      narration: "Here is the exact CSS recipe for a modern card! Notice box-sizing border-box: it tells Chrome to include padding and border inside your three-forty pixel width instead of ballooning the box wider!",
      narrationTts: "Here is the exact C S S recipe for a modern card! Notice box sizing border box: it tells Chrome to include padding and border inside your three hundred forty pixel width, instead of ballooning the box wider!",
      content: {
        language: "css",
        filename: "style.css",
        code: ".card {\n  width: 340px;\n  box-sizing: border-box;\n  padding: 24px;\n  border: 2px solid #38bdf8;\n  border-radius: 20px;\n  box-shadow: 0 12px 28px #020617;\n}",
        steps: [
          {
            lines: "2-3",
            note: "340px wide, and border-box keeps padding from expanding the total width!",
            tts: "Sets a clean three hundred forty pixel width, and border box keeps padding from expanding the total width!"
          },
          {
            lines: "4-5",
            note: "24px inner padding stops text touching the glowing 2px cyan border.",
            tts: "Twenty-four pixels of inner padding stops your text and inputs from touching the two pixel cyan border."
          },
          {
            lines: "6-7",
            note: "border-radius: 20px rounds sharp corners; box-shadow floats the card in 3D!",
            tts: "Border radius twenty pixels rounds sharp ninety degree corners, while box shadow floats the card with depth!"
          }
        ]
      }
    },
    {
      id: "slide-22",
      type: "code",
      badge: "CIRCULAR HERO PHOTO",
      title: "Photo in a Perfect Circle",
      subtitle: "Tap › to turn any phone selfie into a crisp round avatar",
      audio: "audio/slide-22.mp3",
      narration: "How do you put a photo of yourself inside a crisp circle at the top of your Hero Card? Give it equal width and height, set border-radius to fifty percent, and add object-fit cover so a rectangular photo never squishes your face!",
      narrationTts: "How do you put a photo of yourself inside a crisp circle at the top of your Hero Card? Give it equal width and height, set border radius to fifty percent, and add object fit cover so a rectangular photo never squishes your face!",
      content: {
        language: "css",
        filename: "style.css",
        code: "#avatar {\n  width: 110px;\n  height: 110px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 3px solid #00ff85;\n}",
        steps: [
          {
            lines: "2-3",
            note: "A true circle MUST start as a square: width and height both 110px!",
            tts: "A true circle must start as an exact square: width and height are both one hundred ten pixels!"
          },
          {
            lines: "4",
            note: "object-fit: cover crops rectangular photos cleanly instead of squishing faces!",
            tts: "Object fit cover crops rectangular phone photos cleanly instead of squishing your face!"
          },
          {
            lines: "5-6",
            note: "border-radius: 50% curves the square into a circle with a neon green ring!",
            tts: "Border radius fifty percent curves the square into a perfect circle framed by a neon green ring!"
          }
        ]
      }
    },
    {
      id: "slide-23",
      type: "input",
      badge: "CHECKPOINT • 7",
      title: "Fix Cramped Box Content",
      subtitle: "Type the CSS property that adds cushion INSIDE the border",
      audio: "audio/slide-23.mp3",
      narration: "Your text and inputs are pressed right up against the blue border of your card. Type the CSS property that adds breathing space on the inside of the wall!",
      narrationTts: "Your text and inputs are pressed right up against the blue border of your card. Type the C S S property that adds breathing space on the inside of the wall!",
      content: {
        placeholder: "CSS property...",
        answers: ["padding"],
        match: { caseSensitive: false, plural: false },
        hint: "Margin is outside the border; this 7-letter P-word cushions the inside.",
        explanation: "Correct: padding! Padding cushions the inside of a box, while margin pushes neighboring boxes away on the outside.",
        explanationTts: "Correct: padding! Padding cushions the inside of a box, while margin pushes neighboring boxes away on the outside."
      }
    },
    {
      id: "slide-24",
      type: "quiz",
      badge: "TRICKY CHECK • 8",
      title: "The Egg-Shaped Selfie Bug!",
      subtitle: "You set border-radius: 50% on a 400×250 photo and got an oval!",
      audio: "audio/slide-24.mp3",
      narration: "Classic real-world bug! You took a wide landscape selfie, added border-radius fifty percent, and got a stretched sideways egg instead of a circle. What fixes it?",
      narrationTts: "Classic real world bug! You took a wide landscape selfie, added border radius fifty percent, and got a stretched sideways egg instead of a circle. What fixes it?",
      content: {
        options: [
          { text: "Equal width/height + cover", correct: true },
          { text: "border-radius: 100%" },
          { text: "margin: 50% auto" },
          { text: "padding: 50%" }
        ],
        hint: "50% rounds a rectangle into an oval—what shape must the box be BEFORE rounding?",
        explanation: "Bingo! Equal width & height (e.g. 110px × 110px) makes a square so 50% becomes a circle, and object-fit: cover stops distortion.",
        explanationTts: "Bingo! Equal width and height makes an exact square so fifty percent becomes a true circle, and object fit cover prevents distortion."
      }
    },

    // =========================================================================
    // MODULE 5: BACKGROUND TEXTURES & MODERN CENTERING (SLIDES 25–29)
    // =========================================================================
    {
      id: "slide-25",
      type: "code",
      badge: "MODULE 5 • TEXTURES",
      title: "Background Colors & Textures",
      subtitle: "Tap › for both pure-CSS dot textures and image tiles",
      audio: "audio/slide-25.mp3",
      narration: "Solid backgrounds are fine, but subtle textures look next-level! You can tile a local image file with url, or generate a crisp cyber dot-matrix texture directly in CSS with radial-gradient—zero external files needed!",
      narrationTts: "Solid backgrounds are fine, but subtle textures look next level! You can tile a local image file with U R L, or generate a crisp cyber dot matrix texture directly in C S S with radial gradient, zero external files needed!",
      content: {
        language: "css",
        filename: "style.css",
        code: "body {\n  background-color: #0b1120;\n  background-image:\n    radial-gradient(#334155 1.5px,\n      transparent 1.5px);\n  background-size: 22px 22px;\n}\n/* Or tile an image file:\n  background-image: url(\"bg.png\");\n*/",
        steps: [
          {
            lines: "2",
            note: "Sets a deep midnight base color underneath any pattern or transparent image.",
            tts: "Sets a deep midnight base color underneath any pattern or transparent image."
          },
          {
            lines: "3-6",
            note: "Draws tiny slate dots every 22px—instant developer grid texture with zero files!",
            tts: "Draws tiny slate dots every twenty-two pixels, giving you an instant developer grid texture with zero image files!"
          },
          {
            lines: "8-10",
            note: "Have a cool texture file? Swap in background-image: url(\"bg.png\"); instead!",
            tts: "Have a cool texture image file in your folder? Swap in background image U R L B G dot P N G instead!"
          }
        ]
      }
    },
    {
      id: "slide-26",
      type: "compare",
      badge: "MODERN LAYOUTS",
      title: "Centering: Old vs. Modern",
      subtitle: "Goodbye negative margins—hello CSS Flexbox!",
      audio: "audio/slide-26.mp3",
      narration: "Years ago, centering a box on screen required ugly absolute positioning and negative-margin math! Today, CSS Flexbox centers one or multiple cards horizontally and vertically in just three clean lines on the parent.",
      narrationTts: "Years ago, centering a box on screen required ugly absolute positioning and negative margin math! Today, C S S Flexbox centers one or multiple cards horizontally and vertically in just three clean lines on the parent.",
      content: {
        left: {
          tag: "❌ 2010 OLD-SCHOOL",
          title: "Negative Margin Hacks",
          points: [
            "position: absolute; top: 50%;",
            "Manual margin-left: -170px math.",
            "Breaks when content grows taller!"
          ]
        },
        right: {
          tag: "✅ MODERN FLEXBOX",
          title: "display: flex on body",
          points: [
            "Centers any box size automatically.",
            "Works horizontally AND vertically.",
            "gap: 24px spaces multiple cards!"
          ]
        }
      }
    },
    {
      id: "slide-27",
      type: "code",
      badge: "MODERN CENTERING",
      title: "Centering Cards with Flexbox",
      subtitle: "Tap › to center your Hero & VIP cards on any screen",
      audio: "audio/slide-27.mp3",
      narration: "Put these lines on body and watch the magic: display flex activates Flexbox, flex-direction column stacks your Hero card above your VIP card, align-items and justify-content center them, and gap spaces them cleanly!",
      narrationTts: "Put these lines on body and watch the magic: display flex activates Flexbox, flex direction column stacks your Hero card above your V I P card, align items and justify content center them, and gap spaces them cleanly!",
      content: {
        language: "css",
        filename: "style.css",
        code: "body {\n  min-height: 100vh;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n}",
        steps: [
          {
            lines: "2-3",
            note: "100vh makes body fill 100% of the screen height; margin: 0 removes edge gaps.",
            tts: "One hundred V H makes body fill one hundred percent of the viewport height, and margin zero removes default browser gaps."
          },
          {
            lines: "4-5",
            note: "Turns body into a Flexbox container stacking children top-to-bottom (column).",
            tts: "Display flex turns body into a Flexbox container, and column stacks your cards top to bottom."
          },
          {
            lines: "6-8",
            note: "Dead-centers both cards on screen and puts 24px of clean air between them!",
            tts: "Justify content and align items dead-center both cards on screen, and gap puts twenty-four pixels between them!"
          }
        ]
      }
    },
    {
      id: "slide-28",
      type: "code",
      badge: "POLISHING CONTROLS",
      title: "Styling Inputs & Hover Buttons",
      subtitle: "Tap › to make inputs fit cleanly and buttons glow",
      audio: "audio/slide-28.mp3",
      narration: "One sneaky CSS trap: setting width one hundred percent plus padding on an input makes it poke outside its card—unless you add box-sizing border-box! Finish with a bold neon button and a hover effect.",
      narrationTts: "One sneaky C S S trap: setting width one hundred percent plus padding on an input makes it poke outside its card, unless you add box sizing border box! Finish with a bold neon button and a hover effect.",
      content: {
        language: "css",
        filename: "style.css",
        code: "input {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 12px;\n  margin-bottom: 14px;\n  border-radius: 10px;\n}\nbutton {\n  width: 100%;\n  padding: 12px;\n  border-radius: 10px;\n  background-color: #00ff85;\n  cursor: pointer;\n}\nbutton:hover { opacity: 0.85; }",
        steps: [
          {
            lines: "1-7",
            note: "border-box keeps 100%-wide padded inputs tucked neatly inside .card!",
            tts: "Box sizing border box keeps one hundred percent wide padded inputs tucked neatly inside your card!"
          },
          {
            lines: "8-14",
            note: "Full-width neon button with 10px rounded corners and a hand pointer icon.",
            tts: "Styles a full width neon green button with ten pixel rounded corners and a clickable hand cursor."
          },
          {
            lines: "15",
            note: ":hover reacts live the instant your mouse moves over the button!",
            tts: "Button colon hover reacts live the instant your mouse cursor moves over the button!"
          }
        ]
      }
    },
    {
      id: "slide-29",
      type: "input",
      badge: "TRICKY CHECK • 9",
      title: "Unlock Flexbox Centering!",
      subtitle: "justify-content & align-items do NOTHING until display is set to...?",
      audio: "audio/slide-29.mp3",
      narration: "Tricky bug! You wrote justify-content center and align-items center on body, refreshed Chrome, and your boxes stayed stuck in the corner! What value must display be set to?",
      narrationTts: "Tricky bug! You wrote justify content center and align items center on body, refreshed Chrome, and your boxes stayed stuck in the corner! What value must display be set to?",
      content: {
        placeholder: "display: ___",
        answers: ["flex", "display: flex", "display:flex"],
        match: { caseSensitive: false, plural: false },
        hint: "Short 4-letter word from 'Flexbox'—turns on flexible layout mode.",
        explanation: "Yes: flex! Without 'display: flex', browsers ignore justify-content, align-items, and gap on normal block elements.",
        explanationTts: "Yes: flex! Without display colon flex, browsers completely ignore justify content, align items, and gap on normal block elements."
      }
    },

    // =========================================================================
    // MODULE 6: BUG DETECTIVE, PERSONAL SITE MISSION & FINAL SCORE (30–32)
    // =========================================================================
    {
      id: "slide-30",
      type: "quiz",
      badge: "TRICKY CHECK • 10",
      title: "Why Did ZERO Styles Appear?",
      subtitle: "Your CSS code & <link href=\"style.css\"> are both error-free!",
      audio: "audio/slide-30.mp3",
      narration: "Final boss question! Your HTML link tag is spotless, your CSS syntax has zero typos, both files sit in the same folder—yet pressing F5 in Chrome still shows plain white HTML. Why?",
      narrationTts: "Final boss question! Your H T M L link tag is spotless, your C S S syntax has zero typos, both files sit in the same folder, yet pressing F five in Chrome still shows plain white H T M L. Why?",
      content: {
        options: [
          { text: "Forgot Ctrl+S in VS Code!", correct: true },
          { text: "CSS needs Wi-Fi to run" },
          { text: "Chrome blocks dark colors" },
          { text: "<img> must load before CSS" }
        ],
        hint: "Look at the tab bar at the top of VS Code—what does that white dot next to style.css mean?",
        explanation: "Every developer has done this! A white dot on a VS Code tab means unsaved changes—Chrome only reads what's saved on disk with Ctrl+S.",
        explanationTts: "Every developer has done this! A white dot on a V S Code tab means unsaved changes. Chrome only reads what is saved on disk with Control S."
      }
    },
    {
      id: "slide-31",
      type: "mission",
      badge: "WEEKEND MISSION • VS CODE",
      title: "Build Your Personal Site!",
      subtitle: "Keep this phone beside your keyboard and type every line yourself",
      audio: "audio/slide-31.mp3",
      narration: "You now have the full semester toolkit—and way better styling tricks! Open VS Code on your computer, keep this deck next to your keyboard to swipe back to any code slide, and build your complete two-card personal website.",
      narrationTts: "You now have the full semester toolkit, and way better styling tricks! Open V S Code on your computer, keep this deck next to your keyboard to swipe back to any code slide, and build your complete two card personal website.",
      content: {
        goal: "Build a centered, textured personal webpage with a Hero Profile Card and a VIP Login Card.",
        steps: [
          {
            number: "01",
            title: "Folder, Selfie & Google Font",
            text: "Create my-site/ with index.html, style.css, and me.jpg. Link a Google Font + style.css.",
            tts: "Step one: Folder, selfie, and Google Font. Create a my site folder with index dot H T M L, style dot C S S, and your photo, then link a Google Font and style dot C S S."
          },
          {
            number: "02",
            title: "Hero Card + VIP Login Card",
            text: "Add #hero.card (round photo, bio, hobbies/link) and #vip.card (Name, Password, Button).",
            tts: "Step two: Hero Card plus V I P Login Card. Add your hero card with a round photo, bio, and hobby list, plus your V I P card with Name input, Password input, and Button."
          },
          {
            number: "03",
            title: "Flexbox, Texture & Live Test",
            text: "Center on body with display: flex + dot texture, round corners, Ctrl+S, and test live!",
            tts: "Step three: Flexbox, texture, and live test. Center on body with display flex plus a dot texture, round your corners, press Control S, and practice editing colors live!"
          }
        ],
        reward: "🏆 Ready for Monday: You can explain and live-edit every single tag and CSS rule!"
      }
    },
    {
      id: "slide-32",
      type: "results",
      badge: "SEMESTER MASTERED",
      title: "Grade: Your First-Try Score!",
      subtitle: "Out of 10 HTML & CSS checkpoints—ready to code!",
      audio: "audio/slide-32.mp3",
      narration: "Congratulations on completing the full HTML and CSS masterclass! Here is your first-try score out of ten tricky checkpoints. Swipe back to any code card whenever you want while building your website in VS Code!",
      narrationTts: "Congratulations on completing the full H T M L and C S S masterclass! Here is your first try score out of ten tricky checkpoints. Swipe back to any code card whenever you want while building your website in V S Code!",
      content: {
        icon: "🏆",
        tiers: [
          { min: 0.9, text: "Grade 10 Master! Unstoppable! 🥇" },
          { min: 0.7, text: "Strong Coder! Ready to Shine! ⚡" },
          { min: 0, text: "Solid Run! Now Build It Live in VS Code! 💻" }
        ]
      }
    }
  ]
};
