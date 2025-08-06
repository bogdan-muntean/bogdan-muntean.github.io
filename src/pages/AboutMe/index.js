//For "timeline-container" DOM element from AboutMe Page, add Workexperience items from data table "dataWorkexperience"
// and add Timeline items from database "dataTimeline".

import { dataWorkexperience } from "../../data/dataWorkexperience.js";
import { dataTimeline } from "../../data/dataTimeline.js";
import { addWorkexperienceItems } from "./addWorkexperienceItems.js";
import { addTimelineItems } from "./addTimelineItems.js";
import "./addMySkills.js";


addWorkexperienceItems(".experience-container", dataWorkexperience);
addTimelineItems(".timeline-container", dataTimeline);