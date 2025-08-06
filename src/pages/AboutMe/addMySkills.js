// Create all Timeline items from data table and adds them to the HTML element "containerHtml".
const skills = [
  {
    label: "HTML5",
    icon: '<i class="fa-brands fa-html5"></i>',
  },
  {
    label: "CSS3",
    icon: '<i class="fa-brands fa-css3-alt"></i>',
  },
  {
    label: "JavaScript",
    icon: `<i class="fa-brands fa-js-square"></i>`
  },
  {
    label: "React",
    icon: '<i class="fa-brands fa-react"></i>',
  },
  {
    label: "SASS",
    icon: '<i class="fa-brands fa-sass"></i>',
  },
  {
    label: "GitHub",
    icon: '<i class="fa-brands fa-github"></i>',
  },
  {
    label: "Command Line",
    icon: '<i class="fa-solid fa-terminal"></i>',
  },
  {
    label: "Responsive Websites",
    icon: '<i class="fa-solid fa-display"></i>',
  }
];

const skillContainer = document.getElementById('skills-list');

skills.forEach(skill => {
  const skillItem = document.createElement('div');
  skillItem.className = 'skill-item';
  skillItem.innerHTML = `
    <div class="skill-icon-wrapper">
      ${skill.icon}
    </div>
    <span class="skill-description">${skill.label}</span>
  `;
  skillContainer.appendChild(skillItem);
});
