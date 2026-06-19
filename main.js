/* ══════════════════════════════════════
   SRAN.DEV — SHARED JS
   Danielle Choster Game Studio
══════════════════════════════════════ */

/* ── CURSOR ── */
const cur = document.getElementById('cur');
const ring = document.getElementById('curRing');
if (cur && ring) {
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  (function animRing(){
    rx += (mx-rx)*0.12;
    ry += (my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a,button,.hov-target').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hov'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hov'));
  });
}

/* ── NAV SCROLL ── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ── MOBILE MENU ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ── LANGUAGE ── */
const LANG_KEY = 'srandev_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

function applyLang(l) {
  currentLang = l;
  localStorage.setItem(LANG_KEY, l);
  document.querySelectorAll('[data-en]').forEach(el => {
    const t = el.getAttribute('data-' + l);
    if (t) el.innerHTML = t;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === l);
  });
}

window.setLang = function(l) { applyLang(l); };

// Auto-apply on load
document.addEventListener('DOMContentLoaded', () => applyLang(currentLang));

/* ── REVEAL ON SCROLL ── */
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('vis'), i * 90);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Mark active nav link */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
