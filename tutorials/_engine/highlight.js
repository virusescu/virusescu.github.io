/**
 * virusescu.github.io — Minimal Syntax Highlighter for code slides
 * Regex tokenizer, zero dependencies. Languages: html, css, js, python, bash, json.
 * API: window.PresentationHighlight.toLines(code, language) -> array of HTML strings (one per line)
 * Token classes: tok-comment, tok-string, tok-keyword, tok-number, tok-func, tok-tag, tok-attr,
 *                tok-punct, tok-prop, tok-selector, tok-var, tok-builtin, tok-literal
 */

(function () {
  "use strict";

  const STRING = /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y;

  const JS_KEYWORDS = "const let var function return if else for while do switch case break continue new class extends " +
    "import from export default async await try catch finally throw typeof instanceof in of this super yield delete void";
  const PY_KEYWORDS = "def return if elif else for while in not and or is class import from as with try except finally " +
    "raise pass break continue lambda yield global nonlocal assert del async await";
  const PY_BUILTINS = "print len range input int str float list dict set tuple open enumerate zip sum min max abs sorted type";
  const BASH_KEYWORDS = "if then else elif fi for while do done case esac function in return export local";
  const BASH_BUILTINS = "echo cd ls mkdir rm cp mv cat grep git npm node python pip touch sudo chmod curl";

  const words = (list) => new RegExp(`\\b(?:${list.split(" ").join("|")})\\b`, "y");

  // Each rule: [tokenType | null, stickyRegex, subTokenizer?]
  const RULES = {
    js: [
      ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
      ["string", /`(?:\\.|[^`\\])*`/y],
      ["string", STRING],
      ["keyword", words(JS_KEYWORDS)],
      ["literal", /\b(?:true|false|null|undefined|NaN)\b/y],
      ["number", /\b\d+(?:\.\d+)?\b/y],
      ["func", /[A-Za-z_$][\w$]*(?=\s*\()/y],
      ["punct", /[{}()[\];,.=+\-*/<>!&|?:]/y]
    ],
    python: [
      ["comment", /#[^\n]*/y],
      ["string", /"""[\s\S]*?"""|'''[\s\S]*?'''/y],
      ["string", /[fFrRbB]?(?:"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/y],
      ["keyword", words(PY_KEYWORDS)],
      ["literal", /\b(?:True|False|None)\b/y],
      ["builtin", words(PY_BUILTINS)],
      ["number", /\b\d+(?:\.\d+)?\b/y],
      ["func", /[A-Za-z_]\w*(?=\s*\()/y],
      ["punct", /[{}()[\]:,.=+\-*/<>%]/y]
    ],
    bash: [
      ["comment", /#[^\n]*/y],
      ["string", STRING],
      ["var", /\$\{?[A-Za-z_]\w*\}?/y],
      ["keyword", words(BASH_KEYWORDS)],
      ["builtin", words(BASH_BUILTINS)],
      ["attr", /(?<=\s)--?[A-Za-z][\w-]*/y],
      ["punct", /[|&;<>]/y]
    ],
    json: [
      ["prop", /"(?:\\.|[^"\\\n])*"(?=\s*:)/y],
      ["string", STRING],
      ["literal", /\b(?:true|false|null)\b/y],
      ["number", /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y],
      ["punct", /[{}[\]:,]/y]
    ],
    html: [
      ["comment", /<!--[\s\S]*?-->/y],
      ["keyword", /<!DOCTYPE[^>]*>/iy],
      [null, /<\/?[A-Za-z][^>]*>/y, tokenizeTag],
      ["literal", /&[#\w]+;/y]
    ],
    htmlTag: [
      ["string", STRING],
      ["attr", /[A-Za-z_:][\w:.-]*/y],
      ["punct", /[=/>]/y]
    ],
    cssBlock: [
      ["comment", /\/\*[\s\S]*?\*\//y],
      ["string", STRING],
      ["prop", /--?[A-Za-z][\w-]*(?=\s*:)|[A-Za-z-]+(?=\s*:)/y],
      ["number", /-?\d*\.?\d+(?:px|rem|em|%|vh|vw|s|ms|deg|fr)?\b/y],
      ["literal", /#[0-9a-fA-F]{3,8}\b/y],
      ["func", /[A-Za-z-]+(?=\()/y],
      ["keyword", /!important/y],
      ["punct", /[:;,()]/y]
    ],
    cssOuter: [
      ["comment", /\/\*[\s\S]*?\*\//y],
      ["keyword", /@[\w-]+/y],
      ["selector", /[^{}\s,/@][^{},/]*?(?=\s*[{,])/y],
      ["punct", /[,]/y]
    ]
  };
  RULES.javascript = RULES.js;
  RULES.py = RULES.python;
  RULES.sh = RULES.shell = RULES.bash;

  // html tag "<a href='x'>" -> punct "<", tag "a", then attributes/strings
  function tokenizeTag(text) {
    const m = /^(<\/?)([\w-]+)/.exec(text);
    return [
      { type: "punct", text: m[1] },
      { type: "tag", text: m[2] },
      ...runRules(text.slice(m[0].length), RULES.htmlTag)
    ];
  }

  function runRules(code, rules) {
    const tokens = [];
    let plain = "";
    let i = 0;
    outer: while (i < code.length) {
      for (const [type, re, sub] of rules) {
        re.lastIndex = i;
        const m = re.exec(code);
        if (m && m[0].length) {
          if (plain) { tokens.push({ type: null, text: plain }); plain = ""; }
          if (sub) tokens.push(...sub(m[0]));
          else tokens.push({ type, text: m[0] });
          i += m[0].length;
          continue outer;
        }
      }
      plain += code[i++];
    }
    if (plain) tokens.push({ type: null, text: plain });
    return tokens;
  }

  // CSS needs brace context: selectors outside {}, properties/values inside.
  function tokenizeCss(code) {
    const tokens = [];
    let depth = 0;
    let chunk = "";
    const flush = () => {
      if (chunk) tokens.push(...runRules(chunk, depth > 0 ? RULES.cssBlock : RULES.cssOuter));
      chunk = "";
    };
    for (const ch of code) {
      if (ch === "{" || ch === "}") {
        flush();
        tokens.push({ type: "punct", text: ch });
        depth += ch === "{" ? 1 : -1;
        if (depth < 0) depth = 0;
      } else {
        chunk += ch;
      }
    }
    flush();
    return tokens;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function toLines(code, language) {
    const lang = String(language || "").toLowerCase();
    const source = String(code || "").replace(/\r\n?/g, "\n").replace(/\t/g, "  ");
    let tokens;
    if (lang === "css") tokens = tokenizeCss(source);
    else if (RULES[lang]) tokens = runRules(source, RULES[lang]);
    else tokens = [{ type: null, text: source }];

    // Split tokens on newlines so every line is self-contained HTML.
    const lines = [""];
    tokens.forEach(({ type, text }) => {
      text.split("\n").forEach((part, idx) => {
        if (idx > 0) lines.push("");
        if (!part) return;
        const safe = escapeHtml(part);
        lines[lines.length - 1] += type ? `<span class="tok-${type}">${safe}</span>` : safe;
      });
    });
    return lines;
  }

  window.PresentationHighlight = { toLines };
})();
