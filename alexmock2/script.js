(function () {
  window.__revealReady = true;

  // Scroll-in reveals
  var revealEls = document.querySelectorAll('[data-reveal]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function settle(el) {
    var d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
    setTimeout(function () { el.classList.add('done'); }, 1500 + d * 110);
  }
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view', 'done'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        settle(entry.target);
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { revealer.observe(el); });
  }

  // Header gets slimmer once the page scrolls
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Active nav link while scrolling
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var i = sections.indexOf(entry.target);
        links.forEach(function (a, j) { a.classList.toggle('active', i === j); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  // Testimonials carousel
  var quotes = document.querySelectorAll('.quote');
  var count = document.querySelector('.quote-count');
  var i = 0;
  var n = quotes.length;
  function pad(x) { return (x < 10 ? '0' : '') + x; }
  function show(k) {
    quotes[i].classList.remove('is-active');
    i = (k + n) % n;
    quotes[i].classList.add('is-active');
    count.textContent = pad(i + 1) + ' / ' + pad(n);
  }
  document.querySelectorAll('.quote-nav .round-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { show(i + Number(btn.getAttribute('data-dir'))); });
  });
  // Booking form
  var form = document.getElementById('booking-form');
  var success = document.getElementById('booking-success');
  var submitBtn = form.querySelector('.submit');
  var formError = document.getElementById('form-error');
  var fields = {
    prenume: { input: document.getElementById('f-prenume'), error: document.getElementById('e-prenume'),
      check: function (v) { return v.trim() ? '' : 'Te rog să îți scrii prenumele.'; } },
    email: { input: document.getElementById('f-email'), error: document.getElementById('e-email'),
      check: function (v) {
        if (!v.trim()) return 'Am nevoie de o adresă de e-mail ca să îți pot răspunde.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Adresa de e-mail pare incompletă.';
      } }
  };
  function validate(name) {
    var f = fields[name];
    var msg = f.check(f.input.value);
    f.error.textContent = msg;
    if (msg) {
      f.input.setAttribute('aria-invalid', 'true');
      f.input.setAttribute('aria-describedby', f.error.id);
    } else {
      f.input.removeAttribute('aria-invalid');
      f.input.removeAttribute('aria-describedby');
    }
    return !msg;
  }
  Object.keys(fields).forEach(function (name) {
    fields[name].input.addEventListener('blur', function () { if (fields[name].input.value) validate(name); });
    fields[name].input.addEventListener('input', function () {
      if (fields[name].input.getAttribute('aria-invalid')) validate(name);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(fields).forEach(function (name) {
      if (!validate(name) && !firstBad) firstBad = fields[name].input;
    });
    if (firstBad) { firstBad.focus(); return; }

    formError.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Se trimite…';
    // Shape the notification email (Web3Forms free plan: fixed template, one "label: value" row per field).
    // `name` = full name, `email` = reply-to; empty optional fields are left out; subject says who and what.
    var fullName = (fields.prenume.input.value + ' ' + document.getElementById('f-nume').value).trim();
    form.querySelector('input[name="name"]').value = fullName;
    var data = new FormData(form);
    var nivel = data.get('Nivel');
    var unde = data.get('Format');
    data.set('subject', 'Cerere lecție de pian · ' + fullName + ' · ' + nivel + ', ' + unde.toLowerCase());
    Array.from(data.keys()).forEach(function (k) {
      if (typeof data.get(k) === 'string' && !data.get(k).trim()) data.delete(k);
    });
    var endpoint = form.getAttribute('data-endpoint');
    var send = endpoint
      ? fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (res) {
            if (!r.ok || res.success === false) throw new Error(res.message || ('HTTP ' + r.status));
          }); })
      : new Promise(function (resolve) { setTimeout(resolve, 900); }); // demo mode: no service configured

    send.then(function () {
      document.getElementById('success-name').textContent = fields.prenume.input.value.trim();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }).catch(function () {
      formError.textContent = 'Mesajul nu a putut fi trimis. Încearcă din nou sau sună la +40 753 563 165.';
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Trimite cererea';
    });
  });

  document.getElementById('booking-again').addEventListener('click', function () {
    form.reset();
    success.hidden = true;
    form.hidden = false;
    fields.prenume.input.focus();
  });

  // "Rezervă o lecție" buttons: after scrolling to the form, put the cursor in the first field (desktop only,
  // so phones don't pop the keyboard up mid-scroll)
  var canHover = window.matchMedia('(hover: hover)').matches;
  document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!canHover || form.hidden) return;
      setTimeout(function () { fields.prenume.input.focus({ preventScroll: true }); }, 700);
    });
  });
})();
