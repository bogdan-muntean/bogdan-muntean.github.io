const { test, expect } = require("@playwright/test");
const { collectConsoleErrors } = require("./helpers");

test("clicking a portfolio image throws no console error", async ({
    page,
}) => {
    // Regression guard for the stale project-detail flow (Phase 1 guard,
    // Phase 2 unload): a portfolio image click must never throw.
    const errors = collectConsoleErrors(page);
    await page.goto("/");

    await page.locator(".portfolio-image").first().click();

    expect(errors).toEqual([]);
});

test("portfolio item with no live link renders as disabled", async ({
    page,
}) => {
    await page.goto("/");

    const firstItem = page.locator(".portfolio-item").first();
    await expect(firstItem.locator(".portfolio-title a.disable-title")).toBeVisible();
    await expect(
        firstItem.locator(".portfolio-links a.disable-icon")
    ).toHaveCount(1);
});
