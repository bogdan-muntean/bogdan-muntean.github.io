# Codebase Map

## Folder Tree Summary

```text
.
|-- .agents
|-- .gitignore
|-- .vscode
|   `-- settings.json
|-- node_modules  (untracked, gitignored; created by `npm install` for the `sass`/`@playwright/test` devDependencies)
|-- tests
|   |-- helpers.js
|   |-- page-load.spec.js
|   |-- rendering.spec.js
|   |-- mobile-menu.spec.js
|   |-- theme-toggle.spec.js
|   |-- back-to-top.spec.js
|   |-- portfolio.spec.js
|   `-- project-detail.spec.js
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
|   |   |-- autoplayCarousel.js
|   |   |-- checkIcon.js
|   |   `-- toggleLightMode.js
|   `-- main.js
|-- index.html
|-- LICENSE.md
|-- package-lock.json
|-- package.json
|-- playwright.config.js
|-- README.md
|-- PROJECT_DOCUMENTATION.md
|-- ARCHITECTURE.md
|-- AI_HANDOFF.md
|-- CODEBASE_MAP.md
|-- COMPONENTS.md
|-- NEXT_STEPS.md
|-- PHASES_INFO.md
|-- TESTING.md
|-- PROJECT_DETAIL_OVERLAY_DESIGN.md
|-- CONTENT_SOURCE_WORKFLOW_DESIGN.md
`-- IMAGE_HOSTING_WORKFLOW_DESIGN.md
```

## Entry Points

- `index.html`: Main browser entry.
- `src/main.js`: Main general UI script.
- `src/pages/AboutMe/index.js`: About/work/timeline/skills dynamic entry.
- `src/pages/Portfolio/index.js`: Portfolio dynamic entry.
- `src/pages/Project/index.js`: Legacy project-detail entry; not loaded (unloaded since Phase 2), kept only as historical reference. Its required legacy DOM is absent from the current markup.
- `src/pages/Project/projectDetail.js`: The actual project-detail overlay entry (Phase 7 implementation) — populates a native `<dialog>` from `dataPortfolioItems` at click time.

## UI Files

### HTML

- `index.html`: Main static markup for all sections.

### JavaScript UI Renderers

- `src/pages/AboutMe/addMySkills.js`
- `src/pages/AboutMe/addWorkexperienceItems.js`
- `src/pages/AboutMe/WorkexperienceItem.js`
- `src/pages/AboutMe/addTimelineItems.js`
- `src/pages/AboutMe/TimelineItem.js`
- `src/pages/Portfolio/portfolioCarousel.js` (image carousel + title-tab selector, cycles through projects)
- `src/pages/Project/index.js` (legacy, not loaded)
- `src/pages/Project/projectDetail.js` (Phase 7 implementation, loaded)

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

- `src/data/dataPortfolioItems.js`: Portfolio cards and project-detail content fields, including `images` (array of screenshots the project-detail overlay renders as a gallery) and `imageLink` (the single image the carousel stage shows for that project).
- `src/data/dataTimeline.js`: Timeline entries.
- `src/data/dataWorkexperience.js`: Work experience entries.

## Utility Files

- `src/utils/toggleLightMode.js`: Theme toggle behavior.
- `src/utils/checkIcon.js`: Portfolio icon link attribute helper (used by the project-detail overlay).
- `src/utils/autoplayCarousel.js`: Shared autoplay/pause/resume timer controller (`createAutoplayController()`), used by both the main Portfolio carousel and the project-detail overlay's image carousel.

## Config Files

- `package.json`: npm metadata, a `serve` script (Phase 3, local static server), a `build:css` script (Phase 4, Dart Sass compile), and a `test` script (Phase 5, Playwright smoke suite). Two devDependencies: `sass` and `@playwright/test`.
- `package-lock.json`: npm lockfile metadata, including the `sass` and `@playwright/test` dependency trees.
- `playwright.config.js`: Playwright Test configuration (Phase 5) — Chromium project, auto-managed `npm run serve` web server, serial-within-file test execution.
- `.gitignore`: excludes `node_modules/`, `test-results/`, and `playwright-report/`.
- `.vscode/settings.json`: VS Code visual settings.
- `.agents`: Empty directory in the current workspace. No runtime effect detected.

No bundler, lint, formatter, or deployment config was found.

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
- `TESTING.md`
- `PROJECT_DETAIL_OVERLAY_DESIGN.md` (Phase 7 — implemented)
- `CONTENT_SOURCE_WORKFLOW_DESIGN.md` (Phase 8 — plan only)
- `IMAGE_HOSTING_WORKFLOW_DESIGN.md` (Phase 9 — plan only)
- `LICENSE.md`

## Tests

As of Phase 5 (extended in the Phase 7 overlay implementation, the portfolio carousel redesign, and the project-detail image/video carousels), a Playwright smoke suite (33 tests) lives in `tests/` (`page-load`, `rendering`, `mobile-menu`, `theme-toggle`, `back-to-top`, `portfolio`, `project-detail` spec files), configured by `playwright.config.js`. Run it with:

```sh
npm test
```

This runs `playwright test`, which starts `npm run serve` automatically and shuts it down after. See `TESTING.md` for the one-time browser install step and full coverage details.

## API

No backend routes or server files exist in this repository. One client-side `fetch()` call exists: `src/pages/Project/projectDetail.js` calls the public YouTube oEmbed endpoint to get a video's title for the project-detail overlay's video carousel (no API key, no npm dependency).

## Deployment Files

No deployment files were found. There is no GitHub Actions workflow, no deployment script, and no static hosting config in the current repository.
