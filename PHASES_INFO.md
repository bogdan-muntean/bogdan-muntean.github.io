# Phases Info

## Purpose

This document is a stabilization roadmap for the current static portfolio/resume website before adding new functionality. It is based on the actual repository files inspected on July 15, 2026.

The project must remain simple, static, and compatible with GitHub Pages. Future content-management ideas such as JSON, Excel, Google Sheets, Google Drive, Google Cloud, Cloudinary, or other cloud asset services are documented here only as future architecture options. They are not implemented in the current codebase.

## Current Project State

The site is a single-page static portfolio/resume website. The browser loads `index.html`, compiled CSS files, static assets, and vanilla JavaScript ES modules.

Confirmed runtime entry points:

- `index.html`
- `src/main.js`
- `src/pages/AboutMe/index.js`
- `src/pages/Portfolio/index.js`
- `src/pages/Project/index.js`

Confirmed runtime stylesheet order in `index.html`:

1. External Google Fonts links.
2. Multiple external Font Awesome stylesheet links.
3. `src/assets/variables.css`
4. `src/assets/style.css`
5. `src/pages/Home/home-section.css`
6. `src/pages/AboutMe/about-me-section.css`
7. `src/pages/Portfolio/portfolio-page.css`
8. `src/pages/Project/project-page.css`
9. `src/pages/Contact/contact-page.css`

Confirmed module script order in `index.html`:

1. `src/main.js`
2. `src/pages/AboutMe/index.js`
3. `src/pages/Portfolio/index.js`
4. `src/pages/Project/index.js`

## What Works

- `index.html` defines the main visible sections:
  - `#home-section`
  - `#about-me-section`
  - `#my-skills-section`
  - `#work-experience-section`
  - `#timeline-section`
  - `#portfolio-section`
  - `#contact-section`
- Desktop and mobile navigation anchors point to existing section IDs.
- `src/main.js` handles mobile menu behavior, back-to-top behavior, and initializes theme toggling.
- Phase 1 safety guards are present in `src/main.js` so mobile menu behavior only wires up when `#nav-icon` and `#menu` exist.
- `src/utils/toggleLightMode.js` returns safely when `.theme-btn` is missing.
- `src/pages/AboutMe/addMySkills.js` renders skills into `#skills-list` when the container exists.
- `src/pages/AboutMe/addWorkexperienceItems.js` returns safely when the requested container is missing.
- `src/pages/AboutMe/addTimelineItems.js` returns safely when the requested container is missing.
- `src/pages/Portfolio/addPortfolioItems.js` returns safely when the requested container is missing.
- `src/utils/checkLink.js` and `src/utils/checkIcon.js` treat empty and whitespace-only strings as disabled links.
- Portfolio data currently lives in `src/data/dataPortfolioItems.js`.
- Work experience data currently lives in `src/data/dataWorkexperience.js`.
- Timeline data currently lives in `src/data/dataTimeline.js`.
- Skill data currently lives inside `src/pages/AboutMe/addMySkills.js`.
- The site has no backend, database, bundler, framework, or runtime external data fetches.

## What Is Fragile

- The current app depends on browser-loaded ES modules but has no documented local static server command.
- `package.json` only defines a placeholder `npm test` script that exits with failure.
- SCSS and compiled CSS both exist, but no Sass compile command is defined.
- The browser loads `.css` files directly; editing `.scss` alone will not affect the site.
- Several renderers use `innerHTML` with local JavaScript data.
- `src/pages/Portfolio/PortfolioItem.js` still renders links by building attribute strings from helpers.
- `src/pages/Portfolio/PortfolioItem.js` assigns `data-more` to `.portfolio-image`, even though the current project-detail architecture is not active.
- `src/pages/AboutMe/addMySkills.js` stores skill data inside a renderer module instead of a dedicated data file.
- Contact/about/home text is hardcoded in `index.html`.
- Several portfolio details are empty strings or placeholder whitespace in `src/data/dataPortfolioItems.js`.
- `src/data/dataTimeline.js` and `src/data/dataWorkexperience.js` contain visible mojibake/encoding artifacts.
- `index.html` repeats `id="email"` on multiple contact spans.
- `index.html` links to `src/assets/docs/Recommendation_Letters.pdf`, but the repository contains `src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf`.

## What Is Stale

