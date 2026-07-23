# Project Documentation

## Complete Project Purpose

This repository contains a static personal presentation website for Bogdan Muntean. It works as an online resume and portfolio, showing a profile introduction, downloadable documents, skills, work history, education/certification timeline, portfolio project cards, and contact information.

The project is implemented as a single HTML document, `index.html`, enhanced by vanilla JavaScript ES modules and styled through committed CSS generated from SCSS source files.

There is no backend application, API server, database connection, build pipeline, or declared framework in the current codebase.

## Main Entry Points

- `index.html`: Main document loaded by the browser. It contains the page markup, navigation anchors, static content for the Home/About/Contact sections, stylesheet links, external font/icon CDN links, and module script tags.
- `src/main.js`: Main JavaScript module for general UI behavior. It handles mobile menu open/close behavior, closes the mobile menu on link click/outside click/desktop resize, controls the back-to-top button, and activates the theme toggle through `toggleLightMode(".theme-btn")`.
- `src/pages/AboutMe/index.js`: Loads and renders work experience and timeline data, and imports `src/pages/AboutMe/addMySkills.js` for skill rendering.
- `src/pages/Portfolio/index.js`: Loads portfolio data and renders portfolio cards into `.portfolio-list`.
- `src/pages/Project/index.js`: Contains intended project-detail view behavior that does not match the current `index.html` structure. As of Phase 2 it is no longer loaded by `index.html`; the file is kept in the repo, reserved for the Phase 7 overlay redesign. See "Known limitations".

## How The App Works

1. The browser loads `index.html`.
2. `index.html` loads external Google Fonts and multiple Font Awesome stylesheets from CDN.
3. `index.html` loads committed CSS files:
   - `src/assets/variables.css`
   - `src/assets/style.css`
   - `src/pages/Home/home-section.css`
   - `src/pages/AboutMe/about-me-section.css`
   - `src/pages/Portfolio/portfolio-page.css`
   - `src/pages/Contact/contact-page.css`
4. Static HTML sections render immediately:
   - `#home-section`
   - `#about-me-section`
   - `#my-skills-section`
   - `#work-experience-section`
   - `#timeline-section`
   - `#portfolio-section`
   - `#contact-section`
5. `src/main.js` attaches general UI event listeners:
   - `#nav-icon` toggles `.open` on itself and `#menu`.
   - `.menu-link` clicks close the mobile menu.
   - outside clicks close the mobile menu when open.
   - resizing above `800px` closes the mobile menu.
   - `#back-to-top` gets `.show` when `window.scrollY > 200`.
   - clicking `#back-to-top` scrolls to the top smoothly.
   - `.theme-btn` toggles `.light-mode` on `document.body` and `document.documentElement`.
6. `src/pages/AboutMe/index.js` renders:
   - skill categories from `src/pages/AboutMe/addMySkills.js` into `#skills-list`.
   - work experience from `src/data/dataWorkexperience.js` into `.experience-container`.
   - timeline entries from `src/data/dataTimeline.js` into `.timeline-container`.
7. `src/pages/Portfolio/index.js` renders project cards from `src/data/dataPortfolioItems.js` into `.portfolio-list`.
8. `src/pages/Project/index.js` is no longer loaded by `index.html` as of Phase 2. It targeted legacy `.active`, `#project`, and `#portfolio` DOM that the current markup does not contain; the file is reserved for the Phase 7 overlay redesign.

## Main Modules, Pages, And Components

### Root HTML

- `index.html`
  - Defines all visible sections.
  - Defines desktop anchor navigation and mobile menu navigation.
  - Defines the light/dark theme button `.theme-btn`.
  - Defines the back-to-top button `#back-to-top`.
  - Defines dynamic target containers:
    - `#skills-list`
    - `.experience-container`
    - `.timeline-container`
    - `.portfolio-list`

### Global Script

- `src/main.js`
  - Imports `toggleLightMode` from `src/utils/toggleLightMode.js`.
  - Owns mobile menu, back-to-top, and theme toggle behavior.

### About Me Area

- `src/pages/AboutMe/index.js`
  - Imports work experience and timeline data.
  - Imports renderer helpers.
  - Imports `addMySkills.js` for side-effect rendering.

- `src/pages/AboutMe/addMySkills.js`
  - Contains `skillCategories`, an internal array of categorized skills.
  - Creates `.skill-category`, `.skill-grid`, and `.skill-item` DOM nodes.
  - Appends generated skills to `#skills-list`.

