// Create all portfolios from input "dataBase" and adds them to the HTML element "containerHtml".
import { PortfolioItem } from "./PortfolioItem.js";

export function addPortfolioItems(containerHtml, dataBase) {
  let portfolioListHtml = document.querySelector(`${containerHtml}`);

  dataBase.forEach((element, index) => {
    let portfolioItemHtml = PortfolioItem(index, element.title, element.imageLink, element.liveLink, element.repoLink);
    portfolioListHtml.appendChild(portfolioItemHtml);
  });
}



