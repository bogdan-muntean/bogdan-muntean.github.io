# Codebase Map

## Folder Tree Summary

```text
.
|-- .agents
|-- .vscode
|   `-- settings.json
|-- src
|   |-- assets
|   |   |-- aboutMeImages
|   |   |-- docs
|   |   |-- icons
|   |   |-- portfolioImages
|   |   |-- readmeImages
|   |   |-- style.css
|   |   |-- style.css.map
|   |   |-- style.scss
|   |   |-- variables.css
|   |   |-- variables.css.map
|   |   `-- variables.scss
|   |-- data
|   |   |-- dataPortfolioItems.js
|   |   |-- dataTimeline.js
|   |   `-- dataWorkexperience.js
|   |-- pages
|   |   |-- AboutMe
|   |   |-- Contact
|   |   |-- Home
|   |   |-- Portfolio
|   |   `-- Project
|   |-- utils
|   |   |-- checkIcon.js
|   |   |-- checkLink.js
|   |   |-- pageTransitions.js
|   |   `-- toggleLightMode.js
|   `-- main.js
|-- index.html
|-- LICENSE.md
|-- package-lock.json
|-- package.json
|-- README.md
|-- PROJECT_DOCUMENTATION.md
|-- ARCHITECTURE.md
|-- AI_HANDOFF.md
|-- CODEBASE_MAP.md
|-- COMPONENTS.md
|-- NEXT_STEPS.md
`-- PHASES_INFO.md
```

## Entry Points

- `index.html`: Main browser entry.
- `src/main.js`: Main general UI script.
- `src/pages/AboutMe/index.js`: About/work/timeline/skills dynamic entry.
- `src/pages/Portfolio/index.js`: Portfolio dynamic entry.
- `src/pages/Project/index.js`: Intended project-detail entry, currently guarded and inactive because required legacy DOM is absent.

## UI Files

### HTML

- `index.html`: Main static markup for all sections.

### JavaScript UI Renderers

- `src/pages/AboutMe/addMySkills.js`
- `src/pages/AboutMe/addWorkexperienceItems.js`
- `src/pages/AboutMe/WorkexperienceItem.js`
- `src/pages/AboutMe/addTimelineItems.js`
- `src/pages/AboutMe/TimelineItem.js`
- `src/pages/Portfolio/addPortfolioItems.js`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/pages/Project/index.js`

### Styling

- `src/assets/variables.scss`
- `src/assets/variables.css`
- `src/assets/style.scss`
- `src/assets/style.css`
- `src/pages/Home/home-section.scss`
- `src/pages/Home/home-section.css`
- `src/pages/AboutMe/about-me-section.scss`
- `src/pages/AboutMe/about-me-section.css`
- `src/pages/Portfolio/portfolio-page.scss`
- `src/pages/Portfolio/portfolio-page.css`
- `src/pages/Project/project-page.scss`
- `src/pages/Project/project-page.css`
- `src/pages/Contact/contact-page.scss`
- `src/pages/Contact/contact-page.css`

## Data Files

- `src/data/dataPortfolioItems.js`: Portfolio cards and project-detail content fields.
- `src/data/dataTimeline.js`: Timeline entries.
- `src/data/dataWorkexperience.js`: Work experience entries.

## Utility Files

- `src/utils/toggleLightMode.js`: Theme toggle behavior.
- `src/utils/pageTransitions.js`: Unused class-based transition behavior.
- `src/utils/checkLink.js`: Portfolio title link attribute helper.
- `src/utils/checkIcon.js`: Portfolio icon link attribute helper.

## Config Files

- `package.json`: npm metadata and placeholder test script.
- `package-lock.json`: npm lockfile metadata.
- `.vscode/settings.json`: VS Code visual settings.
- `.agents`: Empty directory in the current workspace. No runtime effect detected.

No bundler, lint, formatter, test, Sass, CI, or deployment config was found.

## Assets

### Profile Images

- `src/assets/aboutMeImages/profile-photo.jpg`
- `src/assets/aboutMeImages/ex1-profile-photo.jpg`

### Documents

- `src/assets/docs/CV_Bogdan_Muntean.pdf`
- `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf`

### Icons

`src/assets/icons` contains 57 files used primarily by `src/pages/AboutMe/addMySkills.js`. Examples:

- `html5.svg`
- `css3.svg`
- `scss.svg`
- `javascript.svg`
- `typescript.svg`
- `react.svg`
- `php.svg`
- `symfony.svg`
- `java.svg`
- `spring-boot.svg`
- `nodejs.svg`
- `python.svg`
- `mysql.svg`
- `postgresql.svg`
- `mongodb.svg`
- `git.svg`
- `docker.svg`
- `jenkins.svg`
- `chatgpt.svg`
- `github-copilot.svg`

### Portfolio Images

`src/assets/portfolioImages` contains 20 screenshot files. Active portfolio data references:

- `src/assets/portfolioImages/fintrack.PNG`
- `src/assets/portfolioImages/energy-monitoring-system.png`
- `src/assets/portfolioImages/buddy-weather-app.PNG`
- `src/assets/portfolioImages/your-specialist-img.PNG`
- `src/assets/portfolioImages/task-tracker-img.PNG`
- `src/assets/portfolioImages/linkin-bio.PNG`
- `src/assets/portfolioImages/todo-list.PNG`

Other screenshots exist for commented-out portfolio items.

### README Images

- `src/assets/readmeImages/logo_readme.png`
- `src/assets/readmeImages/home_page.png`
- `src/assets/readmeImages/readmeExplanationZip1.png`
- `src/assets/readmeImages/readmeExplanationZip2.png`
- `src/assets/readmeImages/readmeExplanationZip3.png`

## Documentation Files

- `README.md`
- `PROJECT_DOCUMENTATION.md`
- `ARCHITECTURE.md`
- `AI_HANDOFF.md`
- `CODEBASE_MAP.md`
- `COMPONENTS.md`
- `NEXT_STEPS.md`
- `PHASES_INFO.md`
- `LICENSE.md`

## Tests

No test files were found.

`package.json` defines:

```sh
npm test
```

The command currently prints `Error: no test specified` and exits with failure.

## API

No API endpoints, backend routes, server files, or fetch calls were found in the current source files.

## Deployment Files

No deployment files were found. There is no GitHub Actions workflow, no deployment script, and no static hosting config in the current repository.