- `src/pages/Project/index.js` still represents a legacy project-detail flow.
- `src/pages/Project/index.js` expects `.active`, `#project`, and `#portfolio`, but current `index.html` has no `.active` section, no `#project`, and uses `#portfolio-section`.
- Phase 1 guards prevent `src/pages/Project/index.js` from attaching broken handlers when the legacy DOM is absent, but the project-detail feature is still unresolved.
- `src/utils/pageTransitions.js` is unused and depends on `.active-btn`, `.active`, and `data-id`, none of which are used by current navigation.
- `src/pages/Portfolio/portfolio-page.scss` and `src/pages/Portfolio/portfolio-page.css` include `#portfolio`, while runtime markup uses `#portfolio-section`.
- `src/pages/Contact/contact-page.scss` and `src/pages/Contact/contact-page.css` include `#contact`, while runtime markup uses `#contact-section` plus `.contact`.
- `src/pages/Project/project-page.css` is loaded by `index.html`, but there is no current `#project` section.

## What Is Unclear

- The exact Sass compiler and command used to create the committed CSS and CSS maps is unclear from current files.
- The official deployment workflow is unclear. The repository name and context indicate GitHub Pages, but no `.github` workflow or Pages config file exists.
- Whether the site should support direct `file://` opening is unclear. ES modules usually work more reliably through a static HTTP server.
- Whether internal project-detail UI is truly desired is unclear. The current request says not to add it yet.
- Whether commented-out portfolio entries in `src/data/dataPortfolioItems.js` should remain as archive content is unclear.
- Whether contact/home/about text should stay in `index.html` or move to data files later is unclear.
- Whether Google Drive, Google Cloud, Cloudinary, or repository-hosted assets should become the long-term image source is not decided.
- Whether external spreadsheet data should be read live by the browser or generated into static files before deployment is not decided.

## Architectural Problems To Solve First

### Stale Project-Detail Flow

The current project-detail script is guarded, but not architecturally resolved. It should be removed, disabled more explicitly, or redesigned later with matching requirements and markup.

Relevant files:

- `index.html`
- `src/pages/Project/index.js`
- `src/pages/Project/project-page.scss`
- `src/pages/Project/project-page.css`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/data/dataPortfolioItems.js`

### CSS/SCSS Workflow Inconsistency

The repository contains SCSS source files, compiled CSS files, and CSS source maps. The browser loads CSS files. No Sass script exists.

Relevant files:

- `package.json`
- `src/assets/*.scss`
- `src/assets/*.css`
- `src/pages/**/*.scss`
- `src/pages/**/*.css`

### Missing Local Development Workflow

There is no `dev`, `start`, or `serve` script. This makes browser verification and future smoke tests harder.

Relevant files:

- `package.json`
- `README.md`
- `AI_HANDOFF.md`

### Package Metadata Inconsistencies

Confirmed mismatches:

- `package.json` has `"main": "app.js"`, but `app.js` does not exist.
- `package.json` has `"directories": { "doc": "docs" }`, but `docs/` does not exist.
- `package.json` and `package-lock.json` declare `license: "ISC"`, while `LICENSE.md` contains MIT License text.
- package repository/bugs/homepage URLs use `bogdanmuntean.github.io`, while the project context and site URL use `bogdan-muntean.github.io`.

### Lack Of Tests

No test files or working test script exist. `npm test` is a placeholder failure.

### Hardcoded Vs Data-Driven Content

Current data-driven content:

- Portfolio cards: `src/data/dataPortfolioItems.js`
- Timeline: `src/data/dataTimeline.js`
- Work experience: `src/data/dataWorkexperience.js`
- Skills: internal `skillCategories` array inside `src/pages/AboutMe/addMySkills.js`

Current hardcoded content:

- Home hero text in `index.html`
- About text in `index.html`
- Contact details in `index.html`
- Download links in `index.html`

### Stale Selectors

Selector drift exists between CSS/JS and HTML:

- `#portfolio` vs `#portfolio-section`
- `#contact` vs `#contact-section`
- `.active` legacy state vs anchor-based sections
- `.active-btn` legacy button state vs current anchor navigation

### Documentation Drift

Some existing docs still describe pre-Phase-1 code behavior. Documentation should be updated when code stabilization changes are made.

## Recommended Order Of Work

