// Fetches and parses a JSON data file at runtime (Phase 8, Option A —
// see CONTENT_SOURCE_WORKFLOW_DESIGN.md). Callers resolve `url` with
// `new URL("../../data/xxx.json", import.meta.url)` so the path stays
// correct regardless of where the page is served from.
export async function loadJsonData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    return response.json();
}
