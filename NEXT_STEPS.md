# Next Steps

## Status Update

Phase 1 runtime safety work has since been implemented in the current codebase. Mobile menu wiring, theme toggle wiring, renderer mount points, stale project-detail behavior, and whitespace-only portfolio links now have safety guards. This file remains useful as the original improvement analysis, but `PHASES_INFO.md` is the current stabilization roadmap.

## Scope

This document is a safe technical improvement plan for the current static portfolio/resume website. It is based on the documentation files plus a fresh inspection of the actual repository files.

No application logic has been changed as part of this plan.

## Current Project Health

The project is a small static website with a clear runtime entry point: `index.html`. The site loads committed CSS files, external Google Fonts and Font Awesome CSS, and JavaScript ES modules from `src`.

Overall health: usable but fragile. The main single-page portfolio/resume experience is likely functional because the visible HTML sections and most dynamic render targets exist. The largest confirmed problem is the stale project-detail flow in `src/pages/Project/index.js`, which targets DOM elements that are not present in the current `index.html`.

## Is The Website Likely Functional?

Likely functional:

- Static sections in `index.html` should render: Home, About Me, My Skills, Work Experience, Timeline, Portfolio, and Contact.
- Anchor navigation should work because desktop and mobile links target existing section IDs such as `#home-section`, `#portfolio-section`, and `#contact-section`.
- Skills should render into `#skills-list` from `src/pages/AboutMe/addMySkills.js`.
- Work experience should render into `.experience-container` from `src/data/dataWorkexperience.js`.
- Timeline items should render into `.timeline-container` from `src/data/dataTimeline.js`.
- Portfolio cards should render into `.portfolio-list` from `src/data/dataPortfolioItems.js`.
- The theme toggle should work while `.theme-btn` exists.
- The back-to-top button should work while `#back-to-top` exists.

Previously likely broken, now guarded but still unresolved:

- Clicking a portfolio image no longer should throw from `src/pages/Project/index.js` because the script is guarded when legacy project-detail DOM is missing. The project-detail feature remains inactive/stale because no `.active`, `#project`, or `#portfolio` structure exists in `index.html`.
- Project detail rendering cannot complete because `#project` does not exist.
- Returning from project detail cannot work because `#portfolio` does not exist; the current section ID is `#portfolio-section`.

Unclear without browser verification:

- Whether direct `file://` opening works consistently with ES module scripts. `index.html` uses `<script type="module">`, and no local server script exists.
- Whether all Font Awesome icons render correctly with the current multiple CDN stylesheet links.

## Stable Parts

- `index.html` is the clear runtime entry point.
- Static content and section anchors are straightforward.
- The data-driven sections use simple arrays and synchronous DOM rendering.
- Assets referenced by active portfolio data are present under `src/assets/portfolioImages`.
- The PDF download targets exist under `src/assets/docs`.
- The CSS files loaded by `index.html` exist and have matching `.css.map` files.

## Fragile Parts

- Many scripts assume required DOM elements exist before using them.
- Several modules use `innerHTML` with values from JavaScript data objects.
- Link helpers treat only exactly `""` as empty; whitespace such as `" "` is treated as a real value.
- Several data fields use `" "` for empty `photo` and `video` fields.
- Several `description` values in `src/data/dataPortfolioItems.js` are empty template strings.
- `src/main.js` no longer imports `pageTransitions`; that unused import was removed during the Phase 1 safety pass, so `src/main.js` now imports only `toggleLightMode`.
- `src/utils/pageTransitions.js` depends on `.active`, `.active-btn`, and `data-id`, which the current HTML does not use.
- `src/pages/Portfolio/portfolio-page.scss` and `.css` include `#portfolio`, but the current HTML uses `#portfolio-section`.
- `src/pages/Contact/contact-page.scss` and `.css` include `#contact`, but the current HTML uses `#contact-section` with `class="contact"`.
- `package.json` has package metadata inconsistencies: `main` is `app.js`, but no `app.js` exists; `license` is `ISC`, while `LICENSE.md` is MIT; repository/bug/homepage URLs use `bogdanmuntean.github.io`, while repo/docs paths elsewhere use `bogdan-muntean.github.io`.

## Stale Or Broken Areas

### Confirmed `src/pages/Project/index.js` Issue

Files inspected:

