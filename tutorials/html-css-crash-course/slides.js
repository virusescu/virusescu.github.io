window.PRESENTATION_DATA = {
  id: "html-css-crash-course",
  format: "mobile",
  lang: "en",
  sfx: true,
  title: "Masterclass: HTML & CSS",
  subtitle: "Full-semester quest: tags, tables, Friday's test, Pixel Fonts, Glass & Flexbox",
  theme: {
    accent: "#4ade80",
    accentGlow: "rgba(74, 222, 128, 0.35)",
    badgeColor: "#4aedef"
  },
  slides: [
    // =========================================================================
    // MODULE 1: FILES, TAGS, TEXT, LISTS, LINKS & TABLES (SLIDES 01–08)
    // =========================================================================
    {
      id: "slide-01",
      type: "hero",
      badge: "MODULE 1 • ARCHITECTURE",
      title: "How Real Websites Are Built",
      subtitle: "Clean separation: HTML for structure, external CSS for visuals",
      audio: "audio/slide-01.mp3",
      narration: "Welcome to the full HTML and CSS masterclass! Since you already know programming, web code will click fast. Every site keeps its files inside one project folder: HTML builds the structure, external CSS paints the visuals, and Chrome renders them live.",
      narrationTts: "Welcome to the full H T M L and C S S masterclass! Since you already know programming, web code will click fast. Every site keeps its files inside one project folder: H T M L builds the structure, external C S S paints the visuals, and Chrome renders them live.",
      content: {
        highlights: [
          {
            icon: "🧱",
            title: "index.html (Structure)",
            text: "Defines every element on screen: headings, boxes, tables, images, and inputs.",
            tts: "index dot H T M L, the structure. Defines every element on screen: headings, boxes, tables, images, and inputs."
          },
          {
            icon: "💎",
            title: "style.css (Visual Rules)",
            text: "External stylesheet controlling fonts, colors, glass cards, textures, and layout.",
            tts: "style dot C S S, the visual rules. An external stylesheet controlling fonts, colors, glass cards, textures, and layout."
          },
          {
            icon: "⛏️",
            title: "VS Code + Chrome Workflow",
            text: "Save files in one folder with Ctrl+S, double-click index.html, and press F5!",
            tts: "V S Code plus Chrome workflow. Save files in one folder with Control S, double click index dot H T M L, and press F five!"
          }
        ]
      }
    },
    {
      id: "slide-02",
      type: "cards",
      badge: "HTML ANATOMY",
      title: "Tags, Nodes & Attributes",
      subtitle: "Container pairs vs. clean self-closing <tag /> elements",
      audio: "audio/slide-02.mp3",
      narration: "When Chrome opens your HTML file, it reads tags to build a tree of page nodes. Container tags open and close around inner content, self-closing tags end cleanly with a slash inside one bracket pair, and attributes pass key-value settings.",
      narrationTts: "When Chrome opens your H T M L file, it reads tags to build a tree of page nodes. Container tags open and close around inner content, self closing tags end cleanly with a forward slash inside one bracket pair, and attributes pass key value settings.",
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
            tag: "SELF-CLOSING TAG",
            title: "<img /> & <input />",
            text: "Holds no inner text, so it closes itself cleanly right at the end with />!",
            tts: "Self closing tags, like image, input, and H R. They hold no inner text, so they close themselves cleanly right at the end with forward slash greater than!"
          },
          {
            icon: "⚙️",
            tag: "HTML ATTRIBUTE",
            title: "name=\"value\"",
            text: "Written inside the tag to configure src, href, type, id, or class.",
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
      narration: "Pro tip in VS Code: type an exclamation mark and press Tab to generate this skeleton instantly! Notice how the document splits into two zones: the invisible head for settings and CSS links, and the visible body stage.",
      narrationTts: "Pro tip in V S Code: type an exclamation mark and press Tab to generate this skeleton instantly! Notice how the document splits into two zones: the invisible head for settings and C S S links, and the visible body stage.",
      content: {
        language: "html",
        filename: "index.html",
        code: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\" />\n  <title>Alex | World</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>Built in VS Code.</p>\n</body>\n</html>",
        steps: [
          {
            lines: "1-2",
            note: "Switches Chrome into modern HTML5 mode and opens the root <html> node.",
            tts: "Switches Chrome into modern H T M L five mode and opens the root document node."
          },
          {
            lines: "3-6",
            note: "<head> is invisible on the page! <meta charset=\"UTF-8\" /> enables all symbols.",
            tts: "The head section is invisible on the page! U T F eight enables emojis and special letters."
          },
          {
            lines: "5",
            note: "<title> names the browser tab at the top of Chrome—NOT a page heading!",
            tts: "The title tag names the browser tab at the top of Chrome, not a visible heading on the page!"
          },
          {
            lines: "7-10",
            note: "<body> is the visible stage: every heading, box, table, image, and button goes here.",
            tts: "The body tag is the visible stage: every heading, box, table, image, and button goes inside here."
          }
        ]
      }
    },
    {
      id: "slide-04",
      type: "code",
      badge: "SEMESTER CORE HTML",
      title: "Text, Lists & Page Links",
      subtitle: "Tap › to tour headings, lists, and multi-page <a> links",
      audio: "audio/slide-04.mp3",
      narration: "Let's lock down the core content tags taught in class: headings from h1 to h6, bold and italic words, divider lines, bullet lists, and anchor links that jump to a second HTML file in your folder!",
      narrationTts: "Let's lock down the core content tags taught in class: headings from H one to H six, bold and italic words, divider lines, bullet lists, and anchor links that jump to a second H T M L file in your folder!",
      content: {
        language: "html",
        filename: "index.html",
        code: "<h1>About Me</h1>\n<p>I build <strong>mods</strong>\n   and <em>websites</em>.</p>\n<hr />\n<ul>\n  <li>Python & Redstone</li>\n  <li>HTML & CSS</li>\n</ul>\n<a href=\"test.html\">\n  Friday's Test →\n</a>",
        steps: [
          {
            lines: "1-3",
            note: "<h1> is the main title. <strong> (or <b>) bolds text; <em> (or <i>) italicizes.",
            tts: "H one is the main title. Strong or B makes text bold, while E M or I makes text italic."
          },
          {
            lines: "4",
            note: "<hr /> self-closes to draw a clean horizontal divider line (<br /> breaks a line).",
            tts: "H R self closes to draw a horizontal divider line, while B R jumps to a new line."
          },
          {
            lines: "5-8",
            note: "<ul> creates a bulleted list (<ol> numbers it), with each item inside <li>.",
            tts: "U L creates a bulleted list, while O L numbers it, with each list item wrapped inside L I."
          },
          {
            lines: "9-11",
            note: "<a href=\"test.html\"> opens a second HTML page! Add target=\"_blank\" for a new tab.",
            tts: "A H ref equals test dot H T M L opens a second page in your folder! Add target equals underscore blank for a new tab."
          }
        ]
      }
    },
    {
      id: "slide-05",
      type: "code",
      badge: "HTML TABLES",
      title: "Building an HTML <table>",
      subtitle: "Tap › to add a clean stats or worlds grid inside any box",
      audio: "audio/slide-05.mp3",
      narration: "School curricula love HTML tables, and they look awesome inside a profile card for showing game stats or skill ranks! Every table is built row by row using tr, with th for bold headers and td for data cells.",
      narrationTts: "School curricula love H T M L tables, and they look awesome inside a profile card for showing game stats or skill ranks! Every table is built row by row using T R, with T H for bold headers and T D for data cells.",
      content: {
        language: "html",
        filename: "index.html",
        code: "<table>\n  <tr>\n    <th>Skill</th>\n    <th>Rank</th>\n  </tr>\n  <tr>\n    <td>Python</td>\n    <td>Diamond</td>\n  </tr>\n  <tr>\n    <td>HTML & CSS</td>\n    <td>Emerald</td>\n  </tr>\n</table>",
        steps: [
          {
            lines: "1,14",
            note: "<table> ... </table> wraps the entire grid container.",
            tts: "The table tag pair wraps the entire grid container."
          },
          {
            lines: "2-5",
            note: "<tr> starts a Table Row, and <th> creates bold centered Table Header cells!",
            tts: "T R starts a table row, and T H creates bold centered table header cells at the top!"
          },
          {
            lines: "6-13",
            note: "Each new <tr> adds another row, and <td> (Table Data) holds each regular cell.",
            tts: "Each new T R adds another horizontal row, and T D, short for table data, holds each regular cell."
          }
        ]
      }
    },
    {
      id: "slide-06",
      type: "reveal",
      badge: "FLASHCARDS • HTML",
      title: "Quick HTML Tag Recall",
      subtitle: "Predict what each tag creates, then tap to flip",
      audio: "audio/slide-06.mp3",
      narration: "Warm up your HTML memory! Predict what each tag pair or self-closing element builds on screen, then flip all four cards.",
      narrationTts: "Warm up your H T M L memory! Predict what each tag pair or self closing element builds on screen, then flip all four cards.",
      content: {
        cards: [
          {
            front: "<h1> vs <title>",
            back: "Page heading vs. browser tab",
            tts: "H one displays a big heading on the page, while title only labels the browser tab."
          },
          {
            front: "<ul> + <li>",
            back: "Bullet list + list items",
            tts: "U L starts an unordered bullet list, and each L I creates one bullet point inside it."
          },
          {
            front: "<tr> + <td>",
            back: "Table row + table data cell",
            tts: "T R starts a horizontal table row, and each T D adds one data cell inside that row."
          },
          {
            front: "<br /> vs <hr />",
            back: "Line break vs. divider line",
            tts: "B R self closes to jump to a new line, while H R self closes to draw a divider line."
          }
        ]
      }
    },
    {
      id: "slide-07",
      type: "quiz",
      badge: "TRICKY CHECK • 1",
      title: "The Blank White Page Trap!",
      subtitle: "You wrote <title>Welcome</title> in <head>—why is the page blank?",
      audio: "audio/slide-07.mp3",
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
      id: "slide-08",
      type: "input",
      badge: "CHECKPOINT • 2",
      title: "Link Destination Attribute",
      subtitle: "<img /> uses src—which attribute sets an <a> link's target page?",
      audio: "audio/slide-08.mp3",
      narration: "Tricky pair alert: images load files with S R C, while anchor links use a different four-letter attribute to link to test dot html or a URL. Type that attribute name!",
      narrationTts: "Tricky pair alert: images load files with S R C, while anchor links use a different four letter attribute to link to test dot H T M L or a U R L. Type that attribute name!",
      content: {
        placeholder: "4-letter attribute...",
        answers: ["href"],
        match: { caseSensitive: false, plural: false },
        hint: "Starts with 'h' and stands for Hypertext REFerence.",
        explanation: "Spot on: href! <img src=\"me.jpg\" /> loads an image source, while <a href=\"test.html\"> jumps to another page.",
        explanationTts: "Spot on: H ref! Image uses S R C to load an image source, while A uses H ref to jump to another page."
      }
    },

    // =========================================================================
    // MODULE 2: PACKING ELEMENTS IN BOXES & FRIDAY'S TEST (SLIDES 09–16)
    // =========================================================================
    {
      id: "slide-09",
      type: "compare",
      badge: "MODULE 2 • BOX MECHANICS",
      title: "Stacking Lines Inside a Box",
      subtitle: "Why do some tags sit side-by-side while others start a new row?",
      audio: "audio/slide-09.mp3",
      narration: "When you pack multiple elements inside a box, HTML splits tags into two behaviors! Inline tags like inputs, labels, spans, and images sit side-by-side on the same row. Block tags like divs, paragraphs, and tables claim a full new line!",
      narrationTts: "When you pack multiple elements inside a box, H T M L splits tags into two behaviors! Inline tags like inputs, labels, spans, and images sit side by side on the same row. Block tags like divs, paragraphs, and tables claim a full new line!",
      content: {
        left: {
          tag: "⚠️ INLINE TRAP (1 ROW)",
          title: "<input />, <span>, <img />",
          points: [
            "Crammed side-by-side on ONE line!",
            "Multiple inputs squash together.",
            "Never starts a new row by itself."
          ]
        },
        right: {
          tag: "🧱 BLOCK (NEW ROW)",
          title: "<div>, <p>, <h1>, <table>",
          points: [
            "Claims the full horizontal row.",
            "Pushes next element underneath!",
            "Wrap each form line in a <div>!"
          ]
        }
      }
    },
    {
      id: "slide-10",
      type: "code",
      badge: "FRIDAY'S TEST • PART 1",
      title: "Friday's Test: HTML Box",
      subtitle: "Tap › to build the exact Name + Password box in test.html",
      audio: "audio/slide-10.mp3",
      narration: "Let's crush Friday's school test first inside test dot html! Look how clean it is: one outer login-box div wraps everything, and each label-plus-input pair sits inside its own row div so Name and Password stack on separate lines!",
      narrationTts: "Let's crush Friday's school test first inside test dot H T M L! Look how clean it is: one outer login box div wraps everything, and each label plus input pair sits inside its own row div so Name and Password stack on separate lines!",
      content: {
        language: "html",
        filename: "test.html",
        code: "<div class=\"login-box\">\n  <h2>Player Login</h2>\n  <div class=\"row\">\n    Name: <input type=\"text\" />\n  </div>\n  <div class=\"row\">\n    Pass:\n    <input type=\"password\" />\n  </div>\n  <button>Sign In</button>\n</div>\n<a href=\"index.html\">← Home</a>",
        steps: [
          {
            lines: "1-2,11",
            note: "<div class=\"login-box\"> groups the heading, both form rows, and button in one box.",
            tts: "Div class equals login box groups the heading, both form rows, and the button inside one container."
          },
          {
            lines: "3-5",
            note: "Row 1: <div class=\"row\"> keeps 'Name:' and <input type=\"text\" /> on Line 1!",
            tts: "Row one: div class equals row keeps Name and input type equals text side by side on line one!"
          },
          {
            lines: "6-9",
            note: "Row 2: A second <div class=\"row\"> forces 'Pass:' and <input type=\"password\" /> onto Line 2!",
            tts: "Row two: a second row div forces Pass and input type equals password onto a clean second line!"
          },
          {
            lines: "10,12",
            note: "<button> finishes the box, and <a href=\"index.html\"> links back to your main site!",
            tts: "Button finishes the box, and A H ref equals index dot H T M L jumps right back to your main site!"
          }
        ]
      }
    },
    {
      id: "slide-11",
      type: "code",
      badge: "FRIDAY'S TEST • PART 2",
      title: "Friday's Test: Blue Box CSS",
      subtitle: "Tap › to paint test.html blue using external test.css",
      audio: "audio/slide-11.mp3",
      narration: "Now link test dot css inside head of test dot html and write these nine lines! Background-color paints the box blue, padding keeps inputs away from the edges, and margin-bottom spaces the two rows cleanly.",
      narrationTts: "Now link test dot C S S inside head of test dot H T M L and write these nine lines! Background color paints the box blue, padding keeps inputs away from the edges, and margin bottom spaces the two rows cleanly.",
      content: {
        language: "css",
        filename: "test.css",
        code: "/* Linked in test.html <head> */\n.login-box {\n  background-color: #1d4ed8;\n  color: white;\n  width: 300px;\n  padding: 20px;\n}\n.row {\n  margin-bottom: 12px;\n}",
        steps: [
          {
            lines: "2-4",
            note: "Paints .login-box rich royal blue (#1d4ed8) with crisp white label text.",
            tts: "Paints dot login box rich royal blue with crisp white label text."
          },
          {
            lines: "5-7",
            note: "Sets a neat 300px box width and 20px inner cushion so nothing touches the edge.",
            tts: "Sets a neat three hundred pixel box width and twenty pixels of inner cushion so nothing touches the edge."
          },
          {
            lines: "8-10",
            note: "Adds 12px breathing room under each row—Friday's entire test aced in 9 lines!",
            tts: "Adds twelve pixels of breathing room underneath each row. Friday's entire school test aced in nine lines!"
          }
        ]
      }
    },
    {
      id: "slide-12",
      type: "code",
      badge: "PACKING RICH CARDS",
      title: "Hero Card with Photo & Badge",
      subtitle: "Tap › to pack an avatar, badge, bio, and link in index.html",
      audio: "audio/slide-12.mp3",
      narration: "Now let's switch to index dot html and build your showcase site! Inside your Hero Card div, you can stack as many elements as you want: a selfie, an online status span, heading, bio, stats table, and link to test dot html!",
      narrationTts: "Now let's switch to index dot H T M L and build your showcase site! Inside your Hero Card div, you can stack as many elements as you want: a selfie, an online status span, heading, bio, stats table, and link to test dot H T M L!",
      content: {
        language: "html",
        filename: "index.html",
        code: "<div id=\"hero\" class=\"card\">\n  <img id=\"avatar\"\n       src=\"me.jpg\"\n       alt=\"My portrait\" />\n  <br />\n  <span class=\"tag\">ONLINE</span>\n  <h1>Alex</h1>\n  <p>Coder • Crafter • Builder</p>\n  <a href=\"test.html\">\n    View School Test →\n  </a>\n</div>",
        steps: [
          {
            lines: "1,12",
            note: "<div> wraps everything! class=\"card\" shares styles across all cards on your page.",
            tts: "Div wraps everything! Class equals card shares styles across every card on your page."
          },
          {
            lines: "2-6",
            note: "<img /> and <span> are inline—<br /> puts the ONLINE badge cleanly under your photo!",
            tts: "Image and span are both inline, so a self closing B R puts the online badge cleanly underneath your photo!"
          },
          {
            lines: "7-11",
            note: "<h1> and <p> stack automatically, followed by your link to Friday's test.html!",
            tts: "H one and P are block tags so they stack automatically, followed by your link to Friday's test dot H T M L!"
          }
        ]
      }
    },
    {
      id: "slide-13",
      type: "code",
      badge: "TEST REDEMPTION • PRO",
      title: "Upgrading the Login Box!",
      subtitle: "Tap › to turn Friday's blue box into a VIP Server Card",
      audio: "audio/slide-13.mp3",
      narration: "Now watch the glow-up! On index dot html, we take the exact same Name, Password, and Button idea from Friday's test, add helpful placeholder hints inside the inputs, and give it class card so CSS turns it into frosted glass!",
      narrationTts: "Now watch the glow up! On index dot H T M L, we take the exact same Name, Password, and Button idea from Friday's test, add helpful placeholder hints inside the inputs, and give it class card so C S S turns it into frosted glass!",
      content: {
        language: "html",
        filename: "index.html",
        code: "<div id=\"vip\" class=\"card\">\n  <h2>Server VIP Login</h2>\n  <div class=\"row\">\n    <label>Player Name</label>\n    <input type=\"text\"\n      placeholder=\"Your name\" />\n  </div>\n  <div class=\"row\">\n    <label>Secret Pass</label>\n    <input type=\"password\"\n      placeholder=\"Secret\" />\n  </div>\n  <button>Join Server</button>\n</div>",
        steps: [
          {
            lines: "1-2",
            note: "Same class=\"card\" as #hero, plus unique id=\"vip\" for any special tweaks!",
            tts: "Uses the same class equals card as hero, plus a unique I D equals V I P!"
          },
          {
            lines: "3-7",
            note: "placeholder=\"Your name\" shows faint hint text inside <input /> until you type!",
            tts: "Placeholder shows faint hint text right inside the input box that disappears the instant you start typing!"
          },
          {
            lines: "8-13",
            note: "Second .row holds the masked password <input />, followed by your 3D button!",
            tts: "The second row div holds the masked password input, followed by your clickable Join Server button!"
          }
        ]
      }
    },
    {
      id: "slide-14",
      type: "quiz",
      badge: "TRICKY CHECK • 3",
      title: "Why Did Inputs Squash Together?",
      subtitle: "Name <input /> Pass <input /> all landed on ONE single row!",
      audio: "audio/slide-14.mp3",
      narration: "School test trap! You typed Name, text input, Pass, and password input inside a box, and Chrome crammed all four side-by-side onto one horizontal line. What cleanly puts each pair on its own row?",
      narrationTts: "School test trap! You typed Name, text input, Pass, and password input inside a box, and Chrome crammed all four side by side onto one horizontal line. What cleanly puts each pair on its own row?",
      content: {
        options: [
          { text: "Wrap each row in a <div>", correct: true },
          { text: "Put <head> between them" },
          { text: "Set <input type=\"row\" />" },
          { text: "Delete the /> slash" }
        ],
        hint: "Text and <input /> are inline—what block container claims a full horizontal row?",
        explanation: "Exactly! <input /> is inline, so wrapping each label + input pair in a block <div> (or adding <br />) gives each line its own row.",
        explanationTts: "Exactly! Input is inline, so wrapping each label plus input pair inside a block div, or adding B R, gives each line its own clean row."
      }
    },
    {
      id: "slide-15",
      type: "quiz",
      badge: "CHECKPOINT • 4",
      title: "Masking Secret Passwords",
      subtitle: "Which self-closing tag hides typed letters behind dots?",
      audio: "audio/slide-15.mp3",
      narration: "Quick form check! Which of these four tags is valid HTML for a password box that masks characters as you type?",
      narrationTts: "Quick form check! Which of these four tags is valid H T M L for a password box that masks characters as you type?",
      content: {
        options: [
          { text: "<input type=\"text\" />" },
          { text: "<input type=\"password\" />", correct: true },
          { text: "<password />" },
          { text: "<textbox secret=\"true\" />" }
        ],
        hint: "HTML uses one universal <input /> tag and switches behavior with its type attribute.",
        explanation: "Correct: <input type=\"password\" />! Changing type from \"text\" to \"password\" tells Chrome to mask every keystroke.",
        explanationTts: "Correct: input type equals password! Changing the type attribute from text to password tells Chrome to mask every keystroke."
      }
    },
    {
      id: "slide-16",
      type: "quiz",
      badge: "TRICKY CHECK • 5",
      title: "Why Did My Photo Break?",
      subtitle: "me.jpg is inside an images/ subfolder, and <img /> shows broken!",
      audio: "audio/slide-16.mp3",
      narration: "Bug hunt! Your index dot html sits in your main folder, your selfie me dot jpg sits inside an images subfolder, and img src equals me dot jpg shows a broken icon. What fixes it?",
      narrationTts: "Bug hunt! Your index dot H T M L sits in your main folder, your selfie me dot J P G sits inside an images subfolder, and image source equals me dot J P G shows a broken icon. What fixes it?",
      content: {
        options: [
          { text: "src=\"images/me.jpg\"", correct: true },
          { text: "href=\"images/me.jpg\"" },
          { text: "url=\"images/me.jpg\"" },
          { text: "Move <img /> into <head>" }
        ],
        hint: "<img /> uses src, and relative paths start from the folder where index.html lives.",
        explanation: "Exact fix: src=\"images/me.jpg\"! Always include the subfolder path relative to index.html—or keep me.jpg in the same folder.",
        explanationTts: "Exact fix: source equals images slash me dot J P G! Always include the subfolder path relative to index dot H T M L, or keep the photo right in the same folder."
      }
    },

    // =========================================================================
    // MODULE 3: EXTERNAL CSS, PIXEL FONTS & SELECTORS (SLIDES 17–23)
    // =========================================================================
    {
      id: "slide-17",
      type: "compare",
      badge: "MODULE 3 • SYNTAX",
      title: "Attributes vs. CSS Properties",
      subtitle: "Keep HTML tag settings separate from style.css visual rules",
      audio: "audio/slide-17.mp3",
      narration: "Beginners often mix up HTML attributes and CSS properties because both assign values. Keep this distinction sharp: HTML attributes use equals and quotes inside tags, while CSS properties use colons and semicolons inside style dot css.",
      narrationTts: "Beginners often mix up H T M L attributes and C S S properties because both assign values. Keep this distinction sharp: H T M L attributes use equals and quotes inside tags, while C S S properties use colons and semicolons inside style dot C S S.",
      content: {
        left: {
          tag: "⚙️ HTML ATTRIBUTES",
          title: "type=\"password\"",
          points: [
            "Lives in HTML: <input ... />",
            "Syntax uses = and quotes.",
            "Configures src, href, type, id, class."
          ]
        },
        right: {
          tag: "🎨 CSS PROPERTIES",
          title: "border-radius: 16px;",
          points: [
            "Lives in style.css inside { }.",
            "Syntax uses : colon and ; semicolon.",
            "Controls colors, fonts, size, layout."
          ]
        }
      }
    },
    {
      id: "slide-18",
      type: "code",
      badge: "GOOGLE FONTS + CSS",
      title: "Linking Pixel Fonts & CSS",
      subtitle: "Tap › to connect Google Fonts and style.css inside <head>",
      audio: "audio/slide-18.mp3",
      narration: "Always keep your CSS in an external style dot css file linked inside head! Even cooler: right above it, paste a Google Fonts link for Pixelify Sans to unlock blocky Minecraft-style typography!",
      narrationTts: "Always keep your C S S in an external style dot C S S file linked inside head! Even cooler: right above it, paste a Google Fonts link for Pixelify Sans to unlock blocky Minecraft style typography!",
      content: {
        language: "html",
        filename: "index.html",
        code: "<head>\n  <meta charset=\"UTF-8\" />\n  <title>Alex | Craft</title>\n  <link rel=\"stylesheet\"\nhref=\"https://fonts.googleapis.com/css2?family=Pixelify+Sans\" />\n  <link rel=\"stylesheet\"\n    href=\"style.css\" />\n</head>",
        steps: [
          {
            lines: "4-5",
            note: "First <link /> fetches 'Pixelify Sans' live from fonts.google.com!",
            tts: "The first self closing link tag fetches the Pixelify Sans pixel font straight from Google Fonts!"
          },
          {
            lines: "6-7",
            note: "Second <link /> connects YOUR external style.css—match the filename spelling!",
            tts: "The second link tag connects your local style dot C S S file. Make sure the filename spelling matches identically!"
          },
          {
            lines: "4-7",
            note: "rel=\"stylesheet\" is mandatory on every CSS <link />—without it Chrome ignores CSS!",
            tts: "R E L equals stylesheet is mandatory on every C S S link tag. Without it, Chrome completely ignores your stylesheet!"
          }
        ]
      }
    },
    {
      id: "slide-19",
      type: "cards",
      badge: "CSS SELECTORS",
      title: "3 Flat Style Selectors",
      subtitle: "Target by node name, .class, or #id (no nesting needed)",
      audio: "audio/slide-19.mp3",
      narration: "In style dot css, every rule starts with a selector telling Chrome which elements to paint. Without nesting selectors inside each other yet, three flat selector types handle everything: bare node names, dot-classes, and hash-IDs.",
      narrationTts: "In style dot C S S, every rule starts with a selector telling Chrome which elements to paint. Without nesting selectors inside each other yet, three flat selector types handle everything: bare node names, dot classes, and hash I Ds.",
      content: {
        cards: [
          {
            icon: "🏷️",
            tag: "NODE / TAG NAME",
            title: "td { ... }",
            text: "No symbol prefix. Styles EVERY matching tag (like every <td> or <input />) on page.",
            tts: "Node or tag name selector: write T D or input with no prefix symbol. It styles every matching tag across the page."
          },
          {
            icon: "✨",
            tag: "CLASS SELECTOR (.)",
            title: ".card { ... }",
            text: "Dot prefix. Reusable style shared by every box wearing class=\"card\".",
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
      id: "slide-20",
      type: "code",
      badge: "CSS RULE ANATOMY",
      title: "Writing Clean style.css Rules",
      subtitle: "Tap › to style Pixelify Sans, table cells, .card, and #vip",
      audio: "audio/slide-20.mp3",
      narration: "Let's put Pixelify Sans and all three selector types to work in style dot css! Notice how clean flat rules style the page font, put crisp borders around table cells, center card text, and customize the VIP border.",
      narrationTts: "Let's put Pixelify Sans and all three selector types to work in style dot C S S! Notice how clean flat rules style the page font, put crisp borders around table cells, center card text, and customize the V I P border.",
      content: {
        language: "css",
        filename: "style.css",
        code: "body {\n  font-family: \"Pixelify Sans\",\n               \"Segoe UI\", Arial;\n  color: #f8fafc;\n}\ntd {\n  padding: 6px 12px;\n  border: 1px solid #334155;\n}\n.card { text-align: center; }\n#vip { border-color: #38bdf8; }",
        steps: [
          {
            lines: "1-5",
            note: "Applies 'Pixelify Sans' (with Segoe UI fallback if offline!) and crisp light text.",
            tts: "Applies Google's Pixelify Sans pixel font, with Segoe U I and Arial as offline fallbacks, plus crisp light text."
          },
          {
            lines: "6-9",
            note: "Tag selector td gives every table cell neat spacing and an inventory-grid border!",
            tts: "The bare tag selector T D gives every table cell neat padding and a clean inventory grid border!"
          },
          {
            lines: "10-11",
            note: ".card styles ALL cards at once, while #vip overrides border-color on just one!",
            tts: "Dot card centers text in all cards at once, while hash V I P overrides the border color on just the V I P box!"
          }
        ]
      }
    },
    {
      id: "slide-21",
      type: "reveal",
      badge: "FLASHCARDS • SELECTORS",
      title: "Selector & Syntax Drill",
      subtitle: "Think first, then tap each card to flip",
      audio: "audio/slide-21.mp3",
      narration: "Check your CSS reflexes! Predict what each selector targets—and what happens when a semicolon goes missing—then flip all four cards.",
      narrationTts: "Check your C S S reflexes! Predict what each selector targets, and what happens when a semicolon goes missing, then flip all four cards.",
      content: {
        cards: [
          {
            front: "table",
            back: "Every <table> tag on page",
            tts: "A bare word with no dot or hash is a tag selector: it styles every table tag on the page."
          },
          {
            front: ".row",
            back: "All elements with class=\"row\"",
            tts: "Dot row is a class selector: it targets every element wearing class equals row."
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
      id: "slide-22",
      type: "input",
      badge: "CHECKPOINT • 6",
      title: "Target id=\"hero\" in CSS",
      subtitle: "Type the exact selector that goes before { }",
      audio: "audio/slide-22.mp3",
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
      id: "slide-23",
      type: "quiz",
      badge: "TRICKY CHECK • 7",
      title: "Specificity Color Battle!",
      subtitle: "<div id=\"vip\" class=\"card\">: div=gray, .card=blue, #vip=purple",
      audio: "audio/slide-23.mp3",
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
    // MODULE 4: BOX MODEL, FROSTED GLASS & FLOATING AVATAR (SLIDES 24–28)
    // =========================================================================
    {
      id: "slide-24",
      type: "cards",
      badge: "MODULE 4 • THE BOX MODEL",
      title: "Every Element Is a 4-Layer Box",
      subtitle: "Content → Padding → Border → Margin",
      audio: "audio/slide-24.mp3",
      narration: "Every HTML element is a four-layer rectangular box! Your text or image sits at the center, cushioned by padding on the inside, framed by a border wall, and separated from neighbors by margin outside.",
      narrationTts: "Every H T M L element is a four layer rectangular box! Your text or image sits at the center, cushioned by padding on the inside, framed by a border wall, and separated from neighbors by margin outside.",
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
            title: "border: 2px solid #4ade80;",
            text: "Visible frame around the box: line thickness, style (solid/dashed), and color.",
            tts: "Border: two pixels solid green. The visible frame around the box: thickness, line style, and color."
          },
          {
            icon: "↔️",
            tag: "3. MARGIN (OUTER)",
            title: "margin-bottom: 12px;",
            text: "Transparent personal space OUTSIDE the border pushing neighbors away.",
            tts: "Margin bottom: twelve pixels. Transparent personal space outside the border pushing neighboring elements away."
          }
        ]
      }
    },
    {
      id: "slide-25",
      type: "code",
      badge: "FROSTED GLASS + LIFT",
      title: "Frosted-Glass Pro Cards!",
      subtitle: "Tap › for translucent blur, smooth corners & hover lift",
      audio: "audio/slide-25.mp3",
      narration: "Want a massive upgrade over a plain blue box? Give dot card a semi-transparent rgba background plus backdrop-filter blur! Your background texture glows softly through frosted glass, and hover lifts the card!",
      narrationTts: "Want a massive upgrade over a plain blue box? Give dot card a semi transparent R G B A background plus backdrop filter blur! Your background texture glows softly through frosted glass, and hover lifts the card!",
      content: {
        language: "css",
        filename: "style.css",
        code: ".card {\n  width: 340px;\n  box-sizing: border-box;\n  padding: 24px;\n  background: rgba(15,23,42,0.82);\n  backdrop-filter: blur(8px);\n  border: 2px solid #4ade80;\n  border-radius: 16px;\n  transition: 0.2s;\n}\n.card:hover {\n  transform: translateY(-4px);\n}",
        steps: [
          {
            lines: "2-4",
            note: "340px wide, 24px inner padding, and border-box stops width from ballooning!",
            tts: "Three hundred forty pixels wide, twenty-four pixels of padding, and border box stops the width from ballooning!"
          },
          {
            lines: "5-6",
            note: "rgba(..., 0.82) + backdrop-filter: blur(8px) creates real frosted glass!",
            tts: "R G B A at eighty-two percent opacity plus backdrop filter blur creates real frosted glass over your texture!"
          },
          {
            lines: "7-13",
            note: "Rounded corners + .card:hover smoothly floats any card up 4px under the mouse!",
            tts: "Rounded corners plus dot card colon hover smoothly floats any card up four pixels when the mouse moves over it!"
          }
        ]
      }
    },
    {
      id: "slide-26",
      type: "code",
      badge: "AVATAR + ANIMATION",
      title: "Floating Circular Avatar!",
      subtitle: "Tap › for a round selfie + 4-line @keyframes item float",
      audio: "audio/slide-26.mp3",
      narration: "Here are two high-impact tricks in one! Equal width and height plus border-radius fifty percent puts your selfie inside a crisp circle—and a tiny keyframes rule makes it gently bob up and down like a Minecraft item!",
      narrationTts: "Here are two high impact tricks in one! Equal width and height plus border radius fifty percent puts your selfie inside a crisp circle, and a tiny keyframes rule makes it gently bob up and down like a Minecraft item!",
      content: {
        language: "css",
        filename: "style.css",
        code: "#avatar {\n  width: 110px;\n  height: 110px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 3px solid #4ade80;\n  animation: float 3s infinite;\n}\n@keyframes float {\n  50% {\n    transform: translateY(-8px);\n  }\n}",
        steps: [
          {
            lines: "2-5",
            note: "110×110 square + object-fit: cover + border-radius: 50% = zero-squish circle!",
            tts: "A one-ten by one-ten square plus object fit cover and border radius fifty percent makes a zero-squish circle!"
          },
          {
            lines: "6-7",
            note: "Emerald ring + animation: float 3s infinite loops our 'float' motion every 3s!",
            tts: "An emerald ring plus animation float three seconds infinite loops our float motion smoothly forever!"
          },
          {
            lines: "9-13",
            note: "@keyframes float lifts the photo 8px halfway through, then glides back down!",
            tts: "At keyframes float lifts the photo eight pixels halfway through, then glides smoothly right back down!"
          }
        ]
      }
    },
    {
      id: "slide-27",
      type: "input",
      badge: "CHECKPOINT • 8",
      title: "Fix Cramped Box Content",
      subtitle: "Type the CSS property that adds cushion INSIDE the border",
      audio: "audio/slide-27.mp3",
      narration: "Your text and inputs are pressed right up against the border wall of your card. Type the CSS property that adds breathing space on the inside of the wall!",
      narrationTts: "Your text and inputs are pressed right up against the border wall of your card. Type the C S S property that adds breathing space on the inside of the wall!",
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
      id: "slide-28",
      type: "quiz",
      badge: "TRICKY CHECK • 9",
      title: "The Egg-Shaped Selfie Bug!",
      subtitle: "You set border-radius: 50% on a 400×250 photo and got an oval!",
      audio: "audio/slide-28.mp3",
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
    // MODULE 5: TEXTURES, FLEXBOX CENTERING & TACTILE 3D BUTTONS (29–32)
    // =========================================================================
    {
      id: "slide-29",
      type: "code",
      badge: "MODULE 5 • TEXTURES",
      title: "Seamless Background Textures",
      subtitle: "Tap › to tile a downloaded texture or a pure-CSS grid",
      audio: "audio/slide-29.mp3",
      narration: "Save any seamless tile pattern like bg dot png into your project folder, and background-image url repeats it smoothly across the whole screen! Or use radial-gradient for a zero-file voxel dot grid.",
      narrationTts: "Save any seamless tile pattern like B G dot P N G into your project folder, and background image U R L repeats it smoothly across the whole screen! Or use radial gradient for a zero file voxel dot grid.",
      content: {
        language: "css",
        filename: "style.css",
        code: "body {\n  background-color: #0b1120;\n  background-image: url(\"bg.png\");\n  background-repeat: repeat;\n}\n/* Zero-file CSS grid alternative:\n  background-image:\n    radial-gradient(#334155 2px,\n      transparent 2px);\n  background-size: 22px 22px;\n*/",
        steps: [
          {
            lines: "2",
            note: "Always set a dark fallback background-color underneath transparent textures!",
            tts: "Always set a dark fallback background color underneath transparent tile textures!"
          },
          {
            lines: "3-4",
            note: "Tiles bg.png seamlessly in every direction across the entire page!",
            tts: "Tiles B G dot P N G seamlessly in every direction across the entire page!"
          },
          {
            lines: "6-11",
            note: "Want a crisp grid before picking a PNG? radial-gradient draws dots in pure CSS!",
            tts: "Want a crisp grid before picking an image? Radial gradient draws dots right in pure C S S!"
          }
        ]
      }
    },
    {
      id: "slide-30",
      type: "code",
      badge: "FLEXBOX CENTERING",
      title: "Centering Cards with Flexbox",
      subtitle: "Tap › to center all your cards on any screen automatically",
      audio: "audio/slide-30.mp3",
      narration: "To center every card cleanly in the middle of the screen, put CSS Flexbox on body! Display flex activates it, column stacks your cards top-to-bottom, justify-content and align-items center them, and gap spaces them out!",
      narrationTts: "To center every card cleanly in the middle of the screen, put C S S Flexbox on body! Display flex activates it, column stacks your cards top to bottom, justify content and align items center them, and gap spaces them out!",
      content: {
        language: "css",
        filename: "style.css",
        code: "body {\n  min-height: 100vh;\n  margin: 0;\n  padding: 32px 16px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n}",
        steps: [
          {
            lines: "2-4",
            note: "100vh fills the full screen height; padding keeps breathing room at top & bottom.",
            tts: "One hundred V H fills the full screen height, and padding keeps breathing room at the top and bottom."
          },
          {
            lines: "5-6",
            note: "display: flex turns on Flexbox; column stacks Hero, Table, and VIP cards!",
            tts: "Display flex turns on Flexbox, and column stacks your Hero, Table, and V I P cards vertically!"
          },
          {
            lines: "7-9",
            note: "Dead-centers every card on screen and puts 24px of clean air between them!",
            tts: "Justify content and align items dead-center every card on screen, and gap puts twenty-four pixels between them!"
          }
        ]
      }
    },
    {
      id: "slide-31",
      type: "code",
      badge: "3D TACTILE CONTROLS",
      title: "Pressable 3D Game Buttons!",
      subtitle: "Tap › for clean inputs + a button that physically clicks down",
      audio: "audio/slide-31.mp3",
      narration: "Here is a five-minute CSS trick teachers love! Give your button a five-pixel bottom shadow ledge, then on button colon active shift it down three pixels and shrink the shadow—it physically clicks down like a real game button!",
      narrationTts: "Here is a five minute C S S trick teachers love! Give your button a five pixel bottom shadow ledge, then on button colon active shift it down three pixels and shrink the shadow. It physically clicks down like a real game button!",
      content: {
        language: "css",
        filename: "style.css",
        code: "input {\n  width: 100%; padding: 10px;\n  box-sizing: border-box;\n  margin-bottom: 12px;\n}\nbutton {\n  width: 100%; padding: 12px;\n  background: #4ade80;\n  box-shadow: 0 5px 0 #14532d;\n  transition: 0.1s;\n}\nbutton:hover { opacity: 0.92; }\nbutton:active {\n  transform: translateY(3px);\n  box-shadow: 0 2px 0 #14532d;\n}",
        steps: [
          {
            lines: "1-5",
            note: "border-box keeps 100%-wide padded <input /> boxes tucked neatly inside .card!",
            tts: "Border box keeps one hundred percent wide padded inputs tucked neatly inside your card!"
          },
          {
            lines: "6-12",
            note: "box-shadow: 0 5px 0 #14532d builds a solid 3D emerald ledge underneath!",
            tts: "Box shadow zero five pixels zero dark green builds a solid three D ledge right under the button!"
          },
          {
            lines: "13-16",
            note: ":active fires while clicking—pushing the button 3px down into its shadow ledge!",
            tts: "Colon active fires the instant you click, pushing the button three pixels down into its shadow ledge!"
          }
        ]
      }
    },
    {
      id: "slide-32",
      type: "input",
      badge: "CHECKPOINT • 10",
      title: "Unlock Flexbox Centering!",
      subtitle: "justify-content & align-items do NOTHING until display is set to...?",
      audio: "audio/slide-32.mp3",
      narration: "Final checkpoint! You wrote justify-content center and align-items center on body, refreshed Chrome, and your boxes stayed stuck in the corner! What value must display be set to?",
      narrationTts: "Final checkpoint! You wrote justify content center and align items center on body, refreshed Chrome, and your boxes stayed stuck in the corner! What value must display be set to?",
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
    // MODULE 6: PRO TIPS, DOCS, PUBLISHING, WHAT'S NEXT & QUEST (33–37)
    // =========================================================================
    {
      id: "slide-33",
      type: "cards",
      badge: "MODULE 6 • DEV TOOLKIT",
      title: "Docs, Textures & Chrome F12",
      subtitle: "Where pros look up tags, grab textures, and live-debug",
      audio: "audio/slide-33.mp3",
      narration: "Real developers never memorize everything—they know where to look and how to inspect live! Here are three secret weapons for building fast and proving to your teacher that you understand every single line.",
      narrationTts: "Real developers never memorize everything: they know where to look and how to inspect live! Here are three secret weapons for building fast and proving to your teacher that you understand every single line.",
      content: {
        cards: [
          {
            icon: "🔍",
            tag: "CHROME F12 POWER MOVE",
            title: "Right-Click → Inspect",
            text: "Edit colors & sizes live in Chrome to show your teacher you master every rule!",
            tts: "Chrome F twelve Inspect! Right click any element and pick Inspect to toggle and edit C S S live right in front of your teacher!"
          },
          {
            icon: "📚",
            tag: "WHEN YOU GET STUCK",
            title: "W3Schools.com",
            text: "Search 'w3schools html table' or 'css shadow' for instant Try-It examples!",
            tts: "W three Schools dot com! Search W three Schools plus any tag or C S S property for interactive Try It Yourself examples."
          },
          {
            icon: "🧱",
            tag: "FREE TEXTURE VAULTS",
            title: "TransparentTextures & Kenney",
            text: "Grab seamless tiles at TransparentTextures.com or pixel art at Kenney.nl!",
            tts: "Free texture vaults! Grab seamless dark tiles at Transparent Textures dot com, or free pixel game packs at Kenney dot N L and Lospec!"
          }
        ]
      }
    },
    {
      id: "slide-34",
      type: "cards",
      badge: "GOING LIVE • FREE",
      title: "Publish Live in 60 Seconds!",
      subtitle: "Open a real public URL on Monday + carry a USB backup",
      audio: "audio/slide-34.mp3",
      narration: "Want to really impress on Monday? Instead of only carrying files, publish your folder to the real internet for free in under a minute—and still bring a USB stick just in case school Wi-Fi is offline!",
      narrationTts: "Want to really impress on Monday? Instead of only carrying files, publish your folder to the real internet for free in under a minute, and still bring a U S B stick just in case school Wi-Fi is offline!",
      content: {
        cards: [
          {
            icon: "🚀",
            tag: "NETLIFY DROP (10 SEC)",
            title: "app.netlify.com/drop",
            text: "Drag your project folder into Chrome for a live shareable link in 10 seconds!",
            tts: "Netlify Drop: open app dot netlify dot com slash drop, drag your folder onto the page, and get a live web link in ten seconds!"
          },
          {
            icon: "🐙",
            tag: "GITHUB PAGES (PRO)",
            title: "yourname.github.io",
            text: "Push index.html, test.html & style.css to GitHub for a permanent dev URL.",
            tts: "GitHub Pages: upload your folder to a GitHub repository to host a permanent your name dot github dot I O address!"
          },
          {
            icon: "💾",
            tag: "MONDAY DOUBLE SHIELD",
            title: "Ctrl+S + Live URL + USB",
            text: "Check VS Code tabs for unsaved white dots (Ctrl+S), publish live, AND pack a USB!",
            tts: "Monday double shield: check V S Code tabs for unsaved white dots with Control S, publish your U R L, and pack a U S B backup!"
          }
        ]
      }
    },
    {
      id: "slide-35",
      type: "code",
      badge: "WHAT'S NEXT? • LEVEL 2",
      title: "Next Unlock: Sounds & JS!",
      subtitle: "Tap › to see how JavaScript adds sound effects & logic",
      audio: "audio/slide-35.mp3",
      narration: "Curious what comes right after HTML and CSS? JavaScript! Since you already know programming, look how easy it is: HTML builds the button, CSS animates it, and a tiny script function plays an MP3 sound when clicked!",
      narrationTts: "Curious what comes right after H T M L and C S S? JavaScript! Since you already know programming, look how easy it is: H T M L builds the button, C S S animates it, and a tiny script function plays an M P three sound when clicked!",
      content: {
        language: "html",
        filename: "future-unlock.html",
        code: "<!-- HTML + CSS + JavaScript -->\n<button onclick=\"collectXp()\">\n  Collect XP\n</button>\n\n<script>\n  function collectXp() {\n    new Audio(\"xp.mp3\").play();\n    alert(\"Level Up! +100 XP\");\n  }\n</script>",
        steps: [
          {
            lines: "2-4",
            note: "onclick=\"collectXp()\" tells your HTML <button> which function to run on click!",
            tts: "On click equals collect X P tells your H T M L button which function to run when clicked!"
          },
          {
            lines: "6-8",
            note: "new Audio(\"xp.mp3\").play() plays any sound effect file in a single line of JS!",
            tts: "New Audio X P dot M P three dot play plays any sound effect file in one single line of JavaScript!"
          },
          {
            lines: "9-11",
            note: "HTML = structure, CSS = visuals & @keyframes motion, JS = sounds & game logic!",
            tts: "That's the full web trio: H T M L builds structure, C S S handles visuals and motion, and JavaScript runs sounds and logic!"
          }
        ]
      }
    },
    {
      id: "slide-36",
      type: "mission",
      badge: "WEEKEND QUEST • VS CODE",
      title: "Weekend Quest: 2-Page Site!",
      subtitle: "Keep this phone beside your keyboard and type every line yourself",
      audio: "audio/slide-36.mp3",
      narration: "Time to build! Keep this phone propped next to your keyboard so you can swipe back to any code slide. First knock out Friday's exact test in five minutes, then craft your personal site linking right to it!",
      narrationTts: "Time to build! Keep this phone propped next to your keyboard so you can swipe back to any code slide. First knock out Friday's exact test in five minutes, then craft your personal site linking right to it!",
      content: {
        goal: "Build test.html (Friday's Test) + index.html (Personal Site) linked together!",
        steps: [
          {
            number: "01",
            title: "Ace Friday's Test",
            text: "Build test.html + test.css: blue box, Name & Pass rows!",
            tts: "Step one: Ace Friday's Test. Create test dot H T M L plus external test dot C S S with the blue box, Name row, Password row, and Home link."
          },
          {
            number: "02",
            title: "Craft index.html + CSS",
            text: "Add Hero (floating photo, <table>, link) + glass VIP card!",
            tts: "Step two: Craft index dot H T M L plus style dot C S S. Add your Hero card with floating round photo, stats table, and test link, plus your frosted V I P card!"
          },
          {
            number: "03",
            title: "Texture, F12 & Publish",
            text: "Add a tile texture, test Chrome F12, and publish + USB!",
            tts: "Step three: Texture, F twelve flex, and publish. Pick a texture on Transparent Textures or Kenney, practice Chrome F twelve live edits, and publish plus U S B!"
          }
        ],
        reward: "🏆 Ready for Monday: Live URL + USB + Chrome F12 mastery!"
      }
    },
    {
      id: "slide-37",
      type: "results",
      badge: "QUEST COMPLETE",
      title: "Grade: Your First-Try Score!",
      subtitle: "Out of 10 HTML & CSS checkpoints—ready to craft!",
      audio: "audio/slide-37.mp3",
      narration: "Congratulations on completing the full HTML and CSS masterclass! Here is your first-try score out of ten checkpoints. Swipe back to any code card whenever you need while crafting your two-page showcase in VS Code!",
      narrationTts: "Congratulations on completing the full H T M L and C S S masterclass! Here is your first try score out of ten checkpoints. Swipe back to any code card whenever you need while crafting your two page showcase in V S Code!",
      content: {
        icon: "💎",
        tiers: [
          { min: 0.9, text: "Grade 10 Master! Diamond Tier! 💎" },
          { min: 0.7, text: "Emerald Crafter! Ready to Shine! ⛏️" },
          { min: 0, text: "Solid Run! Now Craft It Live in VS Code! 🧱" }
        ]
      }
    }
  ]
};
