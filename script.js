(function () {
  'use strict';

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Smooth scroll for nav links ─────────────────────── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const offset = window.innerWidth < 768 ? 64 : 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Close mobile drawer on nav click
      closeSidebar();
    });
  });

  /* ── Scroll-spy via IntersectionObserver ─────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  /* ── Mobile drawer ───────────────────────────────────── */
  const sidebar      = document.getElementById('sidebar');
  const hamburger    = document.getElementById('hamburger');
  const backdrop     = document.getElementById('drawerBackdrop');

  function openSidebar() {
    sidebar.classList.add('sidebar--open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (backdrop)  backdrop.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });
})();
