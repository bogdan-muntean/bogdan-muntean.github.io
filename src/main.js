// Activates the script related to the general functionality of the project.

import { pageTransitions } from "./utils/pageTransitions.js";
import { toggleLightMode } from "./utils/toggleLightMode.js";

// Add the Page Transitions function for section buttons.
pageTransitions(".control");

// Add toggle light mode function for theme-btn.
toggleLightMode(".theme-btn");












