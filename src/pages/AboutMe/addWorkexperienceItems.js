// Create all Workexperience items from data table and adds them to the HTML element "containerHtml".
import { WorkexperienceItem } from "./WorkexperienceItem.js";

export function addWorkexperienceItems(containerHtmlSelector, dataBase) {
    let containerHtml = document.querySelector(`${containerHtmlSelector}`)
    
    dataBase.forEach((element) => {
        let workexperienceItemHtml = WorkexperienceItem(element.title, element.timeData, element.span, element.text, element.icon);
        console.log(workexperienceItemHtml)
        containerHtml.appendChild(workexperienceItemHtml);
        console.log(`workexperienceItemHtml item added`)
    })
}