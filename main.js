/**
 * Campelen på Bryggen AS – main.js
 * Sticky nav · Scroll animations · Infinite review ticker · Contact form
 */

'use strict';

/* ── Utilities ──────────────────────────────────────────────── */
function throttle(fn, ms) {
  let last = 0;
  return (...a) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...a); } };
}
function debounce(fn, ms) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}
function onReady(fn) {
  document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
}

/* ── Sticky Nav ─────────────────────────────────────────────── */
class StickyNav {
  constructor() {
    this.header    = document.getElementById('site-header');
    this.hamburger = document.getElementById('hamburger');
    this.mobileMenu= document.getElementById('mobile-menu');
    this.navLinks  = document.querySelectorAll('.nav-link');
    this.sections  = document.querySelectorAll('section[id]');
    this.floatBtn  = document.getElementById('float-call-btn');
    this.open      = false;
    if (!this.header) return;
    this._init();
  }
  _init() {
    window.addEventListener('scroll', throttle(() => this._onScroll(), 80), { passive: true });
    this.hamburger?.addEventListener('click', () => this._toggle());
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => this._close()));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.open) this._close(); });
    document.addEventListener('click', e => { if (this.open && !this.header.contains(e.target)) this._close(); });
    this._onScroll();
    // Hero Ken Burns
    requestAnimationFrame(() => document.querySelector('.hero')?.classList.add('loaded'));
  }
  _onScroll() {
    const y = window.scrollY;
    this.header.classList.toggle('scrolled', y > 50);
    if (this.floatBtn) {
      const h = document.querySelector('.hero')?.offsetHeight || 600;
      this.floatBtn.classList.toggle('visible', y > h * 0.6);
    }
    // Active nav
    const cur = [...this.sections].reverse().find(s => s.offsetTop <= y + 120)?.id || '';
    this.navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
  }
  _toggle() { this.open ? this._close() : this._open(); }
  _open() {
    this.open = true;
    this.hamburger.classList.add('open');
    this.hamburger.setAttribute('aria-expanded','true');
    this.mobileMenu.classList.add('open');
    this.mobileMenu.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  _close() {
    this.open = false;
    this.hamburger.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded','false');
    this.mobileMenu.classList.remove('open');
    this.mobileMenu.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
}

/* ── Scroll Animations ──────────────────────────────────────── */
class ScrollAnimator {
  constructor() {
    const els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('animated'), delay);
        obs.unobserve(e.target);
      });
    }, { rootMargin:'0px 0px -80px 0px', threshold:0.08 });
    els.forEach(el => obs.observe(el));
  }
}

/* ── Infinite Review Ticker ─────────────────────────────────── */
class ReviewTicker {
  constructor() {
    this.ticker = document.getElementById('reviews-ticker');
    if (!this.ticker) return;
    this._duplicate();
  }
  _duplicate() {
    // Clone all original cards and append — creates seamless CSS loop
    const originals = Array.from(this.ticker.querySelectorAll('.review-card'));
    originals.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      this.ticker.appendChild(clone);
    });
    // Recalculate animation duration based on total width for consistent speed
    this._setDuration();
    window.addEventListener('resize', debounce(() => this._setDuration(), 300));
  }
  _setDuration() {
    // ~80px per second feels natural — calculate from half the strip (one set of originals)
    const totalW = this.ticker.scrollWidth;
    const halfW  = totalW / 2;
    const speed  = 80; // px/s
    const dur    = Math.max(20, Math.round(halfW / speed));
    this.ticker.style.animationDuration = `${dur}s`;
  }
}

/* ── Smooth Scroll ──────────────────────────────────────────── */
class SmoothScroll {
  constructor() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerH = document.getElementById('site-header')?.offsetHeight || 72;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH, behavior:'smooth' });
      });
    });
  }
}