1. Phase 0 - Documentation/code reality check.
2. Phase 1 - Runtime safety and dead-code cleanup.
3. Phase 2 - Resolve stale project-detail architecture without adding the new overlay yet.
4. Phase 3 - Clean package metadata and local development workflow.
5. Phase 4 - Define and add Sass workflow.
6. Phase 5 - Add minimal smoke tests.
7. Phase 6 - Data model preparation for future project improvements.
8. Phase 7 - Prepare project-detail overlay architecture.
9. Phase 8 - Future optional static content source workflow.
10. Phase 9 - Future optional external image hosting/cloud asset workflow.

This order keeps the deployed static site stable, removes stale assumptions before building on them, and delays external content sources until the local architecture is clean enough to support them.

Practical note: the local static server from Phase 3 should be set up as the first hands-on step, because every earlier phase's manual verification needs the site running over HTTP (ES modules do not load reliably from `file://`). Doing this early does not change the roadmap order; it only front-loads the verification tooling.

## Phase 0 - Documentation/Code Reality Check

Status: In progress through current documentation work.

Goal:

- Make sure documentation matches actual files before more code changes are made.

Why it matters:

- Future developers and AI assistants need a reliable map of the project before changing behavior.

Files likely involved:

- `README.md`
- `PROJECT_DOCUMENTATION.md`
- `ARCHITECTURE.md`
- `AI_HANDOFF.md`
- `CODEBASE_MAP.md`
- `COMPONENTS.md`
- `NEXT_STEPS.md`
- `PHASES_INFO.md`
- `index.html`
- `package.json`
- `src/**/*.js`
- `src/**/*.scss`
- `src/**/*.css`

What Codex should inspect before editing:

- Full documentation list from `rg --files -g "*.md"`.
- Runtime script and stylesheet order in `index.html`.
- Current `package.json` scripts and metadata.
- Current source files, not only docs.

What should be changed:

- Correct documentation that claims stale behavior.
- Add `PHASES_INFO.md`.
- Document known mismatches and open questions.

What should NOT be changed:

- Do not change application behavior.
- Do not add new data sources.
- Do not add project-detail UI.

Risk level:

- Low. Documentation-only.

Manual verification checklist:

- Confirm all referenced files exist.
- Confirm no docs claim a feature is implemented when it is only planned.
- Confirm GitHub Pages/static constraints are clearly stated.

Documentation updates required:

- Update docs that mention removed imports, unguarded renderers, or stale project behavior incorrectly.

Suggested git commit message:

- `Document stabilization roadmap`

## Phase 1 - Runtime Safety And Dead-Code Cleanup

Status: Mostly completed in current code, but should still receive browser verification.

Goal:

- Make existing JavaScript fail safely when expected DOM elements are missing.

Why it matters:

- The site should not break if a section is temporarily removed, renamed, or loaded differently during future cleanup.

Files likely involved:

- `src/main.js`
- `src/utils/toggleLightMode.js`
- `src/utils/pageTransitions.js`
- `src/utils/checkLink.js`
- `src/utils/checkIcon.js`
- `src/pages/AboutMe/addMySkills.js`
- `src/pages/AboutMe/addWorkexperienceItems.js`
- `src/pages/AboutMe/addTimelineItems.js`
- `src/pages/Portfolio/addPortfolioItems.js`
- `src/pages/Project/index.js`

What Codex should inspect before editing:

- DOM selectors in `index.html`.
- All `addEventListener`, `querySelector`, `getElementById`, `innerHTML`, and `appendChild` usage.
- Whether a helper is imported or called.

What should be changed:

- Keep DOM guards around mobile menu, theme toggle, render containers, and stale project-detail behavior.
- Keep whitespace-only link values disabled in `checkLink()` and `checkIcon()`.
- Consider removing or documenting `src/utils/pageTransitions.js` only after confirming it is unused.

What should NOT be changed:

- Do not redesign portfolio cards.
- Do not add project-detail UI.
- Do not change visual content unless fixing a confirmed broken reference.

Risk level:

- Low to medium.

Manual verification checklist:

- Page loads without console errors.
- Mobile menu opens and closes.
- Mobile menu closes on menu link click.
- Mobile menu closes on outside click.
- Mobile menu closes on resize above `800px`.
- Theme toggle works.
- Back-to-top appears after scroll and scrolls smoothly to top.
- Skills render.
- Work experience renders.
- Timeline renders.
- Portfolio cards render.
- Clicking portfolio images does not throw runtime errors.
- Disabled portfolio links still appear disabled.

Documentation updates required:

- Update `AI_HANDOFF.md`, `PROJECT_DOCUMENTATION.md`, `ARCHITECTURE.md`, `COMPONENTS.md`, and `README.md` when safety changes alter previous known limitations.

