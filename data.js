// const { createElement } = require("react");

function addItemsToTimeline(container, dataArray){
    //create html
    let timelineItem = createElement('div');
    let iconItem = createElement('div');
    let timeData = createElement('p');
    let titleHtml = createElement('h5');
    let textHtml = createElement('p');

    //add class
    timelineItem.classList.add('timeline-item');
    iconItem.classList.add('tl-icon');
    timeData.classList.add('tl-duration');
    textHtml.classList.add('item-text');

    //add content
    iconItem.innerHTML = dataArray.icon;
    timeData.textContent = dataArray.timeData;
    titleHtml.innerHTML = dataArray.title;
    textHtml.textContent = dataArray.text;

    //add all content to child item
    timelineItem.appendChild(iconItem)
    timelineItem.appendChild(timeData)
    timelineItem.appendChild(titleHtml)
    timelineItem.appendChild(textHtml)
    //add child item to container
    container.appendChild(timelineItem);
}

let academicDataList = [
    {
        title: `CERTIFIED IN COMPUTER SCIENCE <span> - "Lucian Blaga" High School – Cluj-Napoca</span>`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `CERTIFIED IN COMPUTER SCIENCE <span> - "Lucian Blaga" High School – Cluj-Napoca</span>`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `CERTIFIED IN COMPUTER SCIENCE <span> - "Lucian Blaga" High School – Cluj-Napoca</span>`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `CERTIFIED IN COMPUTER SCIENCE <span> - "Lucian Blaga" High School – Cluj-Napoca</span>`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `CERTIFIED IN COMPUTER SCIENCE <span> - "Lucian Blaga" High School – Cluj-Napoca</span>`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
];

let academicContainer = document.querySelector(".academic");

// for( let i = 0; i < academicDataList.length; i++){
//     console.log('s a executat')
//     addItemsToTimeline(academicContainer, academicDataList[i])
// }
academicDataList.forEach( (element) => {
    console.log('s a executat');
    addItemsToTimeline(academicContainer, element);
} )

