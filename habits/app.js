(function () {
  const I18N = window.HABITS_I18N || { en: {}, ro: {} };

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
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && dict['meta.title']) document.title = dict['meta.title'];

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    try { localStorage.setItem('habits-lang', lang); } catch (_) {}
  }

  const initial = detectLang();
  applyLang(initial);
  const params = new URLSearchParams(window.location.search);
  if (!params.get('lang')) setUrlLang(initial);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLang(lang);
      setUrlLang(lang);
    });
  });
})();