/* ── Contact Form ───────────────────────────────────────────── */
class ContactForm {
  constructor() {
    this.form    = document.getElementById('kontakt-form');
    this.btn     = document.getElementById('form-submit');
    this.success = document.getElementById('form-success');
    if (!this.form) return;
    this._init();
  }
  _init() {
    this.form.addEventListener('submit', e => this._submit(e));
    this.form.querySelectorAll('input, textarea').forEach(f => {
      f.addEventListener('blur',  () => this._validate(f));
      f.addEventListener('input', () => { if (f.classList.contains('error')) this._validate(f); });
    });
  }
  _validate(f) {
    const errEl = f.parentElement.querySelector('.field-error');
    let msg = '';
    if (f.required && !f.value.trim()) msg = 'Dette feltet er påkrevd.';
    else if (f.type === 'email' && f.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()))
      msg = 'Oppgi en gyldig e-postadresse.';
    f.classList.toggle('error', !!msg);
    if (errEl) errEl.textContent = msg;
    return !msg;
  }
  _validateAll() {
    let ok = true;
    this.form.querySelectorAll('input:not([type=radio]),textarea').forEach(f => { if (!this._validate(f)) ok = false; });
    return ok;
  }
  async _submit(e) {
    e.preventDefault();
    if (!this._validateAll()) return;

    const txtEl  = this.btn.querySelector('.btn-submit-text');
    const loadEl = this.btn.querySelector('.btn-submit-loading');
    txtEl.hidden = true; loadEl.hidden = false; this.btn.disabled = true;

    const fd = new FormData(this.form);
    const data = {
      name:    (fd.get('name')    || '').trim(),
      phone:   (fd.get('phone')   || '').trim(),
      email:   (fd.get('email')   || '').trim(),
      message: (fd.get('message') || '').trim(),
      type:    'contact', status: 'new',
    };

    try {
      await fetch('tables/contact_submissions', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data),
      });
      this.form.hidden    = true;
      this.success.hidden = false;
      this.success.scrollIntoView({ behavior:'smooth', block:'nearest' });
    } catch {
      txtEl.hidden = false; loadEl.hidden = true; this.btn.disabled = false;
      alert('Noe gikk galt. Ring oss på 55 32 88 93.');
    }
  }
}

/* ── Footer year ────────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Real-time Open/Closed badge ────────────────────────────── */
function openBadge() {
  const now = new Date(), day = now.getDay(), hhmm = now.getHours() * 60 + now.getMinutes();
  const isOpen =
    (day >= 1 && day <= 5 && hhmm >= 600 && hhmm < 1020) || // Mon–Fri 10:00–17:00
    (day === 6              && hhmm >= 600 && hhmm < 960);   // Sat     10:00–16:00

  const bar = document.querySelector('.trust-items');
  if (!bar || document.getElementById('open-status')) return;

  const dot = document.createElement('div');
  dot.id = 'open-status'; dot.className = 'trust-item';
  dot.innerHTML = isOpen
    ? `<i class="fas fa-circle" style="color:#22c55e;font-size:.6rem"></i><span><strong style="color:#22c55e">Åpen nå</strong></span>`
    : `<i class="fas fa-circle" style="color:#ef4444;font-size:.6rem"></i><span style="color:rgba(255,255,255,.6)">Stengt nå</span>`;

  const div = document.createElement('div'); div.className = 'trust-divider'; div.setAttribute('aria-hidden','true');
  bar.prepend(div); bar.prepend(dot);
}

/* ── Hero scroll hint ───────────────────────────────────────── */
function heroScroll() {
  document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('.trust-bar')?.scrollIntoView({ behavior:'smooth' });
  });
}

/* ── Inject shake keyframe ──────────────────────────────────── */
function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`;
  document.head.appendChild(s);
}

/* ── Bootstrap ──────────────────────────────────────────────── */
onReady(() => {
  injectStyles();
  setYear();
  new StickyNav();
  new ScrollAnimator();
  new ReviewTicker();
  new SmoothScroll();
  new ContactForm();
  openBadge();
  heroScroll();

  console.log(
    '%cCampelen på Bryggen AS%c\n%c4.8 ⭐ · 326+ Google · Bredsgården 2, Bergen',
    'color:#4DB8D4;font-size:16px;font-weight:bold','','color:#001F3F;font-size:11px'
  );
});
