// Create all Timeline items from data table and adds them to the HTML element "containerHtml".
import { loadJsonData } from "../../utils/loadJsonData.js";

let skillCategories = [];
try {
    skillCategories = await loadJsonData(
        new URL("../../data/dataSkills.json", import.meta.url)
    );
} catch (error) {
    console.error(error);
}

const skillContainer = document.getElementById("skills-list");

if (skillContainer) {
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