Suggested git commit message:

- `Add runtime safety guards`

## Phase 2 - Resolve Stale Project-Detail Architecture Without Adding New Feature Yet

Goal:

- Decide what to do with the current guarded but stale project-detail files before implementing any new overlay or detail experience.

Why it matters:

- Future project-detail functionality should not be built on the old `.active`, `#project`, and `#portfolio` assumptions unless those are deliberately restored.

Files likely involved:

- `index.html`
- `src/pages/Project/index.js`
- `src/pages/Project/project-page.scss`
- `src/pages/Project/project-page.css`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/pages/Portfolio/addPortfolioItems.js`
- `src/data/dataPortfolioItems.js`

What Codex should inspect before editing:

- Whether `src/pages/Project/index.js` is loaded by `index.html`.
- Whether any live markup contains `.active`, `#project`, `#portfolio`, `.more`, or `.project-back`.
- Whether `data-more` is used anywhere except legacy detail behavior.
- Whether `project-page.css` affects current visible UI.

What should be changed:

- Choose one stabilization path:
  - Keep the guarded file but document it as inactive legacy code.
  - Stop loading `src/pages/Project/index.js` until detail UI is designed.
  - Remove `data-more` only if no future project-detail click behavior will depend on it.
  - Keep project CSS only if it is intentionally reserved for future work.
- Fold in these low-risk, static-safe correctness fixes in the same commit window:
  - Fix the broken download href in `index.html` from `./src/assets/docs/Recommendation_Letters.pdf` to the existing `./src/assets/docs/Recommendation_Letters_Bogdan_Muntean.pdf`.
  - Resolve the duplicate `id="email"` on three contact spans in `index.html`; `#email` is not referenced by any JS or CSS, so use unique IDs or a shared class.

What should NOT be changed:

- Do not add the project-detail overlay yet.
- Do not create a modal yet.
- Do not create a new `#project` section yet.
- Do not move portfolio data to JSON in this phase.

Risk level:

- Medium. It touches a currently stale interaction surface.

Manual verification checklist:

- Portfolio cards still render.
- Source/live link states still work.
- Portfolio image clicks do not throw console errors.
- No visible layout regression in the portfolio section.
- The Recommendation Letters download link opens the existing PDF.
- The contact section has no duplicate element IDs.

Documentation updates required:

- Update `AI_HANDOFF.md`, `ARCHITECTURE.md`, `PROJECT_DOCUMENTATION.md`, `COMPONENTS.md`, and `CODEBASE_MAP.md`.

Suggested git commit message:

- `Resolve inactive project detail architecture`

## Phase 3 - Clean Package Metadata And Local Development Workflow

Goal:

- Make the repository easier to run and less misleading.

Why it matters:

- A static site with ES modules should have a documented HTTP-based local workflow for reliable testing.

Files likely involved:

- `package.json`
- `package-lock.json`
- `README.md`
- `AI_HANDOFF.md`
- optionally `SETUP.md`

What Codex should inspect before editing:

- Existing `package.json` and `package-lock.json`.
- Whether the user wants zero dependencies or accepts small devDependencies.
- Whether GitHub Pages deployment should remain branch-based or use GitHub Actions later.

What should be changed:

- Remove or correct `"main": "app.js"` after confirming package entry metadata is not needed.
- Remove or correct `"directories": { "doc": "docs" }` if `docs/` remains absent.
- Reconcile `license` with `LICENSE.md`.
- Correct repository/bugs/homepage URL spelling after user confirmation.
- Add a local static server command if the user approves the tool.

What should NOT be changed:

- Do not add a bundler.
- Do not add a backend.
- Do not replace GitHub Pages with another deployment target.

Risk level:

- Low to medium.

Manual verification checklist:

- The documented local command serves `index.html`.
- ES modules load over HTTP.
- CSS, images, PDFs, and JS modules load.
- `npm test` is either still clearly documented as a placeholder or replaced only when tests exist.

Documentation updates required:

- Update `README.md`, `AI_HANDOFF.md`, and possibly `SETUP.md`.

Suggested git commit message:

- `Clean package metadata and local setup`

## Phase 4 - Define And Add Sass Workflow

Goal:

- Establish a safe source-of-truth workflow for SCSS and compiled CSS.

Why it matters:

- The project has SCSS and CSS, but the browser only loads CSS. Without a command, style changes can silently fail to affect the site.

Files likely involved:

