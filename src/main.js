// Activates the script related to the general functionality of the project.

import { pageTransitions } from "./utils/pageTransitions.js";
import { toggleLightMode } from "./utils/toggleLightMode.js";

// Add the Page Transitions function for section buttons.
// pageTransitions(".control-btn");
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
});

// Add toggle light mode function for theme-btn.
toggleLightMode(".theme-btn");












