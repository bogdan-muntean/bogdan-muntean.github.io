//For "timeline-container" DOM element from AboutMe Page, add Workexperience items from data table "dataWorkexperience"
// and add Timeline items from database "dataTimeline".

import { loadJsonData } from "../../utils/loadJsonData.js";
import { addWorkexperienceItems } from "./addWorkexperienceItems.js";
import { addTimelineItems } from "./addTimelineItems.js";
import "./addMySkills.js";


try {
    const dataWorkexperience = await loadJsonData(
        new URL("../../data/dataWorkexperience.json", import.meta.url)
    );
    addWorkexperienceItems(".experience-container", dataWorkexperience);
} catch (error) {
    console.error(error);
}

try {
    const dataTimeline = await loadJsonData(
        new URL("../../data/dataTimeline.json", import.meta.url)
    );
    addTimelineItems(".timeline-container", dataTimeline);
} catch (error) {
    console.error(error);
}