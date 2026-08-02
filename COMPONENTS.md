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

Defined in `index.html` as a static carousel shell, populated/wired by `src/pages/Portfolio/index.js` calling `initPortfolioCarousel()`.

Key elements:

- `#portfolio-section`
- `.portfolio-about`
- `.portfolio-carousel` — the outer wrapper (stage + "More info" button + title-tab row).
- `.portfolio-carousel-stage` — holds the prev arrow, the image stage, and the next arrow.
- `.portfolio-carousel-arrow-prev` / `.portfolio-carousel-arrow-next` — round arrow buttons that move to the previous/next project.
- `.portfolio-carousel-images` — the large image stage; contains one `.portfolio-carousel-image` `<img>` per project (from `imageLink`), crossfaded via an `is-active` class toggle.
- `.portfolio-more-info` — a `<button type="button" data-project-id>`, kept in sync with the active project by `portfolioCarousel.js`. The **only** trigger that opens the project-detail overlay.
- `.portfolio-list` — now a horizontal, wrapping row of small title tabs (not a vertical list of cards).
- `.portfolio-title-box` — a `<button type="button" data-project-id aria-label="Show project X">` per project, title text only. Clicking one makes that project active in the carousel (does **not** open the overlay). The active tab gets `.is-active` (blue background, `--color-secondary`); inactive tabs use a muted blue-gray (`--color-portfolio-tab-inactive-bg`).
- `.portfolio-title-text` — the tab's title text span.

Data source:

- `src/data/dataPortfolioItems.js` — `imageLink` feeds the carousel stage (one image per project); `images` feeds the project-detail overlay's gallery (see below).

Behavior, all wired by `src/pages/Portfolio/portfolioCarousel.js`:

