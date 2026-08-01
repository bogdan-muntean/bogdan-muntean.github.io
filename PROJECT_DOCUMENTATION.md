# Project Documentation

## Complete Project Purpose

This repository contains a static personal presentation website for Bogdan Muntean. It works as an online resume and portfolio, showing a profile introduction, downloadable documents, skills, work history, education/certification timeline, portfolio project cards, and contact information.

The project is implemented as a single HTML document, `index.html`, enhanced by vanilla JavaScript ES modules and styled through committed CSS generated from SCSS source files.

There is no backend application, API server, database connection, build pipeline, or declared framework in the current codebase.

## Main Entry Points

- `index.html`: Main document loaded by the browser. It contains the page markup, navigation anchors, static content for the Home/About/Contact sections, stylesheet links, external font/icon CDN links, and module script tags.
- `src/main.js`: Main JavaScript module for general UI behavior. It handles mobile menu open/close behavior, closes the mobile menu on link click/outside click/desktop resize, controls the back-to-top button, and activates the theme toggle through `toggleLightMode(".theme-btn")`.
- `src/pages/AboutMe/index.js`: Loads and renders work experience and timeline data, and imports `src/pages/AboutMe/addMySkills.js` for skill rendering.
- `src/pages/Portfolio/index.js`: Loads portfolio data and initializes the portfolio carousel (image stage + title-tab selector) via `portfolioCarousel.js`.
- `src/pages/Project/index.js`: Legacy project-detail script; does not match the current `index.html` structure and is not loaded (unloaded since Phase 2). Kept in the repo only as historical reference. See "Known limitations".
- `src/pages/Project/projectDetail.js`: The actual project-detail overlay implementation (Phase 7 design, implemented). Populates a shared native `<dialog id="project-detail">` from `dataPortfolioItems` at click time.

## How The App Works

