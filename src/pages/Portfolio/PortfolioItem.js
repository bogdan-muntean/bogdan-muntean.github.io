import { checkLink } from "../../utils/checkLink.js"
import { checkIcon } from "../../utils/checkIcon.js"; 

//Create portfolio item
export function PortfolioItem(idArrayItem, title, image, liveLink, repoLink) {
  let portfolioItemHtml = document.createElement("div");
  portfolioItemHtml.setAttribute("class", `portfolio-item item-${idArrayItem}`);
  let liveLinkHtml = checkLink(liveLink);
  let repoLinkHtml = checkIcon(repoLink);
  portfolioItemHtml.innerHTML = `
    <div class="portfolio-image" style="background-image: url(./../${image})"></div>
    <div class="portfolio-text-container">
        <div class="portfolio-title">
          <a ${liveLinkHtml}>
            <h4>
              ${title}
            </h4>
          </a>
        </div>
        <div class="portfolio-description">
            <div class="read-more-container more" data-more="${idArrayItem}">
              See More
            </div>
        </div>
        <div class="portfolio-links">
            <div>
                <a ${repoLinkHtml} target="_blank">
                    Source 
                    <i class="fa-solid fa-display"></i>
                </a>
            </div>
            <div>
                <a ${liveLinkHtml} target="_blank">
                    Live 
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
  `;
  return portfolioItemHtml;
}