- `index.html`
- `src/pages/Project/index.js`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/data/dataPortfolioItems.js`

What the current code does:

- `src/pages/Portfolio/PortfolioItem.js` renders each portfolio image with `class="portfolio-image"` and `data-more="${idArrayItem}"`.
- `index.html` loads `src/pages/Portfolio/index.js`, then loads `src/pages/Project/index.js`.
- `src/pages/Project/index.js` selects `.more,.portfolio-image` and attaches click handlers.
- Inside the click handler, `src/pages/Project/index.js` expects:
  - an element matching `.active`
  - an element with `id="project"`
  - an element with `id="portfolio"`
  - valid project detail data at `dataPortfolioItems[button.dataset.more]`

What `index.html` actually contains:

- `#portfolio-section`, not `#portfolio`.
- No `#project` section.
- No section with class `.active`.
- No `.more` elements.

Why the behavior is broken:

- The first click on `.portfolio-image` will attempt `document.querySelector(".active").classList.remove("active")`.
- Because no `.active` element exists in the current markup, `document.querySelector(".active")` returns `null`.
- Calling `.classList` on `null` throws a runtime error.
- Even if that were guarded, `document.querySelector("#project")` would return `null`, so `#project` could not be activated or populated.
- The back button code later expects `#portfolio`, but the current portfolio section is `#portfolio-section`.

Recommended decision:

- Remove or disable the current project-detail flow first. It is stale relative to the current single-page anchor layout.
- Do not redesign it immediately unless there is a clear product requirement for internal project details.
- If project details are desired later, redesign the feature deliberately as one of:
  - a real `#project` section with matching navigation/state classes,
  - an accessible modal/dialog,
  - an inline expandable card,
  - separate static project pages.

The safest near-term action is to stop loading `src/pages/Project/index.js` or make the handler inert until matching markup and requirements exist.

## JavaScript Safety Review

### Missing Null Checks

- `src/main.js`
  - Assumes `#nav-icon` exists before `navIcon.addEventListener(...)`.
  - Assumes `#menu` exists before `mobileMenu.classList...`.
  - Assumes `.menu-link` elements can use `navIcon` and `mobileMenu`.
  - Guards `#back-to-top`, but the earlier navigation code can fail before that guard is reached.

- `src/utils/toggleLightMode.js`
  - Assumes `document.querySelectorAll(classBtn)[0]` exists.

- `src/pages/AboutMe/addMySkills.js`
  - Assumes `#skills-list` exists.

- `src/pages/AboutMe/addWorkexperienceItems.js`
  - Assumes the selector passed in resolves to an element.

- `src/pages/AboutMe/addTimelineItems.js`
  - Assumes the selector passed in resolves to an element.

- `src/pages/Portfolio/addPortfolioItems.js`
  - Assumes `.portfolio-list` exists.

- `src/pages/Project/index.js`
  - Assumes `.active`, `#project`, `.project-back`, and `#portfolio` exist.

### `innerHTML` Usage

Current `innerHTML` usage appears in:

