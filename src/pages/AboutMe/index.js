//For "timeline-container" DOM element from AboutMe Page, add Timeline items from database "dataTimeline".

import { dataTimeline } from "../../data/dataTimeline.js";
import { addTimelineItems } from "./addTimelineItems.js";

addTimelineItems(".timeline-container", dataTimeline);