//Creates Workexperience Item and then returns it
export function WorkexperienceItem(title, timeData, spanContent, textContent, icon){
    let workexperienceItemHtml = document.createElement("div");
    workexperienceItemHtml.setAttribute("class", "workexperience-item");
    workexperienceItemHtml.innerHTML = `
          <div class="we-icon">
              ${icon}
          </div>
          <p class="we-duration">${timeData}</p>
          <h5>${title}<span>${spanContent}</span></h5>
          <p class="we-text">
              ${textContent}
          </p>
    `;
    return workexperienceItemHtml;
}
