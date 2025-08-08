// Create all Timeline items from data table and adds them to the HTML element "containerHtml".

const skillCategories = [
  {
    category: "Front-End Development",
    skills: [
      { label: "HTML5", icon: '<img src="src/assets/icons/html5.svg" alt="HTML5 image" class="custom-icon" />' },
      { label: "CSS3", icon: '<img src="src/assets/icons/css3.svg" alt="CSS3 image" class="custom-icon" />' },
      { 
        label: "SCSS",
        icon: '<img src="src/assets/icons/scss.svg" alt="SCSS" class="custom-icon" />'
      },
      { label: "Bootstrap", icon: '<img src="src/assets/icons/bootstrap.svg" alt="Bootstrap image" class="custom-icon" />' },
      { label: "Tailwind CSS", icon: '<img src="src/assets/icons/tailwind.svg" alt="Tailwind CSS image" class="custom-icon" />' },
      { label: "Responsive Websites", icon: '<img src="src/assets/icons/responsive.svg" alt="Responsive Websites image" class="custom-icon" />' },
      { label: "JavaScript", icon: '<img src="src/assets/icons/javascript.svg" alt="JavaScript image" class="custom-icon" />' },
      { label: "TypeScript", icon: '<img src="src/assets/icons/typescript.svg" alt="TypeScript image" class="custom-icon" />' },
      { label: "React", icon: '<img src="src/assets/icons/react.svg" alt="React image" class="custom-icon" />' }
    ]
  },
  {
    category: "Back-End Development",
    skills: [
      { label: "PHP", icon: '<img src="src/assets/icons/php.svg" alt="PHP icon" class="custom-icon" />' },
      { label: "Symfony Framework", icon: '<img src="src/assets/icons/symfony.svg" alt="Symfony icon" class="custom-icon" />' },
      { label: "Java", icon: '<img src="src/assets/icons/java.svg" alt="Java icon" class="custom-icon" />' },
      { label: "Spring Boot Framework", icon: '<img src="src/assets/icons/spring-boot.svg" alt="Spring Boot icon" class="custom-icon" />' },
      { label: "Node.js", icon: '<img src="src/assets/icons/node-js.svg" alt="Node.js icon" class="custom-icon" />' },
      { label: "C", icon: '<img src="src/assets/icons/c.svg" alt="C icon" class="custom-icon" />' },
      { label: "C++", icon: '<img src="src/assets/icons/cpp.svg" alt="C++ icon" class="custom-icon" />' },
      { label: "C#", icon: '<img src="src/assets/icons/csharp.svg" alt="C# icon" class="custom-icon" />' },
      { label: "Restful APIs", icon: '<img src="src/assets/icons/api.svg" alt="API icon" class="custom-icon" />' },
      { label: "Redis", icon: '<img src="src/assets/icons/redis.svg" alt="Redis icon" class="custom-icon" />' }
    ]
  },

  // {
  //   category: "Back-End Development",
  //   skills: [
  //     { label: "PHP", icon: '<i class="fa-brands fa-php"></i>' },
  //     { label: "Symfony Framework", icon: '<i class="fa-brands fa-symfony"></i>' },
  //     { label: "Java", icon: '<i class="fa-brands fa-java"></i>' },
  //     { label: "Spring Boot Framework", icon: '<i class="fa-brands fa-css3-alt"></i>' },
  //     { label: "Node.js", icon: '<i class="fa-brands fa-node-js"></i>' },
  //     { label: "C", icon: '<i class="fa-brands fa-css3-alt"></i>' },
  //     { label: "C++", icon: '<i class="fa-brands fa-css3-alt"></i>' },
  //     { label: "C#", icon: '<i class="fa-brands fa-css3-alt"></i>' },
  //     { label: "Restful APIs", icon: '<i class="fa-brands fa-css3-alt"></i>' },
  //     { label: "Redis", icon: '<i class="fa-brands fa-css3-alt"></i>' }
  //   ]
  // },
  {
    category: "Databases",
    skills: [
      { label: "MySQL", icon: '<img src="src/assets/icons/mysql.svg" alt="MySQL icon" class="custom-icon" />' },
      { label: "PostgreSQL", icon: '<img src="src/assets/icons/postgresql.svg" alt="PostgreSQL icon" class="custom-icon" />' },
      { label: "MongoDB", icon: '<img src="src/assets/icons/mongodb.svg" alt="MongoDB icon" class="custom-icon" />' },
      { label: "ORM: Doctrine", icon: '<img src="src/assets/icons/doctrine.svg" alt="Doctrine ORM icon" class="custom-icon" />' }
    ]
  },
  {
    category: "DevOps & Tools",
    skills: [
      { label: "Git", icon: '<img src="src/assets/icons/git.svg" alt="Git icon" class="custom-icon" />' },
      { label: "GitHub", icon: '<i class="fa-brands fa-github"></i>' },
      { label: "GitLab", icon: '<img src="src/assets/icons/gitlab.svg" alt="GitLab icon" class="custom-icon" />' },
      { label: "TortoiseGit", icon: '<img src="src/assets/icons/git-tortoise.svg" alt="TortoiseGit icon" class="custom-icon" />' },
      { label: "Docker", icon: '<img src="src/assets/icons/docker.svg" alt="Docker icon" class="custom-icon" />' },
      { label: "Jenkins", icon: '<img src="src/assets/icons/jenkins.svg" alt="Jenkins icon" class="custom-icon" />' },
      { label: "Cloudflare", icon: '<img src="src/assets/icons/cloudflare.svg" alt="Cloudflare icon" class="custom-icon" />' },
      { label: "Postman", icon: '<img src="src/assets/icons/postman.svg" alt="Postman icon" class="custom-icon" />' },
      { label: "Linux (CLI, Bash)", icon: '<img src="src/assets/icons/linux.svg" alt="Linux icon" class="custom-icon" />' },
      { label: "VS Code", icon: '<img src="src/assets/icons/vscode.svg" alt="VS Code icon" class="custom-icon" />' },
      { label: "IntelliJ IDEA", icon: '<img src="src/assets/icons/intellij-idea.svg" alt="IntelliJ IDEA icon" class="custom-icon" />' },
      { label: "Visual Studio", icon: '<img src="src/assets/icons/visual-studio.svg" alt="Visual Studio icon" class="custom-icon" />' }
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
      {
        label: "ChatGPT",
        icon: '<img src="src/assets/icons/chatgpt.svg" alt="ChatGPT" class="custom-icon" />'
        // icon: '<img src="src/assets/icons/chatgpt-white.svg" alt="ChatGPT" class="custom-icon-dark" /> <img src="src/assets/icons/chatgpt-black.svg" alt="ChatGPT" class="custom-icon-light" />'
      },
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
      { label: "Slack", icon: '<i class="fa-brands fa-slack"></i>' },
      { label: "Figma", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Microsoft 365 Suite", icon: '<i class="fa-brands fa-css3-alt"></i>' },
      { label: "Adobe Photoshop", icon: '<i class="fa-brands fa-css3-alt"></i>' }
    ]
  }
];

// {
//   category: "DevOps & Tools",
//   skills: [
//     { label: "Git", icon: '<i class="fa-brands fa-git"></i>' },
//     { label: "GitHub", icon: '<i class="fa-brands fa-github"></i>' },
//     { label: "GitLab", icon: '<i class="fa-brands fa-gitlab"></i>' },
//     { label: "TortoiseGit", icon: '<i class="fa-brands fa-css3-alt"></i>' },
//     { label: "Docker", icon: '<i class="fa-brands fa-docker"></i>' },
//     { label: "Jenkins", icon: '<i class="fa-brands fa-jenkins"></i>' },
//     { label: "Cloudflare", icon: '<i class="fa-brands fa-css3-alt"></i>' },
//     { label: "Postman", icon: '<i class="fa-brands fa-css3-alt"></i>' },
//     { label: "Linux (CLI, Bash)", icon: '<i class="fa-brands fa-linux"></i>' },
//     { label: "VS Code", icon: '<i class="fa-brands fa-css3-alt"></i>' },
//     { label: "IntelliJ IDEA", icon: '<i class="fa-brands fa-css3-alt"></i>' },
//     { label: "Visual Studio", icon: '<i class="fa-brands fa-css3-alt"></i>' }
//   ]
// },

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