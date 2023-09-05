import { PortfolioItem } from "./PortfolioItem.js";

// Display all portfolios from data base.
export function addPortfolioItems(containerHtml, dataBase) {
  let portfolioListHtml = document.querySelector(`${containerHtml}`);

  dataBase.forEach((element, index) => {
    let portfolioItemHtml = PortfolioItem(index, element.title, element.imageLink, element.liveLink, element.repoLink);
    // Add portfolio item to the portfolio items list.
    portfolioListHtml.appendChild(portfolioItemHtml);
  });
}



