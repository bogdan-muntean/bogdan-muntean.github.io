# Project Detail Overlay — Design (Phase 7)

**Status: Implemented**, per this design, in `src/pages/Project/projectDetail.js`, `src/pages/Project/project-page.scss`, the `<dialog id="project-detail">` markup in `index.html`, and the `.portfolio-image` button conversion in `src/pages/Portfolio/PortfolioItem.js`. Several real deviations from the design found during and after implementation:

1. Chromium's native `<dialog>` focus containment does not cycle back to the first focusable element when tabbing past the last one — it can land on `<body>` or the `<dialog>` element itself for a step first. This still fully satisfies the actual requirement (focus never reaches real page content behind the dialog), just not via a perfect wrap-to-first-element cycle; see the implementation commit for details.
2. The overlay was originally sized as a centered 600px-wide card and, per section 6 below, disabled (not hidden) missing `liveLink`/`repoLink`. A follow-up fix changed both: `.project-detail` is now a full-viewport overlay (`position: fixed; inset: 0; width/height: 100vw/100vh`), and missing `liveLink`/`repoLink` are now omitted entirely from the overlay's link row (unlike the portfolio card, which keeps the dimmed-disabled convention). See section 6's note.
3. The portfolio section was later redesigned again as an image carousel (`src/pages/Portfolio/portfolioCarousel.js`, replacing `PortfolioItem.js`/`addPortfolioItems.js`). The overlay's trigger is no longer `.portfolio-image`/`.portfolio-title-box` — it is now a dedicated `.portfolio-more-info[data-project-id]` button, kept in sync with whichever project is active in the carousel.
4. The overlay itself was then redesigned again: instead of a single detail image, `.project-detail-carousel` renders `item.images` as its own dot-indicator carousel, reusing the main Portfolio carousel's stage/arrow/image styling and (unlike the initial version of this change) also autoplaying every 4s the same way, via a shared `createAutoplayController()` (`src/utils/autoplayCarousel.js`) - paused on interaction, resumed after 20s, stopped/reset on dialog close. The now-unused `photo`/`video` fields and `.project-detail-media` were removed and replaced by a `videos` field (YouTube URLs) feeding a new `.project-detail-video-carousel` below the Source/Live links — one thumbnail/play-button at a time (manual navigation only, no autoplay), with a title (fetched via the public YouTube oEmbed endpoint) linking to the original video, and a click-to-embed `<iframe>` that plays the video in place. Both new carousels are hidden/disabled gracefully when a project has only one image or no videos (true for 3 of the 4 active entries; Fintrack has 3 real images, genuinely exercising the image carousel). A wider hover/focus "zone" around each arrow (a translucent-blue gradient bar) was tried on all three carousels and then explicitly reverted per the site owner's request; arrows are plain absolutely-positioned circular buttons again, with no wrapper element.

The rest of this document is left as originally written, describing the design that was implemented, except where noted.

## Purpose

This is a **planning document only**. It designs the future project-detail overlay — the thing a user sees after clicking a portfolio card for more information — before any of it is built. No overlay code, markup, or styles exist yet as a result of this document. Implementation is a later, separate piece of work that should be reviewed against this design first.

It replaces, by fresh design rather than revival, the legacy `.active`/`#project`/`#portfolio` flow in `src/pages/Project/index.js` and `src/pages/Project/project-page.scss` — both unloaded since Phase 2 and left in the repo for historical reference only. That old flow assumed a section-swap model (hide the portfolio list, show a `#project` section, toggle `.active`) that does not match the current always-rendered, anchor-based single-page layout, and is not resurrected here.

## Current inputs this design is grounded in

