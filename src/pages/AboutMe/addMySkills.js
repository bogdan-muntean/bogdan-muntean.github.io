// Create all skill categories from the data tables and add them to their HTML containers.
import { loadJsonData } from "../../utils/loadJsonData.js";

async function loadSkillCategories(file) {
    try {
        return await loadJsonData(new URL(file, import.meta.url));
    } catch (error) {
        console.error(error);
        return [];
    }
}

function renderSkillCategories(skillContainer, skillCategories) {
    skillCategories.forEach((category) => {
        const categoryBlock = document.createElement("div");
        categoryBlock.className = "skill-category";

        const title = document.createElement("h3");
        title.textContent = category.category;
        categoryBlock.appendChild(title);

        const skillsWrapper = document.createElement("div");
        skillsWrapper.className = "skill-grid";

        category.skills.forEach((skill) => {
            const skillItem = document.createElement("div");
            skillItem.className = "skill-item";

            let iconHtml = skill.icon;

            skillItem.innerHTML = `
      <div class="skill-icon-wrapper">${iconHtml}</div>
      <span class="skill-description">${skill.label}</span>
    `;
            skillsWrapper.appendChild(skillItem);
        });

        categoryBlock.appendChild(skillsWrapper);
        skillContainer.appendChild(categoryBlock);
    });
}

const skillContainer = document.getElementById("skills-list");
if (skillContainer) {
    renderSkillCategories(
        skillContainer,
        await loadSkillCategories("../../data/dataSkills.json")
    );
}

// "Exposed to" skills stay hidden until the toggle button reveals them.
const exposedSection = document.getElementById("skills-exposed");
const exposedContainer = document.getElementById("skills-exposed-list");
const exposedToggle = document.getElementById("skills-exposed-toggle");
if (exposedSection && exposedContainer && exposedToggle) {
    renderSkillCategories(
        exposedContainer,
        await loadSkillCategories("../../data/dataSkillsExposed.json")
    );

    const toggleText = exposedToggle.querySelector(".btn-download-text");
    const toggleIcon = exposedToggle.querySelector(".btn-download-icon i");

    exposedToggle.addEventListener("click", () => {
        const isOpen = exposedSection.hidden;
        exposedSection.hidden = !isOpen;
        exposedToggle.setAttribute("aria-expanded", String(isOpen));
        toggleText.textContent = isOpen
            ? "Hide skills I've been exposed to"
            : "Show skills I've been exposed to";
        toggleIcon.className = isOpen ? "fas fa-chevron-up" : "fas fa-chevron-down";
    });
}