1. The browser loads `index.html`.
2. `index.html` loads external Google Fonts and multiple Font Awesome stylesheets from CDN.
3. `index.html` loads committed CSS files:
   - `src/assets/variables.css`
   - `src/assets/style.css`
   - `src/pages/Home/home-section.css`
   - `src/pages/AboutMe/about-me-section.css`
   - `src/pages/Portfolio/portfolio-page.css`
   - `src/pages/Project/project-page.css`
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
7. `src/pages/Portfolio/index.js` calls `initPortfolioCarousel(dataPortfolioItems)`. It builds one image per project (from `imageLink`) into `.portfolio-carousel-images` and one title tab per project into `.portfolio-list`, then auto-advances through projects every 4 seconds. Prev/next arrows and title-tab clicks jump directly to a project and pause autoplay, which resumes after 20 seconds of no further interaction. `.portfolio-more-info`'s `data-project-id` is kept in sync with whichever project is currently active.
8. `src/pages/Project/index.js` is not loaded (unloaded since Phase 2); kept only as historical reference. It targeted legacy `.active`, `#project`, and `#portfolio` DOM that the current markup does not contain.
9. `src/pages/Project/projectDetail.js` attaches a delegated click listener on `.portfolio-carousel`. Clicking `.portfolio-more-info[data-project-id]` looks up `dataPortfolioItems[id]` fresh, populates the shared `<dialog id="project-detail">` (rendering a gallery of that project's `images`), and opens it via `showModal()`.

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
    - `.portfolio-carousel-images`
    - `.portfolio-list`
    - `.portfolio-more-info`

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
  - Calls `initPortfolioCarousel(dataPortfolioItems)`.

- `src/pages/Portfolio/portfolioCarousel.js`
  - Builds one `.portfolio-carousel-image` `<img>` per project (from `imageLink`) into `.portfolio-carousel-images`, and one `.portfolio-title-box` `<button data-project-id aria-label="Show project X">` tab per project into `.portfolio-list`.
  - Tracks the active project index, an autoplay `setInterval` (advances every 4000ms), and a resume `setTimeout` (20000ms).
  - Prev/next arrow clicks and title-tab clicks jump directly to a project (`goTo()`), toggle `.is-active` on the matching image + tab, update `.portfolio-more-info`'s `data-project-id`, and call `registerInteraction()` — which stops autoplay and reschedules it to resume after 20s of no further arrow/tab/"More info" click.
  - No longer opens the project-detail overlay itself; that's the exclusive job of `.portfolio-more-info`, handled by `src/pages/Project/projectDetail.js`.

### Project Detail Area

- `src/pages/Project/index.js` — legacy, not loaded
  - Intended to listen for clicks on `.more` or `.portfolio-image`.
  - Attempts to hide an `.active` section and show `#project`.
  - Attempts to populate `#project` from `dataPortfolioItems`.
  - Attempts to return to `#portfolio` through `.project-back`.
  - Not loaded by `index.html` (unloaded since Phase 2); kept only as historical reference. `index.html` does not define the `#project`, `#portfolio`, or `.active` sections this legacy flow required.

- `src/pages/Project/projectDetail.js` — the real implementation (Phase 7)
  - Delegated click listener on `.portfolio-carousel` for `.portfolio-more-info[data-project-id]`.
  - Looks up `dataPortfolioItems[id]` fresh at click time (not cached), populates the shared `<dialog id="project-detail">`: title, an image gallery (one `<img>` per entry in `images`, falling back to `[imageLink]`), description (omitted if empty), photo/video (omitted if empty), and Source/Live links via `checkIcon()` (omitted entirely when `repoLink`/`liveLink` is empty).
  - Opens via `dialog.showModal()` and focuses the close button. Closes via the close button, Escape, or a backdrop click (`event.target === dialog`); a single `close` event listener returns focus to whichever trigger button opened it, covering all three close paths.

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
  - Active items include Fintrack, Energy Monitoring System, Buddy Weather App, and YourSpecialist.
  - Task Tracker, Link In Bio, and Todo List are commented out (intentionally, per the site owner), alongside the older archived portfolio items.

- `src/data/dataTimeline.js`
  - Exports `dataTimeline`.
  - Contains education, certifications, and training entries.

- `src/data/dataWorkexperience.js`
  - Exports `dataWorkexperience`.
  - Contains work experience entries for Authentic Spirit Romania, Digital Distribution Group, and Automatify.

## Content Data Schema

Documents the shape of the current JS-array data (Phase 6). This is the existing in-code schema, not a JSON schema — no data source migration has happened or is planned by this document.

### Portfolio items (`src/data/dataPortfolioItems.js`, `dataPortfolioItems` array)

Consumed by `src/pages/Portfolio/portfolioCarousel.js` (`imageLink`, `title` only), and (all fields) by `src/pages/Project/projectDetail.js`, the project-detail overlay implemented in Phase 7.

| Field | Type | Required? | Notes |
|---|---|---|---|
| `title` | string | Required | Rendered as the carousel tab's text and the overlay's title. |
| `description` | string (HTML template literal) | Optional | Read by the overlay; omitted entirely when empty (3 of the 4 active entries today - only YourSpecialist has one). |
| `imageLink` | string (relative path) | Required | Path under `src/assets/portfolioImages/`, used as the carousel stage's single image for that project. Falls back into `images` when that array is empty. |
| `images` | array of string (relative paths) | Required | Feeds the project-detail overlay's image gallery (one `<img>` per entry, rendered by `projectDetail.js`); each active entry currently holds a single path (the same as `imageLink`). `projectDetail.js` falls back to `[imageLink]` if this field is absent/empty. Not read by the carousel stage itself (see `imageLink`). |
| `liveLink` | string (URL or `""`) | Optional | Empty string omits the "Live" link entirely from the overlay (via `checkIcon`, which `.trim()`s before checking). None of the 4 active entries has a `liveLink` today. |
| `repoLink` | string (URL or `""`) | Optional | Empty string omits the "Source" link entirely from the overlay. |
| `photo` | string | Optional | Read by the overlay; omitted entirely when empty (all 4 active entries today). The legacy `src/pages/Project/index.js` also reads this field but is not loaded. |
| `video` | string | Optional | Same as `photo`. |

Commented-out entries below the active array follow the same shape and are kept as archive content; do not remove without explicit confirmation.

### Timeline items (`src/data/dataTimeline.js`, `dataTimeline` array)

Consumed by `src/pages/AboutMe/addTimelineItems.js` → `TimelineItem()`.

| Field | Type | Required? | Notes |
|---|---|---|---|
| `title` | string | Required | Entry heading. |
| `span` | string | Required | Institution/organization, rendered in a `<span>` inside the heading. |
| `timeData` | string | Required | Free-text date range (formats vary: `MM/YYYY - MM/YYYY`, `YYYY-YYYY`, a single `YYYY`). |
| `text` | string | Required | Free-text body, may contain multiple lines and a leading `-`-bulleted list as plain text (not HTML list markup). |
| `icon` | string (HTML template literal, e.g. `` `<i class="fa-solid fa-graduation-cap"></i>` ``) | Required | Must exactly match the literal graduation-cap markup for `changeAcademicIconColor()` in `TimelineItem.js` to apply the special background color; any other icon markup renders with no inline style (Phase 6 fix — previously produced a literal `undefined` attribute). |

### Work experience items (`src/data/dataWorkexperience.js`, `dataWorkexperience` array)

Consumed by `src/pages/AboutMe/addWorkexperienceItems.js` → `WorkexperienceItem()`. Same shape as timeline items (`title`, `span`, `timeData`, `text`, `icon`), except `icon` has no special-case styling logic — every icon renders identically.

### Skills (`src/pages/AboutMe/addMySkills.js`, internal `skillCategories` array)

Not in `src/data`; kept in the renderer module itself. Each category has `category` (string heading) and `skills` (array of `{ label: string, icon: string }`, where `icon` is either an `<img>` tag pointing at `src/assets/icons/*` or an inline `<i>` icon-font tag). Centralizing this into `src/data` was considered but not done in Phase 6 — it would need explicit confirmation first, since it changes data ownership conventions.

### Hardcoded vs. data-driven content

Hardcoded directly in `index.html`: Home hero text, About Me body text, all Contact section content (location, email, education links, phone, languages, social links), and the CV/Recommendation-Letters download links. Data-driven: Skills, Work Experience, Timeline, and Portfolio cards, via the sources above.

## Utilities And Shared Functionality

- `src/utils/toggleLightMode.js`
  - Exports `toggleLightMode(classBtn)`.
  - Finds the first element matching `classBtn`.
  - Returns safely if the element is missing.
  - Toggles `.light-mode` on both `<body>` and `<html>`.

- `src/utils/checkLink.js` — removed
  - Formerly exported `checkLink(link)`, producing `class="disable-title"`/`class="active-title" href="..."` for the portfolio card's title anchor. Removed once the card's title stopped being a live-site link; its sole caller (`PortfolioItem.js`) has since itself been replaced by `portfolioCarousel.js`.

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

As of Phase 4, `npm run build:css` compiles every `.scss` entry point to its matching `.css`/`.css.map` via Dart Sass (the `sass` devDependency). SCSS is the source of truth; any SCSS-only edit has no effect until this command regenerates the CSS. One entry point, `contact-page.scss`, still uses the older `@import` syntax, which compiles with a deprecation warning (`project-page.scss` was rewritten to `@use` as part of the Phase 7 overlay implementation).

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
  - Scripts: `serve` (local static server via Python's `http.server`, Phase 3), `build:css` (Dart Sass compile, Phase 4), and `test` (Playwright smoke suite, Phase 5).
  - No runtime dependencies; two devDependencies: `sass` (Phase 4) and `@playwright/test` (Phase 5).
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

- `src/pages/Project/index.js` is stale relative to `index.html`, not loaded (unloaded since Phase 2), and kept only as historical reference:
  - It expects `#project`, but no such element exists.
  - It expects `#portfolio`, but the current portfolio section is `#portfolio-section`.
  - It expects an `.active` section, but no section has this class in `index.html`.
  - Its real replacement is `src/pages/Project/projectDetail.js`, implemented fresh in Phase 7 against a native `<dialog>`, not this file's DOM assumptions.
- Fixed in Phase 6: the portfolio card's Source/Live icon pairing was backwards (Source showed a display icon, Live showed the GitHub icon); swapped so Source shows the GitHub icon and Live shows the display icon. That pairing logic now lives in `src/pages/Project/projectDetail.js`, the overlay's only remaining Source/Live rendering site.
- Fixed in Phase 6: portfolio `photo`/`video` fields normalized from `" "` to `""` across all active entries.
- Investigated in Phase 6: a byte-level check of `dataTimeline.js`/`dataWorkexperience.js` found no actual encoding corruption — the curly apostrophe (’) and en dash (–) present are valid, correctly-encoded characters (just inconsistent in style with plain ASCII used elsewhere, left as-is). The one genuine issue, a wrong-but-valid diacritic (`ţ` cedilla vs. the correct `ț` comma-below in "Hațieganu"), was fixed for consistency with "Babeș" in the same file.
- `index.html` links to the existing `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf` (a transient working-tree regression to the shorter path was discarded in Phase 1).
- `index.html` previously repeated `id="email"` on three contact spans; fixed in Phase 2 — the email span keeps `id="email"`, and the education spans use `id="education-university"` and `id="education-school"`.
- `package.json` metadata was cleaned up in Phase 3: the unused `main`/`directories` fields were removed, `license` now reads `MIT` (matching `LICENSE.md`), and the `repository`/`bugs`/`homepage` URLs now use `bogdan-muntean.github.io`, confirmed against the actual `git remote`.
- As of Phase 5, a Playwright smoke suite exists in `tests/` (run via `npm test`); see `TESTING.md`.
- `npm run serve` (Phase 3) provides a local development server, and `npm run build:css` (Phase 4) compiles SCSS to CSS; build, lint, and deployment scripts are still not defined.

## Unconfirmed Assumptions

- The current user context says the site is deployed through GitHub Pages, but no deployment config is present.
- `src/pages/Project/index.js` may be legacy code from an earlier section-based navigation system, but this is unconfirmed.
