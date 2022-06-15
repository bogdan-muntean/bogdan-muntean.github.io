
//V2.1
// const sections = document.querySelectorAll('.section');
// const sectBtns = document.querySelectorAll('.controls');
// const allSections = document.querySelector('.main-content')

const sectBtn = document.querySelectorAll('.control');

function PageTransitions(){
    sectBtn.forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    })
}

PageTransitions()

document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
})
    

//V2.0
// function PageTransitions(){
//     //Button click active class - button style
//     for(let i = 0; i < sectBtn.length; i++){
//         sectBtn[i].addEventListener('click', function () {
//             let currentBtn = document.querySelectorAll('.active-btn');

//             currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
//             this.className += ' active-btn';
//             // currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
//             // this.className += ' active-btn';
//         })
//     }
//     //Section click active class
//     allSections.addEventListener('click', (e) => {
//         console.log(e.target);
//         const id = e.target.dataset.id
//         if(id){
//             //Remove selected from other buttons
//             sectBtn.forEach((button) => {
//                 button.className.replace('active', '')
//                 // button.classList.remove('active')
//             })
//             e.target.classList.add('active')
//             //Hide other sections
//             sections.forEach((section) => {
//                 section.classList.remove('active')
//             })
//             //Display selected section
//             const element = document.getElementById(id)
//             element.classList.add('active')
//         }
//     })
// }
// PageTransitions()


//V1.0
// const sectBtn = document.querySelectorAll('.control');
// (function () {
//     sectBtn.forEach(button => {
//         button.addEventListener("click", function() {
//             document.querySelector(".active-btn").classList.remove("active-btn");
//             this.classList.add("active-btn");
//             document.querySelector(".active").classList.remove("active");
//             document.getElementById(button.dataset.id).classList.add("active");
//         })
//     })
// })()

//V1.1
// (function () {
//     [...document.querySelectorAll(".control")].forEach(button => {
//         button.addEventListener("click", function() {
//             document.querySelector(".active-btn").classList.remove("active-btn");
//             this.classList.add("active-btn");
//             document.querySelector(".active").classList.remove("active");
//             document.getElementById(button.dataset.id).classList.add("active");
//         })
//     });
//     document.querySelector(".theme-btn").addEventListener("click", () => {
//         document.body.classList.toggle("light-mode");
//     })
// })();



