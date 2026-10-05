(function () {
  const I18N = window.HABITS_I18N || { en: {}, ro: {} };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- language ---------- */
  function detectLang() {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get('lang') || '').toLowerCase();
    if (q === 'ro' || q === 'en') return q;
    try {
      const stored = localStorage.getItem('habits-lang');
      if (stored === 'ro' || stored === 'en') return stored;
    } catch (_) {}
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('ro') ? 'ro' : 'en';
  }

  function setUrlLang(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key] != null) el.setAttribute('alt', dict[key]);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] != null) el.setAttribute('title', dict[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-i18n-meta]').forEach((el) => {
      const key = el.getAttribute('data-i18n-meta');
      if (dict[key] != null) el.setAttribute('content', dict[key]);
    });
    // <title> uses data-i18n
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && dict['meta.title']) document.title = dict['meta.title'];

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    try { localStorage.setItem('habits-lang', lang); } catch (_) {}
  }

  const initial = detectLang();
  applyLang(initial);
  // sync URL if missing param but we resolved a lang (keep shareable)
  const params = new URLSearchParams(window.location.search);
  if (!params.get('lang')) setUrlLang(initial);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLang(lang);
      setUrlLang(lang);
    });
  });

  /* ---------- habit loop ---------- */
  const flow = document.querySelector('.habit-loop .flow');
  const circuit = document.getElementById('circuit');
  const nodes = document.querySelectorAll('.loop-node');

  if (flow && !reduce) {
    let offset = 0;
    const circumferenceApprox = 740;
    function tick() {
      offset = (offset + 1.4) % circumferenceApprox;
      flow.setAttribute('stroke-dashoffset', String(-offset));
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function highlight(name) {
    nodes.forEach((n) => {
      const active = n.classList.contains(name);
      n.style.opacity = active || !name ? '1' : '0.35';
      const dot = n.querySelector('.dot');
      if (dot) dot.style.transform = active ? 'scale(1.08)' : 'scale(1)';
    });
    if (circuit) {
      circuit.querySelectorAll('.item').forEach((item) => {
        const on = item.getAttribute('data-node') === name;
        item.style.borderColor = on ? 'rgba(0,255,133,0.55)' : '';
        item.style.background = on ? 'rgba(0,255,133,0.07)' : '';
        item.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
  }

  if (circuit) {
    circuit.querySelectorAll('.item').forEach((item) => {
      const activate = () => highlight(item.getAttribute('data-node'));
      item.addEventListener('click', activate);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  nodes.forEach((n) => {
    n.style.cursor = 'pointer';
    n.addEventListener('click', () => {
      const name = ['cue', 'routine', 'reward'].find((k) => n.classList.contains(k));
      if (name) highlight(name);
    });
  });

  /* ---------- scroll reveal (only below fold; never leave hidden) ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = document.querySelectorAll(
      '.pillar, .card, .step, .break, .strat, .loop-wrap, .exception, .rpe-card'
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    els.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top > window.innerHeight - 40) {
        el.classList.add('is-pending');
        io.observe(el);
      }
    });
    // Safety: if something stays pending after scroll/paint, reveal it
    setTimeout(() => {
      document.querySelectorAll('.is-pending:not(.is-in)').forEach((el) => {
        el.classList.add('is-in');
      });
    }, 2500);
  }
})();