- `src/pages/AboutMe/addWorkexperienceItems.js`
  - Loops through `dataWorkexperience`.
  - Creates DOM nodes through `WorkexperienceItem()`.
  - Appends nodes to `.experience-container`.

- `src/pages/AboutMe/WorkexperienceItem.js`
  - Creates one `.workexperience-item` element using `innerHTML`.
  - Displays icon, date range, title, organization, and text.

- `src/pages/AboutMe/addTimelineItems.js`
  - Loops through `dataTimeline`.
  - Creates DOM nodes through `TimelineItem()`.
  - Appends nodes to `.timeline-container`.

- `src/pages/AboutMe/TimelineItem.js`
  - Creates one `.timeline-item` element using `innerHTML`.
  - Displays icon, date range, title, institution, and text.
  - Uses `changeAcademicIconColor()` to set a yellow background for graduation-cap icons.

### Portfolio Area

- `src/pages/Portfolio/index.js`
  - Imports `dataPortfolioItems`.
  - Calls `addPortfolioItems(".portfolio-list", dataPortfolioItems)`.

- `src/pages/Portfolio/addPortfolioItems.js`
  - Loops through portfolio data and appends generated cards to `.portfolio-list`.

- `src/pages/Portfolio/PortfolioItem.js`
  - Creates `.portfolio-item` cards.
  - Uses `checkLink()` and `checkIcon()` to enable or visually disable portfolio links.
  - Previously added `data-more` to `.portfolio-image` for the legacy detail flow; removed in Phase 2.

### Project Detail Area

- `src/pages/Project/index.js`
  - Intended to listen for clicks on `.more` or `.portfolio-image`.
  - Attempts to hide an `.active` section and show `#project`.
  - Attempts to populate `#project` from `dataPortfolioItems`.
  - Attempts to return to `#portfolio` through `.project-back`.
  - As of Phase 2 this file is no longer loaded by `index.html`; it is reserved for the Phase 7 overlay redesign. `index.html` does not define the `#project`, `#portfolio`, or `.active` sections the legacy flow required.

### Contact Area

- `index.html`
  - Contact markup is static inside `#contact-section`.
  - Includes location, email, education links, phone link, languages, and social profile links.

- `src/pages/Contact/contact-page.scss`
  - Styles contact layout and social icons.

There is no `src/pages/Contact/index.js`.

## Data Files

- `src/data/dataPortfolioItems.js`
  - Exports `dataPortfolioItems`.
  - Active items include Fintrack, Energy Monitoring System, Buddy Weather App, YourSpecialist, Task Tracker, Link In Bio, and Todo List.
  - Several older portfolio items are present as commented-out objects.

- `src/data/dataTimeline.js`
  - Exports `dataTimeline`.
  - Contains education, certifications, and training entries.

- `src/data/dataWorkexperience.js`
  - Exports `dataWorkexperience`.
  - Contains work experience entries for Authentic Spirit Romania, Digital Distribution Group, and Automatify.

## Utilities And Shared Functionality

- `src/utils/toggleLightMode.js`
  - Exports `toggleLightMode(classBtn)`.
  - Finds the first element matching `classBtn`.
  - Returns safely if the element is missing.
  - Toggles `.light-mode` on both `<body>` and `<html>`.

- `src/utils/checkLink.js`
  - Exports `checkLink(link)`.
  - Returns `class="disable-title"` when `link` is empty or whitespace-only.
  - Returns `class="active-title" href="..."` when the link is present.

- `src/utils/checkIcon.js`
  - Exports `checkIcon(icon)`.
  - Returns `class="disable-icon"` when `icon` is empty or whitespace-only.
  - Returns `class="active-icon" href="..."` when the link is present.

- `src/utils/pageTransitions.js` — removed in Phase 1
  - Was an unused helper exporting `pageTransitions(classBtn)` to toggle `.active-btn`/`.active` by `data-id`; not imported or called by any code, so it was deleted as dead code.

## Styling System

### Source SCSS

- `src/assets/variables.scss`
  - Defines SCSS viewport variables.
  - Defines CSS custom properties in `:root`.
  - Defines `.light-mode` theme variable overrides.
  - Defines mixins:
    - `horizontal-line-above`
    - `vertical-center`
  - Defines responsive CSS variable changes.

