/* ================================================
   DX Carwash — script.js
   Vanilla JS: Hamburger, Smooth Scroll,
   FAQ Accordion, Floating WA, Back to Top,
   Active Nav Link
   ================================================ */

(function () {
  'use strict';

  /* ================================================
     1. HAMBURGER MENU
     ================================================ */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  const navLinks  = navMobile ? navMobile.querySelectorAll('.nav-link') : [];

  if (hamburger && navMobile) {

    // Toggle open/close saat hamburger diklik
    hamburger.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Tutup menu saat salah satu link diklik
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Tutup menu saat klik di luar area menu & header
    document.addEventListener('click', function (e) {
      const header = document.getElementById('header');
      if (header && !header.contains(e.target)) {
        navMobile.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ================================================
     2. SMOOTH SCROLL
     Untuk semua anchor link (#...)
     ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Hitung offset dari sticky header
      const headerEl = document.getElementById('header');
      const headerH  = headerEl ? headerEl.offsetHeight : 68;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ================================================
     3. FAQ ACCORDION
     Hanya satu FAQ terbuka dalam satu waktu
     ================================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Tutup semua FAQ lain
      faqItems.forEach(function (other) {
        const otherBtn    = other.querySelector('.faq-question');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherBtn && otherAnswer) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.remove('open');
        }
      });

      // Toggle FAQ yang diklik
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  /* ================================================
     4. BACK TO TOP BUTTON
     Muncul setelah scroll 300px
     ================================================ */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================================================
     5. ACTIVE NAVBAR LINK
     Highlight link yang sedang aktif saat scroll
     ================================================ */
  const sections  = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-desktop a');

  function setActiveLink() {
    const headerEl = document.getElementById('header');
    const headerH  = headerEl ? headerEl.offsetHeight + 20 : 88;
    const scrollY  = window.scrollY;

    let currentId = '';

    sections.forEach(function (section) {
      const top = section.offsetTop - headerH;
      if (scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  // Jalankan saat scroll (throttled dengan requestAnimationFrame)
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        setActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Jalankan sekali saat halaman pertama dibuka
  setActiveLink();

})();
