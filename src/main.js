// Activates the script related to the general functionality of the project.

import { pageTransitions } from "./utils/pageTransitions.js";
import { toggleLightMode } from "./utils/toggleLightMode.js";

// Add the Page Transitions function for section buttons.
document.addEventListener('DOMContentLoaded', function () {
  const navIcon = document.getElementById('nav-icon');
  const mobileMenu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  navIcon.addEventListener('click', function () {
    navIcon.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      navIcon.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !navIcon.contains(e.target)
    ) {
      navIcon.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 800) {
      navIcon.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // Back to top button functionality
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Add toggle light mode function for theme-btn.
toggleLightMode(".theme-btn");












