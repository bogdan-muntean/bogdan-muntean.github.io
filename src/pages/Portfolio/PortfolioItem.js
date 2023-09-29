//Create portfolio item and return it.
import { checkLink } from "../../utils/checkLink.js"
import { checkIcon } from "../../utils/checkIcon.js"; 

export function PortfolioItem(idArrayItem, title, image, liveLink, repoLink) {
  let portfolioItemHtml = document.createElement("div");
  portfolioItemHtml.setAttribute("class", `portfolio-item item-${idArrayItem}`);

  let liveLinkHtmlTitle = checkLink(liveLink);
  let liveLinkHtmlIcon = checkIcon(liveLink)
  let repoLinkHtmlIcon = checkIcon(repoLink);

  portfolioItemHtml.innerHTML = `
    <div class="portfolio-image" data-more="${idArrayItem}" style="background-image: url(./${image})"></div>
    <div class="portfolio-text-container">
        <div class="portfolio-title">
          <a ${liveLinkHtmlTitle}>
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
                <a ${repoLinkHtmlIcon} target="_blank">
                    Source 
                    <i class="fa-solid fa-display"></i>
                </a>
            </div>
            <div>
                <a ${liveLinkHtmlIcon} target="_blank">
                    Live 
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
  `;
  return portfolioItemHtml;
}