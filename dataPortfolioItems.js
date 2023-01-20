let dataPortfolioItems = [
    {
        title: "Link In Bio",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor illo doloribus.",
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
]



let portfolioListHtml = document.querySelector(".portfolio-list");

function addPortfolioItems(container, arrayList){
    //  -----   create item's components
    let portfolioItemHtml = document.createElement('div')

    let imageContainer = document.createElement('div')
    let imageAnchor = document.createElement('a')
    let imageHtml = document.createElement('img')

    let portfolioTitleContainer = document.createElement('div')
    let portfolioDescriptionContainer = document.createElement('div')
    let portfolioLinks = document.createElement('div')
    let portfolioTextContainer = document.createElement('div')

    //  -----   add classes's components
    //principal item
    portfolioItemHtml.classList.add('portfolio-item')
    //image
    imageContainer.classList.add('portfolio-image')
    imageAnchor.setAttribute('href', arrayList.liveLink)
    imageHtml.setAttribute('src', arrayList.imageLink)
    //text container
    portfolioTitleContainer.classList.add('portfolio-title')
    portfolioDescriptionContainer.classList.add('portfolio-description')
    portfolioLinks.classList.add('portfolio-links')
    portfolioTextContainer.classList.add('portfolio-text-container')
    
    //  -----   add content
    portfolioTitleContainer.innerHTML = `
    <h4>
        <a href="${arrayList.liveLink}">
            ${arrayList.title}
        </a>
    </h4>`;
    portfolioDescriptionContainer.innerHTML = `<p>${arrayList.description}</p>`;
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

    //   ----   append childs to parents containers
    imageContainer.appendChild(imageAnchor)
    imageAnchor.appendChild(imageHtml)

    portfolioItemHtml.appendChild(imageContainer)
    portfolioTextContainer.appendChild(portfolioTitleContainer)
    portfolioTextContainer.appendChild(portfolioDescriptionContainer)
    portfolioTextContainer.appendChild(portfolioLinks)
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