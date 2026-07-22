/* Give the readMore buttons the onClick event, so that when they are pressed, 
they display the Portfolio section with details about the current Portfolio (which had the read more button pressed). 
At the same time, the event will hide the Portfolio section.*/
import { dataPortfolioItems } from "../../data/dataPortfolioItems.js";

const readMoreBtn = document.querySelectorAll(".more,.portfolio-image");
const projectContainerHtml = document.querySelector("#project");
const portfolioSection = document.querySelector("#portfolio");
const activeSection = document.querySelector(".active");

if (readMoreBtn.length > 0 && projectContainerHtml && portfolioSection && activeSection) {
  readMoreBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const currentActiveSection = document.querySelector(".active");
      const portfolioItem = dataPortfolioItems[button.dataset.more];

      if (!currentActiveSection || !portfolioItem) {
        return;
      }

      // Hide Portfolio page
      currentActiveSection.classList.remove("active");

      // Display current project's details.
      projectContainerHtml.classList.add("active");

      projectContainerHtml.innerHTML =
      `
    <div class="project-title main-title" id="project-title">
        <h2>
          ${portfolioItem.title}
        </h2>
    </div>
    <div class="project-description-container">
        <div class="project-description text-about" id="project-description">
          <div class="project-back">
            Back to projects
          </div>
            ${portfolioItem.description}
        </div>
        <div class="project-photo" id="project-photo">
          ${portfolioItem.photo}
        </div>
        <div class="project-video" id="project-video">
          ${portfolioItem.video}
        </div>
    </div>
    `;

      /*Provides the button with the "project-back" class onClick event.
    When pressed, it displays the Portfolio section and hides the Project section. */
      const backButtonHtml = document.querySelector(".project-back");
      if (!backButtonHtml) {
        return;
      }

      backButtonHtml.addEventListener("click", () => {
        const activeProjectSection = document.querySelector(".active");
        const portfolioContainer = document.querySelector("#portfolio");

        if (!activeProjectSection || !portfolioContainer) {
          return;
        }

        activeProjectSection.classList.remove("active");
        portfolioContainer.classList.add("active");
      })
    });
  });
}
