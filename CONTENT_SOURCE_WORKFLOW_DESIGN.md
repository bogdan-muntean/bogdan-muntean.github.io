# Content Source Workflow — Design (Phase 8)

## Purpose

This is a **decision-support planning document only**. It evaluates the four content-source options `PHASES_INFO.md` already lists (repo-controlled JSON, local Excel-to-JSON, Google Sheets-published, GitHub Actions generation) against this project's actual current data model, and recommends an order to adopt them in, if at all. It answers `AI_HANDOFF.md`'s open question about which future content workflow to choose — with a recommendation, not a final implementation decision. Nothing is implemented as a result of this document: no JSON files, no migration, no generation script, no `.github/workflows` file.

The image-hosting options (`PHASES_INFO.md` Options 5–6, public cloud URLs and cloud-image sync) are out of scope here — that's Phase 9.

## 1. Current-state summary

Today, updating content means editing JavaScript directly:

- **Portfolio project**: open `src/data/dataPortfolioItems.js`, add or edit an object in the exported array (`title`, `description`, `imageLink`, `liveLink`, `repoLink`, `photo`, `video`).
- **Timeline entry**: open `src/data/dataTimeline.js`, add or edit an object (`title`, `span`, `timeData`, `text`, `icon`).
- **Work experience entry**: open `src/data/dataWorkexperience.js`, same shape as timeline minus the icon special-casing.
- **Skill**: open `src/pages/AboutMe/addMySkills.js` and edit the internal `skillCategories` array directly inside the renderer module — the one case where content and rendering code live in the same file.

All four are hand-edited JavaScript, committed and deployed like any other code change. This is the baseline every option below moves away from to different degrees — none of that migration happens in this phase.

## 2. Option A — Repo-controlled JSON

**What changes**: the JS arrays in `src/data/*.js` become `.json` files with the same shape (per the Phase 6 schema in `PROJECT_DOCUMENTATION.md`). Editing content means editing a `.json` file instead of a `.js` file — same repository, same commit workflow, but data is no longer interleaved with any executable code.

**Loading mechanism — recommendation: `fetch()` at runtime, not a build-time inlining step.** This project has no bundler and the constraints explicitly say not to add one just for this. A build step that inlines JSON into JS at compile time would need its own new tooling (a script, a new `package.json` step) for no real benefit here — the data is small, and a personal portfolio site has no meaningful latency concern from one extra network request. `fetch()` is a browser built-in, requires zero new dependencies, and keeps data fully decoupled from JS, consistent with how the project already keeps CSS and JS as separate loaded files rather than bundling. Note this introduces no *new* constraint: `fetch()` from `file://` is blocked by CORS in most browsers, but the project already requires serving over HTTP (`npm run serve`, Phase 3) for ES modules to load reliably — that requirement doesn't change.

**Pros specific to this codebase**:
- Zero new dependencies, zero new CI, zero external services.
- Directly builds on Phase 6's schema documentation — the JSON shape is already specified.
- Solves the actual stated pain point (data mixed into `.js` render logic) immediately, especially for skills, which today live inside a renderer module rather than a data file.

**Cons specific to this codebase**:
- Still requires editing a file in the repository and committing/pushing — this does not remove "opening a code editor" from the workflow, only removes JavaScript syntax from what's being edited.
- Hand-written JSON has no comments and is syntax-strict (a missing comma breaks the whole file); some entries currently contain multi-line HTML strings (e.g. portfolio `description`, timeline/skill `icon` markup) which are legal but visually awkward as JSON string values compared to a template literal.

## 3. Option B — Local Excel-to-JSON generation

