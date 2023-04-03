let dataPortfolioItems = [
  {
    title: "YourSpecialist",
    description:
      "Medical Locator site project. I used React, Vite, React Router, HTML, SCSS, JS, local data base.",
    imageLink: "images/your-specialist-img.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/YourSpecialist-React-Vite/tree/main/project%2Bvite",
    photo: " ",
    video: " ",
  },
  {
    title: "Task Tracker",
    description:
      "Task tracker project made with React, JavaScript, React Router, React State HTML, SCSS",
    imageLink: "images/task-tracker-img.PNG",
    liveLink: "",
    repoLink: "https://github.com/bogdan-muntean/task-tracker-react",
    photo: " ",
    video: " ",
  },
  {
    title: "Link In Bio",
    description: "An link-in-bio page created with HTML, SCSS, media queries.",
    imageLink: "images/linkin-bio.PNG",
    liveLink: "https://bogdan-muntean.github.io/LinkInBio/",
    repoLink: "https://github.com/bogdan-muntean/LinkInBio",
    photo: " ",
    video: " ",
  },
  {
    title: "Todo List",
    description:
      "Todo List project created with react, api, local data base server.",
    imageLink: "images/todo-list.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week15_homework-todo-react/todo-app",
    photo: " ",
    video: " ",
  },
  {
    title: "Game Monsters Project",
    description:
      "Game created with JS objects, classes, JavaScript, HTML, CSS.",
    imageLink: "images/game-monsters-project.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/Week13_homework/week13-project-vite",
    photo: " ",
    video: " ",
  },
  {
    title: "BMI Calculator",
    description: "Game Project made with JavaScript, HTML, CSS.",
    imageLink: "images/bmi.PNG",
    liveLink: "https://bogdan-muntean.github.io/BMI-Calculator-Project/",
    repoLink: "https://github.com/bogdan-muntean/BMI-Calculator-Project",
    photo: " ",
    video: " ",
  },
  {
    title: "Rock-Paper-Scissors Game",
    description: "Game Project made with JavaScript, HTML, CSS.",
    imageLink: "images/r-p-s-game.PNG",
    liveLink: "https://bogdan-muntean.github.io/Rock-Paper-Scissors_Game/",
    repoLink: "https://github.com/bogdan-muntean/Rock-Paper-Scissors_Game",
    photo: " ",
    video: " ",
  },
  {
    title: "Hangman Game",
    description: "Game Project made with JavaScript, HTML, CSS.",
    imageLink: "images/hangman-game.PNG",
    liveLink: "https://bogdan-muntean.github.io/Project_Hangman/",
    repoLink: "https://github.com/bogdan-muntean/Project_Hangman",
    photo: " ",
    video: " ",
  },
  {
    title: "Clock Project",
    description:
      "Project made with JavaScript, HTML, CSS, asynchronous function.",
    imageLink: "images/clock-project.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week07_homework",
    photo: " ",
    video: " ",
  },
  {
    title: "Form project with fetch API",
    description:
      "Project with a form that fetch images. HTML, CSS, JavaScript.",
    imageLink: "images/fetch-api.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week08_optional-homework-more-API",
    photo: " ",
    video: " ",
  },
  {
    title: "Spaceship Project",
    description: "For this project I used JavaScript Objects, Classes and Vite",
    imageLink: "images/spaceship-project.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week13_optional-homework/week10-vite",
    photo: " ",
    video: " ",
  },
  {
    title: "Shop Site",
    description: "Shop Site created with HTML and CSS.",
    imageLink: "images/shop-site-siit-img.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week3_optional-homework-shop",
    photo: " ",
    video: " ",
  },
  {
    title: "Working with BOM,Cookies Project",
    description: "Small Project where I worked on cookies.",
    imageLink: "images/cookies-project.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week12_BOM-homework-cookies",
    photo: " ",
    video: " ",
  },
  {
    title: "Working with BOM",
    description: "Small Project where I worked on Browser Object Model.",
    imageLink: "images/bom-project.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week12_BOM-homework",
    photo: " ",
    video: " ",
  },
  {
    title: "Blog Project",
    description: "An blog created with HTML and CSS.",
    imageLink: "images/blog-siit-img.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week3_optional-layouting-homework",
    photo: " ",
    video: " ",
  },
  {
    title: "Workshop site - SIIT",
    description:
      "Workshop created within the IT informal school courses. I used HTML and CSS.",
    imageLink: "images/workshop-siit-img.PNG",
    liveLink: "",
    repoLink:
      "https://github.com/bogdan-muntean/Projects-SIIT_Bogdan_Muntean/tree/main/week02_homework",
    photo: " ",
    video: " ",
  },
];

let portfolioListHtml = document.querySelector(".portfolio-list");

function addPortfolioItems(container, arrayList, idArrayItem) {
  let portfolioItemHtml = document.createElement("div");
  portfolioItemHtml.setAttribute("class", `portfolio-item item-${idArrayItem}`);
  portfolioItemHtml.innerHTML = `
    <div class="portfolio-image" style="background-image: url(${
      arrayList.imageLink
    })"></div>
    <div class="portfolio-text-container">
        <div class="portfolio-title">
          <a ${checkLink(arrayList.liveLink)}>
            <h4>
              ${arrayList.title}
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

function backToPortfolios(){
  
}

let readMoreBtn = document.querySelectorAll(".more");
readMoreBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    document.querySelector("#project").classList.add("active");
    const projectContainerHtml = document.getElementById("project");
    projectContainerHtml.innerHTML =
    `
    <div class="project-title main-title" id="project-title">
        <h2>
          ${dataPortfolioItems[index].title}
        </h2>
    </div>
    <div class="project-description-container">
        <div class="project-description text-about" id="project-description">
          <div class="project-back">
            Back to projects
          </div>
          <p>
            ${dataPortfolioItems[index].description}
          </p>
        </div>
        <div class="project-photo" id="project-photo">
          ${dataPortfolioItems[index].photo}
        </div>
        <div class="project-video" id="project-video">
          ${dataPortfolioItems[index].video}
        </div>
    </div>
    `;
    const backButtonHtml = document.querySelector(".project-back");
    console.log(backButtonHtml)
    backButtonHtml.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active");
      document.querySelector("#portfolio").classList.add("active");
    })
  });
});

//   ------------------------------
//functii pentru stilizare
function checkLink(dataBaseLink) {
  if (dataBaseLink == "") {
    return `class="disable-title"`;
  } else {
    return `class="active-title" href="${dataBaseLink}"`;
  }
}
function checkIcon(iconLink) {
  if (iconLink == "") {
    return `class="disable-icon"`;
  } else {
    return `class="active-icon" href="${iconLink}"`;
  }
}

export default dataPortfolioItems;


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
