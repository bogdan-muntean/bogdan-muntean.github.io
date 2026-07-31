# Components And UI Modules

This project does not use a component framework. "Components" are plain JavaScript functions that create DOM elements, plus HTML sections in `index.html` and SCSS/CSS files that style those sections.

## Static Sections In `index.html`

### Header And Navigation

Defined in `index.html`.

Key elements:

- `.desktop-nav`
- `.mobile-nav`
- `#nav-icon`
- `#menu`
- `.menu-link`
- `.theme-btn`

Behavior:

- Desktop nav uses normal anchor links to section IDs.
- Mobile nav opens/closes by toggling `.open` from `src/main.js`.
- Theme button toggles `.light-mode` through `src/utils/toggleLightMode.js`.

### Home Section

Defined in `index.html`, styled by `src/pages/Home/home-section.scss` and `src/pages/Home/home-section.css`.

Key elements:

- `#home-section`
- `.home-content`
- `.home-section-left`
- `.home-section-right`
- `.btn-download-holder`

Uses:

- `src/assets/aboutMeImages/profile-photo.jpg`
- `src/assets/docs/CV_Bogdan_Muntean.pdf`
- `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf`

### About Me Section

Defined in `index.html`, styled by `src/pages/AboutMe/about-me-section.scss` and `src/pages/AboutMe/about-me-section.css`.

Key elements:

- `#about-me-section`
- `.text-about`

The descriptive text is hardcoded in `index.html`.

### Skills Section

Defined in `index.html`, populated by `src/pages/AboutMe/addMySkills.js`.

Key elements:

- `#my-skills-section`
- `#skills-list`
- `.skill-category`
- `.skill-grid`
- `.skill-item`
- `.skill-icon-wrapper`
- `.skill-description`

Data source:

- Internal `skillCategories` array in `src/pages/AboutMe/addMySkills.js`.

### Work Experience Section

Defined in `index.html`, populated by `src/pages/AboutMe/index.js`.

Key elements:

- `#work-experience-section`
- `.experience-container`
- `.workexperience-item`
- `.we-icon`
- `.we-duration`
- `.we-text`

Data source:

- `src/data/dataWorkexperience.js`

Renderer chain:

```text
src/pages/AboutMe/index.js
  -> addWorkexperienceItems()
  -> WorkexperienceItem()
  -> .experience-container
```

### Timeline Section

Defined in `index.html`, populated by `src/pages/AboutMe/index.js`.

Key elements:

- `#timeline-section`
- `.timeline-container`
- `.timeline-item`
- `.tl-icon`
- `.tl-duration`
- `.tl-text`

Data source:

- `src/data/dataTimeline.js`

Renderer chain:

```text
src/pages/AboutMe/index.js
  -> addTimelineItems()
  -> TimelineItem()
  -> .timeline-container
```

### Portfolio Section

Defined in `index.html`, populated by `src/pages/Portfolio/index.js`.

Key elements:

- `#portfolio-section`
- `.portfolio-about`
- `.portfolio-list`
- `.portfolio-item`
- `.portfolio-image` — a `<button type="button">` with `data-project-id`, opens the project-detail overlay.
- `.portfolio-text-container`
- `.portfolio-title`
- `.portfolio-links` — present in the card's DOM but hidden (`.portfolio-item .portfolio-links { display: none; }`); Source/Live only become visible inside the project-detail overlay.

Data source:

- `src/data/dataPortfolioItems.js`

Renderer chain:

```text
src/pages/Portfolio/index.js
  -> addPortfolioItems()
  -> PortfolioItem()
  -> checkLink()
  -> checkIcon()
  -> .portfolio-list
```

### Project Detail Overlay

Defined in `index.html` (a single shared `<dialog id="project-detail">`, placed after `<main>`), styled by `src/pages/Project/project-page.scss` and `.css`, populated by `src/pages/Project/projectDetail.js` (Phase 7 implementation).

Key elements:

- `#project-detail` (the `<dialog>`)
- `.project-detail-close`
- `#project-detail-title` / `.project-detail-title`
- `.project-detail-image`
- `.project-detail-description`
- `.project-detail-media`
- `.portfolio-links` (reused inside the dialog, not redefined, so link styling matches the card exactly)

Data source: `src/data/dataPortfolioItems.js`, read fresh at click time by array index (`data-project-id` on the trigger button).

Behavior: opens via `dialog.showModal()` on clicking a `.portfolio-image[data-project-id]`, focuses `.project-detail-close`. Closes via the close button, Escape, or a backdrop click (`event.target === dialog`); a single `close` event listener returns focus to the trigger button that opened it, for all three close paths. `description`/`photo`/`video` sections are omitted entirely (not rendered empty) when the corresponding data field is blank. The Source/Live links are also omitted entirely (not just dimmed) when `repoLink`/`liveLink` is blank — this differs from the portfolio card, which keeps the dimmed `disable-icon` convention. `.project-detail` renders as a full-viewport overlay (`position: fixed; inset: 0`, `width`/`height: 100vw`/`100vh`), not a centered card. The Source/Live row is hidden on the card itself (`.portfolio-item .portfolio-links`) and only visible once the overlay's own `.portfolio-links` renders it. `.project-detail-image img` is capped at `max-width: 1000px` (centered) even though the overlay panel spans the full viewport width.

### Contact Section