- `src/assets/style.scss`
  - Global reset and page-level styles.
  - Header, desktop nav, mobile nav, mobile menu, back-to-top button, theme button, shared `.container`, `.main-title`, and `.stat-title`.

- Page SCSS:
  - `src/pages/Home/home-section.scss`
  - `src/pages/AboutMe/about-me-section.scss`
  - `src/pages/Portfolio/portfolio-page.scss`
  - `src/pages/Project/project-page.scss`
  - `src/pages/Contact/contact-page.scss`

### Compiled CSS

`index.html` loads the `.css` files directly, not the `.scss` files. Matching `.css.map` files are committed beside the CSS files.

As of Phase 4, `npm run build:css` compiles every `.scss` entry point to its matching `.css`/`.css.map` via Dart Sass (the `sass` devDependency). SCSS is the source of truth; any SCSS-only edit has no effect until this command regenerates the CSS. Two entry points (`project-page.scss`, `contact-page.scss`) still use the older `@import` syntax, which compiles with a deprecation warning.

## Assets And Static Files

- `src/assets/aboutMeImages`: Profile images used by the home section.
- `src/assets/docs`: `CV_Bogdan_Muntean.pdf` and `Recommendation_Letters_Bogdan_Muntean.pdf`.
- `src/assets/icons`: Skill and tool icons used by `src/pages/AboutMe/addMySkills.js`.
- `src/assets/portfolioImages`: Screenshots used by `src/data/dataPortfolioItems.js`.
- `src/assets/readmeImages`: Images used by the previous README and available for documentation.

## Configuration Files

- `package.json`
  - Package name: `my_presentation_website`.
  - Version: `1.0.0`.
  - Scripts: `serve` (local static server via Python's `http.server`, Phase 3), `build:css` (Dart Sass compile, Phase 4), and `test` (placeholder that exits with an error).
  - No runtime dependencies; one devDependency, `sass` (Phase 4).
  - License field: `MIT` (matches `LICENSE.md`, fixed in Phase 3).

- `package-lock.json`
  - Lockfile version 2.
  - Contains only root package metadata.

- `.vscode/settings.json`
  - VS Code color customizations and Peacock color.
  - Does not affect runtime behavior.

- `LICENSE.md`
  - MIT License text.

## External Libraries And Services

Detected from `index.html`:

- Google Fonts:
  - Gentium Plus
  - Kdam Thmor Pro
  - Oxygen
- Font Awesome CSS from `cdnjs.cloudflare.com`, with multiple versions/stylesheets linked.

No npm-installed external library is declared.

## Known Limitations Visible From Code

- `src/pages/Project/index.js` is stale relative to `index.html` and, as of Phase 2, is no longer loaded by it (reserved for Phase 7):
  - It expects `#project`, but no such element exists.
  - It expects `#portfolio`, but the current portfolio section is `#portfolio-section`.
  - It expects an `.active` section, but no section has this class in `index.html`.
  - It was internally guarded (Phase 1) so no click behavior attached without those missing elements, and is now not loaded at all (Phase 2).
- `src/pages/Portfolio/PortfolioItem.js` labels the repo link as `Source` but uses a display icon, and labels the live link as `Live` but uses a GitHub icon. Whether this is intentional is unclear from current codebase.
- Several portfolio data fields use `" "` for `photo` and `video`.
- Some strings in data files show mojibake/encoding artifacts in words such as Master's, dash-separated dates, Babes-Bolyai, and Hatieganu. Encoding history is unclear from current codebase.
- `index.html` links to the existing `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf` (a transient working-tree regression to the shorter path was discarded in Phase 1).
- `index.html` previously repeated `id="email"` on three contact spans; fixed in Phase 2 — the email span keeps `id="email"`, and the education spans use `id="education-university"` and `id="education-school"`.
- `package.json` metadata was cleaned up in Phase 3: the unused `main`/`directories` fields were removed, `license` now reads `MIT` (matching `LICENSE.md`), and the `repository`/`bugs`/`homepage` URLs now use `bogdan-muntean.github.io`, confirmed against the actual `git remote`.
- No automated tests are present.
- `npm run serve` (Phase 3) provides a local development server, and `npm run build:css` (Phase 4) compiles SCSS to CSS; build, lint, and deployment scripts are still not defined.

## Unconfirmed Assumptions

- The current user context says the site is deployed through GitHub Pages, but no deployment config is present.
- `src/pages/Project/index.js` may be legacy code from an earlier section-based navigation system, but this is unconfirmed.
