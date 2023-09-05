import { checkLink } from "../../utils/checkLink"
import { checkIcon } from "../../utils/checkIcon"; 

//Create portfolio item
export function PortfolioItem(idArrayItem, title, image, liveLink, repoLink) {
  let portfolioItemHtml = document.createElement("div");
  portfolioItemHtml.setAttribute("class", `portfolio-item item-${idArrayItem}`);
  let liveLinkHtml = checkLink(liveLink);
  let repoLinkHtml = checkIcon(repoLink);
  portfolioItemHtml.innerHTML = `
    <div class="portfolio-image" style="background-image: url(${image})"></div>
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



//-------------------
{/* <div class="portfolio-description">
<div class="portfolio-description-text">
  ${arrayList.description}
</div>
<div class="read-more-container more" data-more="${idArrayItem}">
  See More
</div>
</div> */}

//Code to check
//   ------------------------------
// readMoreBtn.forEach((button, index) => {
//   button.addEventListener("click", function() {
//     let contentProject = button.dataset.more;
//     console.log(button.dataset.more)
//     document.querySelector('.active').classList.remove("active");
//     document.getElementById('project').classList.add('active')
//     // OpenProject(dataPortfolioItems.index)

//     let titleProjectHtml = document.getElementById('project-title');
//     let descriptionProjectHtml = document.getElementById('project-description');
//     let mediaProjectHtml = document.getElementById('project-media');

//     titleProjectHtml.innerHTML = `${dataPortfolioItems[index][title]}`;
//     descriptionProjectHtml.innerHTML = `${dataPortfolioItems.index.description}`;
//     mediaProjectHtml.innerHTML = `${dataPortfolioItems.index.media}`;
//   })
// })

// function OpenProject(projectContent){
//   let titleProjectHtml = document.getElementById('#project-title');
//   let descriptionProjectHtml = document.getElementById('#project-description');
//   let mediaProjectHtml = document.getElementById('#project-media');

//   titleProjectHtml.innerHTML = `${projectContent.title}`;
//   descriptionProjectHtml.innerHTML = `${projectContent.description}`;
//   mediaProjectHtml.innerHTML = `${projectContent.media}`;
// }
