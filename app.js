// Zesto landing page — vanilla JS, no dependencies

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- Navbar scroll state -------- */
  var navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (window.scrollY > 8) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  /* -------- Mobile menu toggle -------- */
  var menuToggle = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');

  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  function toggleMenu() {
    var isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  menuToggle.addEventListener('click', toggleMenu);

  // Close mobile menu after choosing a link
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* -------- Scroll reveal -------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
