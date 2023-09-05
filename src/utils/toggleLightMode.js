export function toggleLightMode(classBtn){
    let themeBtn = document.querySelectorAll(`${classBtn}`);
    themeBtn[0].addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
}