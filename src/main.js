// Activates the script related to the general functionality of the project.

import { toggleLightMode } from "./utils/toggleLightMode.js";

// Initialize general UI behavior after the DOM is available.
document.addEventListener('DOMContentLoaded', function () {
  const navIcon = document.getElementById('nav-icon');
  const mobileMenu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (navIcon && mobileMenu) {
    const closeMobileMenu = function () {
      navIcon.classList.remove('open');
      mobileMenu.classList.remove('open');
    };

    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !navIcon.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 800) {
        closeMobileMenu();
      }
    });
  }

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












