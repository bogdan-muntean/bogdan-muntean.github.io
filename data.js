// const { createElement } = require("react");
//de adaugat la fiecare study cu diploma, icon cu pal de fin fact. background col yellow
function addItemsToTimeline(container, dataArray){
    //create html
    let timelineItem = document.createElement('div');
    let iconItem = document.createElement('div');
    let timeData = document.createElement('p');
    let titleHtml = document.createElement('h5');
    let textHtml = document.createElement('p');

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
        title: `Responsive Web Design Certification <span> - freeCodeCamp</span>`,
        timeData: "2021",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `FRONT-END WEB DEVELOPMENT <span> - Informal School of IT, Cluj-Napoca</span>`,
        timeData: "01/2022 – 05/2022",
        text: "I learned from the front end development course advanced notions of HTML, CSS, JavaScript and about frameworks like React and Tailwind. As well as about Git, Github, SPA and Responsive Websites.",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `Psychopedagogical Training Courses <span> - "Babeș-Bolyai" University, Cluj-Napoca</span>`,
        timeData: "2020-2021",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `Faculty of Medicine - BalneoPhysiokinetotherapy and Medical Recovery Specialist <span> - "Iuliu Haţieganu" University of Medicine and Pharmacy, Cluj-Napoca</span>`,
        timeData: "2017-2020",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `CERTIFIED IN COMPUTER SCIENCE <span> - "Lucian Blaga" High School, Cluj-Napoca</span>`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `High School - Section of Mathematics-Informatics Intensive Informatics <span> - "Lucian Blaga" High School, Cluj-Napoca</span>`,
        timeData: "2013-2017",
        text: "Experienced with C++, C, developed algorithms and problem-solving skills. Certificate of digital skills and professional skills in computer science.",
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

