// *In momentul in care scroll-ul se afla 100% pe o anumita sectiune, iar 
// cand scroll ul ajunge 100% pe .before sau .next, ei devin .active si
// se reverifica care sectiune este .before sau .next

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

//Task-uri pentru carousel scrolling vertical
// 1.Fac un array in care pun toate sectiunile
// 2.Cand Scrollez, verific unde se afla scroll-ul(top maxim sau bot maxim) 
// 3.Clasa .active va fi sectiunea principala, si adaug clasa next care 
// devine sectiunea dinainte sau urmatoarea in functie de unde se afla 
// scroll ul pe sectiunea activa.


// Scroll V1.1
// const sections = document.querySelectorAll('.container');
// const sectionsName = []

// sections.forEach( element => sectionsName.push(element))
// console.log(sectionsName)
// window.addEventListener('scroll', (e) => {
    //     console.log(e)
    // })
    
    // let actualSection, nextSection
    
    // function scrollUp(div){
        //     let info = "Horizontal: " + div.scrollLeft +
        //     `Vertical: ${div.scrollUp} ----`
        //     console.log(info)
        // }
        
        // function scrollDown{}
        // function carouselScroll(){ }
        
        // Scroll V2.0
        // function runOnScroll(element) {
            //     // not the most exciting thing, but a thing nonetheless
            //     console.log(element);
            //   };
            
            //   // grab elements as array, rather than as NodeList
            //   const elements = document.querySelectorAll(`...`);
            
            //   // and then make each element do something on scroll
            //   elements.forEach(element => {
                //     window.addEventListener(
                    //       "scroll",
                    //       () => runOnScroll(element),
                    //       { passive: true }
                    //     );
                    //   });
                    
                    //Scroll V1.2 https://alvarotrigo.com/fullPage/#page3
                    // const a = document.getElementByClass("container")
                    // new fullpage('.main-content', {
                        //     navigation: true,
                        //     responsiveWidth: 700,
                        //     anchors: ['home', 'about-us', 'contact'],
                        //     parallax: true,
                        //     onLeave: function(origin, destination, direction){
                            //         console.log("Leaving section" + origin.index);
                            //     },
                            //   });
                            
                            //  -------------
                            
                            //PageTransitions V2.0
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


//PageTransitions V1.0
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

//PageTransitions  V1.1
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



