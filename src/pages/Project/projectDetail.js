// Project-detail overlay. Fresh implementation per PROJECT_DETAIL_OVERLAY_DESIGN.md
// (Phase 7) - not a revival of the old .active/#project/#portfolio flow.
// A single shared <dialog> (see index.html) is populated from
// dataPortfolioItems at click time, keyed by the data-project-id set on
// each card's .portfolio-image button.
import { dataPortfolioItems } from "../../data/dataPortfolioItems.js";
import { checkIcon } from "../../utils/checkIcon.js";

const dialog = document.querySelector("#project-detail");
const portfolioList = document.querySelector(".portfolio-list");

if (dialog && portfolioList) {
    const titleEl = dialog.querySelector(".project-detail-title");
    const imageEl = dialog.querySelector(".project-detail-image");
    const descriptionEl = dialog.querySelector(".project-detail-description");
    const mediaEl = dialog.querySelector(".project-detail-media");
    const linksEl = dialog.querySelector(".portfolio-links");
    const closeBtn = dialog.querySelector(".project-detail-close");

    let lastTrigger = null;

    function renderProject(item) {
        titleEl.textContent = item.title;

        imageEl.innerHTML = item.imageLink
            ? `<img src="./${item.imageLink}" alt="${item.title} screenshot" />`
            : "";

        const description =
            typeof item.description === "string" ? item.description.trim() : "";
        descriptionEl.innerHTML = description;
        descriptionEl.hidden = description === "";

        const photo = typeof item.photo === "string" ? item.photo.trim() : "";
        const video = typeof item.video === "string" ? item.video.trim() : "";
        let mediaHtml = "";
        if (photo !== "") {
            mediaHtml += `<img src="./${photo}" alt="" />`;
        }
        if (video !== "") {
            mediaHtml += `<video src="./${video}" controls></video>`;
        }
        mediaEl.innerHTML = mediaHtml;
        mediaEl.hidden = mediaHtml === "";

        const repoLink =
            typeof item.repoLink === "string" ? item.repoLink.trim() : "";
        const liveLink =
            typeof item.liveLink === "string" ? item.liveLink.trim() : "";

        let linksHtml = "";
        if (repoLink !== "") {
            linksHtml += `
                <div>
                    <a ${checkIcon(repoLink)} target="_blank">
                        Source
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            `;
        }
        if (liveLink !== "") {
            linksHtml += `
                <div>
                    <a ${checkIcon(liveLink)} target="_blank">
                        Live
                        <i class="fa-solid fa-display"></i>
                    </a>
                </div>
            `;
        }
        linksEl.innerHTML = linksHtml;
    }

    function openProject(id, trigger) {
        const item = dataPortfolioItems[id];
        if (!item) {
            return;
        }

        renderProject(item);
        lastTrigger = trigger;
        dialog.showModal();

        if (closeBtn) {
            closeBtn.focus();
        }
    }

    portfolioList.addEventListener("click", (event) => {
        const trigger = event.target.closest(".portfolio-image[data-project-id]");
        if (!trigger) {
            return;
        }

        openProject(trigger.dataset.projectId, trigger);
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            dialog.close();
        });
    }

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    // Fires for every closing path (close button, Escape, backdrop click),
    // so focus-return only needs to be handled once, here.
    dialog.addEventListener("close", () => {
        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    });
}
