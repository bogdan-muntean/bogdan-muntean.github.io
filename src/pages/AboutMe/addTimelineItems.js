// Create all Timeline items from data table and adds them to the HTML element "containerHtml".
import { TimelineItem } from "./TimelineItem.js";

export function addTimelineItems(containerHtmlSelector, dataBase) {
    let containerHtml = document.querySelector(`${containerHtmlSelector}`)
    
    dataBase.forEach((element) => {
        let timelineItemHtml = TimelineItem(element.title, element.timeData, element.span, element.text, element.icon);
        containerHtml.appendChild(timelineItemHtml);
    })
}

