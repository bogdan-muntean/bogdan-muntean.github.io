// Project-detail overlay. Fresh implementation per PROJECT_DETAIL_OVERLAY_DESIGN.md
// (Phase 7) - not a revival of the old .active/#project/#portfolio flow.
// A single shared <dialog> (see index.html) is populated from
// dataPortfolioItems at click time, keyed by the data-project-id kept in
// sync on the carousel's "More info" button (src/pages/Portfolio/portfolioCarousel.js)
// as the active project changes.
import { dataPortfolioItems } from "../../data/dataPortfolioItems.js";
import { checkIcon } from "../../utils/checkIcon.js";
import { createAutoplayController } from "../../utils/autoplayCarousel.js";

const dialog = document.querySelector("#project-detail");
const portfolioCarousel = document.querySelector(".portfolio-carousel");

function extractYouTubeId(url) {
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes("youtu.be")) {
            return parsed.pathname.slice(1) || null;
        }
        if (parsed.searchParams.has("v")) {
            return parsed.searchParams.get("v");
        }
        const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
        return embedMatch ? embedMatch[1] : null;
    } catch {
        return null;
    }
}

async function fetchYouTubeTitle(url) {
    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        );
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return typeof data.title === "string" ? data.title : null;
    } catch {
        return null;
    }
}

