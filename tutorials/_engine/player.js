/**
 * virusescu.github.io — Shared Presentation & Tutorial Runtime Engine
 * Pure Vanilla ES6+, zero dependencies, offline file:/// compatible.
 */

(function () {
  "use strict";

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

      this.applyThemeTokens();
      this.buildStageAndSlides();
      this.buildHUD();
      this.setupAudioController();
      this.bindEvents();

      // Read initial slide from URL hash (e.g. #slide-03 or #3)
      const initialIndex = this.getSlideIndexFromHash();
      this.goToSlide(initialIndex, false);

      // Initial auto-scaling
      this.updateScale();
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
        const slideEl = document.createElement("div");
        slideEl.className = `slide layout-${slide.type || "hero"}`;
        slideEl.dataset.slideId = slide.id || `slide-${String(idx + 1).padStart(2, "0")}`;

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
      const content = slide.content || {};

      switch (type) {
        case "hero":
          if (Array.isArray(content.highlights)) {
            const grid = document.createElement("div");
            grid.className = "hero-highlights";
            content.highlights.forEach((h, idx) => {
              const card = document.createElement("div");
              card.className = "hero-card interactive-card";
              card.title = "Click to listen";
              card.innerHTML = `
                <div class="hero-card-icon">${h.icon || "✨"}</div>
                <div class="hero-card-title">${this.escapeHtml(h.title || "")}</div>
                <div class="hero-card-text">${this.escapeHtml(h.text || "")}</div>
              `;
              const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
              card.addEventListener("click", () => this.playCardAudio(card, audioSrc));
              grid.appendChild(card);
            });
            container.appendChild(grid);
          }
          break;

        case "compare":
          const leftData = content.left || {};
          const rightData = content.right || {};

          // Left (Wrong)
          const leftCol = document.createElement("div");
          leftCol.className = "compare-col wrong";
          leftCol.innerHTML = `
            <div class="compare-tag">${this.escapeHtml(leftData.tag || "❌ DON'T DO THIS")}</div>
            <div class="compare-title">${this.escapeHtml(leftData.title || "")}</div>
            <ul class="compare-points">
              ${(leftData.points || []).map((pt) => `
                <li class="compare-point">
                  <span class="point-icon">✕</span>
                  <span>${this.escapeHtml(pt)}</span>
                </li>
              `).join("")}
            </ul>
          `;
          container.appendChild(leftCol);

          // Right (Right)
          const rightCol = document.createElement("div");
          rightCol.className = "compare-col right";
          rightCol.innerHTML = `
            <div class="compare-tag">${this.escapeHtml(rightData.tag || "✅ BEST PRACTICE")}</div>
            <div class="compare-title">${this.escapeHtml(rightData.title || "")}</div>
            <ul class="compare-points">
              ${(rightData.points || []).map((pt) => `
                <li class="compare-point">
                  <span class="point-icon">✓</span>
                  <span>${this.escapeHtml(pt)}</span>
                </li>
              `).join("")}
            </ul>
          `;
          container.appendChild(rightCol);
          break;

        case "cards":
          if (Array.isArray(content.cards)) {
            content.cards.forEach((c, idx) => {
              const card = document.createElement("div");
              card.className = "concept-card interactive-card";
              card.title = "Click to listen";
              card.innerHTML = `
                <div class="concept-icon">${c.icon || "💡"}</div>
                ${c.tag ? `<div class="concept-tag">${this.escapeHtml(c.tag)}</div>` : ""}
                <div class="concept-title">${this.escapeHtml(c.title || "")}</div>
                <div class="concept-text">${this.escapeHtml(c.text || "")}</div>
              `;
              const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
              card.addEventListener("click", () => this.playCardAudio(card, audioSrc));
              container.appendChild(card);
            });
          }
          break;

        case "mockup":
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
                  <div class="callout-title">${this.escapeHtml(cl.title || "")}</div>
                  <div class="callout-text">${this.escapeHtml(cl.text || "")}</div>
                </div>
              `;
              const audioSrc = `audio/${slide.id}-card-${idx + 1}.mp3`;
              item.addEventListener("click", () => this.playCardAudio(item, audioSrc));
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
          break;

        case "mission":
          if (content.goal) {
            const goalBar = document.createElement("div");
            goalBar.className = "mission-goal-bar";
            goalBar.innerHTML = `
              <span class="mission-goal-icon">🎯</span>
              <span>${this.escapeHtml(content.goal)}</span>
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
                <div class="mission-step-title">${this.escapeHtml(st.title || "")}</div>
                <div class="mission-step-text">${this.escapeHtml(st.text || "")}</div>
              `;
              const audioSrc = `audio/${slide.id}-step-${idx + 1}.mp3`;
              card.addEventListener("click", () => this.playCardAudio(card, audioSrc));
              stepsGrid.appendChild(card);
            });
            container.appendChild(stepsGrid);
          }

          if (content.reward) {
            const rewardBox = document.createElement("div");
            rewardBox.className = "mission-reward";
            rewardBox.innerHTML = `<span>${this.escapeHtml(content.reward)}</span>`;
            container.appendChild(rewardBox);
          }
          break;

        default:
          if (content.customHtml) {
            container.innerHTML = content.customHtml;
          }
          break;
      }
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

    setupAudioController() {
      this.audio.preload = "auto";

      this.audio.addEventListener("timeupdate", () => {
        if (!this.audio.duration || isNaN(this.audio.duration)) return;
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.timeLabel.textContent = `${this.formatTime(this.audio.currentTime)} / ${this.formatTime(this.audio.duration)}`;
      });

      this.audio.addEventListener("loadedmetadata", () => {
        this.timeLabel.textContent = `0:00 / ${this.formatTime(this.audio.duration)}`;
      });

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.btnPlayPause.textContent = "⏸";
        this.btnNext.classList.remove("pulse-ready");
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.btnPlayPause.textContent = "▶";
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
        this.btnPlayPause.textContent = "▶";
        this.progressFill.style.width = "100%";
        // Trigger subtle neon pulsing on Next button!
        this.btnNext.classList.add("pulse-ready");
      });

      this.audio.addEventListener("error", () => {
        // Audio file does not exist or failed to load; degrade gracefully
        this.isPlaying = false;
        this.btnPlayPause.textContent = "▶";
        this.timeLabel.textContent = "No Audio";
        this.progressFill.style.width = "0%";
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

      // Keyboard navigation
      window.addEventListener("keydown", (e) => {
        // Prevent default scrolling for presentation keys
        if (["Space", "ArrowRight", "ArrowLeft", "PageUp", "PageDown"].includes(e.code)) {
          e.preventDefault();
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
            this.toggleFullscreen();
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
    }

    goToSlide(index, playAudio = true) {
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
      this.btnPrev.disabled = index === 0;
      this.btnNext.disabled = index === total - 1;
      this.btnNext.classList.remove("pulse-ready");

      // Update URL hash without full reload
      const slide = this.data.slides[index];
      const slideId = slide.id || `slide-${String(index + 1).padStart(2, "0")}`;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", `#${slideId}`);
      }

      // Handle slide audio
      this.loadSlideAudio(slide, playAudio);
    }

    nextSlide() {
      if (this.currentSlideIndex < this.data.slides.length - 1) {
        this.goToSlide(this.currentSlideIndex + 1);
      }
    }

    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.goToSlide(this.currentSlideIndex - 1);
      }
    }

    loadSlideAudio(slide, autoPlay = true) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.progressFill.style.width = "0%";
      this.timeLabel.textContent = "0:00 / 0:00";

      if (!slide.audio) {
        this.timeLabel.textContent = "No Audio";
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

    replayAudio() {
      this.stopCardAudio();
      this.dismissPromptPill();
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});

      // Re-trigger entrance animations on active slide
      const activeSlide = this.slideEls[this.currentSlideIndex];
      if (activeSlide) {
        activeSlide.classList.remove("active");
        void activeSlide.offsetWidth; // Force reflow
        activeSlide.classList.add("active");
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
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

      element.classList.add("is-speaking");
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

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new PresentationEngine());
  } else {
    new PresentationEngine();
  }
})();
