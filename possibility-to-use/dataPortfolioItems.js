function addPortfolioItems(container, arrayList) {
    //  -----   create item's components
    let portfolioItemHtml = document.createElement("div");
  
  //   let imageContainer = document.createElement("div");
  //   let imageAnchor = document.createElement("a");
  //   let imageHtml = document.createElement("img");
  
  //   let portfolioTitleContainer = document.createElement("div");
  //   let portfolioDescriptionContainer = document.createElement("div");
  //   let portfolioLinks = document.createElement("div");
    // *container-ul care primeste tot continutul inafara de imagine
    // let portfolioTextContainer = document.createElement('div')
  
    //  -----   add classes's components
    //principal item
    // portfolioItemHtml.classList.add('portfolio-item')
    // //image
    // imageContainer.classList.add('portfolio-image')
    // imageAnchor.setAttribute('href', arrayList.liveLink)
    // imageHtml.setAttribute('src', arrayList.imageLink)
    // //text container
    // portfolioTitleContainer.classList.add('portfolio-title')
    // portfolioDescriptionContainer.classList.add('portfolio-description')
    // portfolioLinks.classList.add('portfolio-links')
    // portfolioTextContainer.classList.add('portfolio-text-container')
  
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
                      <button class="readmore-btn">Read more</button>
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
      </div>
  `;
  
    //  -----   add content
    // portfolioTitleContainer.innerHTML = `
    // <h4>
    //     <a href="${arrayList.liveLink}">
    //         ${arrayList.title}
    //     </a>
    // </h4>`;
    // portfolioDescriptionContainer.innerHTML = `
    // <p>${arrayList.description}
    //     <button class="readmore-btn">Read more</button>
    //     <button class="readmore-btn">Read more</button>
    // </p>`;
    // portfolioLinks.innerHTML = `
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
  
    //   ----   append childs to parents containers
    // imageContainer.appendChild(imageAnchor)
    // imageAnchor.appendChild(imageHtml)
  
    // portfolioItemHtml.appendChild(imageContainer)
    // portfolioTextContainer.appendChild(portfolioTitleContainer)
    // portfolioTextContainer.appendChild(portfolioDescriptionContainer)
    // portfolioTextContainer.appendChild(portfolioLinks)
    // portfolioItemHtml.appendChild(portfolioTextContainer)
  
    container.appendChild(portfolioItemHtml);
  }


  //Read more / less 

// const allMoreButton = document.querySelectorAll('.more');
// allMoreButton.forEach((moreBtn) => {
//   moreBtn.addEventListener('click', () => {
//     console.log(this.querySelector('input').checked);
//     // if(this.checked)
//     // this.dataset.more-btn-id
//   })
// })

// -------
// 1.Sa selectez .more
// 2.if(daca nu este checked - apare read more, altfel read less)
// 3.addEventListener (daca este modificat .more, sa schimb)

// function ifMoreIsChecked (elementCheck){
//   if(elementCheck === true){
//     return "Read Less";
//   } else {
//     return "Read More";
//   }
// }