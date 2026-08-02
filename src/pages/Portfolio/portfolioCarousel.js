// Portfolio carousel: cycles through projects (one image per project) in a
// large stage, with prev/next arrows, a horizontal row of title tabs to jump
// directly to a project, and a "More info" button (kept in sync via
// data-project-id) that src/pages/Project/projectDetail.js listens on to
// open the full project-detail overlay for the currently active project.
import { createAutoplayController } from "../../utils/autoplayCarousel.js";

export function initPortfolioCarousel(dataBase) {
    // Scoped to .portfolio-carousel (not document-wide): the project-detail
    // overlay reuses these same arrow/stage class names for its own image
    // and video carousels, so a document-wide query would risk matching the
    // wrong element.
    const root = document.querySelector(".portfolio-carousel");
    if (!root) {
        return;
    }

    const imagesContainer = root.querySelector(".portfolio-carousel-images");
    const tabsContainer = root.querySelector(".portfolio-list");
    const prevBtn = root.querySelector(".portfolio-carousel-arrow-prev");
    const nextBtn = root.querySelector(".portfolio-carousel-arrow-next");
    const moreInfoBtn = root.querySelector(".portfolio-more-info");

    if (
        !imagesContainer ||
        !tabsContainer ||
        !prevBtn ||
        !nextBtn ||
        !moreInfoBtn ||
        dataBase.length === 0
    ) {
        return;
    }

    imagesContainer.innerHTML = dataBase
        .map(
            (item, index) =>
                `<img src="./${item.imageLink}" alt="${item.title} screenshot" class="portfolio-carousel-image${index === 0 ? " is-active" : ""}" />`
        )
        .join("");

    tabsContainer.innerHTML = dataBase
        .map(
            (item, index) =>
                `<button type="button" class="portfolio-title-box${index === 0 ? " is-active" : ""}" data-project-id="${index}" aria-label="Show project ${item.title}">
                    <span class="portfolio-title-text">${item.title}</span>
                </button>`
        )
        .join("");

    const imageEls = imagesContainer.querySelectorAll(".portfolio-carousel-image");
    const tabEls = tabsContainer.querySelectorAll(".portfolio-title-box");

    let activeIndex = 0;

    function setActive(index) {
        activeIndex = index;
        imageEls.forEach((img, i) => img.classList.toggle("is-active", i === index));
        tabEls.forEach((tab, i) => tab.classList.toggle("is-active", i === index));
        moreInfoBtn.dataset.projectId = index;
    }

    function goTo(index) {
        const total = dataBase.length;
        setActive(((index % total) + total) % total);
    }

    function next() {
        goTo(activeIndex + 1);
    }

    function prev() {
        goTo(activeIndex - 1);
    }

    const autoplay = createAutoplayController(next);

    prevBtn.addEventListener("click", () => {
        prev();
        autoplay.registerInteraction();
    });

    nextBtn.addEventListener("click", () => {
        next();
        autoplay.registerInteraction();
    });

    tabsContainer.addEventListener("click", (event) => {
        const trigger = event.target.closest(".portfolio-title-box[data-project-id]");
        if (!trigger) {
            return;
        }
        goTo(Number(trigger.dataset.projectId));
        autoplay.registerInteraction();
    });

    moreInfoBtn.addEventListener("click", autoplay.registerInteraction);

    autoplay.start();
}
