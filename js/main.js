/* ============================================
   MAPLE AI — Main JS
   ============================================ */

// ── Nav scroll state ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Hero demo: one orchestrated entrance ──
// Chart bars grow, then the assistant "types" its reply. Runs once on load.
const demoApp = document.getElementById('demo-app');
const typingEl = document.getElementById('demo-typing');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (demoApp && !reducedMotion) {
  requestAnimationFrame(() => demoApp.classList.add('play'));
}
if (typingEl && !reducedMotion) {
  const fullText = typingEl.textContent;
  typingEl.textContent = '';
  let i = 0;
  setTimeout(function type() {
    typingEl.textContent = fullText.slice(0, ++i);
    if (i < fullText.length) setTimeout(type, 22);
  }, 1400);
}

// ── FAQ accordion ──
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Open clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));
