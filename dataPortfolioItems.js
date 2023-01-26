let dataPortfolioItems = [
  {
    title: "Link In Bio",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor illo doloribus.",
    imageLink: "images/linkin-bio.PNG",
    liveLink: "https://bogdan-muntean.github.io/LinkInBio/",
    repoLink: "https://github.com/bogdan-muntean/LinkInBio",
  },
  {
    title: "BMI Calculator",
    description: "Some description",
    imageLink: "images/bmi.PNG",
    liveLink: "https://bogdan-muntean.github.io/BMI-Calculator-Project/",
    repoLink: "https://github.com/bogdan-muntean/BMI-Calculator-Project",
  },
  {
    title: "Rock-Paper-Scissors Game",
    description: "Some description",
    imageLink: "images/r-p-s-game.PNG",
    liveLink: "https://bogdan-muntean.github.io/Rock-Paper-Scissors_Game/",
    repoLink: "https://github.com/bogdan-muntean/Rock-Paper-Scissors_Game",
  },
  {
    title: "Hangman Game",
    description: "Some description",
    imageLink: "images/hangman-game.PNG",
    liveLink: "https://bogdan-muntean.github.io/Project_Hangman/",
    repoLink: "https://github.com/bogdan-muntean/Project_Hangman",
  },
];

let portfolioListHtml = document.querySelector(".portfolio-list");

function addPortfolioItems(container, arrayList) {
  let portfolioItemHtml = document.createElement("div");

  portfolioItemHtml.innerHTML = `
    <div class="portfolio-item">
        <div class="portfolio-image">
            <a href=${arrayList.liveLink} target="_blank">
                <img src=${arrayList.imageLink} alt="">
            </a>
        </div>
        <div class="portfolio-text-container">
            <div class="portfolio-title">
                <h4>
                    <a href="${arrayList.liveLink}">
                        ${arrayList.title}
                    </a>
                </h4>
            </div>
            <div class="portfolio-description">
                <p>
                    ${arrayList.description} 
                    <button class="readmore-btn">Read more</button>
                    <button class="readless-btn">Read less</button>
                </p>
            </div>
            <div class="portfolio-links">
                <div>
                    <a href="${arrayList.repoLink}" target="_blank">
                        Source 
                        <i class="fa-solid fa-display"></i>
                    </a>
                </div>

                <div>
                    <a href="${arrayList.liveLink}" target="_blank">
                        Live 
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
`;

  container.appendChild(portfolioItemHtml);
}

dataPortfolioItems.forEach((element) => {
    addPortfolioItems(portfolioListHtml, element);
    console.log("portfolio item created");
});

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

//ES6 version
// const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
//     return scrollHeight > clientHeight || scrollWidth > clientWidth;
// }

const portfolios = document.getElementsByClassName("portfolioDescriptionContainer");

for (let i = 0; i < portfolios.length; i++) {   
    const el = portfolios[i];
    if (isOverflown(el)) {
    }
}

// let portfolioLinkValue = `
//     <div>
//         <a href="${arrayList.repoLink}" target="_blank">
//             Source
//             <i class="fa-solid fa-display"></i>
//         </a>
//     </div>
//     <div>
//         <a href="${arrayList.liveLink}" target="_blank">
//             Live
//             <i class="fab fa-github"></i>
//         </a>
//     </div>
//     `;
//     portfolioLinks.innerHtml = portfolioLinkValue;
// portfolioLinks.innerHtml = `
// <div>
//     <a href="${arrayList.repoLink}" target="_blank">
//         Source
//         <i class="fa-solid fa-display"></i>
//     </a>
// </div>

// <div>
//     <a href="${arrayList.liveLink}" target="_blank">
//         Live
//         <i class="fab fa-github"></i>
//     </a>
// </div>
// `;
