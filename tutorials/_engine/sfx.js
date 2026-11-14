/**
 * virusescu.github.io — Presentation Sound Effects
 * Tiny synthesized UI sounds via the Web Audio API: no audio files, works offline.
 * API: window.PresentationSfx.play(name) | setMuted(bool) | setEnabled(bool) | unlock()
 * Names: tap, flip, question, hint, wrong, correct, results
 */

(function () {
  "use strict";

  const MASTER_VOLUME = 0.14;

  // Each sound is a list of notes: [frequencyHz, startSec, durationSec, waveType, gain, slideToHz?]
  const SOUNDS = {
    tap:      [[1250, 0, 0.045, "sine", 0.5]],
    flip:     [[520, 0, 0.09, "triangle", 0.5, 880]],
    question: [[660, 0, 0.11, "triangle", 0.6], [880, 0.1, 0.16, "triangle", 0.6]],
    hint:     [[988, 0, 0.12, "sine", 0.5], [1319, 0.09, 0.12, "sine", 0.45], [1568, 0.18, 0.22, "sine", 0.4]],
    wrong:    [[247, 0, 0.14, "square", 0.32, 196], [185, 0.13, 0.22, "square", 0.32, 147]],
    correct:  [[523, 0, 0.1, "triangle", 0.6], [659, 0.08, 0.1, "triangle", 0.6], [784, 0.16, 0.24, "triangle", 0.65]],
    results:  [
      [523, 0, 0.14, "triangle", 0.55], [659, 0.13, 0.14, "triangle", 0.55], [784, 0.26, 0.14, "triangle", 0.55],
      [1047, 0.39, 0.5, "triangle", 0.7], [784, 0.39, 0.5, "sine", 0.35], [659, 0.39, 0.5, "sine", 0.3]
    ]
  };

  let ctx = null;
  let master = null;
  let muted = false;
  let enabled = true;

  function ensureContext() {
    if (ctx) return ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = MASTER_VOLUME;
    master.connect(ctx.destination);
    return ctx;
  }

  function unlock() {
    const c = ensureContext();
    if (c && c.state === "suspended") c.resume().catch(() => {});
  }

  function playNote(c, [freq, start, dur, type, gain, slideTo]) {
    const t0 = c.currentTime + start;
    const osc = c.createOscillator();
    const env = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(env);
    env.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function play(name) {
    if (!enabled || muted || !SOUNDS[name]) return;
    const c = ensureContext();
    if (!c) return;
    if (c.state === "suspended") c.resume().catch(() => {});
    SOUNDS[name].forEach((note) => playNote(c, note));
  }

  // Browsers only allow audio after a user gesture: resume on the first one.
  ["pointerdown", "keydown", "touchstart"].forEach((evt) =>
    window.addEventListener(evt, unlock, { once: true, passive: true })
  );

  window.PresentationSfx = {
    play,
    unlock,
    setMuted(value) { muted = !!value; },
    setEnabled(value) { enabled = !!value; }
  };
})();
