const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content')

function PageTransitions(){
    //Button click active class
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function () {
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        })
    }
    //Section click active class
    allSections.addEventListener('click', (e) => {
        console.log(e.target);
        const id = e.target.dataset.id
        if(id){
            //Remove selected from other buttons
            sectBtns.forEach((button) => {
                button.classList.remove('active')
            })
            e.target.classList.add('active')
            //Hide other sections
            sections.forEach((section) => {
                section.classList.remove('active')
            })
            //Display selected section
            const element = document.getElementById(id)
            element.classList.add('active')
        }
    })
}

PageTransitions()