- **Trigger surface today**: `src/pages/Portfolio/PortfolioItem.js` renders each card as `.portfolio-item` (with a class suffix `item-${idArrayItem}`, no data attribute — the old `data-more` attribute was removed in Phase 2), containing a `.portfolio-image` background-image `<div>`, a `.portfolio-title` anchor (disabled via `checkLink` when `liveLink` is empty), and two icon links under `.portfolio-links` for Source (`repoLink`) and Live (`liveLink`), each disabled via `checkIcon` when empty. `addPortfolioItems.js` already threads the array index into `PortfolioItem(index, ...)` for every card.
- **Data shape** (documented in `PROJECT_DOCUMENTATION.md`'s Content Data Schema, Phase 6): `title`, `description`, `imageLink`, `liveLink`, `repoLink`, `photo`, `video`. `description`/`photo`/`video` are explicitly reserved for this overlay and are not read by any currently-loaded script.
- **Actual live data today**: `dataPortfolioItems` currently has **4 active entries** (Fintrack, Energy Monitoring System, Buddy Weather App, YourSpecialist) — Task Tracker, Link In Bio, and Todo List were intentionally commented out later, kept as archive content, not deleted. `photo` and `video` are `""` on **all 4** (normalized in Phase 6), and `description` is a non-empty HTML string on only **1 of 4** (YourSpecialist; empty on Fintrack, Energy Monitoring System, Buddy Weather App). This means the "fallback state" this design must handle is not an edge case — it is the majority/default case in the live site today.
- **No router, no state library, no framework** — anything here is vanilla DOM manipulation, consistent with the rest of the codebase.
- **Existing accessibility precedent in this codebase**: `#back-to-top` uses `aria-label="Back to top"` in `index.html`; the mobile menu already closes on outside click (`main.js`) — both are reused as precedent below rather than inventing new conventions.

---

## 1. Trigger behavior

**Element**: convert `.portfolio-image` from a plain `<div>` into a `<button type="button">`, keeping its existing class and background-image styling. Rationale: a `<div>` is not natively focusable or keyboard-operable; a `<button>` is, for free, with no extra ARIA or `tabindex` plumbing. The image is kept as the trigger because it's the most intuitive click target and matches the pre-Phase-2 design's assumption (users clicking the screenshot expecting more detail) without reviving any of that flow's actual code.

**Identifying which project was clicked**: add `data-project-id="${idArrayItem}"` to that button. This reuses the array index already passed into `PortfolioItem(idArrayItem, ...)` today (visible in the existing `item-${idArrayItem}` class) — no new data field, no revived `data-more` name or semantics. At click time, the overlay code reads `data-project-id`, looks up `dataPortfolioItems[id]` fresh, and renders from it.

**Keyboard reachability**: automatic, because it's a real `<button>` — it sits in natural tab order and responds to both Enter and Space. Add `aria-label="View details for ${title}"`, since the button's only visible content is a background image with no text.

## 2. Close behavior

Three ways to close, all present by default:

1. **An explicit close control** inside the overlay (a small "×" icon button, top area) — a mandatory baseline so the overlay is always closable regardless of keyboard/mouse.
2. **Escape key** — expected modal convention.
3. **Backdrop/outside click** — kept for consistency with the mobile menu's existing outside-click-to-close behavior already established in `main.js`, so the overlay behaves like other dismissible UI already on this site.

All three are recommended as the default set, not just the minimum viable one.

## 3. Focus management

- **On open**: move focus to the close button inside the overlay (simple and unambiguous — the "first meaningful content" varies per project since `description`/`photo`/`video` are frequently empty, so anchoring to the always-present close button avoids that ambiguity). If native `<dialog>` is used (see Section 4), `showModal()` already manages initial focus placement per the browser's default behavior; the close button remains a reasonable explicit target either way.
- **While open**: focus must not leave the overlay (no keyboard trap escape to background content) — this is WCAG 2.1 SC 2.4.3 / 2.1.2 territory. Native `<dialog>` + `showModal()` provides this automatically; a manual implementation would require hand-rolling a focus trap (tracking first/last focusable elements, intercepting Tab/Shift+Tab) — a meaningfully larger amount of custom JS in a codebase with no library to lean on.
- **On close**: return focus to the specific trigger `<button>` that opened the overlay (store a reference to that element at open time, call `.focus()` on it when closing) — not just "the page," and not a generic `document.body` fallback.

## 4. Markup and CSS approach

**Recommendation: native `<dialog>` with `showModal()`, not a hand-rolled `div[role="dialog"]`.**

| | Native `<dialog>` | Manual ARIA `div` |
|---|---|---|
| Focus trap | Free, via `showModal()` | Must hand-roll (first/last focusable tracking, Tab interception) |
| Escape-to-close | Free (`cancel` event) | Must add a `keydown` listener |
| Backdrop | Free (`::backdrop` pseudo-element, stylable in CSS) | Must build and position an extra wrapper element |
| `role`/`aria-modal` | Implicit, spec-correct | Must set manually and keep in sync |
| Browser support | All evergreen browsers since ~2022 | N/A (works everywhere) |
| Extra JS needed | Least | Most |

Given this project's zero-dependency, no-framework constraint, `<dialog>` measurably reduces the custom JavaScript needed to get accessibility behavior *right* — the two or three interaction bugs a hand-rolled modal most commonly gets wrong (focus escaping, Escape not wired, backdrop click not detected) are handled by the browser instead. This is a personal portfolio site with no stated legacy-browser requirement, so the modern-baseline choice is safe. This recommendation is fairly clear-cut, not a close call.

**On `project-page.scss`**: do not reuse it as a starting point. It contains only `.project-back` styling (a text-link "back to projects" control that doesn't fit a close-button/Escape/backdrop model) plus a full byte-for-byte duplicate of `variables.scss`'s `:root`/`.light-mode`/media-query block (confirmed in Phase 4 — an artifact of the file's original unknown compile process, not unique content). It also still uses the older `@import` syntax. When implementation happens, write fresh SCSS targeting `<dialog>`-specific selectors (e.g. `dialog#project-detail`, `dialog::backdrop`), using `@use` for `variables.scss` like the rest of the codebase, and following the existing icon-button visual language already established by `.theme-btn` for the close control rather than reviving `.project-back`'s text-link styling. `project-page.scss`/`.css` stay in the repo as historical reference; `project-page.css` remains unlinked from `index.html` exactly as Phase 2 left it, until the new implementation is ready and links its own new stylesheet.

## 5. Data contract

No new field is needed. The overlay reads exactly the fields already documented in Phase 6's Content Data Schema: `title`, `description`, `imageLink` (reused as the detail-view image — no separate larger-image field proposed), `liveLink`, `repoLink`, `photo`, `video`.

## 6. Fallback states

Since every live entry today has empty `photo`/`video` and 3 of the 4 active entries have empty `description`, the overlay must look complete and intentional with only `title` + `imageLink` + `liveLink`/`repoLink` populated — that is the common case, not an edge case:

- **`description` empty** → omit the description block entirely (no empty paragraph/container rendered).
- **`photo` / `video` empty** → omit those sections/elements entirely; never render an `<img>`/`<video>` with an empty `src`.
- **`liveLink` / `repoLink` empty** → **(updated post-implementation)** the corresponding Source/Live row is omitted from the overlay entirely — not rendered at all, rather than shown dimmed/disabled as originally designed here. The card itself is unchanged and still uses the dimmed-disabled `checkIcon`/`checkLink` convention; this hide-when-missing behavior applies only inside the overlay.

## 7. No-JS behavior

The trigger `<button>` has no `href` or form action, and `<dialog>.showModal()` is JS-only — there is no declarative way to open a `<dialog>` without JavaScript. If JS fails to load or throws before attaching the click handler, **the button simply does nothing** when clicked. This is acceptable *only* because it changes nothing about the card's existing, independently-functional links: `.portfolio-title`'s anchor (to `liveLink`, when present) and the Source/Repo `.portfolio-links` anchors are real `<a href>` elements today and must remain so — completely unaffected by whether the overlay trigger works. The overlay is a progressive enhancement layered on top of already-fully-functional links, never a replacement for them. This must be carried into implementation as a hard requirement, not an afterthought: implementing the overlay must not touch how those anchors render or behave.

## 8. Testing note (for future implementation — not written now)

When the overlay is built, the smoke suite (currently 13 tests in `tests/`, see `TESTING.md`) should gain coverage for:

- Opens via click on the trigger button.
- Opens via keyboard (Tab to the trigger, activate with Enter/Space).
- Closes via Escape.
- Closes via backdrop click.
- Closes via the explicit close button.
- Focus moves into the overlay on open.
- Focus returns to the specific trigger button (not just anywhere on the page) on close.
- Tab cycles only within the overlay while open (no escape to background content).
- Renders correctly with all optional fields empty — today's actual data shape for every live entry.
- Renders correctly with `description`/`photo`/`video` populated (a currently-hypothetical entry, since none exist yet).
- Disabled `liveLink`/`repoLink` inside the overlay render with the same disabled styling as the card.

## 9. Definition-of-ready checklist

Restating `PHASES_INFO.md`'s "Before adding the project-detail overlay" checklist:

| Requirement | Status |
|---|---|
| The stale `src/pages/Project/index.js` architecture is resolved | **Satisfied** — Phase 2 unloaded it from `index.html`; kept in the repo for reference only. |
| The project data schema is documented | **Satisfied** — `PROJECT_DOCUMENTATION.md`'s Content Data Schema section (Phase 6). |
| Portfolio image click behavior has an approved design | **Proposed by this document (Sections 1-4) — pending your approval.** This phase can produce the design, not approve it; implementation should not start until you've reviewed and signed off. |
| Missing optional project fields have defined fallbacks | **Satisfied** — Section 6 above. |
| Accessibility expectations for overlay/dialog behavior are documented | **Satisfied** — Sections 1-3 above. |

Four of five items are fully satisfied by this document; the fifth (approval) is inherently a decision for you, not something a design document can check off on its own.
