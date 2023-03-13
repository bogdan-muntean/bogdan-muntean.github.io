let dataPortfolioItems = [
  {
    title: "YourSpecialist",
    description: "Medical Locator site project. I used React, Vite, React Router, HTML, SCSS, JS, local data base.",
    imageLink: "images/your-specialist-img.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/YourSpecialist-React-Vite/tree/main/project%2Bvite",
  },
  {
    title: "Task Tracker",
    description: "Task tracker project made with React, JavaScript, React Router, React State HTML, SCSS",
    imageLink: "images/task-tracker-img.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/task-tracker-react",
  },
  {
    title: "Link In Bio",
    description: "An link-in-bio page created with HTML, SCSS, media queries.",
    imageLink: "images/linkin-bio.PNG",
    liveLink: "https://bogdan-muntean.github.io/LinkInBio/",
    repoLink: "https://github.com/bogdan-muntean/LinkInBio",
  },
  {
    title: "Todo List",
    description: "Todo List project created with react, api, local data base server.",
    imageLink: "images/todo-list.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week15_homework-todo-react/todo-app",
  },
  {
    title: "Game Monsters Project",
    description: "Game created with JS objects, classes, JavaScript, HTML, CSS.",
    imageLink: "images/game-monsters-project.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/Week13_homework/week13-project-vite",
  },
  {
    title: "BMI Calculator",
    description: "Game Project made with JavaScript, HTML, CSS.",
    imageLink: "images/bmi.PNG",
    liveLink: "https://bogdan-muntean.github.io/BMI-Calculator-Project/",
    repoLink: "https://github.com/bogdan-muntean/BMI-Calculator-Project",
  },
  {
    title: "Rock-Paper-Scissors Game",
    description: "Game Project made with JavaScript, HTML, CSS.",
    imageLink: "images/r-p-s-game.PNG",
    liveLink: "https://bogdan-muntean.github.io/Rock-Paper-Scissors_Game/",
    repoLink: "https://github.com/bogdan-muntean/Rock-Paper-Scissors_Game",
  },
  {
    title: "Hangman Game",
    description: "Game Project made with JavaScript, HTML, CSS.",
    imageLink: "images/hangman-game.PNG",
    liveLink: "https://bogdan-muntean.github.io/Project_Hangman/",
    repoLink: "https://github.com/bogdan-muntean/Project_Hangman",
  },
  {
    title: "Clock Project",
    description: "Project made with JavaScript, HTML, CSS, asynchronous function.",
    imageLink: "images/clock-project.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week07_homework",
  },
  {
    title: "Form project with fetch API",
    description: "Project with a form that fetch images. HTML, CSS, JavaScript.",
    imageLink: "images/fetch-api.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week08_optional-homework-more-API",
  },
  {
    title: "Spaceship Project",
    description: "For this project I used JavaScript Objects, Classes and Vite",
    imageLink: "images/spaceship-project.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week13_optional-homework/week10-vite",
  },
  {
    title: "Shop Site",
    description: "Shop Site created with HTML and CSS.",
    imageLink: "images/shop-site-siit-img.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week3_optional-homework-shop",
  },
  {
    title: "Working with BOM,Cookies Project",
    description: "Small Project where I worked on cookies.",
    imageLink: "images/cookies-project.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week12_BOM-homework-cookies",
  },
  {
    title: "Working with BOM",
    description: "Small Project where I worked on Browser Object Model.",
    imageLink: "images/bom-project.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week12_BOM-homework",
  },
  {
    title: "Blog Project",
    description: "An blog created with HTML and CSS.",
    imageLink: "images/blog-siit-img.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week3_optional-layouting-homework",
  },
  {
    title: "Workshop site - SIIT",
    description: "Workshop created within the IT informal school courses. I used HTML and CSS.",
    imageLink: "images/workshop-siit-img.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week02_homework",
  },
];

let portfolioListHtml = document.querySelector(".portfolio-list");

function addPortfolioItems(container, arrayList, idArrayItem) {
  let portfolioItemHtml = document.createElement("div");
  portfolioItemHtml.setAttribute('class', `portfolio-item item-${idArrayItem}`)

  portfolioItemHtml.innerHTML = `
    <div class="portfolio-image" style="background-image: url(${arrayList.imageLink})"></div>
    <div class="portfolio-text-container">
        <div class="portfolio-title">
          <a ${checkLink(arrayList.liveLink)}>
            <h4>
              ${arrayList.title}
            </h4>
          </a>
        </div>
        <div class="portfolio-description">
            <div class="portfolio-description-text">${arrayList.description}</div>
            <div class="read-more-container">
              <label class="more">
                <input type='checkbox' onclick="onClickMore(this)" data-more="${idArrayItem}" hidden/>
                <span>Read More</span>
              </label>
            </div>  
        </div>
        <div class="portfolio-links">
            <div>
                <a ${checkIcon(arrayList.repoLink)} target="_blank">
                    Source 
                    <i class="fa-solid fa-display"></i>
                </a>
            </div>
            <div>
                <a ${checkIcon(arrayList.liveLink)} target="_blank">
                    Live 
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
`;

  container.appendChild(portfolioItemHtml);
}



dataPortfolioItems.forEach((element, index) => {
    addPortfolioItems(portfolioListHtml, element, index);
    console.log("portfolio item created");
});


function onClickMore(element) {
  const datasetValueId = element.dataset.more; 
  const parentPortfolioItem = document.querySelector(`.item-${datasetValueId}`);
  parentPortfolioItem.classList.toggle("more-active", element.checked)
  console.log(element);
  console.log(datasetValueId)
  console.log(parentPortfolioItem);

  const readMoreContainer = document.querySelectorAll(".read-more-container");
  const elementSiblingSpan = element.nextElementSibling;
  console.log(elementSiblingSpan);
  if(element.checked){
    elementSiblingSpan.innerHTML = "Read Less";
  } else {
    elementSiblingSpan.innerHTML = "Read More";
  }
}

function checkLink(dataBaseLink) {
  if(dataBaseLink == ""){
    return `class="disable-title"`;
  } else {
    return `class="active-title" href="${dataBaseLink}"`;
  }
}

function checkIcon(iconLink){
  if(iconLink == ""){
    return `class="disable-icon"`;
  } else {
    return `class="active-icon" href="${iconLink}"`;
  }
}



// ---------------------
// const portfolios = document.getElementsByClassName("portfolioDescriptionContainer");

// for (let i = 0; i < portfolios.length; i++) {   
  //     const el = portfolios[i];
  //     if (isOverflown(el)) {
    //     }
  // }
    

  // function isOverflown(element) {
  //   return (
  //     element.scrollHeight > element.clientHeight ||
  //     element.scrollWidth > element.clientWidth
  //   );
  // }

    //ES6 version
    // const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    //     return scrollHeight > clientHeight || scrollWidth > clientWidth;
    // }