if (dialog && portfolioCarousel) {
    const titleEl = dialog.querySelector(".project-detail-title");
    const descriptionEl = dialog.querySelector(".project-detail-description");
    const linksEl = dialog.querySelector(".portfolio-links");
    const closeBtn = dialog.querySelector(".project-detail-close");

    // Image carousel (reuses .portfolio-carousel-stage/.portfolio-carousel-arrow/
    // .portfolio-carousel-images styling from portfolio-page.scss). Autoplays
    // like the main Portfolio carousel (4s advance, pauses on interaction,
    // resumes after 20s), stopped/reset whenever the dialog closes.
    const imageCarouselRoot = dialog.querySelector(".project-detail-carousel");
    const imagesEl = imageCarouselRoot.querySelector(".portfolio-carousel-images");
    const imagePrevBtn = imageCarouselRoot.querySelector(".portfolio-carousel-arrow-prev");
    const imageNextBtn = imageCarouselRoot.querySelector(".portfolio-carousel-arrow-next");
    const imageDotsEl = imageCarouselRoot.querySelector(".project-detail-carousel-dots");

    // Video carousel: one YouTube thumbnail at a time (not pre-rendered
    // side-by-side like the images, to avoid instantiating multiple hidden
    // iframes at once). Manual navigation only, no autoplay.
    const videoCarouselRoot = dialog.querySelector(".project-detail-video-carousel");
    const videoFrameEl = videoCarouselRoot.querySelector(".project-detail-video-frame");
    const videoPrevBtn = videoCarouselRoot.querySelector(".portfolio-carousel-arrow-prev");
    const videoNextBtn = videoCarouselRoot.querySelector(".portfolio-carousel-arrow-next");
    const videoDotsEl = videoCarouselRoot.querySelector(".project-detail-carousel-dots");

    let lastTrigger = null;

    let currentImages = [];
    let activeImageIndex = 0;

    let currentVideos = [];
    let activeVideoIndex = 0;

    function renderDots(dotsEl, count, activeIndex, onSelect) {
        if (count <= 1) {
            dotsEl.innerHTML = "";
            return;
        }
        dotsEl.innerHTML = Array.from(
            { length: count },
            (_, i) =>
                `<button type="button" class="project-detail-carousel-dot${i === activeIndex ? " is-active" : ""}" aria-label="Show item ${i + 1}"></button>`
        ).join("");
        dotsEl.querySelectorAll(".project-detail-carousel-dot").forEach((dot, i) => {
            dot.addEventListener("click", () => onSelect(i));
        });
    }

    function updateImageSlide() {
        imagesEl.querySelectorAll(".portfolio-carousel-image").forEach((img, i) => {
            img.classList.toggle("is-active", i === activeImageIndex);
        });
        renderDots(imageDotsEl, currentImages.length, activeImageIndex, (i) => {
            goToImage(i);
            imageAutoplay.registerInteraction();
        });
    }

    function goToImage(index) {
        const total = currentImages.length;
        activeImageIndex = ((index % total) + total) % total;
        updateImageSlide();
    }

    const imageAutoplay = createAutoplayController(() => goToImage(activeImageIndex + 1));

    function renderVideoSlide() {
        const url = currentVideos[activeVideoIndex];
        const videoId = url ? extractYouTubeId(url) : null;

        if (!videoId) {
            videoFrameEl.innerHTML = "";
            return;
        }

        const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        videoFrameEl.innerHTML = `
            <button type="button" class="project-detail-video-thumb-btn" aria-label="Play video">
                <img src="${thumbUrl}" alt="" class="project-detail-video-thumb-img" />
                <span class="project-detail-video-play-icon"><i class="fas fa-play-circle"></i></span>
            </button>
            <a class="project-detail-video-title" href="${url}" target="_blank" rel="noopener"></a>
        `;

        const titleEl = videoFrameEl.querySelector(".project-detail-video-title");
        fetchYouTubeTitle(url).then((title) => {
            if (title && videoFrameEl.contains(titleEl)) {
                titleEl.textContent = title;
            }
        });

        videoFrameEl
            .querySelector(".project-detail-video-thumb-btn")
            .addEventListener("click", () => {
                const iframe = document.createElement("iframe");
                iframe.className = "project-detail-video-iframe";
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                iframe.title = "";
                iframe.allow =
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                videoFrameEl.querySelector(".project-detail-video-thumb-btn").replaceWith(iframe);
            });

        renderDots(videoDotsEl, currentVideos.length, activeVideoIndex, goToVideo);
    }

    function goToVideo(index) {
        const total = currentVideos.length;
        activeVideoIndex = ((index % total) + total) % total;
        renderVideoSlide();
    }

    imagePrevBtn.addEventListener("click", () => {
        goToImage(activeImageIndex - 1);
        imageAutoplay.registerInteraction();
    });
    imageNextBtn.addEventListener("click", () => {
        goToImage(activeImageIndex + 1);
        imageAutoplay.registerInteraction();
    });
    videoPrevBtn.addEventListener("click", () => goToVideo(activeVideoIndex - 1));
    videoNextBtn.addEventListener("click", () => goToVideo(activeVideoIndex + 1));

    function renderProject(item) {
        titleEl.textContent = item.title;

        currentImages =
            Array.isArray(item.images) && item.images.length > 0
                ? item.images
                : [item.imageLink].filter(Boolean);
        imagesEl.innerHTML = currentImages
            .map(
                (src, i) =>
                    `<img src="./${src}" alt="${item.title} screenshot" class="portfolio-carousel-image${i === 0 ? " is-active" : ""}" />`
            )
            .join("");
        activeImageIndex = 0;
        imagePrevBtn.hidden = currentImages.length <= 1;
        imageNextBtn.hidden = currentImages.length <= 1;
        updateImageSlide();
        imageAutoplay.reset();
        if (currentImages.length > 1) {
            imageAutoplay.start();
        }

        const description =
            typeof item.description === "string" ? item.description.trim() : "";
        descriptionEl.innerHTML = description;
        descriptionEl.hidden = description === "";

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

        currentVideos = Array.isArray(item.videos) ? item.videos : [];
        activeVideoIndex = 0;
        videoCarouselRoot.hidden = currentVideos.length === 0;
        videoPrevBtn.hidden = currentVideos.length <= 1;
        videoNextBtn.hidden = currentVideos.length <= 1;
        if (currentVideos.length > 0) {
            renderVideoSlide();
        } else {
            videoFrameEl.innerHTML = "";
            videoDotsEl.innerHTML = "";
        }
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

    portfolioCarousel.addEventListener("click", (event) => {
        const trigger = event.target.closest(".portfolio-more-info[data-project-id]");
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
        imageAutoplay.reset();

        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    });
}
