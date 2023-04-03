let sectBtn = document.querySelectorAll('.control');
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








