/* ═══════════════════════════════════════════════
   Robin Olbricht – main.js
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Sticky header scroll effect ───────────────
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile navigation toggle ───────────────────
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Intersection Observer: timeline reveal ─────
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    timelineItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
      io.observe(item);
    });
  } else {
    // Fallback: show all
    timelineItems.forEach(item => item.classList.add('visible'));
  }

  // ── Smooth active nav highlighting ────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => navObserver.observe(s));
  }

  // ── Contact form: simple feedback ─────────────
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Wird gesendet…';
        btn.disabled = true;
        // Re-enable after timeout in case of error
        setTimeout(() => {
          btn.textContent = 'Nachricht absenden →';
          btn.disabled = false;
        }, 6000);
      }
    });
  }

})();
