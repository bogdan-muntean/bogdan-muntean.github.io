// Performs all the functionality related to the Portfolio page.
import { dataPortfolioItems } from "../../data/dataPortfolioItems.js";
import { addPortfolioItems } from "./addPortfolioItems.js";


// Display all portfolios from dataPortfolioItems.
addPortfolioItems(".portfolio-list", dataPortfolioItems);