**Outline of what a generation script would need to do** (not written in this phase): read a `.xlsx` file (would need a small parsing library, e.g. `xlsx`/SheetJS or `exceljs`, as a new devDependency — the project's first *content-authoring* dependency, distinct from `sass`/`@playwright/test`, which are build/test tooling only), map spreadsheet columns to the Phase 6 schema field names, validate that required fields are present and known enum-like fields (e.g. the timeline `icon` field, which must exactly match a literal graduation-cap markup string to get special styling) are recognizable, then write the validated result to `.json` matching Option A's shape.

**Should the `.xlsx` source be committed?** Recommendation: yes, commit it alongside the generated JSON. Without it committed, the generated JSON becomes the only artifact and the actual editable source could live only on one machine — a real risk for a solo-maintained project with no other backup of that file. The tradeoff (binary, non-human-readable diffs in git history) is minor for a single-maintainer personal site. This is a light recommendation, not a hard requirement — it's listed as an open question in Section 8 since it's ultimately a personal workflow preference.

**Pros specific to this codebase**: genuine spreadsheet editing experience; output is still fully static JSON (Option A's loading mechanism applies unchanged); no live runtime dependency on Excel or any external service.

**Cons specific to this codebase**: requires writing and maintaining a generation script and running it manually before every content update (or wiring it into Option D); the same awkward-as-a-spreadsheet-cell problem applies to any field that's really an HTML snippet (icon markup, portfolio `description` HTML) — a non-technical editing experience degrades for exactly the fields that are least simple text today. Mitigating this (e.g. representing `icon` as a short icon-name string that the generation script maps to markup) is a reasonable future idea but is a schema change and is explicitly not decided here.

## 4. Option C — Google Sheets

**Binding constraint, not a choice**: per `PHASES_INFO.md`'s GitHub Pages Constraints, Google Sheets can only ever be an *input to a generation step* — never fetched live by the deployed static site. The site has no backend and must stay static; a live client-side fetch of Sheets data would violate both. This is stated as fixed, not evaluated as one of several options.

**Pros**: easiest content-editing experience of the four (a familiar spreadsheet UI, editable from any device, no local file to manage); no local Excel file to keep in sync.

**Cons** (as `PHASES_INFO.md` already flags, confirmed still applicable): publishing a sheet publicly exposes its full content, not just the fields the site uses — meaningful if the sheet ever contains anything beyond public portfolio data; Google's published-sheet export format has changed before and isn't a stable contract to build long-term automation on; a live browser read (if ever attempted despite the constraint above) risks CORS and format-parsing failures with no fallback. Used correctly (as a generation-step input only), most of these risks move from "the live site breaks" to "a scheduled generation run fails," which is a materially smaller blast radius — but still requires monitoring (Option D's concern).

## 5. Option D — GitHub Actions generation

**Outline of what a workflow would need to do** (no YAML written in this phase): trigger on either a push (e.g., to a committed Excel file) or a schedule (e.g., a nightly cron, useful for a Sheets source that changes independently of any repo push) or a manual `workflow_dispatch`; run a generation step equivalent to Option B's script (or a Sheets-reading equivalent) inside the workflow; then either commit the resulting JSON back to the repository (a bot commit) or build and publish the static output directly via a Pages-deployment action, depending on how GitHub Pages is configured for this repo (branch-based vs. Actions-based deployment — currently branch-based, unconfirmed further; see Section 8).

**Secrets**: only needed if the source is genuinely private — a private Google Sheet (needs a service-account credential or API key stored as a GitHub Actions secret) or an Excel file deliberately kept out of the repository. If the Excel file is committed to this repository (which is already public, matching the `bogdan-muntean.github.io` GitHub Pages user-site convention — see Section 8 for the one assumption this rests on) or the Sheet is public, no secrets are required at all.

**Pros specific to this codebase's current zero-CI state**: fully closes the stated goal — the user edits a spreadsheet or sheet and never touches a code editor or a commit for routine content updates; validates data before publishing rather than trusting a manual step; keeps GitHub Pages fully static regardless of how content is authored.

**Cons specific to this codebase's current zero-CI state**: this project has *no* CI today — Option D is not a small increment on existing automation, it is the first CI this repository would ever have, with its own new failure mode (a broken or silently-failing scheduled run) that needs monitoring the project doesn't currently have any capability for (no alerting, no dashboard, nothing beyond checking the Actions tab manually).

## 6. Recommendation and sequencing

**Adopt Option A first.** The project's actual stated goal, per `AI_HANDOFF.md`, is to avoid editing *live project code* for content updates — not necessarily to avoid the repository entirely. Moving data out of `.js` files (especially skills, which today live inside a renderer module) into plain `.json` already satisfies that goal for near-zero cost: no new dependency, no new service, no CI, and it builds directly on schema work already done in Phase 6. Jumping straight to the most automated option (D) when a much simpler one already solves the stated problem would add real, ongoing operational surface (the project's first-ever CI, secrets management, monitoring) for a benefit — never opening a code editor at all — that may not be worth it for a solo-maintained personal site.

**If Option A later proves insufficient** — specifically, if the friction turns out to be "I don't want to write JSON by hand" rather than "I don't want to touch the repository" — the natural next step is **Option B** (Excel-to-JSON), since it changes only the authoring format (spreadsheet instead of raw JSON) while keeping everything else identical: still local, still on-demand, still zero CI.

**Only if the user specifically wants Sheets-style editing from anywhere** (not just a nicer local file format) **and is willing to take on this project's first CI pipeline** should **Option C (as a generation input) + Option D together** be adopted — as a pair, since Sheets without Actions either means manual exports (no real benefit over Option B) or a live-fetch violation of the static-site constraint; and Actions without a spreadsheet source has nothing meaningfully harder to generate than Option B already covers.

This recommendation is not authorization to implement any of it. Adopting Option A, B, or C+D is each its own future, separately-approved phase.

## 7. Definition-of-readiness checklist

**Before adding a JSON data source** (`PHASES_INFO.md`):

| Requirement | Status |
|---|---|
| Existing JavaScript data schema is documented | **Satisfied** — `PROJECT_DOCUMENTATION.md`, Content Data Schema section (Phase 6). |
| The site has a local dev command | **Satisfied** — `npm run serve` (Phase 3). |
| The team decides whether JSON is authored directly or generated | **Answered by this document** — recommend authored directly (Option A) first; Section 6. |
| Smoke tests can confirm project cards still render from the new source | **Satisfied, mechanism exists** — `tests/rendering.spec.js` (Phase 5) already asserts portfolio/timeline/work-experience/skills render; it would need to keep passing against the new source when implemented, not be rewritten from scratch. |

**Before adding Excel-to-JSON**:

| Requirement | Status |
|---|---|
| JSON schema exists | **Not yet** — depends on Option A being implemented first. |
| Excel column names and validation rules are documented | **Not yet** — this document outlines what a script would validate (Section 3) but does not fix column names, since no JSON schema is implemented yet to map them to. |
| A local or CI generation command is chosen | **Partially** — this document recommends local-first (Section 6); not yet chosen in the sense of an actual command existing. |
| Generated JSON is committed or published as part of a static build | **Recommended, not decided** — Section 3 recommends committing both the `.xlsx` and generated JSON; not yet implemented. |

**Before adding Google Sheets-to-JSON**:

| Requirement | Status |
|---|---|
| Public/private access model is chosen | **Not yet** — genuinely depends on user preference; see Section 8. |
| If private, GitHub Actions secrets are accepted | **Not yet** — depends on the above. |
| If public, exposure of spreadsheet content is acceptable | **Not yet** — depends on user preference; see Section 8. |
| Rate limits and output stability are reviewed | **Partially** — Section 4 restates `PHASES_INFO.md`'s known format-stability risk; no new review performed here. |
| The site remains static and does not need a backend | **Satisfied by design constraint** — Section 4 states this as binding, not optional. |

## 8. Open questions for the user

These cannot be decided by this document and should be answered before any future implementation phase begins:

1. Is your goal really "never touch the repository for content updates," or is "stop editing JavaScript, but a JSON/data file is fine" already enough? This changes whether Option A alone is a satisfying end state or just a stepping stone.
2. For Option B: should the `.xlsx` source file itself be committed to the repository (this document's light recommendation), or would you prefer to keep it local-only and just commit the generated JSON?
3. Do you already have, or want to set up, a Google account and Sheet specifically for this content — or would you rather avoid adding a Google dependency to your workflow entirely? This document does not assume an answer either way.
4. Is this repository public today, and is GitHub Pages deployed from it in branch-based or Actions-based mode? This document assumes "public, branch-based" based on the `bogdan-muntean.github.io` naming convention, but that assumption is unconfirmed and directly affects Option D's secrets/deployment design.
5. Is taking on this project's first CI pipeline (Option D) — with the monitoring burden that implies, since there's currently no alerting of any kind — something you're willing to own, or is a manual local generation step (Option B without D) preferable even if it means remembering to run a command yourself?
