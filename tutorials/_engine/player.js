/**
 * virusescu.github.io — Shared Presentation & Tutorial Runtime Engine
 * Pure Vanilla ES6+, zero dependencies, offline file:/// compatible.
 *
 * Formats (window.PRESENTATION_DATA.format):
 *   "desktop" (default) — fixed 1600×900 stage scaled to the window, bottom HUD
 *   "mobile"            — Stories-style full-viewport 9:16 cards (load stories.css too)
 *
 * Optional companions: sfx.js (window.PresentationSfx), highlight.js (window.PresentationHighlight)
 * QA URL params: ?qa (skip the mobile cover), ?qa=answered (render interactive slides solved)
 */

(function () {
  "use strict";

  const STRINGS = {
    ro: {
      start: "Începe",
      slides: "slide-uri",
      tryAgain: "Nu chiar… mai încearcă!",
      hint: "Indiciu",
      correct: "Corect!",
      revealed: "Răspunsul corect",
      explanation: "Explicație",
      check: "Verifică",
      placeholder: "Scrie răspunsul aici…",
      tapToFlip: "Atinge ca să întorci",
      step: "Pas",
      score: "Ai răspuns corect din prima la {x} din {y} întrebări.",
      noQuestions: "Nicio întrebare în această prezentare.",
      unsupported: "Tipul de slide „{type}” nu este disponibil în formatul {format}."
    },
    en: {
      start: "Start",
      slides: "slides",
      tryAgain: "Not quite… try again!",
      hint: "Hint",
      correct: "Correct!",
      revealed: "The correct answer",
      explanation: "Explanation",
      check: "Check",
      placeholder: "Type your answer…",
      tapToFlip: "Tap to flip",
      step: "Step",
      score: "You got {x} of {y} questions right on the first try.",
      noQuestions: "No questions in this presentation.",
      unsupported: "Slide type \"{type}\" is not available in the {format} format."
    }
  };

  const SCORED_TYPES = ["quiz", "input"];

  // Taps on these never count as "tap to navigate" in the mobile Stories format.
  const NO_NAV_SELECTOR = "a, button, input, textarea, label, form, .interactive-card, .quiz-option, " +
    ".answer-feedback, .stories-top, .stories-next, .stories-cover, [data-no-nav]";

  /* ==========================================================================
     Slide Type Registry
     render(engine, body, slide)          builds the .slide-body content
     onEnter(engine, slide, el, opts)     slide became active (opts.direction: 1 fwd, -1 back, 0 jump)
     onNext / onPrev(engine, slide, el)   return true to consume the navigation (e.g. code steps)
     formats                              which deck formats can render this type
     ========================================================================== */

  const SLIDE_TYPES = {
    hero: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        if (Array.isArray(content.highlights)) {
          const grid = document.createElement("div");
          grid.className = "hero-highlights";
          content.highlights.forEach((h, idx) => {
            const card = document.createElement("div");
            card.className = "hero-card interactive-card";
            card.title = "Click to listen";
            card.innerHTML = `
              <div class="hero-card-icon">${h.icon || "✨"}</div>
              <div class="hero-card-title">${engine.escapeHtml(h.title || "")}</div>
              <div class="hero-card-text">${engine.escapeHtml(h.text || "")}</div>
            `;
            const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
            card.addEventListener("click", () => engine.playCardAudio(card, audioSrc));
            grid.appendChild(card);
          });
          container.appendChild(grid);
        }
      }
    },

    compare: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        const leftData = content.left || {};
        const rightData = content.right || {};

        // Left (Wrong)
        const leftCol = document.createElement("div");
        leftCol.className = "compare-col wrong";
        leftCol.innerHTML = `
          <div class="compare-tag">${engine.escapeHtml(leftData.tag || "❌ DON'T DO THIS")}</div>
          <div class="compare-title">${engine.escapeHtml(leftData.title || "")}</div>
          <ul class="compare-points">
            ${(leftData.points || []).map((pt) => `
              <li class="compare-point">
                <span class="point-icon">✕</span>
                <span>${engine.escapeHtml(pt)}</span>
              </li>
            `).join("")}
          </ul>
        `;
        container.appendChild(leftCol);

        // Right (Right)
        const rightCol = document.createElement("div");
        rightCol.className = "compare-col right";
        rightCol.innerHTML = `
          <div class="compare-tag">${engine.escapeHtml(rightData.tag || "✅ BEST PRACTICE")}</div>
          <div class="compare-title">${engine.escapeHtml(rightData.title || "")}</div>
          <ul class="compare-points">
            ${(rightData.points || []).map((pt) => `
              <li class="compare-point">
                <span class="point-icon">✓</span>
                <span>${engine.escapeHtml(pt)}</span>
              </li>
            `).join("")}
          </ul>
        `;
        container.appendChild(rightCol);
      }
    },

    cards: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        if (Array.isArray(content.cards)) {
          content.cards.forEach((c, idx) => {
            const card = document.createElement("div");
            card.className = "concept-card interactive-card";
            card.title = "Click to listen";
            card.innerHTML = `
              <div class="concept-icon">${c.icon || "💡"}</div>
              ${c.tag ? `<div class="concept-tag">${engine.escapeHtml(c.tag)}</div>` : ""}
              <div class="concept-title">${engine.escapeHtml(c.title || "")}</div>
              <div class="concept-text">${engine.escapeHtml(c.text || "")}</div>
            `;
            const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
            card.addEventListener("click", () => engine.playCardAudio(card, audioSrc));
            container.appendChild(card);
          });
        }
      }
    },

    mockup: {
      formats: ["desktop"],
      render(engine, container, slide) {
        const content = slide.content || {};
        // Left callouts
        const calloutsWrap = document.createElement("div");
        calloutsWrap.className = "mockup-callouts";
        if (Array.isArray(content.callouts)) {
          content.callouts.forEach((cl, idx) => {
            const item = document.createElement("div");
            item.className = "callout-card interactive-card";
            item.title = "Click to listen";
            item.innerHTML = `
              <div class="callout-step">${cl.step || idx + 1}</div>
              <div class="callout-info">
                <div class="callout-title">${engine.escapeHtml(cl.title || "")}</div>
                <div class="callout-text">${engine.escapeHtml(cl.text || "")}</div>
              </div>
            `;
            const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
            item.addEventListener("click", () => engine.playCardAudio(item, audioSrc));
            calloutsWrap.appendChild(item);
          });
        }
        container.appendChild(calloutsWrap);

        // Right simulated mockup display
        const displayWrap = document.createElement("div");
        displayWrap.className = "mockup-display";
        if (content.mockupHtml) {
          displayWrap.innerHTML = content.mockupHtml;
        }
        container.appendChild(displayWrap);
      }
    },

    mission: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        if (content.goal) {
          const goalBar = document.createElement("div");
          goalBar.className = "mission-goal-bar";
          goalBar.innerHTML = `
            <span class="mission-goal-icon">🎯</span>
            <span>${engine.escapeHtml(content.goal)}</span>
          `;
          container.appendChild(goalBar);
        }

        if (Array.isArray(content.steps)) {
          const stepsGrid = document.createElement("div");
          stepsGrid.className = "mission-steps";
          content.steps.forEach((st, idx) => {
            const card = document.createElement("div");
            card.className = "mission-step-card interactive-card";
            card.title = "Click to listen";
            card.innerHTML = `
              <div class="mission-step-number">${st.number || String(idx + 1).padStart(2, "0")}</div>
              <div class="mission-step-title">${engine.escapeHtml(st.title || "")}</div>
              <div class="mission-step-text">${engine.escapeHtml(st.text || "")}</div>
            `;
            const audioSrc = `audio/${slide.id}-step-${idx + 1}.mp3`;
            card.addEventListener("click", () => engine.playCardAudio(card, audioSrc));
            stepsGrid.appendChild(card);
          });
          container.appendChild(stepsGrid);
        }

        if (content.reward) {
          const rewardBox = document.createElement("div");
          rewardBox.className = "mission-reward";
          rewardBox.innerHTML = `<span>${engine.escapeHtml(content.reward)}</span>`;
          container.appendChild(rewardBox);
        }
      }
    },

    quiz: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        const options = Array.isArray(content.options) ? content.options : [];
        const list = document.createElement("div");
        list.className = "quiz-options";
        list.dataset.count = String(options.length);
        options.forEach((opt, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "quiz-option";
          btn.dataset.index = String(idx);
          btn.innerHTML = `
            <span class="quiz-option-key">${String.fromCharCode(65 + idx)}</span>
            <span class="quiz-option-text">${engine.escapeHtml(opt.text || "")}</span>
          `;
          btn.addEventListener("click", () => engine.pickQuizOption(slide, idx));
          list.appendChild(btn);
        });
        container.appendChild(list);
        container.appendChild(engine.buildFeedback(slide));
      },
      onEnter(engine, slide, el) {
        engine.restoreAnswerState(slide, el);
      }
    },

    input: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        const form = document.createElement("form");
        form.className = "answer-form";
        form.setAttribute("autocomplete", "off");
        form.innerHTML = `
          <input class="answer-input" type="text" enterkeyhint="done" autocapitalize="off"
                 autocorrect="off" spellcheck="false"
                 placeholder="${engine.escapeHtml(content.placeholder || engine.t("placeholder"))}">
          <button class="answer-submit" type="submit">${engine.escapeHtml(engine.t("check"))}</button>
        `;
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          engine.submitTypedAnswer(slide, form.querySelector(".answer-input"));
        });
        const input = form.querySelector(".answer-input");
        input.addEventListener("focus", () => engine.keepInputVisible(input));
        container.appendChild(form);
        container.appendChild(engine.buildFeedback(slide));
      },
      onEnter(engine, slide, el) {
        engine.restoreAnswerState(slide, el);
      }
    },

    reveal: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        const cards = Array.isArray(content.cards) ? content.cards : [];
        const grid = document.createElement("div");
        grid.className = "reveal-grid";
        grid.dataset.count = String(cards.length);
        cards.forEach((c, idx) => {
          const card = document.createElement("div");
          card.className = "reveal-card interactive-card";
          card.innerHTML = `
            <div class="reveal-inner">
              <div class="reveal-face reveal-front">
                ${c.icon ? `<div class="reveal-icon">${c.icon}</div>` : ""}
                <div class="reveal-front-text">${engine.escapeHtml(c.front || "")}</div>
                <div class="reveal-tap">${engine.escapeHtml(engine.t("tapToFlip"))}</div>
              </div>
              <div class="reveal-face reveal-back">
                <div class="reveal-back-text">${engine.escapeHtml(c.back || "")}</div>
              </div>
            </div>
          `;
          const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
          card.addEventListener("click", () => engine.flipRevealCard(card, audioSrc));
          if (engine.qaAnswered) card.classList.add("is-flipped");
          grid.appendChild(card);
        });
        container.appendChild(grid);
      }
    },

    code: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        const steps = Array.isArray(content.steps) ? content.steps : [];
        const hl = window.PresentationHighlight;
        const lines = hl
          ? hl.toLines(content.code || "", content.language)
          : String(content.code || "").split("\n").map((l) => engine.escapeHtml(l));

        const panel = document.createElement("div");
        panel.className = lines.length > 12 ? "code-panel code-dense" : "code-panel";
        panel.innerHTML = `
          <div class="code-titlebar">
            <span class="code-dots"><span></span><span></span><span></span></span>
            <span class="code-filename">${engine.escapeHtml(content.filename || "")}</span>
            ${steps.length ? `<span class="code-step-counter"></span>` : ""}
            <span class="code-lang">${engine.escapeHtml(content.language || "")}</span>
          </div>
          <pre class="code-block"><code>${lines.map((html, i) => `<div class="code-line" data-line="${i + 1}"><span class="code-ln">${i + 1}</span><span class="code-text">${html || " "}</span></div>`).join("")}</code></pre>
        `;
        container.appendChild(panel);

        if (steps.length) {
          container.classList.add("code-has-notes");
          const notes = document.createElement("div");
          notes.className = "code-notes";
          steps.forEach((st, idx) => {
            const note = document.createElement("div");
            note.className = "code-note interactive-card";
            note.dataset.step = String(idx);
            note.innerHTML = `
              <span class="code-note-step">${idx + 1}</span>
              <span class="code-note-text">${engine.escapeHtml(st.note || "")}</span>
            `;
            const audioSrc = `audio/${slide.id}-step-${idx + 1}.mp3`;
            note.addEventListener("click", () => engine.playCardAudio(note, audioSrc));
            notes.appendChild(note);
          });
          container.appendChild(notes);
        }
      },
      onEnter(engine, slide, el, opts) {
        const steps = (slide.content && slide.content.steps) || [];
        const last = steps.length - 1;
        const start = engine.qaAnswered || opts.direction < 0 ? last : -1;
        engine.applyCodeStep(slide, el, start);
      },
      onNext(engine, slide, el) {
        const steps = (slide.content && slide.content.steps) || [];
        const step = engine.slideState(slide).step;
        if (step >= steps.length - 1) return false;
        engine.applyCodeStep(slide, el, step + 1);
        engine.sfx("tap");
        engine.playCardAudio(el.querySelector(`.code-note[data-step="${step + 1}"]`), `audio/${slide.id}-step-${step + 2}.mp3`);
        return true;
      },
      onPrev(engine, slide, el) {
        const step = engine.slideState(slide).step;
        if (step < 0) return false;
        engine.stopCardAudio();
        engine.applyCodeStep(slide, el, step - 1);
        engine.sfx("tap");
        return true;
      }
    },

    results: {
      formats: ["desktop", "mobile"],
      render(engine, container, slide) {
        const content = slide.content || {};
        const card = document.createElement("div");
        card.className = "results-card";
        card.innerHTML = `
          <div class="results-trophy">${content.icon || "🏆"}</div>
          <div class="results-score"><span class="results-num">0</span><span class="results-total">/0</span></div>
          <div class="results-label"></div>
          <div class="results-tier"></div>
        `;
        container.appendChild(card);
      },
      onEnter(engine, slide, el, opts) {
        engine.renderResults(slide, el, opts.userInitiated);
      }
    }
  };

  /* ==========================================================================
     Engine
     ========================================================================== */

  class PresentationEngine {
    constructor() {
      this.data = window.PRESENTATION_DATA;
      this.currentSlideIndex = 0;
      this.audio = new Audio();
      this.cardAudio = new Audio();
      this.currentCardElement = null;
      this.isMuted = false;
      this.isPlaying = false;
      this.autoplayBlocked = false;

      // Format, language & QA flags
      this.format = this.data && this.data.format === "mobile" ? "mobile" : "desktop";
      this.isMobile = this.format === "mobile";
      this.lang = (this.data && this.data.lang) || document.documentElement.lang || "en";
      const params = new URLSearchParams(window.location.search);
      this.qaMode = params.has("qa");
      this.qaAnswered = params.get("qa") === "answered";
      this.started = !this.isMobile || this.qaMode;

      // Per-slide runtime state (answers, code steps)
      this.state = {};

      // DOM Elements
      this.viewportEl = null;
      this.stageEl = null;
      this.slideEls = [];
      this.hudEl = null;
      this.btnPrev = null;
      this.btnNext = null;
      this.btnPlayPause = null;
      this.btnReplay = null;
      this.btnMute = null;
      this.btnFullscreen = null;
      this.progressFill = null;
      this.progressBar = null;
      this.timeLabel = null;
      this.slideCountLabel = null;
      this.promptPill = null;
      this.storySegFills = [];
      this.coverEl = null;

      // Touch tracking
      this.touchStartX = 0;
      this.touchStartY = 0;

      this.init();
    }

    init() {
      if (!this.data || !Array.isArray(this.data.slides) || this.data.slides.length === 0) {
        this.renderError("Missing or invalid window.PRESENTATION_DATA in slides.js");
        return;
      }

      this.viewportEl = document.getElementById("deck-viewport");
      if (!this.viewportEl) {
        this.viewportEl = document.createElement("div");
        this.viewportEl.id = "deck-viewport";
        this.viewportEl.className = "deck-viewport";
        document.body.appendChild(this.viewportEl);
      }

      document.documentElement.classList.add(`format-${this.format}`);
      if (window.PresentationSfx && this.data.sfx === false) window.PresentationSfx.setEnabled(false);

      this.applyThemeTokens();
      this.buildStageAndSlides();
      if (this.isMobile) {
        this.buildStoriesChrome();
      } else {
        this.buildHUD();
      }
      this.setupAudioController();
      this.bindEvents();

      // Read initial slide from URL hash (e.g. #slide-03 or #3)
      const initialIndex = this.getSlideIndexFromHash();
      this.goToSlide(initialIndex, false);

      // Initial auto-scaling
      this.updateScale();
    }

    t(key, vars = {}) {
      const dict = STRINGS[this.lang] || STRINGS.en;
      return (dict[key] || STRINGS.en[key] || key).replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ""));
    }

    sfx(name) {
      if (window.PresentationSfx) window.PresentationSfx.play(name);
    }

    slideType(slide) {
      return SLIDE_TYPES[slide.type || "hero"];
    }

    slideState(slide) {
      if (!this.state[slide.id]) this.state[slide.id] = { attempts: 0, solved: false, revealed: false, firstTry: false, step: -1 };
      return this.state[slide.id];
    }

    applyThemeTokens() {
      const theme = this.data.theme || {};
      const rootStyle = document.documentElement.style;
      if (theme.accent) rootStyle.setProperty("--theme-accent", theme.accent);
      if (theme.accentGlow) rootStyle.setProperty("--theme-accent-glow", theme.accentGlow);
      if (theme.badgeColor) rootStyle.setProperty("--theme-badge", theme.badgeColor);
    }

    updateScale() {
      if (!this.stageEl) return;
      if (this.isMobile) {
        // Fluid stage: follow the visible viewport so the on-screen keyboard never hides inputs.
        const vv = window.visualViewport;
        const h = vv ? vv.height : window.innerHeight;
        document.documentElement.style.setProperty("--app-height", `${Math.round(h)}px`);
        return;
      }
      const targetWidth = 1600;
      const targetHeight = 900;
      const marginRatio = 0.96; // keep pleasant breathing space around stage

      const scaleX = (window.innerWidth / targetWidth) * marginRatio;
      const scaleY = (window.innerHeight / targetHeight) * marginRatio;
      const scale = Math.min(scaleX, scaleY);

      document.documentElement.style.setProperty("--stage-scale", scale.toFixed(4));
    }

    buildStageAndSlides() {
      this.stageEl = document.createElement("div");
      this.stageEl.className = "deck-stage";
      this.viewportEl.appendChild(this.stageEl);

      this.slideEls = this.data.slides.map((slide, idx) => {
        if (!slide.id) slide.id = `slide-${String(idx + 1).padStart(2, "0")}`;
        const slideEl = document.createElement("div");
        slideEl.className = `slide layout-${slide.type || "hero"}`;
        slideEl.dataset.slideId = slide.id;

        // Header
        const header = document.createElement("div");
        header.className = "slide-header";

        if (slide.badge) {
          const badge = document.createElement("div");
          badge.className = "slide-badge";
          badge.textContent = slide.badge;
          header.appendChild(badge);
        }

        if (slide.title) {
          const title = document.createElement("h2");
          title.className = "slide-title";
          title.textContent = slide.title;
          header.appendChild(title);
        }

        if (slide.subtitle) {
          const subtitle = document.createElement("p");
          subtitle.className = "slide-subtitle";
          subtitle.textContent = slide.subtitle;
          header.appendChild(subtitle);
        }

        slideEl.appendChild(header);

        // Body
        const body = document.createElement("div");
        body.className = "slide-body";
        this.renderSlideContent(body, slide);
        slideEl.appendChild(body);

        this.stageEl.appendChild(slideEl);
        return slideEl;
      });
    }

    renderSlideContent(container, slide) {
      const type = slide.type || "hero";
      const handler = SLIDE_TYPES[type];

      if (!handler) {
        if (slide.content && slide.content.customHtml) {
          container.innerHTML = slide.content.customHtml;
        }
        return;
      }

      if (!handler.formats.includes(this.format)) {
        const note = document.createElement("div");
        note.className = "slide-unsupported";
        note.textContent = this.t("unsupported", { type, format: this.format });
        container.appendChild(note);
        console.warn(`[presentation] slide ${slide.id}: type "${type}" is not supported in "${this.format}" format`);
        return;
      }

      handler.render(this, container, slide);
    }

    buildHUD() {
      this.hudEl = document.createElement("div");
      this.hudEl.className = "deck-hud";

      this.hudEl.innerHTML = `
        <div class="hud-left">
          <a href="../index.html" class="btn-hud-exit" title="Back to Tutorials Hub">
            <span>←</span>
            <span>Hub</span>
          </a>
          <span class="hud-slide-count" id="hud-slide-count">01 / ${String(this.data.slides.length).padStart(2, "0")}</span>
        </div>

        <div class="hud-center">
          <button class="btn-hud" id="btn-play-pause" title="Play / Pause Audio (Space)">▶</button>
          <button class="btn-hud" id="btn-replay" title="Replay Audio (R)">↺</button>

          <div class="audio-timeline-wrap">
            <div class="audio-progress-bar" id="audio-progress-bar" title="Seek Audio">
              <div class="audio-progress-fill" id="audio-progress-fill"></div>
            </div>
            <span class="audio-time-label" id="audio-time-label">0:00 / 0:00</span>
          </div>

          <button class="btn-hud" id="btn-mute" title="Mute / Unmute (M)">🔊</button>
        </div>

        <div class="hud-right">
          <button class="btn-hud" id="btn-fullscreen" title="Toggle Fullscreen (F)">⛶</button>
          <button class="btn-nav btn-prev" id="btn-prev" title="Previous Slide (← / PageUp)">← Prev</button>
          <button class="btn-nav btn-next" id="btn-next" title="Next Slide (→ / PageDown)">Next →</button>
        </div>
      `;

      this.stageEl.appendChild(this.hudEl);

      // Cache HUD element references
      this.btnPrev = this.hudEl.querySelector("#btn-prev");
      this.btnNext = this.hudEl.querySelector("#btn-next");
      this.btnPlayPause = this.hudEl.querySelector("#btn-play-pause");
      this.btnReplay = this.hudEl.querySelector("#btn-replay");
      this.btnMute = this.hudEl.querySelector("#btn-mute");
      this.btnFullscreen = this.hudEl.querySelector("#btn-fullscreen");
      this.progressFill = this.hudEl.querySelector("#audio-progress-fill");
      this.progressBar = this.hudEl.querySelector("#audio-progress-bar");
      this.timeLabel = this.hudEl.querySelector("#audio-time-label");
      this.slideCountLabel = this.hudEl.querySelector("#hud-slide-count");

      // Bind HUD clicks
      this.btnPrev.addEventListener("click", () => this.prevSlide());
      this.btnNext.addEventListener("click", () => this.nextSlide());
      this.btnPlayPause.addEventListener("click", () => this.togglePlayPause());
      this.btnReplay.addEventListener("click", () => this.replayAudio());
      this.btnMute.addEventListener("click", () => this.toggleMute());
      this.btnFullscreen.addEventListener("click", () => this.toggleFullscreen());

      this.progressBar.addEventListener("click", (e) => this.seekAudio(e));
    }

    /* ---------- Mobile Stories chrome: progress segments, top controls, next button, cover ---------- */

    buildStoriesChrome() {
      const total = this.data.slides.length;
      const top = document.createElement("div");
      top.className = "stories-top";
      top.innerHTML = `
        <div class="stories-progress">
          ${this.data.slides.map(() => `<div class="stories-seg"><div class="stories-seg-fill"></div></div>`).join("")}
        </div>
        <div class="stories-controls">
          <a href="../index.html" class="stories-btn stories-exit" title="Hub">✕</a>
          <span class="stories-count">01 / ${String(total).padStart(2, "0")}</span>
          <span class="stories-actions">
            <button class="stories-btn" id="btn-replay" title="Replay">↺</button>
            <button class="stories-btn" id="btn-mute" title="Mute">🔊</button>
          </span>
        </div>
      `;
      this.stageEl.appendChild(top);

      this.btnNext = document.createElement("button");
      this.btnNext.className = "stories-next";
      this.btnNext.title = "Next";
      this.btnNext.textContent = "›";
      this.btnNext.addEventListener("click", () => this.nextSlide());
      this.stageEl.appendChild(this.btnNext);

      this.storySegFills = Array.from(top.querySelectorAll(".stories-seg-fill"));
      this.slideCountLabel = top.querySelector(".stories-count");
      this.btnReplay = top.querySelector("#btn-replay");
      this.btnMute = top.querySelector("#btn-mute");
      this.btnReplay.addEventListener("click", () => this.replayAudio());
      this.btnMute.addEventListener("click", () => this.toggleMute());

      if (!this.started) {
        const minutes = Math.max(1, Math.round(total * 0.4));
        this.coverEl = document.createElement("div");
        this.coverEl.className = "stories-cover";
        this.coverEl.innerHTML = `
          <div class="stories-cover-inner">
            <div class="stories-cover-title">${this.escapeHtml(this.data.title || "")}</div>
            ${this.data.subtitle ? `<div class="stories-cover-subtitle">${this.escapeHtml(this.data.subtitle)}</div>` : ""}
            <div class="stories-cover-meta">${total} ${this.escapeHtml(this.t("slides"))} · ~${minutes} min</div>
            <button class="stories-start" type="button"><span class="stories-start-icon">▶</span>${this.escapeHtml(this.t("start"))}</button>
          </div>
        `;
        this.coverEl.querySelector(".stories-start").addEventListener("click", () => this.startStories());
        this.stageEl.appendChild(this.coverEl);
      }
    }

    startStories() {
      this.started = true;
      if (window.PresentationSfx) window.PresentationSfx.unlock();
      if (this.coverEl) this.coverEl.classList.add("is-hidden");
      this.restartAnimations();
      this.loadSlideAudio(this.data.slides[this.currentSlideIndex], true);
    }

    /* ---------- UI updates shared by the desktop HUD and the Stories chrome ---------- */

    setPlayingUi(playing) {
      if (this.btnPlayPause) this.btnPlayPause.textContent = playing ? "⏸" : "▶";
    }

    setProgressUi(ratio) {
      const pct = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
      if (this.progressFill) this.progressFill.style.width = pct;
      const seg = this.storySegFills[this.currentSlideIndex];
      if (seg) seg.style.width = pct;
    }

    setTimeUi(text) {
      if (this.timeLabel) this.timeLabel.textContent = text;
    }

    setupAudioController() {
      this.audio.preload = "auto";

      this.audio.addEventListener("timeupdate", () => {
        if (!this.audio.duration || isNaN(this.audio.duration)) return;
        this.setProgressUi(this.audio.currentTime / this.audio.duration);
        this.setTimeUi(`${this.formatTime(this.audio.currentTime)} / ${this.formatTime(this.audio.duration)}`);
      });

      this.audio.addEventListener("loadedmetadata", () => {
        this.setTimeUi(`0:00 / ${this.formatTime(this.audio.duration)}`);
      });

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.setPlayingUi(true);
        this.btnNext.classList.remove("pulse-ready");
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.setPlayingUi(false);
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
        this.setPlayingUi(false);
        this.setProgressUi(1);
        // Trigger subtle neon pulsing on Next button!
        this.btnNext.classList.add("pulse-ready");
      });

      this.audio.addEventListener("error", () => {
        // Audio file does not exist or failed to load; degrade gracefully
        this.isPlaying = false;
        this.setPlayingUi(false);
        this.setTimeUi("No Audio");
        this.setProgressUi(0);
      });
      this.cardAudio.addEventListener("ended", () => {
        this.stopCardAudio();
      });

      this.cardAudio.addEventListener("error", () => {
        this.stopCardAudio();
      });
    }

    bindEvents() {
      // Window resize / fullscreen scaling
      window.addEventListener("resize", () => this.updateScale());
      document.addEventListener("fullscreenchange", () => this.updateScale());
      if (this.isMobile && window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {
          this.updateScale();
          window.scrollTo(0, 0);
        });
      }

      // Keyboard navigation
      window.addEventListener("keydown", (e) => {
        // Typing into an answer box: leave every key to the input (Escape just leaves the box)
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
          if (e.key === "Escape") target.blur();
          return;
        }

        // Prevent default scrolling for presentation keys
        if (["Space", "ArrowRight", "ArrowLeft", "PageUp", "PageDown"].includes(e.code)) {
          e.preventDefault();
        }

        // Mobile cover: any navigation key starts the deck
        if (!this.started && ["Space", "Enter", "ArrowRight", "PageDown"].includes(e.code)) {
          this.startStories();
          return;
        }

        // Quiz answers via 1-4 / A-D keys
        const slide = this.data.slides[this.currentSlideIndex];
        if (slide.type === "quiz" && /^(Digit[1-9]|Numpad[1-9])$/.test(e.code)) {
          this.pickQuizOption(slide, parseInt(e.code.slice(-1), 10) - 1);
          return;
        }

        switch (e.code) {
          case "ArrowRight":
          case "PageDown":
            this.nextSlide();
            break;
          case "ArrowLeft":
          case "PageUp":
            this.prevSlide();
            break;
          case "Space":
            this.togglePlayPause();
            break;
          case "KeyR":
            this.replayAudio();
            break;
          case "KeyM":
            this.toggleMute();
            break;
          case "KeyF":
            if (!this.isMobile) this.toggleFullscreen();
            break;
        }
      });

      // Touch swipe gestures
      window.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          this.touchStartX = e.touches[0].clientX;
          this.touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener("touchend", (e) => {
        if (!this.started) return;
        if (e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - this.touchStartX;
          const deltaY = e.changedTouches[0].clientY - this.touchStartY;
          if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
              this.nextSlide();
            } else {
              this.prevSlide();
            }
          }
        }
      }, { passive: true });

      // Stories tap zones: left third = back, rest = forward
      if (this.isMobile) {
        this.stageEl.addEventListener("click", (e) => {
          if (!this.started || e.target.closest(NO_NAV_SELECTOR)) return;
          const active = document.activeElement;
          if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
            active.blur(); // first tap only closes the keyboard
            return;
          }
          const rect = this.stageEl.getBoundingClientRect();
          if (e.clientX - rect.left < rect.width / 3) this.prevSlide();
          else this.nextSlide();
        });
      }
    }

    goToSlide(index, playAudio = true, direction = 0) {
      const total = this.data.slides.length;
      if (index < 0 || index >= total) return;

      // Stop any interactive card audio
      this.stopCardAudio();

      this.currentSlideIndex = index;

      // Update slide elements
      this.slideEls.forEach((el, idx) => {
        el.classList.toggle("active", idx === index);
      });

      // Update HUD counter and nav buttons
      this.slideCountLabel.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      if (this.btnPrev) this.btnPrev.disabled = index === 0;
      this.btnNext.disabled = index === total - 1;
      this.btnNext.classList.remove("pulse-ready");
      this.storySegFills.forEach((seg, idx) => {
        seg.style.width = idx < index ? "100%" : "0%";
      });

      // Update URL hash without full reload
      const slide = this.data.slides[index];
      const slideId = slide.id;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", `${window.location.search}#${slideId}`);
      }

      // Per-type entry hook (answer state, code steps, results)
      const handler = this.slideType(slide);
      if (handler && handler.onEnter && handler.formats.includes(this.format)) {
        handler.onEnter(this, slide, this.slideEls[index], { direction, userInitiated: playAudio });
      }
      if (playAudio && SCORED_TYPES.includes(slide.type) && !this.slideState(slide).solved) this.sfx("question");

      // Handle slide audio
      this.loadSlideAudio(slide, playAudio && this.started);
    }

    nextSlide() {
      if (!this.started) return;
      const slide = this.data.slides[this.currentSlideIndex];
      const handler = this.slideType(slide);
      if (handler && handler.onNext && handler.onNext(this, slide, this.slideEls[this.currentSlideIndex])) return;
      if (this.currentSlideIndex < this.data.slides.length - 1) {
        this.goToSlide(this.currentSlideIndex + 1, true, 1);
      }
    }

    prevSlide() {
      if (!this.started) return;
      const slide = this.data.slides[this.currentSlideIndex];
      const handler = this.slideType(slide);
      if (handler && handler.onPrev && handler.onPrev(this, slide, this.slideEls[this.currentSlideIndex])) return;
      if (this.currentSlideIndex > 0) {
        this.goToSlide(this.currentSlideIndex - 1, true, -1);
      }
    }

    loadSlideAudio(slide, autoPlay = true) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.setProgressUi(0);
      this.setTimeUi("0:00 / 0:00");

      if (!slide.audio) {
        this.setTimeUi("No Audio");
        return;
      }

      this.audio.src = slide.audio;

      if (autoPlay) {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay policy blocked audio
            this.showAutoplayPrompt();
          });
        }
      }
    }

    showAutoplayPrompt() {
      if (this.promptPill) return;

      this.promptPill = document.createElement("div");
      this.promptPill.className = "voice-prompt-pill";
      this.promptPill.innerHTML = `
        <span>🎙️</span>
        <span>Click or press Space to enable voice narration</span>
      `;

      this.promptPill.addEventListener("click", () => {
        this.audio.play().then(() => {
          this.dismissPromptPill();
        }).catch(() => {});
      });

      this.stageEl.appendChild(this.promptPill);
    }

    dismissPromptPill() {
      if (this.promptPill && this.promptPill.parentNode) {
        this.promptPill.parentNode.removeChild(this.promptPill);
        this.promptPill = null;
      }
    }

    togglePlayPause() {
      this.dismissPromptPill();
      if (this.audio.paused) {
        this.audio.play().catch(() => {});
      } else {
        this.audio.pause();
      }
    }

    restartAnimations() {
      const activeSlide = this.slideEls[this.currentSlideIndex];
      if (activeSlide) {
        activeSlide.classList.remove("active");
        void activeSlide.offsetWidth; // Force reflow
        activeSlide.classList.add("active");
      }
    }

    replayAudio() {
      this.stopCardAudio();
      this.dismissPromptPill();
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});

      // Re-trigger entrance animations on active slide
      this.restartAnimations();
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      this.cardAudio.muted = this.isMuted;
      if (window.PresentationSfx) window.PresentationSfx.setMuted(this.isMuted);
      this.btnMute.textContent = this.isMuted ? "🔇" : "🔊";
    }

    seekAudio(e) {
      if (!this.audio.duration || isNaN(this.audio.duration)) return;
      const rect = this.progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      this.audio.currentTime = ratio * this.audio.duration;
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    }

    getSlideIndexFromHash() {
      const hash = window.location.hash.replace("#", "").trim();
      if (!hash) return 0;

      // Match by exact slide.id
      const foundIndex = this.data.slides.findIndex((s) => s.id === hash);
      if (foundIndex !== -1) return foundIndex;

      // Match by number (e.g. #3 or #03)
      const numeric = parseInt(hash.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(numeric) && numeric >= 1 && numeric <= this.data.slides.length) {
        return numeric - 1;
      }

      return 0;
    }

    formatTime(sec) {
      if (isNaN(sec) || sec < 0) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? "0" : ""}${s}`;
    }

    escapeHtml(str) {
      if (typeof str !== "string") return "";
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    playCardAudio(element, audioSrc) {
      // Toggle off if currently playing this element
      if (this.currentCardElement === element && !this.cardAudio.paused) {
        this.stopCardAudio();
        return;
      }

      this.stopCardAudio();

      // Pause main slide narration so voices do not clash
      if (this.isPlaying) {
        this.audio.pause();
      }

      if (element) element.classList.add("is-speaking");
      this.currentCardElement = element;
      this.cardAudio.src = audioSrc;

      this.cardAudio.play().catch(() => {
        this.stopCardAudio();
      });
    }

    stopCardAudio() {
      if (this.cardAudio) {
        this.cardAudio.pause();
        this.cardAudio.currentTime = 0;
      }
      if (this.currentCardElement) {
        this.currentCardElement.classList.remove("is-speaking");
        this.currentCardElement = null;
      }
      document.querySelectorAll(".is-speaking").forEach((el) => {
        el.classList.remove("is-speaking");
      });
    }

    /* ---------- Interactive slides: quiz, input, reveal ---------- */

    buildFeedback(slide) {
      const content = slide.content || {};
      const wrap = document.createElement("div");
      wrap.className = "answer-feedback";
      wrap.innerHTML = `
        <div class="feedback-msg" role="status"></div>
        ${content.hint ? `
          <div class="feedback-hint">
            <span class="feedback-label">💡 ${this.escapeHtml(this.t("hint"))}</span>
            <span class="feedback-text">${this.escapeHtml(content.hint)}</span>
          </div>` : ""}
        <div class="feedback-answer">
          <span class="feedback-label">${this.escapeHtml(this.t("revealed"))}</span>
          <span class="feedback-text">${this.escapeHtml(this.correctAnswerText(slide))}</span>
        </div>
        ${content.explanation ? `
          <div class="answer-explanation interactive-card">
            <span class="feedback-label">${this.escapeHtml(this.t("explanation"))}</span>
            <span class="feedback-text">${this.escapeHtml(content.explanation)}</span>
          </div>` : ""}
      `;
      const explanation = wrap.querySelector(".answer-explanation");
      if (explanation) {
        explanation.addEventListener("click", () => this.playCardAudio(explanation, `audio/${slide.id}-explain.mp3`));
      }
      return wrap;
    }

    correctAnswerText(slide) {
      const content = slide.content || {};
      if (slide.type === "quiz") {
        const opt = (content.options || []).find((o) => o.correct);
        return opt ? opt.text : "";
      }
      return content.displayAnswer || (content.answers || [])[0] || "";
    }

    pickQuizOption(slide, idx) {
      const el = this.slideEls[this.currentSlideIndex];
      const btn = el.querySelector(`.quiz-option[data-index="${idx}"]`);
      const st = this.slideState(slide);
      if (!btn || st.solved || st.revealed || btn.classList.contains("is-picked-wrong")) return;
      const correct = !!((slide.content.options || [])[idx] || {}).correct;
      if (!correct) btn.classList.add("is-picked-wrong");
      this.registerAttempt(slide, el, correct, btn);
    }

    submitTypedAnswer(slide, input) {
      const st = this.slideState(slide);
      if (st.solved || st.revealed || !input.value.trim()) return;
      const el = this.slideEls[this.currentSlideIndex];
      const correct = this.matchesAnswer(input.value, slide.content || {});
      this.registerAttempt(slide, el, correct, input);
      if (!correct) input.select();
      else input.blur();
    }

    // Retry → hint → reveal flow shared by quiz and input slides
    registerAttempt(slide, el, correct, focusEl) {
      const st = this.slideState(slide);
      const msg = el.querySelector(".feedback-msg");
      const hasHint = !!el.querySelector(".feedback-hint");
      st.attempts += 1;

      if (correct) {
        st.solved = true;
        st.firstTry = st.attempts === 1;
        this.sfx("correct");
        this.showSolved(slide, el, true);
        return;
      }

      this.sfx("wrong");
      focusEl.classList.remove("is-shaking");
      void focusEl.offsetWidth;
      focusEl.classList.add("is-shaking");

      if (st.attempts >= 3) {
        st.revealed = true;
        this.showSolved(slide, el, true);
      } else if (st.attempts === 2 && hasHint) {
        el.classList.add("has-hint");
        msg.textContent = this.t("tryAgain");
        setTimeout(() => this.sfx("hint"), 260);
      } else {
        msg.textContent = this.t("tryAgain");
      }
    }

    showSolved(slide, el, playExplanation) {
      const st = this.slideState(slide);
      const msg = el.querySelector(".feedback-msg");
      el.classList.add(st.revealed ? "is-revealed" : "is-solved");
      msg.textContent = st.revealed ? "" : this.t("correct");

      if (slide.type === "quiz") {
        (slide.content.options || []).forEach((opt, idx) => {
          if (opt.correct) el.querySelector(`.quiz-option[data-index="${idx}"]`).classList.add("is-correct");
        });
      } else {
        const input = el.querySelector(".answer-input");
        input.readOnly = true;
        if (st.revealed) input.value = this.correctAnswerText(slide);
      }

      const explanation = el.querySelector(".answer-explanation");
      if (explanation && playExplanation) {
        setTimeout(() => {
          if (this.slideEls[this.currentSlideIndex] === el) {
            this.playCardAudio(explanation, `audio/${slide.id}-explain.mp3`);
          }
        }, 550);
      }
    }

    restoreAnswerState(slide, el) {
      if (this.qaAnswered && !this.slideState(slide).solved) {
        const st = this.slideState(slide);
        st.solved = true;
        st.firstTry = true;
        if (slide.type === "input") el.querySelector(".answer-input").value = this.correctAnswerText(slide);
        this.showSolved(slide, el, false);
      }
    }

    normalizeAnswer(text, opts) {
      let t = String(text).trim().replace(/\s+/g, " ");
      if (!opts.caseSensitive) t = t.toLowerCase();
      if (!opts.diacritics) t = t.normalize("NFD").replace(/[̀-ͯ]/g, "");
      return t;
    }

    // Variants accepted for one word/phrase: itself, plus English plural stripping (tags → tag, boxes → box)
    answerVariants(text, opts) {
      const variants = new Set([text]);
      if (opts.plural && text.length >= 3) {
        if (text.endsWith("es")) variants.add(text.slice(0, -2));
        if (text.endsWith("s")) variants.add(text.slice(0, -1));
      }
      return variants;
    }

    matchesAnswer(raw, content) {
      const opts = Object.assign({ caseSensitive: false, diacritics: false, plural: true }, content.match || {});
      const given = this.normalizeAnswer(raw, opts);
      return (content.answers || []).some((answer) => {
        const expected = this.normalizeAnswer(answer, opts);
        let candidate = given;
        // Forgive wrapping punctuation the expected answer doesn't use: "<a>" for "a", "tag." for "tag"
        if (!/[<>]/.test(expected)) candidate = candidate.replace(/^<\/?\s*|\s*\/?>$/g, "");
        if (!/[.!?,;:]$/.test(expected)) candidate = candidate.replace(/[.!?,;:]+$/, "");
        const a = this.answerVariants(candidate, opts);
        return [...this.answerVariants(expected, opts)].some((v) => a.has(v));
      });
    }

    keepInputVisible(input) {
      if (!this.isMobile) return;
      setTimeout(() => input.scrollIntoView({ block: "center", behavior: "smooth" }), 300);
    }

    flipRevealCard(card, audioSrc) {
      const flipped = card.classList.toggle("is-flipped");
      this.sfx("flip");
      if (flipped) this.playCardAudio(card, audioSrc);
      else this.stopCardAudio();
    }

    /* ---------- Code slides ---------- */

    parseLineSpec(spec) {
      const lines = new Set();
      String(spec || "").split(",").forEach((part) => {
        const [a, b] = part.split("-").map((n) => parseInt(n, 10));
        if (isNaN(a)) return;
        for (let i = a; i <= (isNaN(b) ? a : b); i++) lines.add(i);
      });
      return lines;
    }

    applyCodeStep(slide, el, step) {
      const steps = (slide.content && slide.content.steps) || [];
      this.slideState(slide).step = step;
      const lines = step >= 0 && steps[step] ? this.parseLineSpec(steps[step].lines) : null;
      const block = el.querySelector(".code-block");
      if (block) block.classList.toggle("has-focus", !!lines);
      el.querySelectorAll(".code-line").forEach((line) => {
        line.classList.toggle("is-hl", !!lines && lines.has(parseInt(line.dataset.line, 10)));
      });
      el.querySelectorAll(".code-note").forEach((note, idx) => {
        note.classList.toggle("is-visible", idx <= step);
        note.classList.toggle("is-current", idx === step);
      });
      const counter = el.querySelector(".code-step-counter");
      if (counter) counter.textContent = `${this.t("step")} ${Math.max(0, step + 1)} / ${steps.length}`;
    }

    /* ---------- Results ---------- */

    renderResults(slide, el, celebrate) {
      const content = slide.content || {};
      const scored = this.data.slides.filter((s) => SCORED_TYPES.includes(s.type));
      const correct = this.qaAnswered
        ? scored.length
        : scored.filter((s) => this.state[s.id] && this.state[s.id].firstTry).length;
      const total = scored.length;
      const ratio = total ? correct / total : 1;
      const tiers = (content.tiers || []).slice().sort((a, b) => (b.min || 0) - (a.min || 0));
      const tier = tiers.find((t) => ratio >= (t.min || 0));

      el.querySelector(".results-num").textContent = String(correct);
      el.querySelector(".results-total").textContent = `/${total}`;
      el.querySelector(".results-label").textContent = total ? this.t("score", { x: correct, y: total }) : this.t("noQuestions");
      el.querySelector(".results-tier").textContent = tier ? tier.text : "";

      if (celebrate) {
        this.sfx("results");
        this.launchConfetti(el, ratio >= 0.5 ? 90 : 40);
      }
    }

    launchConfetti(el, count) {
      const old = el.querySelector(".confetti-layer");
      if (old) old.remove();
      const layer = document.createElement("div");
      layer.className = "confetti-layer";
      const colors = ["var(--theme-accent)", "var(--theme-badge)", "#facc15", "#38bdf8", "#f472b6", "#ffffff"];
      for (let i = 0; i < count; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = `${Math.random() * 0.6}s`;
        piece.style.animationDuration = `${2.2 + Math.random() * 1.6}s`;
        piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
        piece.style.setProperty("--spin", `${(Math.random() - 0.5) * 1440}deg`);
        layer.appendChild(piece);
      }
      el.appendChild(layer);
      setTimeout(() => layer.remove(), 4600);
    }

    renderError(msg) {
      const vp = document.getElementById("deck-viewport") || document.body;
      vp.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;color:#f43f5e;font-family:sans-serif;gap:12px;text-align:center;padding:24px;">
          <h2 style="font-size:2rem;">⚠️ Presentation Error</h2>
          <p style="color:#94a3b8;max-width:600px;">${this.escapeHtml(msg)}</p>
        </div>
      `;
    }
  }

  // Exposed for tests and the course validator (pure helpers only)
  window.PresentationEngineInfo = {
    types: Object.fromEntries(Object.entries(SLIDE_TYPES).map(([k, v]) => [k, v.formats])),
    scoredTypes: SCORED_TYPES.slice()
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new PresentationEngine());
  } else {
    new PresentationEngine();
  }
})();
