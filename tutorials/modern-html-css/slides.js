(function () {
  const ICONS = {
    stack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="5" rx="1.5"/><rect x="3" y="11" width="18" height="5" rx="1.5"/><line x1="7" y1="20" x2="17" y2="20"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z"/></svg>`,
    tokens: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4"/><circle cx="16" cy="16" r="4"/><path d="M10.8 10.8L13.2 13.2"/></svg>`,
    rowCol: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h14"/><polyline points="18 10 21 13 18 16"/></svg>`,
    gap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="6" height="14" rx="1"/><rect x="15" y="5" width="6" height="14" rx="1"/><path d="M12 7v10"/></svg>`,
    wrap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="8" height="6" rx="1"/><rect x="13" y="4" width="8" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/></svg>`,
    fontSys: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
    fontWeb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="3.6" y1="9" x2="20.4" y2="9"/><line x1="3.6" y1="15" x2="20.4" y2="15"/><path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18"/></svg>`,
    clamp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`
  };

  window.PRESENTATION_DATA = {
    id: "modern-html-css",
    format: "mobile",
    lang: "en",
    sfx: true,
    title: "Modern HTML & CSS Styling",
    subtitle: "From 2010 Hacks to Pure Native CSS — Zero JS, Zero Build Step",
    theme: {
      accent: "#00ff85",
      accentGlow: "rgba(0, 255, 133, 0.25)",
      badgeColor: "#00ff85"
    },
    slides: [
      // =======================================================================
      // 01 — WELCOME BACK: 15 YEARS IN 60 SECONDS
      // =======================================================================
      {
        id: "slide-01",
        type: "hero",
        badge: "CRASH COURSE • 2010 → NOW",
        title: "Welcome Back to Web Styling",
        subtitle: "Everything that needed hacks in 2010 is now 1 line of native CSS",
        audio: "audio/slide-01.mp3",
        narration: "Welcome back to web development! Fifteen years ago, centering a div or rounding corners meant float hacks and sliced images. Today, browsers handle layouts, glass blur, animations, and variables natively in pure CSS with zero build tools.",
        narrationTts: "Welcome back to web development! Fifteen years ago, centering a div or rounding corners meant float hacks and sliced images. Today, browsers handle layouts, glass blur, animations, and variables natively in pure C S S with zero build tools.",
        content: {
          highlights: [
            {
              icon: ICONS.stack,
              title: "Sane Box & Stack Layouts",
              text: "border-box keeps widths exact, while Flexbox stacks and centers items cleanly.",
              tts: "Sane box and stack layouts. Border box keeps widths exact, while Flexbox stacks and centers items cleanly."
            },
            {
              icon: ICONS.sparkles,
              title: "Pure GPU Visual Effects",
              text: "Gradients, frosted-glass blur, pill corners, and smooth animations—zero PNGs.",
              tts: "Pure G P U visual effects. Gradients, frosted glass blur, pill corners, and smooth animations with zero P N G files."
            },
            {
              icon: ICONS.tokens,
              title: "Native CSS Variables",
              text: "Define corporate colors once in plain .css—no precompiled SCSS required.",
              tts: "Native C S S variables. Define corporate colors once in plain dot C S S, with no precompiled S C S S required."
            }
          ]
        }
      },

      // =======================================================================
      // 02 — COMPARE: 2010 HACKS VS MODERN NATIVE CSS
      // =======================================================================
      {
        id: "slide-02",
        type: "compare",
        badge: "THE PARADIGM SHIFT",
        title: "2010 CSS Hacks vs. Modern CSS",
        subtitle: "Why stylesheets shrunk by 70% while looking 10x sharper",
        audio: "audio/slide-02.mp3",
        narration: "Remember clearfix classes, repeating one-pixel gradient images, and nine-cell tables just to fake rounded corners? Every single one of those old workarounds has been replaced by dedicated, hardware-accelerated CSS properties built right into every browser.",
        narrationTts: "Remember clearfix classes, repeating one pixel gradient images, and nine cell tables just to fake rounded corners? Every single one of those old workarounds has been replaced by dedicated, hardware accelerated C S S properties built right into every browser.",
        content: {
          left: {
            tag: "❌ CIRCA 2010 • PAINFUL WORKAROUNDS",
            title: "Floats, Spacer GIFs & Math",
            points: [
              "float: left + clearfix hacks for columns",
              "9-slice corner PNGs & 1px gradient strips",
              "Padding expanded box widths unpredictably"
            ]
          },
          right: {
            tag: "✅ NOWADAYS • NATIVE ENGINE POWER",
            title: "One-Line Declarative Styling",
            points: [
              "display: flex + gap for instant stacks",
              "border-radius, gradients & backdrop-filter",
              "box-sizing: border-box locks exact widths"
            ]
          }
        }
      },

      // =======================================================================
      // 03 — CODE: THE BOX MODEL FIX (border-box)
      // =======================================================================
      {
        id: "slide-03",
        type: "code",
        badge: "FOUNDATION 1 • BOX MODEL",
        title: "The Box Model Fix: border-box",
        subtitle: "Tap › to see why padding no longer breaks your widths",
        audio: "audio/slide-03.mp3",
        narration: "You spotted a huge upgrade! In the old content-box model, adding twenty-four pixels of padding to a three-hundred-pixel div secretly widened it to three-fifty-two. Today, every stylesheet starts with box-sizing border-box so padding stays inside.",
        narrationTts: "You spotted a huge upgrade! In the old content box model, adding twenty-four pixels of padding to a three hundred pixel div secretly widened it to three fifty-two. Today, every stylesheet starts with box sizing border box so padding stays inside.",
        content: {
          language: "css",
          filename: "style.css",
          code: "/* Old default: 300+48+4=352px */\n.old-box {\n  width: 300px;\n  padding: 24px;\n  border: 2px solid #94a3b8;\n}\n\n/* Modern reset: stays 300px! */\n*, *::before, *::after {\n  box-sizing: border-box;\n}",
          steps: [
            {
              lines: "1-6",
              note: "Old content-box added padding & border OUTSIDE your width—breaking multi-column math.",
              tts: "Old content box added padding and border outside your declared width, constantly breaking multi-column math."
            },
            {
              lines: "8-11",
              note: "Put this 3-line reset at the top of style.css: width: 300px now means 300px total!",
              tts: "Put this three line reset at the top of style dot C S S. Now width three hundred pixels means three hundred pixels total!"
            }
          ]
        }
      },

      // =======================================================================
      // 04 — LIVE VISUAL LAB: OLD content-box VS MODERN border-box
      // =======================================================================
      {
        id: "slide-04",
        type: "showcase",
        badge: "LIVE VISUAL • BOX SIZING",
        title: "Visualized: Old vs. border-box",
        subtitle: "Both boxes declare width: 100% + padding inside the dashed slot",
        audio: "audio/slide-04.mp3",
        narration: "Look at both boxes inside the exact same dashed parent column. With the old default, adding inner padding pushes the pink border right past the parent edge. With border-box, the green box absorbs padding inward cleanly.",
        narrationTts: "Look at both boxes inside the exact same dashed parent column. With the old default, adding inner padding pushes the pink border right past the parent edge. With border box, the green box absorbs padding inward cleanly.",
        content: {
          customHtml: `
            <div class="mc-lab">
              <div class="mc-panel">
                <div class="mc-panel-head">
                  <span class="mc-tag bad">❌ content-box (2008)</span>
                  <span class="mc-meta">300px + 48px = 348px</span>
                </div>
                <div class="mc-ruler"><span>0px</span><span>Parent Slot (100%)</span><span>→</span></div>
                <div class="mc-slot">
                  <div class="mc-box-old">
                    <div class="mc-box-core">Overflows parent!</div>
                  </div>
                </div>
                <div class="mc-caption">Padding pushes the border <code>outside</code> your declared width.</div>
              </div>

              <div class="mc-panel">
                <div class="mc-panel-head">
                  <span class="mc-tag good">✅ border-box (Nowadays)</span>
                  <span class="mc-meta">Total = 300px Exact</span>
                </div>
                <div class="mc-ruler"><span>0px</span><span>Parent Slot (100%)</span><span>|</span></div>
                <div class="mc-slot">
                  <div class="mc-box-new">
                    <div class="mc-box-core">Fits 100% cleanly!</div>
                  </div>
                </div>
                <div class="mc-caption"><code>box-sizing: border-box</code> tucks padding &amp; border inward.</div>
              </div>
            </div>
          `
        }
      },

      // =======================================================================
      // 05 — CARDS: FLEXBOX AS A SMART STACK CONTAINER
      // =======================================================================
      {
        id: "slide-05",
        type: "cards",
        badge: "FOUNDATION 2 • FLEXBOX",
        title: "Flexbox: Your Smart Stack Box",
        subtitle: "Your intuition nailed it: pick a direction and a gap",
        audio: "audio/slide-05.mp3",
        narration: "Your first impression of Flexbox was spot-on! Think of display flex as turning any parent div into an intelligent stack container. You tell the parent whether children flow in a row or column, and set gap.",
        narrationTts: "Your first impression of Flexbox was spot on! Think of display flex as turning any parent div into an intelligent stack container. You tell the parent whether children flow in a row or column, and set gap.",
        content: {
          cards: [
            {
              icon: ICONS.rowCol,
              tag: "1. DIRECTION",
              title: "flex-direction: row | column",
              text: "Row lines items up side-by-side; column stacks them vertically top-to-bottom.",
              tts: "Direction: flex direction row or column. Row lines items up side by side; column stacks them vertically top to bottom."
            },
            {
              icon: ICONS.gap,
              tag: "2. CLEAN SPACING",
              title: "gap: 16px (Zero Margin Hacks)",
              text: "Adds space ONLY between siblings—never awkward extra margin on the outer edges.",
              tts: "Clean spacing with gap sixteen pixels. It adds space only between siblings, never awkward extra margin on the outer edges."
            },
            {
              icon: ICONS.wrap,
              tag: "3. FLUID WRAPPING",
              title: "flex-wrap: wrap",
              text: "When a phone screen gets narrow, cards wrap onto the next row automatically.",
              tts: "Fluid wrapping with flex wrap. When a phone screen gets narrow, cards wrap onto the next row automatically."
            }
          ]
        }
      },

      // =======================================================================
      // 06 — CODE: ALIGNING & CENTERING ANY DIV WITH FLEXBOX
      // =======================================================================
      {
        id: "slide-06",
        type: "code",
        badge: "FLEXBOX ALIGNMENT",
        title: "Aligning & Centering Any Div",
        subtitle: "Tap › to master justify-content and align-items",
        audio: "audio/slide-06.mp3",
        narration: "Centering a div vertically used to be an interview trick question! With Flexbox, two properties control alignment: justify-content moves items along your stack direction, and align-items centers them across it. Look at these two everyday patterns.",
        narrationTts: "Centering a div vertically used to be an interview trick question! With Flexbox, two properties control alignment: justify content moves items along your stack direction, and align items centers them across it. Look at these two everyday patterns.",
        content: {
          language: "css",
          filename: "layout.css",
          code: "/* 1. Dead-center any element */\n.hero-stage {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n}\n\n/* 2. Corporate top navbar */\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
          steps: [
            {
              lines: "2-5",
              note: "100vh = 100% of viewport height; display: flex + column creates a vertical stage.",
              tts: "One hundred V H equals the full screen height, and display flex with column creates a vertical stage."
            },
            {
              lines: "6-8",
              note: "justify-content + align-items dead-center children on BOTH axes with 24px gap!",
              tts: "Justify content plus align items dead-center children on both axes with a twenty-four pixel gap!"
            },
            {
              lines: "12-16",
              note: "space-between pins your logo left and navigation links right—zero floats needed!",
              tts: "Space between pins your logo to the left and navigation links to the right, with zero floats needed!"
            }
          ]
        }
      },

      // =======================================================================
      // 07 — LIVE VISUAL LAB: 3 EVERYDAY FLEXBOX PATTERNS
      // =======================================================================
      {
        id: "slide-07",
        type: "showcase",
        badge: "LIVE VISUAL • FLEXBOX",
        title: "Live Lab: 3 Flexbox Patterns",
        subtitle: "90% of modern corporate layouts use just these three combos",
        audio: "audio/slide-07.mp3",
        narration: "Here are those exact three Flexbox combinations rendered live on this screen. Space-between builds every corporate header, column with gap stacks cards with uniform green breathing room, and center-plus-center locks any badge dead in the crosshairs.",
        narrationTts: "Here are those exact three Flexbox combinations rendered live on this screen. Space between builds every corporate header, column with gap stacks cards with uniform green breathing room, and center plus center locks any badge dead in the crosshairs.",
        content: {
          customHtml: `
            <div class="mc-lab">
              <div class="mc-panel">
                <div class="mc-panel-head">
                  <span class="mc-tag good">1. Navbar Row</span>
                  <span class="mc-meta">space-between</span>
                </div>
                <div class="mc-flex-nav">
                  <div class="mc-flex-brand"><span class="mc-flex-dot"></span>ACME</div>
                  <div class="mc-flex-links"><span>Product</span><span>Pricing</span></div>
                </div>
              </div>

              <div class="mc-panel">
                <div class="mc-panel-head">
                  <span class="mc-tag blue">2. Vertical Stack</span>
                  <span class="mc-meta">column + gap: 12px</span>
                </div>
                <div class="mc-flex-stack">
                  <div class="mc-stack-item"><span>Card Header</span><span>flex item 1</span></div>
                  <div class="mc-stack-item"><span>Body Metrics</span><span>flex item 2</span></div>
                </div>
              </div>

              <div class="mc-panel">
                <div class="mc-panel-head">
                  <span class="mc-tag good">3. Dead-Center</span>
                  <span class="mc-meta">justify + align: center</span>
                </div>
                <div class="mc-flex-center">
                  <div class="mc-center-pill">Centered X &amp; Y</div>
                </div>
              </div>
            </div>
          `
        }
      },

      // =======================================================================
      // 08 — CARDS: MODERN FONTS & FLUID TYPOGRAPHY
      // =======================================================================
      {
        id: "slide-08",
        type: "cards",
        badge: "TYPOGRAPHY NOWADAYS",
        title: "Modern Fonts & Fluid Sizing",
        subtitle: "Goodbye Verdana, Flash sIFR, and image-sliced headlines",
        audio: "audio/slide-08.mp3",
        narration: "Twenty years ago, custom fonts required Photoshop images or Flash hacks, otherwise everyone saw Times New Roman or Verdana. Today you have crisp operating-system UI stacks, one-line web fonts, and fluid clamp sizing that scales smoothly.",
        narrationTts: "Twenty years ago, custom fonts required Photoshop images or Flash hacks, otherwise everyone saw Times New Roman or Verdana. Today you have crisp operating system U I stacks, one line web fonts, and fluid clamp sizing that scales smoothly.",
        content: {
          cards: [
            {
              icon: ICONS.fontSys,
              tag: "ZERO-DOWNLOAD CORPORATE",
              title: "System UI Font Stack",
              text: "system-ui, -apple-system, 'Segoe UI' renders native San Francisco or Segoe UI.",
              tts: "System U I font stack. Writing system U I, dash apple system, Segoe U I renders crisp native operating system fonts instantly."
            },
            {
              icon: ICONS.fontWeb,
              tag: "CUSTOM BRAND FONTS",
              title: "Google Fonts & @font-face",
              text: "Paste one <link> for Inter, or load a tiny local .woff2 file via @font-face.",
              tts: "Google Fonts and at font face. Paste one link tag for Inter, or load a tiny local W O F F two file via at font face."
            },
            {
              icon: ICONS.clamp,
              tag: "AUTO-SCALING HEADLINES",
              title: "clamp(1.8rem, 5vw, 3.2rem)",
              text: "Sets minimum phone size, fluid middle scale, and desktop cap in one declaration!",
              tts: "Fluid sizing with clamp. It sets a minimum phone size, a fluid viewport scale, and a maximum desktop cap in one declaration!"
            }
          ]
        }
      },

      // =======================================================================
      // 09 — CODE: ROUNDED CORNERS, PILLS & LAYERED SHADOWS
      // =======================================================================
      {
        id: "slide-09",
        type: "code",
        badge: "VISUAL POLISH 1 • SURFACES",
        title: "Rounded Corners, Pills & Glows",
        subtitle: "Tap › for modern card geometry, subtle borders, and shadows",
        audio: "audio/slide-09.mp3",
        narration: "Corporate dark themes get their executive polish from restraint: generous twenty-pixel rounded corners, ultra-subtle eight-percent white borders instead of harsh gray lines, and deep diffused drop shadows. Need a pill badge or circle? Just raise border-radius.",
        narrationTts: "Corporate dark themes get their executive polish from restraint: generous twenty pixel rounded corners, ultra subtle eight percent white borders instead of harsh gray lines, and deep diffused drop shadows. Need a pill badge or circle? Just raise border radius.",
        content: {
          language: "css",
          filename: "surfaces.css",
          code: ".card {\n  border-radius: 20px;\n  border: 1px solid\n    rgba(255, 255, 255, 0.08);\n  box-shadow:\n    0 20px 40px rgba(0, 0, 0, .6);\n}\n\n.status-pill {\n  border-radius: 9999px;\n  padding: 6px 14px;\n}\n.avatar {\n  width: 64px; height: 64px;\n  border-radius: 50%;\n}",
          steps: [
            {
              lines: "1-4",
              note: "20px rounds card corners smoothly; 8%-opacity white draws a crisp glass edge.",
              tts: "Twenty pixels rounds card corners smoothly, and eight percent opacity white draws a crisp glass edge."
            },
            {
              lines: "5-7",
              note: "Large 40px blur radius creates soft, realistic elevation instead of 2010 hard shadows.",
              tts: "A large forty pixel blur radius creates soft, realistic elevation instead of harsh two thousand ten drop shadows."
            },
            {
              lines: "9-16",
              note: "9999px turns any rectangle into a stadium pill; 50% on a square makes a true circle!",
              tts: "Nine thousand nine hundred ninety-nine pixels turns any rectangle into a pill, and fifty percent on a square makes a circle!"
            }
          ]
        }
      },

      // =======================================================================
      // 10 — CODE: GRADIENTS & FROSTED GLASS BLUR
      // =======================================================================
      {
        id: "slide-10",
        type: "code",
        badge: "VISUAL POLISH 2 • LIGHT & GLASS",
        title: "Gradients & Frosted Glass Blur",
        subtitle: "Tap › for spotlights, blurred glass, and metallic text",
        audio: "audio/slide-10.mp3",
        narration: "Here is the secret behind modern SaaS websites—including the main theme of this site! A faint radial-gradient spotlight lights up the dark background, backdrop-filter blur frosts semi-transparent cards above it, and background-clip paints gradient headlines.",
        narrationTts: "Here is the secret behind modern SaaS websites, including the main theme of this site! A faint radial gradient spotlight lights up the dark background, backdrop filter blur frosts semi-transparent cards above it, and background clip paints gradient headlines.",
        content: {
          language: "css",
          filename: "effects.css",
          code: "body {\n  background: radial-gradient(\n    circle at 50% 20%,\n    rgba(0,255,133,.1), #0a0d14);\n}\n.glass-card {\n  background: rgba(18,24,38,0.7);\n  backdrop-filter: blur(16px);\n}\nh1 {\n  background: linear-gradient(\n    180deg, #ffffff, #94a3b8);\n  background-clip: text;\n  color: transparent;\n}",
          steps: [
            {
              lines: "1-5",
              note: "radial-gradient projects a subtle emerald glow from the top-center into dark slate.",
              tts: "Radial gradient projects a subtle emerald spotlight from the top center into deep dark slate."
            },
            {
              lines: "6-9",
              note: "70%-opaque dark surface + backdrop-filter: blur(16px) frosts whatever sits behind it!",
              tts: "A seventy percent opaque dark surface plus backdrop filter blur sixteen pixels frosts whatever sits behind it!"
            },
            {
              lines: "10-15",
              note: "Clips a white-to-silver gradient right inside the letters of your <h1> headline!",
              tts: "Background clip text clips a crisp white-to-silver gradient right inside the letters of your H one headline!"
            }
          ]
        }
      },

      // =======================================================================
      // 11 — CODE: SMOOTH HOVER TRANSITIONS & @KEYFRAMES ANIMATIONS
      // =======================================================================
      {
        id: "slide-11",
        type: "code",
        badge: "VISUAL POLISH 3 • MOTION",
        title: "Smooth Hover & CSS Animations",
        subtitle: "Tap › for 60fps interactive motion with zero JavaScript",
        audio: "audio/slide-11.mp3",
        narration: "Back in the day, smooth hover fades or pulsing indicators meant jQuery scripts. Now CSS handles motion in two ways: transition smoothly interpolates hover state changes, while at-keyframes runs continuous loops right on the graphics card.",
        narrationTts: "Back in the day, smooth hover fades or pulsing indicators meant jQuery scripts. Now C S S handles motion in two ways: transition smoothly interpolates hover state changes, while at keyframes runs continuous loops right on the graphics card.",
        content: {
          language: "css",
          filename: "motion.css",
          code: "/* Smooth hover state lift */\n.btn {\n  transition: transform .25s ease,\n    box-shadow .25s ease;\n}\n.btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 0 20px #00ff8540;\n}\n/* Zero-JS infinite pulse loop */\n.live-dot {\n  animation: pulse 2s infinite;\n}\n@keyframes pulse {\n  50% { opacity: .4; scale: .85; }\n}",
          steps: [
            {
              lines: "2-9",
              note: "transition glides .btn upward 3px on hover with a soft glow—never snaps abruptly!",
              tts: "Transition glides the button upward three pixels on hover with a soft glow, so it never snaps abruptly!"
            },
            {
              lines: "11-16",
              note: "@keyframes pulse gently breathes opacity and scale every 2 seconds—100% pure CSS!",
              tts: "At keyframes pulse gently breathes opacity and scale every two seconds in one hundred percent pure C S S!"
            }
          ]
        }
      },

      // =======================================================================
      // 12 — LIVE VISUAL LAB: GLASS, GRADIENT GLOW & @KEYFRAMES MOTION
      // =======================================================================
      {
        id: "slide-12",
        type: "showcase",
        badge: "LIVE VISUAL • PURE CSS",
        title: "Live Lab: Glass, Glow & Motion",
        subtitle: "Watch blurred orbs drift behind real frosted glass right now",
        audio: "audio/slide-12.mp3",
        narration: "Everything moving inside this card is pure CSS—zero images and zero JavaScript! Notice how the emerald and sky-blue gradient orbs drift behind the card while backdrop-filter blurs them into smooth frosted glass.",
        narrationTts: "Everything moving inside this card is pure C S S, with zero images and zero JavaScript! Notice how the emerald and sky-blue gradient orbs drift behind the card while backdrop filter blurs them into smooth frosted glass.",
        content: {
          customHtml: `
            <div class="mc-lab">
              <div class="mc-glass-stage">
                <div class="mc-orb mc-orb-1"></div>
                <div class="mc-orb mc-orb-2"></div>
                <div class="mc-glass-card">
                  <div class="mc-live-pill">
                    <span class="mc-pulse-dot"></span>
                    <span>LIVE GPU RENDERED</span>
                  </div>
                  <div class="mc-grad-title">Frosted Glass UI</div>
                  <div class="mc-glass-desc">Drifting radial orbs blurred live through a 62% translucent dark slate card.</div>
                </div>
              </div>

              <div class="mc-spec-grid">
                <div class="mc-spec-pill"><strong>backdrop-filter</strong><span>blur(16px)</span></div>
                <div class="mc-spec-pill"><strong>border-radius</strong><span>20px + 999px pill</span></div>
                <div class="mc-spec-pill"><strong>background-clip</strong><span>metallic text</span></div>
                <div class="mc-spec-pill"><strong>@keyframes</strong><span>orb float + pulse</span></div>
              </div>
            </div>
          `
        }
      },

      // =======================================================================
      // 13 — COMPARE: WHAT IS SCSS? DO YOU NEED COMPLEX SYSTEMS?
      // =======================================================================
      {
        id: "slide-13",
        type: "compare",
        badge: "ECOSYSTEM DEMYSTIFIED",
        title: "What Is SCSS? Do You Need It?",
        subtitle: "Why precompiled stylesheets existed—and why vanilla CSS won",
        audio: "audio/slide-13.mp3",
        narration: "You asked a great question about seeing S-C-S-S online! Yes, SCSS—part of Sass—was a precompiled language from the twenty-tens invented because CSS lacked variables and rule nesting. Good news: browsers now support both natively in plain CSS!",
        narrationTts: "You asked a great question about seeing S C S S online! Yes, S C S S, part of Sass, was a precompiled language from the twenty-tens invented because C S S lacked variables and rule nesting. Good news: browsers now support both natively in plain C S S!",
        content: {
          left: {
            tag: "⚙️ .SCSS / SASS • PRECOMPILED ERA",
            title: "Extra Build Step Required",
            points: [
              "Used $variables & nested blocks before CSS could",
              "Browsers cannot read .scss files directly",
              "Requires Node/CLI compilers to output .css"
            ]
          },
          right: {
            tag: "✅ MODERN VANILLA .CSS • ZERO TOOLS",
            title: "Built Directly Into Browsers",
            points: [
              "Native --variables via var() live in the DOM",
              "Native &:hover nesting & calc() math built-in",
              "Save style.css and refresh—zero build pipeline!"
            ]
          }
        }
      },

      // =======================================================================
      // 14 — CODE: NATIVE CSS VARIABLES & NESTING
      // =======================================================================
      {
        id: "slide-14",
        type: "code",
        badge: "CLEAN ARCHITECTURE • TOKENS",
        title: "Native CSS Variables: var()",
        subtitle: "Tap › to theme an entire corporate site from one :root block",
        audio: "audio/slide-14.mp3",
        narration: "Here is how native CSS variables—officially called custom properties—work in a normal dot-css file. Declare your brand palette once inside colon-root with two leading dashes, then reuse them anywhere with var! Even nested hover rules work natively now.",
        narrationTts: "Here is how native C S S variables, officially called custom properties, work in a normal dot C S S file. Declare your brand palette once inside colon root with two leading dashes, then reuse them anywhere with var! Even nested hover rules work natively now.",
        content: {
          language: "css",
          filename: "style.css",
          code: ":root {\n  --bg-dark: #0a0d14;\n  --bg-card: rgba(18, 24, 38, .7);\n  --accent: #00ff85;\n  --muted: #94a3b8;\n}\n.corp-card {\n  background: var(--bg-card);\n  color: var(--muted);\n  border: 1px solid var(--accent);\n\n  /* Native CSS nesting works! */\n  &:hover {\n    transform: translateY(-2px);\n  }\n}",
          steps: [
            {
              lines: "1-6",
              note: ":root stores your corporate palette in one place—change --accent once, update everywhere!",
              tts: "Colon root stores your corporate palette in one place. Change dash dash accent once, and every component updates!"
            },
            {
              lines: "7-10",
              note: "var(--bg-card) and var(--accent) read those live tokens with zero compilation.",
              tts: "Var dash dash B G card and var dash dash accent read those live tokens directly in the browser."
            },
            {
              lines: "12-16",
              note: "&:hover nests right inside .corp-card in modern browsers—just like SCSS used to!",
              tts: "Ampersand colon hover nests right inside dot corp card in modern browsers, just like S C S S used to!"
            }
          ]
        }
      },

      // =======================================================================
      // 15 — LIVE BLUEPRINT: CORPORATE THEME RECIPE (virusescu.github.io)
      // =======================================================================
      {
        id: "slide-15",
        type: "showcase",
        badge: "PUTTING IT ALL TOGETHER",
        title: "Blueprint: Corporate Site Theme",
        subtitle: "How every technique combines into this website's sleek aesthetic",
        audio: "audio/slide-15.mp3",
        narration: "Look how simple a modern corporate page actually is when you combine everything you just learned: four CSS variables, a space-between Flex header, a centered Flex hero with gradient text, and one frosted-glass metric card.",
        narrationTts: "Look how simple a modern corporate page actually is when you combine everything you just learned: four C S S variables, a space between Flex header, a centered Flex hero with gradient text, and one frosted glass metric card.",
        content: {
          customHtml: `
            <div class="mc-lab">
              <div class="mc-browser">
                <div class="mc-browser-bar">
                  <div class="mc-browser-dots"><span></span><span></span><span></span></div>
                  <span>index.html + style.css (Zero JS)</span>
                </div>
                <div class="mc-corp-body">
                  <div class="mc-corp-header">
                    <div class="mc-corp-logo">
                      <div class="mc-corp-mark">▲</div>
                      <span class="mc-corp-name">NEXUS CORP</span>
                    </div>
                    <div class="mc-live-pill">
                      <span class="mc-pulse-dot"></span>
                      <span>LIVE</span>
                    </div>
                  </div>

                  <div class="mc-corp-hero">
                    <span class="mc-corp-kicker">ENTERPRISE INFRASTRUCTURE</span>
                    <div class="mc-corp-h1"> Precision Cloud, Zero Complexity.</div>
                    <div class="mc-corp-sub">Flexbox layout, CSS variables, radial glow &amp; frosted glass.</div>
                  </div>

                  <div class="mc-corp-card">
                    <div class="mc-corp-kpi">
                      <span class="mc-corp-kpi-num">99.99%</span>
                      <span class="mc-corp-kpi-lbl">Global Uptime SLA</span>
                    </div>
                    <div class="mc-corp-cta">Get Started →</div>
                  </div>
                </div>
              </div>

              <div class="mc-tokens-row">
                <div class="mc-swatch"><span class="mc-swatch-dot" style="background:#0a0d14"></span>#0a0d14</div>
                <div class="mc-swatch"><span class="mc-swatch-dot" style="background:#121826"></span>glass .7</div>
                <div class="mc-swatch"><span class="mc-swatch-dot" style="background:#00ff85"></span>#00ff85</div>
              </div>
            </div>
          `
        }
      },

      // =======================================================================
      // 16 — HANDS-ON MISSION: BUILD YOUR CORPORATE LANDING PAGE
      // =======================================================================
      {
        id: "slide-16",
        type: "mission",
        badge: "YOUR 15-MINUTE MISSION",
        title: "Build Your Corporate Page",
        subtitle: "Two plain files—index.html and style.css—zero frameworks",
        audio: "audio/slide-16.mp3",
        narration: "Ready to get your hands back on the keyboard? Create an empty folder with just index dot html and style dot css. Follow these three steps, swipe back to any code slide for reference, and enjoy how clean CSS feels today!",
        narrationTts: "Ready to get your hands back on the keyboard? Create an empty folder with just index dot H T M L and style dot C S S. Follow these three steps, swipe back to any code slide for reference, and enjoy how clean C S S feels today!",
        content: {
          goal: "Craft a dark frosted-glass corporate landing page in pure HTML5 & vanilla CSS.",
          steps: [
            {
              number: "01",
              title: "Tokens & border-box Reset",
              text: "Add * { box-sizing: border-box; } and your :root dark-slate & accent variables.",
              tts: "Step one: Tokens and border box reset. Add universal box sizing border box and your colon root dark slate and accent variables."
            },
            {
              number: "02",
              title: "Flex Navbar & Centered Hero",
              text: "Use space-between on <header>, and column + center + gap on <main>.",
              tts: "Step two: Flex navbar and centered hero. Use space between on header, and column plus center plus gap on main."
            },
            {
              number: "03",
              title: "Frosted Card, Glow & Hover",
              text: "Style a blurred rgba() card with 20px corners, radial spotlight, and hover lift!",
              tts: "Step three: Frosted card, glow, and hover. Style a blurred R G B A card with twenty-pixel corners, radial spotlight, and hover lift!"
            }
          ],
          reward: "🚀 Welcome back—you now write cleaner CSS than 90% of framework-heavy sites!"
        }
      }
    ]
  };
})();
