# My Presentation Website

Personal presentation and portfolio website for Bogdan Muntean.

The project is a static single-page website built with HTML, CSS/SCSS, and vanilla JavaScript ES modules. It presents profile information, downloadable documents, categorized skills, work experience, education/certification timeline entries, portfolio projects, and contact links.

## What This Project Solves

This repository provides a public portfolio/resume website that can be hosted as static files. It centralizes:

- Personal introduction and professional summary.
- Download links for `src/assets/docs/CV_Bogdan_Muntean.pdf` and `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf`.
- Categorized skills rendered from `src/pages/AboutMe/addMySkills.js`.
- Work experience rendered from `src/data/dataWorkexperience.js`.
- Timeline/education entries rendered from `src/data/dataTimeline.js`.
- Portfolio cards rendered from `src/data/dataPortfolioItems.js`.
- Contact details and social links in `index.html`.

## Main Features

- Responsive desktop and mobile navigation anchored to page sections.
- Mobile hamburger menu controlled by `src/main.js`.
- Light/dark theme toggle using CSS variables and the `.light-mode` class.
- Back-to-top button that appears after scrolling.
- Dynamic skills, work experience, timeline, and portfolio rendering.
- Static assets for profile images, portfolio screenshots, icons, PDFs, and README screenshots.

## Tech Stack

Detected from repository files:

- HTML5: `index.html`.
- CSS3: committed compiled CSS files such as `src/assets/style.css`.
- SCSS source files: `src/assets/style.scss`, `src/assets/variables.scss`, and page-level `.scss` files.
- Vanilla JavaScript ES modules: `src/main.js`, `src/pages/**`, `src/utils/**`, and `src/data/**`.
- Font Awesome from CDN, linked in `index.html`.
- Google Fonts from CDN, linked in `index.html`.

No frontend framework, backend server, bundler, or test framework is declared in `package.json`.

## Install Dependencies

There are no declared `dependencies` or `devDependencies` in `package.json`, and the app runs from static files. No dependency installation is required for the current codebase.

`package-lock.json` exists, but it contains only the root package metadata.

## Run Locally

No `start`, `dev`, or `serve` script is defined in `package.json`.

The existing project structure is static and centered on `index.html`. The previous README described opening `index.html` directly. Because the current HTML loads JavaScript with `<script type="module">`, behavior from a `file://` URL can depend on browser security rules. If direct opening does not load modules correctly, serve the folder with a local static HTTP server of your choice. No project-specific server command is defined in this repository.

## Build And Deploy

No build script, bundler config, deployment workflow, or deployment command is present in the repository.

The committed CSS files are the files loaded by `index.html`. The SCSS files appear to be source files for those CSS files, but no Sass compiler command is defined in `package.json`.

The current project context says the site is deployed through GitHub Pages, and the previous README linked to `https://bogdan-muntean.github.io/`. However, no GitHub Pages or CI deployment configuration is present in the current files.

## Important Project Commands

Verified from `package.json`:

```sh
npm test
```

This script currently prints `Error: no test specified` and exits with code `1`.

No other npm scripts are defined.

## Basic Folder Structure

```text
.
|-- index.html
|-- package.json
|-- package-lock.json
|-- LICENSE.md
|-- README.md
`-- src
    |-- main.js
    |-- assets
    |   |-- aboutMeImages
    |   |-- docs
    |   |-- icons
    |   |-- portfolioImages
    |   |-- readmeImages
    |   |-- style.scss / style.css
    |   `-- variables.scss / variables.css
    |-- data
    |-- pages
    |   |-- AboutMe
    |   |-- Contact
    |   |-- Home
    |   |-- Portfolio
    |   `-- Project
    `-- utils
```

## Documentation

Additional documentation files in this repository:

- `PROJECT_DOCUMENTATION.md`: detailed technical overview.
- `ARCHITECTURE.md`: architecture, execution flow, routing, styling, and data flow.
- `AI_HANDOFF.md`: concise handoff for another AI assistant or developer.
- `CODEBASE_MAP.md`: repository map grouped by role.
- `COMPONENTS.md`: UI/component and data-rendering reference.
- `NEXT_STEPS.md`: earlier safe improvement plan based on the codebase.
- `PHASES_INFO.md`: architectural stabilization roadmap before new features.

## Known Limitations Visible From Code

- `src/pages/Project/index.js` is no longer loaded by `index.html` as of Phase 2 (reserved for Phase 7). It expected `.active`, `#project`, and `#portfolio`, but the current `index.html` uses `#portfolio-section` and has no `#project` section.
- `index.html` links to the existing `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf` (a transient working-tree regression to the shorter path was discarded in Phase 1).
- `package.json` has no scripts for Sass compilation, local serving, building, deployment, linting, or testing.
- Several Font Awesome CSS versions are loaded from CDN in `index.html`; whether all are required is unclear from current codebase.
- `package.json` metadata has confirmed inconsistencies: `main` points to missing `app.js`, `directories.doc` points to missing `docs/`, and `license` is `ISC` while `LICENSE.md` contains MIT License text.
