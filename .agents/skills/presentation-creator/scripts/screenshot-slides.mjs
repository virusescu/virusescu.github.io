#!/usr/bin/env node
/**
 * Renders every slide of a tutorial deck to PNG for visual QA, using headless Edge/Chrome
 * driven over the DevTools protocol (no npm packages; needs Node 22+ for the global WebSocket).
 *
 * Usage (from the repo root):
 *   node .agents/skills/presentation-creator/scripts/screenshot-slides.mjs <course> [options]
 *
 * Options:
 *   --mobile            emulate a phone (390×844 CSS px @2x, touch/mobile mode); default is desktop 1600×900
 *   --state answered    quiz/input solved, code on its last step, flashcards flipped (?qa=answered)
 *   --slides 3,5-7      only these slide numbers
 *   --out <dir>         output folder (default: tutorials/<course>/.screenshots[/answered])
 *   --size 1280x720     custom viewport (CSS px)
 *   --cover             mobile only: keep the tap-to-start cover (shoots slide 1 as a learner first sees it)
 *
 * Why not plain `--headless --screenshot`? Headless windows can't go below ~484px wide, so phone
 * screenshots silently render at the wrong width. Device emulation over CDP gives the exact viewport.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const course = args.find((a) => !a.startsWith("--") && !isOptionValue(a));
function isOptionValue(a) {
  const i = args.indexOf(a);
  return i > 0 && ["--state", "--slides", "--out", "--size"].includes(args[i - 1]);
}
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

if (!course) {
  console.error("Usage: node screenshot-slides.mjs <course> [--mobile] [--state answered] [--slides 3,5-7] [--out dir]");
  process.exit(1);
}

const mobile = args.includes("--mobile");
const state = opt("--state") || "";
const cover = args.includes("--cover");
const [width, height] = (opt("--size") || (mobile ? "390x844" : "1600x900")).split("x").map(Number);
const scale = mobile ? 2 : 1;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..", "..", "..");
const courseDir = path.join(repoRoot, "tutorials", course);
const indexPath = path.join(courseDir, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error(`Course not found: ${indexPath}`);
  process.exit(1);
}
const outDir = path.resolve(opt("--out") || path.join(courseDir, ".screenshots", state || ""));
fs.mkdirSync(outDir, { recursive: true });

const browserPath = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
].find((p) => fs.existsSync(p));
if (!browserPath) {
  console.error("No Edge/Chrome found for headless screenshots.");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9300 + Math.floor(Math.random() * 500);
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "deck-shots-"));
const browser = spawn(browserPath, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio", "--no-first-run",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profileDir}`, "about:blank"
], { stdio: "ignore" });

async function cdpTarget() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* browser still starting */ }
    await sleep(200);
  }
  throw new Error("Could not connect to the headless browser.");
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    const listeners = [];
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && pending.has(data.id)) {
        const { res, rej } = pending.get(data.id);
        pending.delete(data.id);
        data.error ? rej(new Error(data.error.message)) : res(data.result);
      } else if (data.method) {
        listeners.forEach((fn) => fn(data));
      }
    };
    ws.onerror = reject;
    ws.onopen = () => resolve({
      send(method, params = {}) {
        const id = nextId++;
        ws.send(JSON.stringify({ id, method, params }));
        return new Promise((res, rej) => pending.set(id, { res, rej }));
      },
      once(method) {
        return new Promise((res) => {
          const fn = (d) => {
            if (d.method === method) {
              listeners.splice(listeners.indexOf(fn), 1);
              res(d.params);
            }
          };
          listeners.push(fn);
        });
      },
      close: () => ws.close()
    });
  });
}

function parseSlides(spec, total) {
  if (!spec) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set();
  spec.split(",").forEach((part) => {
    const [a, b] = part.split("-").map(Number);
    for (let i = a; i <= (b || a); i++) if (i >= 1 && i <= total) set.add(i);
  });
  return [...set].sort((x, y) => x - y);
}

let exitCode = 0;
try {
  const cdp = await connect(await cdpTarget());
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile });
  if (mobile) await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

  const baseUrl = pathToFileURL(indexPath).href;
  const load = async (n) => {
    const loaded = cdp.once("Page.loadEventFired");
    // a fresh query string per slide forces a real reload (hash-only changes don't re-init the engine)
    const qa = cover ? "" : `qa${state ? `=${state}` : ""}&`;
    await cdp.send("Page.navigate", { url: `${baseUrl}?${qa}shot=${n}#${n}` });
    await loaded;
    await sleep(1700); // let the staggered entrance animations finish
  };

  await load(1);
  const { result } = await cdp.send("Runtime.evaluate", {
    expression: "window.PRESENTATION_DATA && window.PRESENTATION_DATA.slides.length",
    returnByValue: true
  });
  const total = result.value || 0;
  if (!total) throw new Error("Could not read slide count from window.PRESENTATION_DATA");

  for (const n of cover ? [1] : parseSlides(opt("--slides"), total)) {
    if (n !== 1 || opt("--slides")) await load(n);
    const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
    const file = path.join(outDir, cover ? "cover.png" : `slide-${String(n).padStart(2, "0")}.png`);
    fs.writeFileSync(file, Buffer.from(shot.data, "base64"));
    console.log(`[OK] ${file}`);
  }
  await cdp.send("Browser.close").catch(() => {});
  cdp.close();
} catch (err) {
  console.error(`[ERROR] ${err.message}`);
  exitCode = 1;
} finally {
  browser.kill();
  await sleep(300);
  fs.rmSync(profileDir, { recursive: true, force: true, maxRetries: 3 });
}
process.exit(exitCode);