- `package.json`
- `package-lock.json`
- `src/assets/style.scss`
- `src/assets/variables.scss`
- `src/pages/**/*.scss`
- generated `src/**/*.css`
- generated `src/**/*.css.map`
- `README.md`
- `AI_HANDOFF.md`

What Codex should inspect before editing:

- Current CSS output and source maps.
- Whether existing CSS was generated with Dart Sass or another compiler.
- Existing use of `@use` and `@import`.
- CSS selectors that do not match current HTML.

What should be changed:

- Add a documented Sass command if the user accepts a Sass devDependency.
- Decide whether to keep CSS maps committed.
- Normalize future style edits so SCSS and CSS are updated together.
- Fix stale selectors in a separate style cleanup commit after visual checks.

What should NOT be changed:

- Do not redesign the UI.
- Do not change the color system unless requested.
- Do not add a bundler solely for Sass.

Risk level:

- Medium. First recompilation can create broad generated CSS diffs.

Manual verification checklist:

- Compile command runs.
- CSS files loaded by `index.html` are generated.
- Source maps are present or intentionally removed.
- Desktop and mobile layouts still match the previous design.
- Theme toggle still works in dark and light modes.

Documentation updates required:

- Update `README.md`, `AI_HANDOFF.md`, and `ARCHITECTURE.md`.

Suggested git commit message:

- `Add Sass build workflow`

## Phase 5 - Add Minimal Smoke Tests

Goal:

- Add a small verification layer that catches broken page load, missing render targets, and critical UI failures.

Why it matters:

- The site currently has no tests, and `npm test` is a placeholder failure.

Files likely involved:

- `package.json`
- test files under a new `tests/` or similar folder
- optional test config
- `README.md`
- `AI_HANDOFF.md`
- optional `TESTING.md`

What Codex should inspect before editing:

- Local server command from Phase 3.
- Whether browser automation dependencies are acceptable.
- GitHub Pages/static hosting constraints.

What should be changed:

- Add smoke checks for page load and core interactions.
- Replace `npm test` only after tests actually exist.
- Keep tests focused on the static site.

What should NOT be changed:

- Do not add a heavy test stack.
- Do not add backend test infrastructure.
- Do not make tests depend on private external services.

Risk level:

- Medium because it introduces tooling.

Manual verification checklist:

- Test command starts or uses the static site.
- Tests pass locally.
- No console errors on initial page load.
- Skills, work experience, timeline, and portfolio cards render.
- Mobile menu, theme toggle, and back-to-top behavior pass.
- Disabled links remain disabled.

Documentation updates required:

- Update `README.md`, `AI_HANDOFF.md`, and add `TESTING.md` if setup is non-trivial.

Suggested git commit message:

- `Add static site smoke tests`

## Phase 6 - Data Model Preparation For Future Project Improvements

Goal:

- Prepare current content structures for future project-detail and static external data workflows without changing the data source yet.

Why it matters:

- The user wants to avoid editing live project code for every content update later. That is easier if the current data shape is documented and cleaned first.

Files likely involved:

- `src/data/dataPortfolioItems.js`
- `src/data/dataTimeline.js`
- `src/data/dataWorkexperience.js`
- `src/pages/AboutMe/addMySkills.js`
- `src/pages/Portfolio/PortfolioItem.js`
- docs

What Codex should inspect before editing:

- Existing active and commented-out portfolio objects.
- Required fields in renderers.
- Empty values and whitespace placeholders.
- Which content is hardcoded in `index.html`.

What should be changed:

- Define a stable project data schema in documentation first.
- Decide which fields are required, optional, or future-only.
- Clean placeholder values where safe.
- Move skills to `src/data` only if the project wants consistent data ownership.
- Document which content should remain static in `index.html`.
- Review the portfolio card `Source`/`Live` links in `src/pages/Portfolio/PortfolioItem.js`; the icons appear swapped (the GitHub icon is on `Source` and the display icon is on `Live`). Confirm the intended pairing before changing anything.
- Fix `TimelineItem()` in `src/pages/AboutMe/TimelineItem.js` so it does not inject `undefined` as an attribute when `changeAcademicIconColor()` returns nothing for non-graduation icons.

What should NOT be changed:

- Do not migrate to JSON yet unless a later phase explicitly approves it.
- Do not connect Excel or Google Sheets yet.
- Do not redesign portfolio cards.
- Do not remove commented portfolio data without user confirmation.

Risk level:

- Low to medium.

