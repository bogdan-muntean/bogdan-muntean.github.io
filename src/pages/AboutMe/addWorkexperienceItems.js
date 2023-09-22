// Create all Workexperience items from "dataBase" and adds them to the HTML element "containerHtml".
import { WorkexperienceItem } from "./WorkexperienceItem";

export function addWorkexperienceItems(containerHtmlSelector, dataBase) {
    let containerHtml = document.querySelector(`${containerHtmlSelector}`)
    
    dataBase.forEach((element) => {
        let workexperienceItemHtml = WorkexperienceItem(element.title, element.timeData, element.span, element.text, element.icon);
        containerHtml.appendChild(workexperienceItemHtml);
    })
}