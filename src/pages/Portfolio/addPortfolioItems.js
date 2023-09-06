// Create all portfolios from input "dataBase" and adds them to the HTML element "containerHtml".
import { PortfolioItem } from "./PortfolioItem.js";

export function addPortfolioItems(containerHtmlSelector, dataBase) {
  let containerHtml = document.querySelector(`${containerHtmlSelector}`);

  dataBase.forEach((element, index) => {
    let portfolioItemHtml = PortfolioItem(index, element.title, element.imageLink, element.liveLink, element.repoLink);
    containerHtml.appendChild(portfolioItemHtml);
  });
}



