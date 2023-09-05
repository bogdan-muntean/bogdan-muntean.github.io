// Class "active-btn" is offered to the section button that is active the first time we enter the site by default. 
// After pressing any other section button, we will no longer use the "active-btn" class but use only "active" class.

export function pageTransitions(classBtn){
    let buttons = document.querySelectorAll(`${classBtn}`);
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    })
}