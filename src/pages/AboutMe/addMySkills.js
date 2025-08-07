// Create all Timeline items from data table and adds them to the HTML element "containerHtml".

const skillCategories = [
  {
    category: "Front-End Development",
    skills: [
      { label: "HTML5", icon: '<i class="fa-brands fa-html5"></i>' },
      { label: "CSS3", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "SCSS", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Bootstrap", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Tailwind CSS", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Responsive Websites", icon: '<i class="fa-solid fa-display"></i>' },
      { label: "JavaScript", icon: '<i class="fa-brands fa-js-square"></i>' },
      { label: "TypeScript", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "React", icon: '<i class="fa-brands fa-react"></i>' }
    ]
  },
  {
    category: "Back-End Development",
    skills: [
      { label: "PHP", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Symfony Framework", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Java", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Spring Boot Framework", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Node.js", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "C", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "C++", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "C#", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Restful APIs", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Redis", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  },
  {
    category: "Databases",
    skills: [
      { label: "MySQL", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "PostgreSQL", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "MongoDB", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "ORM: Doctrine", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  },
  {
    category: "DevOps & Tools",
    skills: [
      { label: "Git", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "GitHub", icon: '<i class="fa-brands fa-github"></i>' },
      { label: "GitLab", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "TortoiseGit", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Docker", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Jenkins", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Cloudflare", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Postman", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Linux (CLI, Bash)", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "VS Code", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "IntelliJ IDEA", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Visual Studio", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  },
  {
    category: "Testing & Debugging",
    skills: [
      { label: "PHPUnit", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "JUnit", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Symfony Profiler", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Unit, Functional, and Integration Testing", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  },
  {
    category: "RPA & Automation",
    skills: [
      { label: "Automation Anywhere", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "PowerApps", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  },
  {
    category: "AI & Productivity Tools",
    skills: [
      { label: "ChatGPT", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Google Gemini", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "GitHub Copilot", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  },
  {
    category: "Project Management & Collaboration",
    skills: [
      { label: "Jira", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Trello", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Asana", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Slack", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Figma", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Microsoft 365 Suite", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Adobe Photoshop", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  }
];

const skillContainer = document.getElementById('skills-list');

skillCategories.forEach(category => {
  const categoryBlock = document.createElement('div');
  categoryBlock.className = 'skill-category';

  const title = document.createElement('h3');
  title.textContent = category.category;
  categoryBlock.appendChild(title);

  const skillsWrapper = document.createElement('div');
  skillsWrapper.className = 'skill-grid';

  category.skills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
      <div class="skill-icon-wrapper">${skill.icon}</div>
      <span class="skill-description">${skill.label}</span>
    `;
    skillsWrapper.appendChild(skillItem);
  });

  categoryBlock.appendChild(skillsWrapper);
  skillContainer.appendChild(categoryBlock);
});