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
- `package.json`: npm package metadata. Has `serve` (Phase 3, local static server), `build:css` (Phase 4, Dart Sass compile), and `test` (Phase 5, Playwright smoke suite) scripts.
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
- `Portfolio`: Portfolio carousel renderer/behavior and section styling.
- `Project`: `index.js` is the legacy, unloaded project-detail script (historical only). `projectDetail.js` and `project-page.scss`/`.css` are the actual, loaded project-detail overlay implementation (Phase 7).
- `Contact`: Contact styling only.

### `src/utils`

- `toggleLightMode.js`: Theme toggling.
- `checkIcon.js`: Enables/disables portfolio icon links (used by the project-detail overlay only).

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
8. `src/pages/Portfolio/index.js` calls `initPortfolioCarousel(dataPortfolioItems)` (`portfolioCarousel.js`), which populates the static carousel shell in `index.html`: one `<img>` per project in `.portfolio-carousel-images` (from `imageLink`) and one `.portfolio-title-box` tab per project in `.portfolio-list` (title text only). It auto-advances through projects every 4s, wires the prev/next arrows and title tabs to jump directly to a project, and keeps `.portfolio-more-info`'s `data-project-id` in sync with whichever project is active. Clicking an arrow, a title tab, or "More info" stops autoplay and schedules it to resume after 20s of no further interaction.
9. `index.html` no longer loads `src/pages/Project/index.js` (its script tag was removed in Phase 2). The file remains in the repo as historical reference only; it targeted legacy `.active`/`#project`/`#portfolio` DOM that the current markup does not contain.
10. `index.html` loads `src/pages/Project/projectDetail.js` as a module (Phase 7 overlay implementation). It attaches a delegated click listener on `.portfolio-carousel`; clicking `.portfolio-more-info[data-project-id]` looks up the matching `dataPortfolioItems` entry and opens the shared `<dialog id="project-detail">` via `showModal()`, rendering every entry in that project's `images` array (falling back to `imageLink`) as a stacked gallery.

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
  |   `-- src/pages/Portfolio/portfolioCarousel.js
  `-- src/pages/Project/projectDetail.js
      |-- src/data/dataPortfolioItems.js
      `-- src/utils/checkIcon.js

(`src/pages/Project/index.js` is present in the repo but no longer loaded by `index.html`; historical reference only.)
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

`project-page.css` was unlinked in Phase 2 (stale legacy styles) and relinked in the Phase 7 overlay implementation with entirely rewritten content (the dialog's own styles, not the old `.project-back`).

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
- Native `<dialog>` open/closed state: `#project-detail`'s `.open` property, managed by `showModal()`/`close()` in `projectDetail.js`; a module-local variable there tracks the trigger button to restore focus to on close.
- Portfolio carousel state (module-local in `portfolioCarousel.js`): the active project index, the autoplay `setInterval` id, and the resume `setTimeout` id.
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

A former `src/utils/pageTransitions.js` helper suggested a prior class-based navigation system using `.active`, `.active-btn`, and `data-id`; it was unused by the current anchor-based navigation and was removed in Phase 1.

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

Portfolio carousel (cycles through projects, not through one project's images):

```text
dataPortfolioItems (imageLink per project)
  -> initPortfolioCarousel() builds:
     - one <img class="portfolio-carousel-image"> per project in .portfolio-carousel-images
     - one <button class="portfolio-title-box" data-project-id> per project in .portfolio-list
  -> setInterval(4000ms) advances the active project (is-active toggled on both
     the image and its matching title tab); .portfolio-more-info's data-project-id
     is kept in sync with the active index
  -> clicking a prev/next arrow or a title tab jumps directly (goTo) and calls
     registerInteraction(): stops autoplay, then setTimeout(20000ms) restarts it
     if no further arrow/tab/"More info" click happens in the meantime
```

Clicking `.portfolio-more-info` opens the project-detail overlay for the currently active project:

```text
click on .portfolio-more-info[data-project-id]
  -> projectDetail.js reads data-project-id (kept current by portfolioCarousel.js)
  -> dataPortfolioItems[id] (fresh lookup, not cached)
  -> populates #project-detail, in order:
     1. title
     2. image carousel: one <img> per entry in images (falling back to [imageLink]
        if empty), dot-indicator navigation (arrows + dots hidden when only one);
        autoplays every 4s like the main Portfolio carousel (same shared
        createAutoplayController() from src/utils/autoplayCarousel.js), paused by
        arrow/dot interaction and resumed after 20s, stopped/reset on dialog close
     3. description, omitted entirely when empty
     4. Source/Live links, omitted entirely when repoLink/liveLink is empty
     5. video carousel: built from videos (a YouTube URL array), section hidden
        entirely when empty - see below
  -> dialog.showModal() (full-viewport dialog, not a centered card)
```

The video carousel (`.project-detail-video-carousel`) shows one YouTube thumbnail/play-button at a time rather than pre-rendering every video (avoids loading several hidden iframes at once):

```text
goToVideo(index) -> renderVideoSlide()
  -> extractYouTubeId(videos[index]) (parses youtu.be/<id>, ?v=<id>, /embed/<id>)
  -> thumbnail: https://img.youtube.com/vi/<id>/hqdefault.jpg (no request needed)
  -> title (top-left overlay, links to the original URL): fetched async via
     fetch("https://www.youtube.com/oembed?url=...&format=json") - the
     codebase's first runtime network call to a third-party service; a
     failed/blocked fetch is caught and just leaves the title blank
  -> click on the thumbnail replaces it with an <iframe src="youtube.com/embed/<id>?autoplay=1">
     so the video plays in place; navigating to another slide resets back to
     a thumbnail (playback state isn't preserved across slides)
```

Both the image carousel and the video carousel reuse `.portfolio-carousel-stage`/
`.portfolio-carousel-arrow(-prev/-next)`/`.portfolio-carousel-images`/
`.portfolio-carousel-image` from the main Portfolio section's carousel for
identical visual styling - `portfolioCarousel.js` and `projectDetail.js` each
scope their `querySelector` calls to their own root container (`.portfolio-carousel`,
`.project-detail-carousel`, `.project-detail-video-carousel`) specifically to
avoid one module's arrows matching another's.

`src/utils/autoplayCarousel.js` exports `createAutoplayController(advance, options)`
- a tiny shared `start`/`stop`/`registerInteraction`/`reset` timer controller
used by both `portfolioCarousel.js` (the main carousel) and `projectDetail.js`
(the overlay's image carousel); the overlay's video carousel doesn't use it,
since it stays manual-only.

## Deployment Architecture

No deployment architecture is explicitly configured. The app can be hosted by any static file host because runtime assets are static files under the repository root and `src`.

The current project context says the site is deployed through GitHub Pages, but no GitHub Actions workflow or deployment config file exists in the current codebase.
