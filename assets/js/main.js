(function () {
  'use strict';

  // Sticky nav border on scroll
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Active section indicator in the nav
  const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (sectionLinks.length) {
    const sections = sectionLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    const setActiveSection = (id) => {
      sectionLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    sectionLinks.forEach((link) => {
      link.addEventListener('click', () => setActiveSection(link.getAttribute('href').slice(1)));
    });

    if ('IntersectionObserver' in window) {
      const activeSectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      sections.forEach((section) => activeSectionObserver.observe(section));
    }
  }

  // Reveal-on-scroll for sections
  const targets = document.querySelectorAll('.section, .hero-foot, .focus li, .row, .pub, .honor');
  targets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('in'));
  }
})();
