let dataPortfolioItems = [
    {
        title: "Hangman Game",
        imageLink: "images/hangman-game.PNG",
        liveLink: "https://bogdan-muntean.github.io/Project_Hangman/",
        repoLink: "https://github.com/bogdan-muntean/Project_Hangman",
    },
]

function addPortfolioItems(container, arrayList){
    //create item's components
    let portfolioItemHtml = document.createElement('div')
    let imageAnchor = document.createElement('a')
    let imageHtml = document.createElement('img')
    let portfolioTextContainer = document.createElement('div')
    let portfolioLinks = document.createElement('div')

    //add classes's components
    //principal item
    portfolioItemHtml.classList.add('portfolio-item')
    //image
    imageAnchor.classList.add('portfolio-image')
    imageAnchor.setAttribute('href', arrayList.liveLink)
    imageHtml.setAttribute('src', arrayList.imageLink)
    //text container
    portfolioTextContainer.classList.add('portfolio-text')
    portfolioTextContainer.innerHTML = `
    <h4>
        <a href="${arrayList.liveLink}">
            ${arrayList.title}
        </a>
    </h4>`;
    portfolioLinks.classList.add('portfolio-links')
    portfolioLinks.innerHtml = `
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
    `


    //append childs to parents containers
    portfolioTextContainer.appendChild(portfolioLinks)
    imageAnchor.appendChild(imageHtml)
    container.appendChild(portfolioItemHtml)
}


let portfolioListHtml = document.querySelector(".portfolio-list");
