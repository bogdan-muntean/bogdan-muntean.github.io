# Architecture

## High-Level Architecture

This is a static client-side website. The browser loads `index.html`, CSS files, image/PDF/icon assets, and JavaScript ES modules directly from the repository structure.

```text
Browser
  |-- index.html
  |-- CSS files from src/assets and src/pages
  |-- JS modules from src/main.js and src/pages
  `-- Static assets from src/assets
```

There is no backend layer, API layer, database layer, server-rendering layer, bundler, or client-side framework declared in the current codebase.

## Folder-By-Folder Responsibility

### Root

- `index.html`: Single-page document and primary runtime entry point.
- `package.json`: npm package metadata. Contains only a placeholder `test` script.
- `package-lock.json`: npm lockfile with root package metadata only.
- `LICENSE.md`: MIT License.
- `README.md`: Project overview and usage documentation.

### `.vscode`

- `.vscode/settings.json`: Editor appearance settings. No runtime effect.

### `src`

- `src/main.js`: General UI behavior.
- `src/assets`: Static assets plus global SCSS/CSS.
- `src/data`: JavaScript data arrays for dynamic content.
- `src/pages`: Page/section-specific JavaScript and styling.
- `src/utils`: Shared JavaScript helper functions.

### `src/assets`

- `variables.scss` and `variables.css`: CSS custom properties, theme variables, responsive variable values, and SCSS mixins.
- `style.scss` and `style.css`: Global layout and shared component styling.
- `aboutMeImages`: Profile images.
- `docs`: Downloadable PDF documents.
- `icons`: Skill/tool icons.
- `portfolioImages`: Portfolio screenshots.
- `readmeImages`: Documentation screenshots/assets.

### `src/data`

- `dataPortfolioItems.js`: Portfolio project data.
- `dataTimeline.js`: Timeline/education data.
- `dataWorkexperience.js`: Work experience data.

### `src/pages`

- `Home`: Home section styling only.
- `AboutMe`: About-related renderers, item factories, skills data/rendering, and section styling.
- `Portfolio`: Portfolio renderers, card factory, and section styling.
- `Project`: Intended project-detail behavior and styling, currently mismatched with `index.html`.
- `Contact`: Contact styling only.

### `src/utils`

- `toggleLightMode.js`: Theme toggling.
- `pageTransitions.js`: Unused active-section transition helper.
- `checkLink.js`: Enables/disables portfolio title links.
- `checkIcon.js`: Enables/disables portfolio icon links.

## Main Execution Flow

1. `index.html` loads CSS and renders static markup.
2. `index.html` loads `src/main.js` as a module.
3. `src/main.js` imports:
   - `src/utils/toggleLightMode.js`
4. `src/main.js` attaches UI event listeners for mobile navigation, back-to-top behavior, and theme toggling.
5. `index.html` loads `src/pages/AboutMe/index.js` as a module.
6. `src/pages/AboutMe/index.js` imports data and renderer modules, then renders:
   - work experience into `.experience-container`
   - timeline items into `.timeline-container`
   - skills into `#skills-list` via `addMySkills.js`
7. `index.html` loads `src/pages/Portfolio/index.js` as a module.
8. `src/pages/Portfolio/index.js` renders portfolio cards into `.portfolio-list`.
9. `index.html` loads `src/pages/Project/index.js` as a module.
10. `src/pages/Project/index.js` checks for legacy project-detail DOM before attaching project-detail click handlers. The current HTML does not include `.active`, `#project`, or `#portfolio`, so the guarded project-detail behavior remains inactive.

## File Dependencies

```text
index.html
  |-- src/main.js
  |   `-- src/utils/toggleLightMode.js
  |-- src/pages/AboutMe/index.js
  |   |-- src/data/dataWorkexperience.js
  |   |-- src/data/dataTimeline.js
  |   |-- src/pages/AboutMe/addWorkexperienceItems.js
  |   |   `-- src/pages/AboutMe/WorkexperienceItem.js
  |   |-- src/pages/AboutMe/addTimelineItems.js
  |   |   `-- src/pages/AboutMe/TimelineItem.js
  |   `-- src/pages/AboutMe/addMySkills.js
  |-- src/pages/Portfolio/index.js
  |   |-- src/data/dataPortfolioItems.js
  |   `-- src/pages/Portfolio/addPortfolioItems.js
  |       `-- src/pages/Portfolio/PortfolioItem.js
  |           |-- src/utils/checkLink.js
  |           `-- src/utils/checkIcon.js
  `-- src/pages/Project/index.js
      `-- src/data/dataPortfolioItems.js