Manual verification checklist:

- Current cards still render.
- Disabled link behavior remains correct.
- All referenced images exist.
- Visible text is reviewed after any encoding cleanup.

Documentation updates required:

- Update `PROJECT_DOCUMENTATION.md`, `ARCHITECTURE.md`, `AI_HANDOFF.md`, and `COMPONENTS.md`.

Suggested git commit message:

- `Document and clean content data model`

## Phase 7 - Prepare Project-Detail Overlay Architecture

Design doc: `PROJECT_DETAIL_OVERLAY_DESIGN.md` — implemented; see `src/pages/Project/projectDetail.js`.

Goal:

- Design the future project-detail overlay before implementing it.

Why it matters:

- The current project-detail code is stale. A future overlay should be accessible, static-compatible, and based on a stable data model.

Files likely involved:

- `index.html`
- `src/pages/Project/index.js`
- `src/pages/Project/project-page.scss`
- `src/pages/Project/project-page.css`
- `src/pages/Portfolio/PortfolioItem.js`
- `src/data/dataPortfolioItems.js`
- docs

What Codex should inspect before editing:

- Final project data schema from Phase 6.
- Current portfolio card markup.
- Accessibility requirements for dialogs or overlays.
- Keyboard and focus behavior.
- Whether images/videos are local assets or external URLs.

What should be changed:

- Document the overlay contract first:
  - trigger behavior
  - close behavior
  - focus management
  - data fields
  - fallback states
  - no-JS behavior
- Then implement only after the user approves the design.

What should NOT be changed:

- Do not add the overlay in this planning phase.
- Do not fetch live external data from the overlay.
- Do not depend on a backend.

Risk level:

- Medium to high when eventually implemented.

Manual verification checklist:

- Click and keyboard open/close behavior works.
- Escape closes the overlay if implemented as a dialog.
- Focus is managed safely.
- Portfolio cards still work with disabled links.
- Overlay handles missing optional fields.
- No console errors.

Documentation updates required:

- Update `COMPONENTS.md`, `ARCHITECTURE.md`, `PROJECT_DOCUMENTATION.md`, and `AI_HANDOFF.md`.

Suggested git commit message:

- `Plan project detail overlay architecture`

## Phase 8 - Future Optional Static Content Source Workflow

Design doc: `CONTENT_SOURCE_WORKFLOW_DESIGN.md`.

Goal:

- Decide whether project metadata should remain in repo-controlled files or be generated from an external spreadsheet-like source.

Why it matters:

- The user wants to update project content without editing live project code every time.

Files likely involved later:

- future static data file such as `src/data/projects.json`
- future generation script, if approved
- future GitHub Actions workflow, if approved
- `package.json`
- docs

What Codex should inspect before editing:

- Final data schema from Phase 6.
- GitHub Pages deployment mode.
- User's preferred content-editing workflow.
- Whether secrets are acceptable in GitHub Actions.

What should be changed later:

- Option A: Keep everything in repo-controlled JSON.
- Option B: Add a local Excel-to-JSON generation script.
- Option C: Use Google Sheets published data as a public source.
- Option D: Use GitHub Actions to generate static JSON from a spreadsheet before deployment.

What should NOT be changed now:

- Do not add JSON migration yet.
- Do not add Excel parsing yet.
- Do not connect Google Sheets yet.
- Do not add secrets or workflows yet.

Risk level:

- Medium to high depending on external services and automation.

Manual verification checklist:

- Generated static JSON validates against the schema.
- Site works from generated data with no backend.
- GitHub Pages output contains all required static files.
- Failed generation does not publish broken data silently.

Documentation updates required:

- Add setup and content-editing docs when chosen.
- Update `AI_HANDOFF.md` with the selected source-of-truth.

Suggested git commit message:

- `Plan static content data workflow`

## Phase 9 - Future Optional External Image Hosting/Cloud Asset Workflow

Design doc: `IMAGE_HOSTING_WORKFLOW_DESIGN.md`.

Goal:

- Decide how project images should be managed if the user wants to update images outside the codebase.

Why it matters:

- Images are currently local repository assets. External image hosting can reduce manual repo edits, but it adds reliability and permission risks.

Files likely involved later:

- `src/data/dataPortfolioItems.js` or future static JSON
- future generation/sync script
- future GitHub Actions workflow
- docs

What Codex should inspect before editing:

