//Creates Timeline Item and then returns it

export function TimelineItem(title, timeData, spanContent, textContent, icon){
    let timelineItemHtml = document.createElement("div");
    timelineItemHtml.setAttribute("class", "timeline-item");
    timelineItemHtml.innerHTML = `
          <div class="tl-icon" ${changeAcademicIconColor(icon)}>
              ${icon}
          </div>
          <p class="tl-duration">${timeData}</p>
          <h5>${title}<span>${spanContent}</span></h5>
          <p class="tl-text">
              ${textContent}
          </p>
    `;
    return timelineItemHtml;
}


/*Function that checks if the icon element is not the default one and 
returns the specific color depending on the icon element type.*/
function changeAcademicIconColor(element){
    if (element === `<i class="fa-solid fa-graduation-cap"></i>`) 
        return `style="background-color: #c6c614;"`;
}

