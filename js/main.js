'use strict';

// Scrolled navbar
const navbar = document.getElementById('navigation');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Smooth scroll for nav links
document.querySelectorAll('.smoothscroll').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile menu if open
    const navCollapse = document.getElementById('navbarContent');
    if (navCollapse && navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show');
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + navbar.offsetHeight + 10;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
}, { passive: true });

// GLightbox init
if (typeof GLightbox !== 'undefined') {
  GLightbox({ selector: '.glightbox' });
}

//Contact form (basic front-end validation — wire up backend as needed)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');
    // Replace this block with your actual fetch/submit logic
    try {
      success.classList.remove('d-none');
      error.classList.add('d-none');
      contactForm.reset();
    } catch {
      error.classList.remove('d-none');
      success.classList.add('d-none');
    }
  });
}