- `src/pages/AboutMe/WorkexperienceItem.js`
- `src/pages/AboutMe/TimelineItem.js`
- `src/pages/AboutMe/addMySkills.js`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/pages/Project/index.js`

Risk level is moderate. The data is local and trusted today, but future edits can accidentally inject malformed markup or unsafe HTML. The project detail script also injects `description`, `photo`, and `video` fields directly.

### Unused Imports And Stale Functions

- `src/main.js` no longer imports `pageTransitions`; that unused import was removed during the Phase 1 safety pass, so `src/main.js` now imports only `toggleLightMode`.
- `src/utils/pageTransitions.js` appears stale because the current `index.html` does not use `.active`, `.active-btn`, or `data-id`.
- `src/pages/Project/index.js` appears stale because it assumes the same missing active-section model.

### Duplicated Or Similar Logic

- `src/pages/AboutMe/addWorkexperienceItems.js` and `src/pages/AboutMe/addTimelineItems.js` are nearly identical renderer loops.
- `src/utils/checkLink.js` and `src/utils/checkIcon.js` are nearly identical link-attribute helpers.

This duplication is not urgent, but it makes future behavior fixes easier to miss in one place.

### Fragile Link Handling

- `checkLink()` and `checkIcon()` disable links only when the value is exactly `""`.
- Whitespace strings such as `" "` are treated as active links.
- Disabled links are still rendered as `<a>` elements without `href`.
- `src/pages/Portfolio/PortfolioItem.js` uses `Source` with `fa-display`, and `Live` with `fab fa-github`; this looks reversed or at least unclear from current code.
- Most active portfolio items have `liveLink: ""`, so live links render disabled by class.

## Styling Workflow Review

### Current Styling Setup

- `index.html` loads `.css` files directly.
- `.scss` source files exist beside the compiled CSS workflow:
  - `src/assets/variables.scss`
  - `src/assets/style.scss`
  - `src/pages/Home/home-section.scss`
  - `src/pages/AboutMe/about-me-section.scss`
  - `src/pages/Portfolio/portfolio-page.scss`
  - `src/pages/Project/project-page.scss`
  - `src/pages/Contact/contact-page.scss`
- Matching `.css` and `.css.map` files exist for each SCSS/CSS pair.
- The `.css` files include `sourceMappingURL` comments.
- No Sass compiler command exists in `package.json`.
- No dependency such as `sass` exists in `package.json`.

### Important Consequence

Changing `.scss` alone will not affect the browser. The browser loads only the committed `.css` files.

### Additional Styling Findings

- `src/pages/Portfolio/portfolio-page.scss` uses `#portfolio`, but `index.html` uses `#portfolio-section`.
- `src/pages/Contact/contact-page.scss` uses `#contact`, but `index.html` uses `#contact-section` and `class="contact"`.
- Some SCSS files use `@use`; `src/pages/Project/project-page.scss` and `src/pages/Contact/contact-page.scss` use older `@import`.
- `index.html` loads several Font Awesome versions/stylesheets and repeated Google Font families.

### Safest Styling Workflow Going Forward

1. Treat SCSS as source and CSS as generated runtime output.
2. Until a Sass script exists, update both SCSS and compiled CSS in the same change.
3. Add a minimal Sass workflow before larger style work.
4. Avoid adding a bundler unless the project gains requirements that static files plus a Sass script cannot satisfy.
5. After a Sass workflow exists, document the exact command in `README.md` and `AI_HANDOFF.md`.

## Documentation Consistency Review

Accurate compared to code:

- The docs correctly describe the app as static HTML/CSS/SCSS/vanilla JS.
- The docs correctly identify no backend, no bundler, no declared dependencies, and no real test setup.
- The docs correctly identify `src/pages/Project/index.js` as stale/broken relative to `index.html`.
- The docs correctly state that CSS files, not SCSS files, are loaded by the browser.

Incomplete or should be corrected:

- Add the stale CSS selector detail: `#portfolio` in `src/pages/Portfolio/portfolio-page.scss` does not match `#portfolio-section` in `index.html`.
- Add the stale/extra contact selector detail: `#contact` exists in contact SCSS/CSS, while the runtime ID is `#contact-section`.
- Add the package metadata inconsistencies: `main: "app.js"` without `app.js`, `license: "ISC"` vs `LICENSE.md` MIT, and repository URL spelling mismatch.
- Optionally mention the empty `.agents` directory if the codebase map is intended to include every root folder.
- Keep the warning that Sass compile workflow is unclear.

`AI_HANDOFF.md` should be updated with the newly confirmed stale CSS selector and package metadata details because those affect future AI/developer work.

## Recommended Next Phases

### Phase 1: Safety Fixes And Null Checks

Goal:

- Make existing scripts fail safely when expected DOM elements are missing.

Files likely involved:

- `src/main.js`
- `src/utils/toggleLightMode.js`
- `src/pages/AboutMe/addMySkills.js`
- `src/pages/AboutMe/addWorkexperienceItems.js`
- `src/pages/AboutMe/addTimelineItems.js`
- `src/pages/Portfolio/addPortfolioItems.js`
- `src/pages/Project/index.js`, only if still loaded

Risk level:

- Low to medium. Behavior should stay the same when elements exist.

Manual verification:

- Desktop navigation still scrolls to sections.
- Mobile menu opens, closes on link click, closes on outside click, and closes on resize above 800px.
- Theme toggle still toggles light mode.
- Back-to-top button still appears after scroll and scrolls to top.
- Skills, work experience, timeline, and portfolio cards still render.

Tests/docs:

- Add/update documentation only if behavior changes.
- Good first candidate for future smoke tests.

### Phase 2: Decide And Fix Or Remove Project-Detail Flow