```

CSS dependencies:

```text
index.html
  |-- src/assets/variables.css
  |-- src/assets/style.css
  |-- src/pages/Home/home-section.css
  |-- src/pages/AboutMe/about-me-section.css
  |-- src/pages/Portfolio/portfolio-page.css
  |-- src/pages/Project/project-page.css
  `-- src/pages/Contact/contact-page.css
```

SCSS source dependencies:

```text
src/assets/style.scss
  `-- src/assets/variables.scss

src/pages/Home/home-section.scss
  `-- src/assets/variables.scss

src/pages/AboutMe/about-me-section.scss
  `-- src/assets/variables.scss

src/pages/Portfolio/portfolio-page.scss
  `-- src/assets/variables.scss

src/pages/Project/project-page.scss
  `-- src/assets/variables.scss

src/pages/Contact/contact-page.scss
  `-- src/assets/variables.scss
```

## Frontend/Backend Separation

There is only a frontend/static layer. No backend code, API handlers, server framework, database schema, or server configuration exists in the repository.

## State Management

There is no formal state management library.

Runtime state is stored in:

- DOM classes:
  - `.open` on `#nav-icon` and `#menu`.
  - `.show` on `#back-to-top`.
  - `.light-mode` on `<html>` and `<body>`.
- JavaScript module-local arrays:
  - `skillCategories` inside `src/pages/AboutMe/addMySkills.js`.
  - exported data arrays in `src/data`.

No state is persisted to localStorage, sessionStorage, cookies, or a backend.

## Routing And Navigation

The working navigation is anchor-based:

- `#home-section`
- `#about-me-section`
- `#my-skills-section`
- `#work-experience-section`
- `#timeline-section`
- `#portfolio-section`
- `#contact-section`

`html, body` use `scroll-behavior: smooth` in `src/assets/style.scss`, so anchor navigation scrolls smoothly.

There is no router library.

`src/utils/pageTransitions.js` suggests a prior or planned class-based navigation system using `.active`, `.active-btn`, and `data-id`, but this is not used by current `index.html`.

## Styling And Theme System

The theme system is built with CSS variables:

- Default variables are declared under `:root` in `src/assets/variables.scss`.
- Light-mode overrides are declared under `.light-mode` in `src/assets/variables.scss`.
- `src/utils/toggleLightMode.js` toggles `.light-mode` on `<html>` and `<body>`.

Responsive behavior is implemented in SCSS through media queries, mostly around these breakpoints:

- `270px`
- `310px`
- `320px`
- `330px`
- `400px`
- `430px`
- `500px`
- `650px`
- `800px`
- `850px`
- `950px`
- `1000px`
- `1100px`
- `1200px`
- `1350px`

The global color palette is primarily controlled through:

- `--color-primary`
- `--color-secondary`
- `--color-text-1`
- `--color-timeline`
- `--color-item-title`
- `--color-item-subtitle`
- `--color-portfolio-item-bg`
- `--color-portfolio-item`
- `--color-portfolio-item-disable`

## Data Flow

The dynamic sections use static JavaScript data arrays:

```text
src/data/*.js
  -> page index module
  -> add*Items renderer
  -> item factory
  -> DOM append into index.html container
```

Skills are different:

```text
src/pages/AboutMe/addMySkills.js
  -> internal skillCategories array
  -> DOM append into #skills-list
```

Portfolio link display uses helper functions:

```text
dataPortfolioItems item
  -> PortfolioItem()
  -> checkLink(liveLink)
  -> checkIcon(liveLink/repoLink)
  -> active or disabled anchor markup
```

## Deployment Architecture

No deployment architecture is explicitly configured. The app can be hosted by any static file host because runtime assets are static files under the repository root and `src`.

The current project context says the site is deployed through GitHub Pages, but no GitHub Actions workflow or deployment config file exists in the current codebase.
