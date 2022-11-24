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
    if(dataArray.icon === `<i class="fa-solid fa-graduation-cap"></i>`){
        iconItem.style.backgroundColor = "#c6c614";
    }

    timeData.textContent = dataArray.timeData;
    titleHtml.innerHTML = `
    ${dataArray.title} <br>
    <span>${dataArray.span}</span>`;
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
        title: `JavaScript Algorithms and Data Structures Masterclass `,
        span: "Udemy (Colt Steele)",
        timeData: "11/2022 - Current",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `JavaScript Algorithms and Data Structures Challenges`,
        span: "Edabit",
        timeData: "09/2022 - Current",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `FRONT-END WEB DEVELOPMENT`,
        span: "Informal School of IT, Cluj-Napoca",
        timeData: "01/2022 – 05/2022",
        text: "I learned from the front end development course advanced notions of HTML, CSS, JavaScript and about frameworks like React and Tailwind. As well as about Git, Github, SPA and Responsive Websites.",
        icon: `<i class="fa-solid fa-graduation-cap"></i>`,
    },
    {
        title: `Responsive Web Design Certification`,
        span: "freeCodeCamp",
        timeData: "11/2021",
        text: "",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `Front-end Foundations`,
        span: "The Odin Project",
        timeData: "07/2021",
        text: "I learned HTML, CSS, JavaScript, Command Line Basics, GitHub, GIT.",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `Introduction to Computer Science`,
        span: "HarvardX CS50 (2020)",
        timeData: "06/2021",
        text: "I learned C, HTML and CSS, the basics of machine learning, algorithms and structured data.",
        icon: `<i class="fa-solid fa-display"></i>`,
    },
    {
        title: `Psychopedagogical Training Courses`,
        span: `"Babeș-Bolyai" University, Cluj-Napoca`,
        timeData: "2020-2021",
        text: "",
        icon: `<i class="fa-solid fa-graduation-cap"></i>`,
    },
    {
        title: `Faculty of Medicine - Balneo-Physio-Kinetotherapy and Medical Recovery Specialist`,
        span: `"Iuliu Haţieganu" University of Medicine and Pharmacy, Cluj-Napoca`,
        timeData: "2017-2020",
        text: "",
        icon: `<i class="fa-solid fa-graduation-cap"></i>`,
    },
    {
        title: `CERTIFIED IN COMPUTER SCIENCE`,
        span: `"Lucian Blaga" High School, Cluj-Napoca`,
        timeData: "2017",
        text: "",
        icon: `<i class="fa-solid fa-graduation-cap"></i>`,
    },
    {
        title: `High School - Major in Mathematics and Informatics - Intensive Informatics`,
        span: `"Lucian Blaga" High School, Cluj-Napoca`,
        timeData: "2013-2017",
        text: "Experienced with C++, C, developed algorithms and problem-solving skills. Certificate of digital skills and professional skills in computer science.",
        icon: `<i class="fa-solid fa-graduation-cap"></i>`,
    },
];

let academicContainer = document.querySelector(".academic");


academicDataList.forEach( (element) => {
    console.log('timeline-item created');
    addItemsToTimeline(academicContainer, element);
} )