Goal:

- Resolve the broken `src/pages/Project/index.js` behavior.

Files likely involved:

- `index.html`
- `src/pages/Project/index.js`
- `src/pages/Project/project-page.scss`
- `src/pages/Project/project-page.css`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/data/dataPortfolioItems.js`

Risk level:

- Medium. Current code is broken on portfolio image click, but removing or redesigning it changes intended interactions.

Recommended path:

- Remove/disable the current project-detail script first unless internal project details are explicitly required.
- If required, redesign with matching markup and accessible behavior rather than trying to revive the old `.active` model blindly.

Manual verification:

- Clicking portfolio image does not throw console errors.
- Source links still open.
- Live links are visually disabled when no live link exists.
- If a new detail UI is added, back/close behavior works and keyboard users can operate it.

Tests/docs:

- Update `AI_HANDOFF.md`, `PROJECT_DOCUMENTATION.md`, `ARCHITECTURE.md`, and `COMPONENTS.md`.
- Add a smoke test later for clicking portfolio cards.

### Phase 3: Add Local Dev Script Or Static Server

Goal:

- Provide a verified way to run the ES-module static site locally over HTTP.

Files likely involved:

- `package.json`
- `package-lock.json`, only if a dependency is added
- `README.md`
- `AI_HANDOFF.md`

Risk level:

- Low if using a minimal static server script.
- Medium if adding dependencies.

Manual verification:

- Site opens locally from the documented URL.
- JS modules load without browser `file://` restrictions.
- Assets, PDFs, images, and CSS load correctly.

Tests/docs:

- Document the exact command only after it exists and is verified.

### Phase 4: Add Sass Workflow

Goal:

- Make SCSS the clear source of truth and regenerate CSS consistently.

Files likely involved:

- `package.json`
- `package-lock.json`
- all `*.scss`
- generated `*.css`
- generated `*.css.map`
- `README.md`
- `AI_HANDOFF.md`

Risk level:

- Medium. A first Sass recompile may change formatting or compiled output broadly.

Manual verification:

- Compare generated CSS output before/after.
- Confirm every CSS file loaded by `index.html` is regenerated.
- Confirm visual layout is unchanged on desktop and mobile.
- Confirm source maps still point to the expected SCSS files.

Tests/docs:

- Document the Sass command.
- Add a note that SCSS-only edits are incomplete unless CSS is regenerated.

### Phase 5: Add Smoke Tests

Goal:

- Catch broken rendering, missing elements, and console errors.

Files likely involved:

- `package.json`
- test config/files if a test tool is selected
- `README.md`
- `AI_HANDOFF.md`
- possibly `TESTING.md`

Risk level:

- Medium because this introduces a test dependency/tool.

Manual verification:

- Test runner launches the static site.
- Smoke tests check:
  - no major console errors on page load
  - skills render
  - work experience renders
  - timeline renders
  - portfolio cards render
  - theme toggle works
  - mobile menu toggles
  - back-to-top works

Tests/docs:

- Replace the placeholder `npm test` script with a real test command only after tests exist.
- Add `TESTING.md` if test setup is non-trivial.

### Phase 6: Content And Data Cleanup

Goal:

- Clean stale data, encoding artifacts, and metadata without changing design.

Files likely involved:

- `src/data/dataPortfolioItems.js`
- `src/data/dataTimeline.js`
- `src/data/dataWorkexperience.js`
- `src/pages/AboutMe/addMySkills.js`
- `package.json`
- `LICENSE.md`, if license metadata is reconciled
- docs as needed

Risk level:

- Low for metadata/data cleanup if reviewed carefully.
- Medium if visible content changes materially.

Manual verification:

- Check all visible text for encoding artifacts.
- Confirm all portfolio screenshots still load.
- Confirm live/source links are correct.
- Confirm package metadata matches the actual repository and license decision.

Tests/docs:

- Update docs when metadata, commands, or content ownership conventions change.

## Suggested Order Of Work

1. Add null checks and prevent project-detail runtime errors.
2. Decide whether project-detail behavior should exist.
3. Remove/disable or redesign project-detail behavior.
4. Add a local static server script.
5. Add a Sass workflow.
6. Add smoke tests.
7. Clean content/data/package metadata.

This order keeps user-visible behavior stable while reducing the chance that later style or feature work is built on stale assumptions.