- Autoplay advances to the next project every 4 seconds, via the shared `createAutoplayController()` (`src/utils/autoplayCarousel.js`).
- Clicking a prev/next arrow or a title tab jumps directly to that project and immediately stops autoplay; if 20 seconds pass with no further arrow/tab/"More info" click, autoplay restarts on its own (`registerInteraction()`, reset on every interaction).
- Clicking "More info" also counts as an interaction for the 20s resume timer (so the carousel can't silently change project while the detail overlay is open on top of it), but does not itself change the active project.

Renderer chain:

```text
src/pages/Portfolio/index.js
  -> initPortfolioCarousel(dataPortfolioItems)
  -> builds .portfolio-carousel-images + .portfolio-list content
  -> wires arrows, tabs, "More info", autoplay/resume timers
```

### Project Detail Overlay

Defined in `index.html` (a single shared `<dialog id="project-detail">`, placed after `<main>`), styled by `src/pages/Project/project-page.scss` and `.css`, populated by `src/pages/Project/projectDetail.js` (Phase 7 implementation).

Key elements, in the order they're stacked inside the dialog:

- `#project-detail` (the `<dialog>`)
- `.project-detail-close`
- `#project-detail-title` / `.project-detail-title`
- `.project-detail-carousel` — image carousel: `.portfolio-carousel-stage` (reused from the main Portfolio carousel) containing `.portfolio-carousel-arrow(-prev/-next)` and `.portfolio-carousel-images`/`.portfolio-carousel-image` (also reused), plus its own `.project-detail-carousel-dots`/`.project-detail-carousel-dot` row below the stage. Autoplays every 4s (paused on interaction, resumed after 20s, stopped on close) via the same shared `createAutoplayController()` the main carousel uses. Arrows and dots are hidden when the project has only one image (true for 3 of the 4 active entries today; Fintrack has 3).
- `.project-detail-description`
- `.portfolio-links` (reused inside the dialog, not redefined, so link styling matches the card exactly)
- `.project-detail-video-carousel` — video carousel, same stage/arrow/dots pattern as the image carousel, but `.project-detail-video-frame` renders one video "slide" at a time: a `.project-detail-video-thumb-btn` (YouTube thumbnail + `.project-detail-video-play-icon`) that gets replaced by a `.project-detail-video-iframe` on click, plus a `.project-detail-video-title` link overlaid top-left (points at the real YouTube URL, its text filled in once the oEmbed fetch resolves). The whole section is `hidden` when the project has no `videos` (every active entry today).

Data source: `src/data/dataPortfolioItems.js`, read fresh at click time by array index (`data-project-id` on `.portfolio-more-info`, kept current by `portfolioCarousel.js`).

Behavior: opens via `dialog.showModal()` on clicking `.portfolio-more-info[data-project-id]` (the carousel's title tabs no longer open it directly), focuses `.project-detail-close`. Closes via the close button, Escape, or a backdrop click (`event.target === dialog`); a single `close` event listener returns focus to the trigger button that opened it, for all three close paths (also resets/stops the image carousel's autoplay timers). The description section is omitted entirely (not rendered empty) when blank. The Source/Live links are also omitted entirely when `repoLink`/`liveLink` is blank. `.project-detail` renders as a full-viewport overlay (`position: fixed; inset: 0`, `width`/`height: 100vw`/`100vh`), not a centered card.

Because the image and video carousels both reuse `.portfolio-carousel-arrow-prev`/`-next` (etc.) from the main Portfolio carousel, `projectDetail.js` scopes every carousel-related `querySelector` call to `.project-detail-carousel`/`.project-detail-video-carousel` specifically (never `document`) so its arrows can't be confused with the main carousel's, or with each other's.

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

### `initPortfolioCarousel()`

File: `src/pages/Portfolio/portfolioCarousel.js`

Signature:

```js
initPortfolioCarousel(dataBase)
```

Returns: nothing (imperatively builds/wires the static carousel shell already in `index.html`).

Special behavior:

- Builds one `.portfolio-carousel-image` `<img>` per project (from `imageLink`) into `.portfolio-carousel-images`, and one `.portfolio-title-box` tab per project into `.portfolio-list`; index 0 of each starts with `.is-active`.
- Creates a `createAutoplayController(next)` (from `src/utils/autoplayCarousel.js`) to own the autoplay `setInterval`/resume `setTimeout` (4000ms/20000ms).
- `setActive(index)` toggles `.is-active` on the matching image + tab and updates `.portfolio-more-info`'s `data-project-id`.
- Arrow clicks and title-tab clicks call `goTo()`/`autoplay.registerInteraction()` — the latter stops autoplay and reschedules it to restart after 20s of no further interaction (arrows, tabs, or "More info").
- No-ops if any of the required static containers (`.portfolio-carousel-images`, `.portfolio-list`, the two arrows, `.portfolio-more-info`) are missing, or `dataBase` is empty.

Used by:

- `src/pages/Portfolio/index.js`

### `createAutoplayController()`

File: `src/utils/autoplayCarousel.js`

Signature:

```js
createAutoplayController(advance, { autoplayDelayMs = 4000, resumeDelayMs = 20000 } = {})
```

Returns an object `{ start, stop, registerInteraction, reset }`: `start()` begins calling `advance` on a `setInterval`; `stop()` clears it; `registerInteraction()` stops it and schedules `start()` again after `resumeDelayMs`; `reset()` stops it and clears any pending resume timer (used when a carousel closes/unmounts, e.g. the project-detail dialog).

Used by:

- `src/pages/Portfolio/portfolioCarousel.js` (the main carousel)
- `src/pages/Project/projectDetail.js` (the overlay's image carousel only - the video carousel stays manual)

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

## Utility Functions Used By Components

### `toggleLightMode()`

File: `src/utils/toggleLightMode.js`

Controls the global theme by toggling `.light-mode` on `<html>` and `<body>`. Returns safely if the requested theme button is missing.

### `checkLink()` — removed

Formerly `src/utils/checkLink.js`. Removed when the portfolio card's title stopped being a live-site anchor; its sole caller, `PortfolioItem.js`, has since itself been replaced by `portfolioCarousel.js`.

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
  - `.project-detail-carousel` / `.project-detail-carousel-dots` / `.project-detail-carousel-dot`
  - `.project-detail-description`
  - `.project-detail-video-carousel` / `.project-detail-video-frame` / `.project-detail-video-thumb-btn` / `.project-detail-video-play-icon` / `.project-detail-video-iframe` / `.project-detail-video-title`

## Component Risks

- Most component functions use `innerHTML`, so only trusted local data should be inserted unless escaping/sanitization is added.
- Renderer functions now guard missing target containers, but future renderer code should keep the same pattern.
- `src/pages/Project/index.js` is not loaded (unloaded since Phase 2) and kept only as historical reference; its required DOM structure is absent from the current markup. The real project-detail implementation is `src/pages/Project/projectDetail.js` (Phase 7).
- Chromium's native `<dialog>` focus containment doesn't cycle back to the first focusable element when tabbing past the last one inside `#project-detail` — it can land on `<body>`/the dialog itself for a step. This still fully prevents reaching real page content behind the dialog; see `PROJECT_DETAIL_OVERLAY_DESIGN.md`'s status note.
- Missing `liveLink`/`repoLink` are hidden entirely inside `#project-detail`; the portfolio card itself never renders Source/Live at all. See `PROJECT_DETAIL_OVERLAY_DESIGN.md`'s status note and section 6.
- The video carousel's title text comes from an external API (YouTube oEmbed) and is set via `.textContent`, not `.innerHTML`, so an untrusted/unexpected title string can't inject markup. The fetch itself is wrapped in try/catch — a blocked or failing request just leaves the title blank; the thumbnail and play button still work either way.
