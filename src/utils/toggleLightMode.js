// "classBtn" element from DOM, by default is dark mode and does not have the "light-mode" class.
// When we press the "classBtn" element, we give it "light-mode", and the whole interface will update
// elements's style specific to light mode, style which is coded in scss and css.

export function toggleLightMode(classBtn) {
    let themeBtn = document.querySelectorAll(`${classBtn}`);
    themeBtn[0].addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        document.documentElement.classList.toggle("light-mode");
    });
}
