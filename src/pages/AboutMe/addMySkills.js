// Create all Timeline items from data table and adds them to the HTML element "containerHtml".

const skillCategories = [
    {
        category: "Front-End Development",
        skills: [
            {
                label: "HTML5",
                icon: '<img src="src/assets/icons/html5.svg" alt="HTML5 image" class="custom-icon" />',
            },
            {
                label: "CSS3",
                icon: '<img src="src/assets/icons/css3.svg" alt="CSS3 image" class="custom-icon" />',
            },
            {
                label: "SCSS",
                icon: '<img src="src/assets/icons/scss.svg" alt="SCSS" class="custom-icon" />',
            },
            {
                label: "Twig",
                icon: '<img src="src/assets/icons/twig.svg" alt="TWIG" class="custom-icon" />',
            },
            {
                label: "Bootstrap",
                icon: '<img src="src/assets/icons/bootstrap.svg" alt="Bootstrap image" class="custom-icon" />',
            },
            {
                label: "Tailwind CSS",
                icon: '<img src="src/assets/icons/tailwind.svg" alt="Tailwind CSS image" class="custom-icon" />',
            },
            {
                label: "Responsive Websites",
                icon: '<img src="src/assets/icons/responsive.svg" alt="Responsive Websites image" class="custom-icon" />',
            },
            {
                label: "JavaScript",
                icon: '<img src="src/assets/icons/javascript.svg" alt="JavaScript image" class="custom-icon" />',
            },
            {
                label: "TypeScript",
                icon: '<img src="src/assets/icons/typescript.svg" alt="TypeScript image" class="custom-icon" />',
            },
            {
                label: "React",
                icon: '<img src="src/assets/icons/react.svg" alt="React image" class="custom-icon" />',
            },
        ],
    },
    {
        category: "Back-End Development",
        skills: [
            {
                label: "PHP",
                icon: '<img src="src/assets/icons/php.svg" alt="PHP icon" class="custom-icon" />',
            },
            {
                label: "Symfony Framework",
                icon: '<img src="src/assets/icons/symfony.svg" alt="Symfony icon" class="custom-icon" />',
            },
            {
                label: "Java",
                icon: '<img src="src/assets/icons/java.svg" alt="Java icon" class="custom-icon" />',
            },
            {
                label: "Spring Boot Framework",
                icon: '<img src="src/assets/icons/spring-boot.svg" alt="Spring Boot icon" class="custom-icon" />',
            },
            {
                label: "Node.js",
                icon: '<img src="src/assets/icons/nodejs.svg" alt="Node.js icon" class="custom-icon" />',
            },
            {
                label: "Python",
                icon: '<img src="src/assets/icons/python.svg" alt="Node.js icon" class="custom-icon" />',
            },
            {
                label: "C",
                icon: '<img src="src/assets/icons/c.svg" alt="C icon" class="custom-icon" />',
            },
            {
                label: "C++",
                icon: '<img src="src/assets/icons/cpp.svg" alt="C++ icon" class="custom-icon" />',
            },
            {
                label: "C#",
                icon: '<img src="src/assets/icons/csharp.svg" alt="C# icon" class="custom-icon" />',
            },
            {
                label: "Restful APIs",
                icon: '<i class="fa-solid fa-code"></i>',
            },
            {
                label: "Redis",
                icon: '<img src="src/assets/icons/redis.svg" alt="Redis icon" class="custom-icon" />',
            },
        ],
    },
    {
        category: "Databases",
        skills: [
            {
                label: "MySQL",
                icon: '<img src="src/assets/icons/mysql.svg" alt="MySQL icon" class="custom-icon" />',
            },
            {
                label: "PostgreSQL",
                icon: '<img src="src/assets/icons/postgresql.svg" alt="PostgreSQL icon" class="custom-icon" />',
            },
            {
                label: "MongoDB",
                icon: '<img src="src/assets/icons/mongodb.svg" alt="MongoDB icon" class="custom-icon" />',
            },
            {
                label: "ORM: Doctrine",
                icon: '<img src="src/assets/icons/doctrine.svg" alt="Doctrine ORM icon" class="custom-icon" />',
            },
        ],
    },
    {
        category: "DevOps & Tools",
        skills: [
            {
                label: "Git",
                icon: '<img src="src/assets/icons/git.svg" alt="Git icon" class="custom-icon" />',
            },
            { label: "GitHub", icon: '<i class="fa-brands fa-github"></i>' },
            {
                label: "GitLab",
                icon: '<img src="src/assets/icons/gitlab.svg" alt="GitLab icon" class="custom-icon" />',
            },
            {
                label: "TortoiseGit",
                icon: '<img src="src/assets/icons/git-tortoise.svg" alt="TortoiseGit icon" class="custom-icon" />',
            },
            {
                label: "Docker",
                icon: '<img src="src/assets/icons/docker.svg" alt="Docker icon" class="custom-icon" />',
            },
            {
                label: "Jenkins",
                icon: '<img src="src/assets/icons/jenkins.svg" alt="Jenkins icon" class="custom-icon" />',
            },
            {
                label: "Cloudflare",
                icon: '<img src="src/assets/icons/cloudflare.svg" alt="Cloudflare icon" class="custom-icon" />',
            },
            {
                label: "Postman",
                icon: '<img src="src/assets/icons/postman.svg" alt="Postman icon" class="custom-icon" />',
            },
            {
                label: "Linux (CLI, Bash)",
                icon: '<img src="src/assets/icons/linux.svg" alt="Linux icon" class="custom-icon" />',
            },
            {
                label: "VS Code",
                icon: '<img src="src/assets/icons/vscode.svg" alt="VS Code icon" class="custom-icon" />',
            },
            {
                label: "IntelliJ IDEA",
                icon: '<img src="src/assets/icons/intellij-idea.svg" alt="IntelliJ IDEA icon" class="custom-icon" />',
            },
            {
                label: "Visual Studio",
                icon: '<img src="src/assets/icons/visual-studio.svg" alt="Visual Studio icon" class="custom-icon" />',
            },
            {
                label: "Virtualization (VirtualBox)",
                icon: '<img src="src/assets/icons/virtualbox.svg" alt="Virtual Box icon" class="custom-icon" />',
            },
        ],
    },
    {
        category: "Testing & Debugging",
        skills: [
            { label: "PHPUnit", icon: '<i class="fa-solid fa-display"></i>' },
            { label: "JUnit", icon: '<i class="fa-solid fa-display"></i>' },
            {
                label: "Symfony Profiler",
                icon: '<i class="fa-solid fa-display"></i>',
            },
            {
                label: "Unit, Functional, and Integration Testing",
                icon: '<i class="fa-solid fa-display"></i>',
            },
        ],
    },
    {
        category: "RPA & Automation",
        skills: [
            {
                label: "Automation Anywhere",
                icon: '<img src="src/assets/icons/automation-anywhere.png" alt="Automation Anywhere icon" class="custom-icon" />',
            },
            {
                label: "PowerApps",
                icon: '<img src="src/assets/icons/powerapps.svg" alt="PowerApps icon" class="custom-icon" />',
            },
        ],
    },
    {
        category: "AI & Productivity Tools",
        skills: [
            {
                label: "ChatGPT",
                icon: '<img src="src/assets/icons/chatgpt.svg" alt="ChatGPT icon" class="custom-icon" />',
            },
            {
                label: "Google Gemini",
                icon: '<img src="src/assets/icons/gemini.svg" alt="Google Gemini icon" class="custom-icon" />',
            },
            {
                label: "GitHub Copilot",
                icon: '<img src="src/assets/icons/github-copilot.svg" alt="GitHub Copilot icon" class="custom-icon" />',
            },
        ],
    },
    {
        category: "Project Management & Collaboration",
        skills: [
            {
                label: "Jira",
                icon: '<img src="src/assets/icons/jira.svg" alt="Jira icon" class="custom-icon" />',
            },
            {
                label: "Trello",
                icon: '<img src="src/assets/icons/trello.svg" alt="Trello icon" class="custom-icon" />',
            },
            {
                label: "Asana",
                icon: '<img src="src/assets/icons/asana.svg" alt="Asana icon" class="custom-icon" />',
            },
            {
                label: "Slack",
                icon: '<img src="src/assets/icons/slack.svg" alt="Slack icon" class="custom-icon" />',
            },
            {
                label: "Figma",
                icon: '<img src="src/assets/icons/figma.svg" alt="Figma icon" class="custom-icon" />',
            },
            {
                label: "Microsoft 365 Suite",
                icon: '<img src="src/assets/icons/microsoft-365.svg" alt="Microsoft 365 Suite icon" class="custom-icon" />',
            },
            {
                label: "Adobe Photoshop",
                icon: '<img src="src/assets/icons/adobe-photoshop.svg" alt="Adobe Photoshop icon" class="custom-icon" />',
            },
        ],
    },
];

const skillContainer = document.getElementById("skills-list");

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
