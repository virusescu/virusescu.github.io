#!/usr/bin/env node
/**
 * Validates a tutorial deck before it is reported as done.
 *
 * Usage (from the repo root):
 *   node .agents/skills/presentation-creator/scripts/validate-course.mjs <course>
 *
 * ERRORS (exit code 1) break the deck: unsupported slide type for the format, missing/empty audio,
 * broken quiz/input/code data, wrong index.html wiring.
 * WARNINGS are budget/style issues worth fixing: narration length, text budgets per format,
 * theme token drift, missing results slide, course not registered in the hub.
 *
 * Slide-type support is read from the engine itself (window.PresentationEngineInfo in player.js),
 * and the expected audio clips from generate_audio.py --list, so neither can drift from this check.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const course = process.argv[2];
if (!course) {
  console.error("Usage: node validate-course.mjs <course>");
  process.exit(1);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..", "..", "..");
const tutorialsDir = path.join(repoRoot, "tutorials");
const engineDir = path.join(tutorialsDir, "_engine");
const courseDir = path.join(tutorialsDir, course);

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// Text budgets per format (characters / counts). Desktop budgets are generous; mobile is a 390px-wide card.
const BUDGETS = {
  desktop: { title: 60, cardText: 140, maxCards: 4, codeLineChars: 60, codeLines: 20 },
  mobile: { title: 40, cardText: 90, maxCards: 3, codeLineChars: 34, codeLines: 16 }
};
const CODE_LANGUAGES = ["html", "css", "js", "javascript", "python", "py", "bash", "sh", "shell", "json"];

function loadSlides() {
  const file = path.join(courseDir, "slides.js");
  if (!fs.existsSync(file)) {
    err(`slides.js not found in tutorials/${course}/`);
    return null;
  }
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  } catch (e) {
    err(`slides.js does not run: ${e.message}`);
    return null;
  }
  const data = sandbox.window.PRESENTATION_DATA;
  if (!data || !Array.isArray(data.slides) || !data.slides.length) {
    err("window.PRESENTATION_DATA.slides is missing or empty");
    return null;
  }
  return data;
}

function loadEngineInfo() {
  // Run player.js with a stub DOM that never becomes ready: only the type registry gets defined.
  const sandbox = { window: {}, document: { readyState: "loading", addEventListener() {} } };
  vm.runInNewContext(fs.readFileSync(path.join(engineDir, "player.js"), "utf8"), sandbox);
  return sandbox.window.PresentationEngineInfo;
}

function expectedAudio() {
  for (const py of ["python", "python3", "py"]) {
    try {
      const out = execFileSync(py, [path.join(engineDir, "generate_audio.py"), "--course", course, "--list"], { encoding: "utf8" });
      return JSON.parse(out.trim().split("\n").pop());
    } catch { /* try the next interpreter */ }
  }
  warn("Could not run generate_audio.py --list; only main slide audio was checked");
  return null;
}

const words = (s) => String(s || "").trim().split(/\s+/).filter(Boolean).length;