Defined in `index.html`, styled by `src/pages/Contact/contact-page.scss` and `src/pages/Contact/contact-page.css`.

Key elements:

- `#contact-section`
- `.contact-title`
- `.contact-description`
- `.contact-info`
- `.contact-item`
- `.contact-icons`
- `.languages`

The contact content is static in `index.html`.

## JavaScript Component Functions

### `WorkexperienceItem()`

File: `src/pages/AboutMe/WorkexperienceItem.js`

Signature:

```js
WorkexperienceItem(title, timeData, spanContent, textContent, icon)
```

Returns:

- A `div.workexperience-item` element.

Used by:

- `src/pages/AboutMe/addWorkexperienceItems.js`

### `TimelineItem()`

File: `src/pages/AboutMe/TimelineItem.js`

Signature:

```js
TimelineItem(title, timeData, spanContent, textContent, icon)
```

Returns:

- A `div.timeline-item` element.

Special behavior:

- Gives graduation-cap icons a yellow background through `changeAcademicIconColor()`.

Used by:

- `src/pages/AboutMe/addTimelineItems.js`

### `PortfolioItem()`

File: `src/pages/Portfolio/PortfolioItem.js`

Signature:

```js
PortfolioItem(idArrayItem, title, image, liveLink, repoLink)
```

Returns:

- A `div.portfolio-item` element.

Special behavior:

- Uses `checkLink(liveLink)` for the project title anchor.
- Uses `checkIcon(repoLink)` for source link behavior.
- Uses `checkIcon(liveLink)` for live link behavior.
- `.portfolio-image` is a `<button type="button">` with `data-project-id="${idArrayItem}"` and `aria-label="View details for ${title}"` (Phase 7 overlay implementation), not the legacy `data-more` attribute removed in Phase 2.

Used by:

- `src/pages/Portfolio/addPortfolioItems.js`

## Renderer Functions

### `addWorkexperienceItems()`

File: `src/pages/AboutMe/addWorkexperienceItems.js`

Signature:

```js
addWorkexperienceItems(containerHtmlSelector, dataBase)
```

Purpose:

- Selects a container.
- Returns safely if the container is missing.
- Loops through data.
- Appends `WorkexperienceItem()` elements.

### `addTimelineItems()`

File: `src/pages/AboutMe/addTimelineItems.js`

Signature:

```js
addTimelineItems(containerHtmlSelector, dataBase)
```

Purpose:

- Selects a container.
- Returns safely if the container is missing.
- Loops through data.
- Appends `TimelineItem()` elements.

### `addPortfolioItems()`

File: `src/pages/Portfolio/addPortfolioItems.js`

Signature:

```js
addPortfolioItems(containerHtmlSelector, dataBase)
```

Purpose:

- Selects a container.
- Returns safely if the container is missing.
- Loops through data.
- Appends `PortfolioItem()` elements.

## Utility Functions Used By Components

### `toggleLightMode()`

File: `src/utils/toggleLightMode.js`

Controls the global theme by toggling `.light-mode` on `<html>` and `<body>`. Returns safely if the requested theme button is missing.

### `checkLink()`

File: `src/utils/checkLink.js`

Returns an attribute string for portfolio title links. Empty and whitespace-only strings are treated as disabled links.

### `checkIcon()`

File: `src/utils/checkIcon.js`

Returns an attribute string for portfolio source/live links. Empty and whitespace-only strings are treated as disabled links.

### `pageTransitions()` — removed

Formerly `src/utils/pageTransitions.js`. Removed in Phase 1 as unused dead code; it was designed for an older active-section UI (`.active`/`.active-btn`/`data-id`) that the current anchor-based navigation does not use.

## Styling Components

- Shared title styles:
  - `.main-title`
  - `.main-title.with-line`
  - `.stat-title`
- Header/navigation:
  - `.desktop-nav`
  - `.mobile-nav`
  - `.menu`
  - `.theme-btn`
- Back-to-top:
  - `.back-to-top`
  - `.back-to-top.show`
- Dynamic content:
  - `.skill-*`
  - `.workexperience-*`
  - `.timeline-*`
  - `.portfolio-*`
- Project detail overlay:
  - `.project-detail` (the `<dialog>` box and its `::backdrop`)
  - `.project-detail-close`
  - `.project-detail-title`
  - `.project-detail-image`
  - `.project-detail-description`
  - `.project-detail-media`

## Component Risks

- Most component functions use `innerHTML`, so only trusted local data should be inserted unless escaping/sanitization is added.
- Renderer functions now guard missing target containers, but future renderer code should keep the same pattern.
- `src/pages/Project/index.js` is not loaded (unloaded since Phase 2) and kept only as historical reference; its required DOM structure is absent from the current markup. The real project-detail implementation is `src/pages/Project/projectDetail.js` (Phase 7).
- Chromium's native `<dialog>` focus containment doesn't cycle back to the first focusable element when tabbing past the last one inside `#project-detail` — it can land on `<body>`/the dialog itself for a step. This still fully prevents reaching real page content behind the dialog; see `PROJECT_DETAIL_OVERLAY_DESIGN.md`'s status note.
- Missing `liveLink`/`repoLink` are hidden entirely inside `#project-detail`, unlike the portfolio card's dimmed-disabled convention. This is an intentional, documented divergence between the card and the overlay — see `PROJECT_DETAIL_OVERLAY_DESIGN.md`'s status note and section 6.
