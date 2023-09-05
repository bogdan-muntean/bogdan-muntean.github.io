// import { dataPortfolioItems } from "../../data/dataPortfolioItems";

// let readMoreBtn = document.querySelectorAll(".more");
// readMoreBtn.forEach((button, index) => {
//   button.addEventListener("click", () => {
//     // Hide Portfolio page
//     document.querySelector(".active").classList.remove("active");
    
//     // Display current project's details.
//     document.querySelector("#project").classList.add("active");
//     const projectContainerHtml = document.getElementById("project");
//     projectContainerHtml.innerHTML =
//     `
//     <div class="project-title main-title" id="project-title">
//         <h2>
//           ${dataPortfolioItems[index].title}
//         </h2>
//     </div>
//     <div class="project-description-container">
//         <div class="project-description text-about" id="project-description">
//           <div class="project-back">
//             Back to projects
//           </div>
//             ${dataPortfolioItems[index].description}
//         </div>
//         <div class="project-photo" id="project-photo">
//           ${dataPortfolioItems[index].photo}
//         </div>
//         <div class="project-video" id="project-video">
//           ${dataPortfolioItems[index].video}
//         </div>
//     </div>
//     `;
//     const backButtonHtml = document.querySelector(".project-back");
//     console.log(backButtonHtml)
//     backButtonHtml.addEventListener("click", () => {
//       document.querySelector(".active").classList.remove("active");
//       document.querySelector("#portfolio").classList.add("active");
//     })
//   });
// });