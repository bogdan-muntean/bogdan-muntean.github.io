// Performs all the functionality related to the Portfolio page.
import { loadJsonData } from "../../utils/loadJsonData.js";
import { initPortfolioCarousel } from "./portfolioCarousel.js";


// Display all portfolios from dataPortfolioItems.json.
try {
    const dataPortfolioItems = await loadJsonData(
        new URL("../../data/dataPortfolioItems.json", import.meta.url)
    );
    initPortfolioCarousel(dataPortfolioItems);
} catch (error) {
    console.error(error);
}
