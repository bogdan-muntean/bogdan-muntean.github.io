# Testing

This project has a small Playwright smoke suite. It drives a real headless Chromium browser against the static site served locally, checking that the page loads without console errors and that the core interactive behaviors still work.

## One-time setup

```sh
npm install
npx playwright install chromium
```

`npm install` adds `@playwright/test` as a devDependency. `npx playwright install chromium` downloads the Chromium browser binary Playwright drives; this is a one-off download (not needed again unless the binary is removed), and is deliberately not part of `npm test` itself so that running the suite never triggers a large download.

## Running the suite

```sh
npm test
```

This runs `playwright test`, which automatically starts `npm run serve` (the Phase 3 local static server, on `http://localhost:8080`), waits for it to respond, runs the suite, and shuts the server down afterward. You do not need to start the server yourself first.

The suite takes roughly 15-20 seconds.

## What the suite covers

- **`tests/page-load.spec.js`** — the page loads with no console errors, and all seven main sections (`#home-section` through `#contact-section`) are present.
- **`tests/rendering.spec.js`** — skills, work experience, timeline, and portfolio cards each render at least one item into their container (`#skills-list`, `.experience-container`, `.timeline-container`, `.portfolio-list`).
- **`tests/mobile-menu.spec.js`** — at a mobile viewport, the hamburger menu opens on click, and closes on menu-link click, outside click, and resize above the mobile breakpoint.
- **`tests/theme-toggle.spec.js`** — clicking the theme button toggles `.light-mode` on `<html>` and `<body>`.
- **`tests/back-to-top.spec.js`** — the back-to-top button appears after scrolling past the threshold and returns the page to the top on click.
- **`tests/portfolio.spec.js`** — clicking a portfolio title tab throws no console error; tabs have accessible labels and no live-site anchor; the first project's image/tab are active on load; the prev/next arrows and title tabs correctly change the active project; autoplay advances on its own after ~4s; clicking an arrow stops autoplay from advancing again immediately.
- **`tests/project-detail.spec.js`** — clicking `.portfolio-more-info` opens the project-detail overlay for the active project (via keyboard too); it closes via the close button, Escape, and backdrop click; focus moves in on open and returns to the trigger on close; Tab never reaches page content behind the overlay; description/media/links are omitted when empty and rendered when present; the overlay renders one image per entry in the project's `images` array.

This is a smoke suite, not exhaustive coverage: it exists to catch broken page load, missing render targets, and console errors, not to validate every visual detail or edge case.

## Configuration notes

- `playwright.config.js` runs a single `chromium` project and sets `fullyParallel: false` — tests within one file run serially (avoids flaky contention when several tests in the same file drive interactive DOM state, e.g. the mobile menu, against the same single-process local dev server), while different spec files still run in parallel across workers.
- The dev server's own stdout/stderr are suppressed in the test run (`stdout`/`stderr: "ignore"` on the `webServer` config) to keep test output readable; Python's `http.server` otherwise logs every asset request.
