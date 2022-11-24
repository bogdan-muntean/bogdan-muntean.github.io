let dataPortfolioItems = [
    {
        title: "Link In Bio",
        imageLink: "images/linkin-bio.PNG",
        liveLink: "https://bogdan-muntean.github.io/LinkInBio/",
        repoLink: "https://github.com/bogdan-muntean/LinkInBio",
    },
    {
        title: "BMI Calculator",
        imageLink: "images/bmi.PNG",
        liveLink: "https://bogdan-muntean.github.io/BMI-Calculator-Project/",
        repoLink: "https://github.com/bogdan-muntean/BMI-Calculator-Project",
    },
    {
        title: "Rock-Paper-Scissors Game",
        imageLink: "images/r-p-s-game.PNG",
        liveLink: "https://bogdan-muntean.github.io/Rock-Paper-Scissors_Game/",
        repoLink: "https://github.com/bogdan-muntean/Rock-Paper-Scissors_Game",
    },
    {
        title: "Hangman Game",
        imageLink: "images/hangman-game.PNG",
        liveLink: "https://bogdan-muntean.github.io/Project_Hangman/",
        repoLink: "https://github.com/bogdan-muntean/Project_Hangman",
    },
]

let portfolioListHtml = document.querySelector(".portfolio-list");

function addPortfolioItems(container, arrayList){
    //create item's components
    let portfolioItemHtml = document.createElement('div')

    let imageContainer = document.createElement('div')
    let imageAnchor = document.createElement('a')
    let imageHtml = document.createElement('img')

    let portfolioTextContainer = document.createElement('div')
    let portfolioLinks = document.createElement('div')

    //add classes's components
    //principal item
    portfolioItemHtml.classList.add('portfolio-item')
    //image
    imageContainer.classList.add('portfolio-image')
    imageAnchor.setAttribute('href', arrayList.liveLink)
    imageHtml.setAttribute('src', arrayList.imageLink)
    //text container
    portfolioTextContainer.classList.add('portfolio-text')
    portfolioLinks.classList.add('portfolio-links')
    
    //add content
    portfolioTextContainer.innerHTML = `
    <h4>
        <a href="${arrayList.liveLink}">
            ${arrayList.title}
        </a>
    </h4>`;
    portfolioLinks.innerHTML = `
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
    `;

    //append childs to parents containers
    imageContainer.appendChild(imageAnchor)
    imageAnchor.appendChild(imageHtml)
    portfolioTextContainer.appendChild(portfolioLinks)

    portfolioItemHtml.appendChild(imageContainer)
    portfolioItemHtml.appendChild(portfolioTextContainer)
    container.appendChild(portfolioItemHtml)
}


dataPortfolioItems.forEach( (element) => {
    console.log("portfolio item created")
    addPortfolioItems(portfolioListHtml, element)
})


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