const data = loadSlides();
if (data) {
  const info = loadEngineInfo();
  const format = data.format || "desktop";
  const budget = BUDGETS[format];
  if (!budget) err(`format must be "desktop" or "mobile" (got "${data.format}")`);
  const b = budget || BUDGETS.desktop;
  const ids = new Set();
  const scored = data.slides.filter((s) => info.scoredTypes.includes(s.type));

  data.slides.forEach((slide, idx) => {
    const where = `${slide.id || `slide #${idx + 1}`} (${slide.type || "hero"})`;
    const type = slide.type || "hero";
    const content = slide.content || {};

    if (!slide.id) err(`${where}: missing id`);
    else if (ids.has(slide.id)) err(`${where}: duplicate id`);
    ids.add(slide.id);

    if (!info.types[type]) {
      if (!content.customHtml) err(`${where}: unknown slide type "${type}"`);
    } else if (!info.types[type].includes(format)) {
      err(`${where}: type "${type}" is not supported in the ${format} format (supported: ${info.types[type].join(", ")})`);
    }

    if (!slide.narration) err(`${where}: missing narration`);
    else {
      // interactive slides talk less: the learner is supposed to act
      const [min, max] = ["quiz", "input", "reveal"].includes(type) ? [15, 45] : [30, 55];
      const n = words(slide.narration);
      if (n < min || n > max) warn(`${where}: narration is ${n} words (aim for ${min}–${max})`);
    }
    if (slide.audio !== `audio/${slide.id}.mp3`) warn(`${where}: audio should be "audio/${slide.id}.mp3" (got "${slide.audio}")`);
    if (slide.title && slide.title.length > b.title) warn(`${where}: title is ${slide.title.length} chars (${format} budget ${b.title})`);

    const cardList = content.highlights || (type === "cards" ? content.cards : null);
    if (cardList) {
      if (cardList.length > b.maxCards) warn(`${where}: ${cardList.length} cards (${format} budget ${b.maxCards})`);
      cardList.forEach((c, i) => {
        if ((c.text || "").length > b.cardText) warn(`${where}: card ${i + 1} text is ${c.text.length} chars (${format} budget ${b.cardText})`);
      });
    }

    if (type === "quiz") {
      const opts = content.options || [];
      if (opts.length < 2 || opts.length > 4) err(`${where}: quiz needs 2–4 options (has ${opts.length})`);
      const correct = opts.filter((o) => o.correct).length;
      if (correct !== 1) err(`${where}: quiz needs exactly one option with correct: true (has ${correct})`);
      if (!content.explanation) warn(`${where}: no explanation (it is the only voiced feedback)`);
      if (!content.hint) warn(`${where}: no hint (2nd wrong answer will just say "try again")`);
    }

    if (type === "input") {
      if (!Array.isArray(content.answers) || !content.answers.length) err(`${where}: input needs a non-empty answers array`);
      if (!content.explanation) warn(`${where}: no explanation (it is the only voiced feedback)`);
      if (!content.hint) warn(`${where}: no hint (2nd wrong answer will just say "try again")`);
    }

    if (type === "reveal") {
      const cards = content.cards || [];
      if (cards.length < 1 || cards.length > 4) err(`${where}: reveal needs 1–4 cards (has ${cards.length})`);
      cards.forEach((c, i) => { if (!c.front || !c.back) err(`${where}: card ${i + 1} needs front and back`); });
    }

    if (type === "code") {
      const code = String(content.code || "");
      const lines = code.split("\n");
      if (!code.trim()) err(`${where}: code is empty`);
      if (content.language && !CODE_LANGUAGES.includes(String(content.language).toLowerCase())) {
        warn(`${where}: language "${content.language}" has no highlighter (shown as plain text)`);
      }
      if (lines.length > b.codeLines) warn(`${where}: ${lines.length} code lines (${format} budget ${b.codeLines})`);
      const longest = Math.max(...lines.map((l) => l.replace(/\t/g, "  ").length));
      if (longest > b.codeLineChars) {
        warn(`${where}: longest code line is ${longest} chars (${format} budget ${b.codeLineChars}${format === "mobile" ? "; longer lines wrap" : "; longer lines get cut off"})`);
      }
      (content.steps || []).forEach((st, i) => {
        const spec = String(st.lines || "");
        const nums = spec.split(",").flatMap((p) => p.split("-")).map(Number);
        if (!spec || nums.some((n) => isNaN(n) || n < 1 || n > lines.length)) err(`${where}: step ${i + 1} lines "${spec}" outside 1–${lines.length}`);
      });
    }

    if (type === "results" && !scored.length) warn(`${where}: results slide but no quiz/input slides to score`);
  });

  if (scored.length && !data.slides.some((s) => s.type === "results")) warn(`${scored.length} scored slide(s) but no results slide`);

  // Audio files
  const items = expectedAudio() || data.slides.map((s) => ({ id: s.id, audio: s.audio || `audio/${s.id}.mp3` }));
  const missing = [];
  items.forEach((it) => {
    const file = path.join(courseDir, it.audio);
    if (!fs.existsSync(file)) missing.push(it.audio);
    else if (fs.statSync(file).size < 5 * 1024) err(`${it.audio} is smaller than 5 KB (probably failed synthesis)`);
  });
  if (missing.length) err(`${missing.length} audio file(s) missing: ${missing.slice(0, 6).join(", ")}${missing.length > 6 ? ", …" : ""} (run generate_audio.py)`);

  // index.html wiring
  const indexFile = path.join(courseDir, "index.html");
  if (!fs.existsSync(indexFile)) err("index.html not found");
  else {
    const html = fs.readFileSync(indexFile, "utf8");
    const needs = ["../_engine/player.css", "./theme.css", "./slides.js", "../_engine/player.js"];
    if (format === "mobile") needs.push("../_engine/stories.css");
    if (data.slides.some((s) => info.scoredTypes.includes(s.type) || s.type === "reveal" || s.type === "results")) needs.push("../_engine/sfx.js");
    if (data.slides.some((s) => s.type === "code")) needs.push("../_engine/highlight.js");
    needs.forEach((ref) => { if (!html.includes(ref)) err(`index.html does not load ${ref}`); });
    if (format === "mobile" && !/viewport-fit=cover/.test(html)) warn("mobile index.html viewport meta should include viewport-fit=cover");
    if (format === "desktop" && html.includes("stories.css")) err("desktop deck loads stories.css (mobile-only stylesheet)");
  }

  // theme.css ↔ slides.js theme drift
  const themeFile = path.join(courseDir, "theme.css");
  if (fs.existsSync(themeFile) && data.theme) {
    const css = fs.readFileSync(themeFile, "utf8");
    const token = (name) => (css.match(new RegExp(`--${name}\\s*:\\s*([^;]+);`)) || [])[1];
    [["theme-accent", "accent"], ["theme-badge", "badgeColor"]].forEach(([cssName, jsName]) => {
      const a = token(cssName);
      const v = data.theme[jsName];
      if (a && v && !a.includes("var(") && a.trim().toLowerCase() !== String(v).trim().toLowerCase()) {
        warn(`theme drift: theme.css --${cssName} is ${a.trim()} but slides.js theme.${jsName} is ${v} (slides.js wins)`);
      }
    });
  }

  // Hub registration
  const hub = path.join(tutorialsDir, "index.html");
  if (fs.existsSync(hub) && !fs.readFileSync(hub, "utf8").includes(`./${course}/index.html`)) {
    warn(`not registered in tutorials/index.html (no card linking to ./${course}/index.html)`);
  }

  console.log(`Deck: ${course} | format: ${format} | ${data.slides.length} slides | ${items.length} audio tracks | ${scored.length} scored`);
}

warnings.forEach((w) => console.log(`WARN   ${w}`));
errors.forEach((e) => console.log(`ERROR  ${e}`));
console.log(errors.length ? `\n✗ ${errors.length} error(s), ${warnings.length} warning(s)` : `\n✓ OK with ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