- Current image sizes and names in `src/assets/portfolioImages`.
- Future project data schema image fields.
- GitHub Pages browser loading behavior for external URLs.
- Public permissions, URL stability, and CORS behavior for the chosen provider.

What should be changed later:

- Option A: Keep images in the repo under `src/assets/portfolioImages`.
- Option B: Reference public external image URLs directly in static data.
- Option C: Sync/download external images into the repo or build artifact during a GitHub Actions workflow.
- Option D: Use a free image asset service such as Cloudinary free tier, if it fits usage limits and public URL stability needs.

What should NOT be changed now:

- Do not add Google Drive or Google Cloud integration yet.
- Do not replace local images yet.
- Do not add cloud credentials.
- Do not rely on private URLs from client-side code.

Risk level:

- Medium to high.

Manual verification checklist:

- Images load from GitHub Pages in production.
- URLs are stable and public.
- No CORS/browser blocking.
- No hotlinking restrictions.
- Reasonable file sizes and performance.
- Graceful fallback when an image URL breaks.

Documentation updates required:

- Add content-editing instructions for the selected image workflow.
- Update `README.md`, `AI_HANDOFF.md`, and `PROJECT_DOCUMENTATION.md`.

Suggested git commit message:

- `Plan external image asset workflow`

## Definition Of Ready For New Features

Before adding the project-detail overlay, these should be true:

- The stale `src/pages/Project/index.js` architecture is resolved.
- The project data schema is documented.
- Portfolio image click behavior has an approved design.
- Missing optional project fields have defined fallbacks.
- Accessibility expectations for overlay/dialog behavior are documented.

Before adding a JSON data source, these should be true:

- Existing JavaScript data schema is documented.
- The site has a local dev command.
- The team decides whether JSON is authored directly or generated.
- Smoke tests can confirm project cards still render from the new source.

Before adding Excel-to-JSON, these should be true:

- JSON schema exists.
- Excel column names and validation rules are documented.
- A local or CI generation command is chosen.
- Generated JSON is committed or published as part of a static build.

Before adding Google Sheets-to-JSON, these should be true:

- Public/private access model is chosen.
- If private, GitHub Actions secrets are accepted.
- If public, exposure of spreadsheet content is acceptable.
- Rate limits and output stability are reviewed.
- The site remains static and does not need a backend.

Before adding external cloud-hosted images, these should be true:

- Provider URLs are stable and browser-loadable.
- Permissions are public but safe.
- CORS and hotlinking behavior are verified.
- Fallback behavior is defined for broken images.
- The data model supports alt text and image metadata.

Before adding smoke tests, these should be true:

- A local static server command exists.
- Expected visible sections and critical interactions are defined.
- The test tool is approved.

Before adding Sass automation, these should be true:

- The team agrees SCSS is the source of truth.
- The chosen Sass compiler is documented.
- Generated CSS and map commit policy is decided.

## GitHub Pages Constraints

- GitHub Pages serves static files.
- Do not add a backend or database directly to the GitHub Pages site.
- Client-side JavaScript can load static files, public CDN assets, and public URLs, but it cannot safely use private credentials.
- Future data improvements should remain static-compatible.
- Excel should be considered later only as a source that generates static JSON.
- Google Sheets should be considered later only as:
  - a public/static-compatible source, or
  - an input to a build/generation step.
- External image hosting should be considered later only if links are stable, public, safe, and compatible with browser loading from GitHub Pages.
- GitHub Actions can be considered later to generate or sync static files before deployment, but no workflow exists now.

## Future Content-Management Direction

Desired future workflow:

1. The user edits a spreadsheet or Google Sheet for project metadata.
2. The user uploads or replaces project images in a cloud folder or asset service.
3. The site consumes static generated data or public image links.
4. The user does not need to manually edit project code for every content change.

This is realistic in principle, but it should be introduced gradually after the site is stable.

### Option 1 - Keep Everything In Repo-Controlled JSON

Summary:

- Move project metadata from JavaScript arrays to static JSON committed to the repo.

Pros:

- Simple.
- GitHub Pages compatible.
- No external service dependency.
- Easy to test.
- Good first step before Excel or Sheets.

Cons:

- The user still edits repository files.
- Requires careful JSON syntax.

Best use:

- Safest first data-source improvement after the data schema is stable.

### Option 2 - Local Excel-To-JSON Generation

Summary:

- User edits an Excel file locally.
- A script converts it to static JSON.
- Generated JSON is committed or deployed.

Pros:

