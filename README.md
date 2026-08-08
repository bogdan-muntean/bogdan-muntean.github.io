# My Presentation Website

Personal presentation and portfolio website for Bogdan Muntean.

The project is a static single-page website built with HTML, CSS/SCSS, and vanilla JavaScript ES modules. It presents profile information, downloadable documents, categorized skills, work experience, education/certification timeline entries, portfolio projects, and contact links.

## What This Project Solves

This repository provides a public portfolio/resume website that can be hosted as static files. It centralizes:

- Personal introduction and professional summary.
- Download links for `src/assets/docs/CV_Bogdan_Muntean.pdf` and `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf`.
- Categorized skills rendered from `src/data/dataSkills.json`.
- Work experience rendered from `src/data/dataWorkexperience.json`.
- Timeline/education entries rendered from `src/data/dataTimeline.json`.
- Portfolio cards rendered from `src/data/dataPortfolioItems.json`.
- Contact details and social links in `index.html`.

## Main Features

- Responsive desktop and mobile navigation anchored to page sections.
- Mobile hamburger menu controlled by `src/main.js`.
- Light/dark theme toggle using CSS variables and the `.light-mode` class.
- Back-to-top button that appears after scrolling.
- Dynamic skills, work experience, timeline, and portfolio rendering.
- Project-detail overlay: clicking a portfolio card's image opens a native `<dialog>` with the project's title, description, and links (closable via a close button, Escape, or backdrop click).
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

There are no declared runtime `dependencies` — the app runs from static files loaded directly by the browser. `package.json` declares two `devDependencies`, neither of which is shipped to the browser: `sass` (Dart Sass, Phase 4, compiles SCSS to the committed CSS) and `@playwright/test` (Phase 5, the smoke-test suite).

```sh
npm install
```

`package-lock.json` reflects both devDependencies' trees.

## Run Locally

```sh
npm run serve
```

This starts a local static HTTP server on `http://localhost:8080` by shelling out to Python's built-in `http.server` module (no npm dependency required). Because `index.html` loads JavaScript with `<script type="module">`, opening the file directly via a `file://` URL can hit browser module-loading restrictions, so serving it over HTTP is the supported way to run the site locally. Requires Python 3 to be installed and available as `python`; if it isn't, run `npx serve -l 8080` instead.

## Build And Deploy

No bundler, deployment workflow, or deployment command is present in the repository.

SCSS is the source of truth for styling; the committed `.css` files are generated output, and `index.html` loads only the `.css` files directly. **Any SCSS-only edit has no effect until the CSS is regenerated.** Compile with:

```sh
npm install
npm run build:css
```

This runs Dart Sass (the `sass` npm package, added as a devDependency in Phase 4) over every SCSS entry point and writes the matching `.css`/`.css.map` file at its existing path, preserving the current `sourceMappingURL` convention. One entry point, `src/pages/Contact/contact-page.scss`, still uses the older `@import` syntax and will print a Dart Sass deprecation warning during compilation — this is expected and does not fail the build; migrating it to `@use` is a separate, deliberate style-source cleanup, not part of this pipeline.

Run `npm run build:css` after every SCSS edit, and commit the regenerated `.css`/`.css.map` files alongside the `.scss` change.

The current project context says the site is deployed through GitHub Pages, and the previous README linked to `https://bogdan-muntean.github.io/`. However, no GitHub Pages or CI deployment configuration is present in the current files.

## Important Project Commands

Verified from `package.json`:

```sh
npm run serve
```

Serves the site locally at `http://localhost:8080` (see "Run Locally" above).

```sh
npm run build:css
```

Compiles all SCSS to the committed CSS (see "Build And Deploy" above).

```sh
npm test
```

Runs the Playwright smoke suite (Phase 5, extended for the Phase 7 project-detail overlay) against the site served locally, checking page load, rendering, mobile menu, theme toggle, back-to-top, portfolio interactions, and the project-detail overlay. See [TESTING.md](TESTING.md) for the one-time browser install step and full details.

No other npm scripts are defined.

## Basic Folder Structure

```text
.
|-- index.html
|-- package.json
|-- package-lock.json
|-- playwright.config.js
|-- LICENSE.md
|-- README.md
|-- TESTING.md
|-- tests
|   |-- helpers.js
|   |-- page-load.spec.js
|   |-- rendering.spec.js
|   |-- mobile-menu.spec.js
|   |-- theme-toggle.spec.js
|   |-- back-to-top.spec.js
|   |-- portfolio.spec.js
|   `-- project-detail.spec.js
|-- PROJECT_DETAIL_OVERLAY_DESIGN.md
|-- CONTENT_SOURCE_WORKFLOW_DESIGN.md
|-- IMAGE_HOSTING_WORKFLOW_DESIGN.md
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
    |-- data (JSON data files, plus dataPortfolioItems.js archive-only)
    |-- pages
    |   |-- AboutMe
    |   |-- Contact
    |   |-- Home
    |   |-- Portfolio
    |   `-- Project (index.js legacy/unloaded, projectDetail.js = the real overlay)
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
- `TESTING.md`: smoke test suite setup and coverage (Phase 5).
- `PROJECT_DETAIL_OVERLAY_DESIGN.md`: project-detail overlay design (Phase 7) — implemented.
- `CONTENT_SOURCE_WORKFLOW_DESIGN.md`: content-source workflow evaluation (Phase 8) — Option A implemented (edit `src/data/*.json` directly); Option B (Excel-to-JSON) was tried and reverted.
- `IMAGE_HOSTING_WORKFLOW_DESIGN.md`: future image-hosting workflow evaluation (Phase 9) — plan only.

## Known Limitations Visible From Code

- `src/pages/Project/index.js` is not loaded (unloaded since Phase 2) and kept only as historical reference. It expected `.active`, `#project`, and `#portfolio`, but the current `index.html` uses `#portfolio-section` and has no `#project` section. The real project-detail overlay is `src/pages/Project/projectDetail.js` (Phase 7), using a native `<dialog>`.
- `index.html` links to the existing `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf` (a transient working-tree regression to the shorter path was discarded in Phase 1).
- `package.json` has `serve` (Phase 3) and `build:css` (Phase 4) scripts, but no scripts for a general build, deployment, or linting.
- Several Font Awesome CSS versions are loaded from CDN in `index.html`; whether all are required is unclear from current codebase.
- `package.json` metadata was cleaned up in Phase 3: the unused `main`/`directories` fields were removed, `license` now reads `MIT` (matching `LICENSE.md`), and the `repository`/`bugs`/`homepage` URLs now use `bogdan-muntean.github.io`, matching the actual git remote.