- Spreadsheet editing experience.
- Static-compatible output.
- No live browser dependency on Excel.

Cons:

- Requires a generation script and validation.
- Requires the user to run a command unless automated.
- Requires deciding whether the Excel source file is committed.

Best use:

- Good if the user prefers local file editing and simple manual generation.

### Option 3 - Google Sheets Published To Web

Summary:

- User edits Google Sheets.
- The site or a generation step reads published/public data.

Pros:

- Easy content editing.
- No local Excel files.
- Can be static-compatible if transformed into JSON.

Cons:

- Public publishing may expose all sheet content.
- Published formats can change.
- Browser-side direct reads can hit CORS or format issues.
- Runtime dependency on Google availability if loaded live.

Best use:

- Better as an input to a generation step than as a live browser dependency.

### Option 4 - GitHub Actions Conversion Workflow

Summary:

- A manual or scheduled GitHub Actions workflow reads a spreadsheet/source and writes static JSON/images before GitHub Pages deploys.

Pros:

- Keeps GitHub Pages static.
- Can validate data before publishing.
- Can avoid making the browser fetch private sources.
- User can update content without editing app code.

Cons:

- Adds CI complexity.
- Private sources need secrets.
- Workflow failures must be monitored.

Best use:

- Strong long-term option after local dev, schema, and tests exist.

### Option 5 - Public Cloud-Hosted Image URLs

Summary:

- Project data references public image URLs from a cloud provider or asset service.

Pros:

- User can replace images without changing repo assets.
- Reduces repository image churn.

Cons:

- URL stability varies.
- Public permissions must be managed carefully.
- CORS, hotlinking, rate limits, and privacy can break production loading.
- Google Drive sharing links are often not ideal direct image URLs.

Best use:

- Feasible with a service that provides stable direct image URLs and predictable browser behavior.

### Option 6 - Sync Cloud Images Into Static Build Output

Summary:

- Images live in a cloud folder/source.
- A local script or GitHub Actions workflow downloads/syncs them into the static site output.

Pros:

- Production site still serves stable local/static image paths.
- Avoids browser hotlink/CORS issues.
- Supports validation before deploy.

Cons:

- Adds automation complexity.
- Requires credentials if the cloud folder is private.
- Needs naming and cleanup rules.

Best use:

- Most robust long-term approach if external image management becomes important.

### Notes On Specific Services

Google Drive:

- Feasible only with caution.
- Shared Drive links are not always stable direct image URLs.
- Public permissions and direct-image serving need careful testing.
- Better as a source for a sync/generation workflow than as direct browser image hosting.

Google Sheets:

- Feasible in principle.
- Safest as a source that generates static JSON.
- Public published sheets can work but expose data and may have format/rate-limit risks.

Google Cloud:

- Feasible, especially for public static assets.
- May introduce billing, IAM, and configuration complexity.
- Should wait until simpler options are evaluated.

Cloudinary or similar asset services:

- Feasible in principle.
- Can provide stable direct image URLs and transformations.
- Free tier limits and account dependency must be reviewed before choosing.

GitHub-hosted assets:

- Simple and reliable for GitHub Pages.
- Requires repository commits for image updates unless automated.
- Best current baseline.

## Final Recommendation

What should be done next:

- Finish documentation consistency updates.
- Then implement Phase 2: resolve the stale project-detail architecture without adding the new overlay.
- In the same early stabilization window, fix the broken recommendation-letter PDF href in `index.html` after user confirmation or as a small verified bug fix.
- Add a local static server workflow before larger browser-facing work.

What should wait:

- Project-detail overlay implementation.
- JSON migration.
- Excel-to-JSON workflow.
- Google Sheets integration.
- Google Drive or cloud image integration.
- Smoke test tooling until a local server command exists.
- Sass automation until package metadata and local workflow are cleaned.

What should not be done:

- Do not add a backend or database for GitHub Pages.
- Do not add a framework or bundler to solve problems that static files and small scripts can handle.
- Do not make the browser depend on private spreadsheets or private cloud folders.
- Do not rely on unstable Google Drive sharing URLs for production images without testing.

Most promising future content workflow:

- Start with a documented static JSON schema after the current JS data model is cleaned.
- Later, generate that JSON from either local Excel or Google Sheets.
- Use GitHub Actions only after the static site has a local dev command and smoke tests.
- Keep images repo-hosted at first; later evaluate Cloudinary-style direct public URLs or a GitHub Actions sync process that copies cloud images into static deploy output.
