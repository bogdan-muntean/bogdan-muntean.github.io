const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("skills render into #skills-list", async ({ page }) => {
    await expect(
        page.locator("#skills-list").locator(":scope > *")
    ).not.toHaveCount(0);
});

test("work experience renders into .experience-container", async ({
    page,
}) => {
    await expect(
        page.locator(".experience-container").locator(":scope > *")
    ).not.toHaveCount(0);
});

test("timeline renders into .timeline-container", async ({ page }) => {
    await expect(
        page.locator(".timeline-container").locator(":scope > *")
    ).not.toHaveCount(0);
});

test("portfolio cards render into .portfolio-list", async ({ page }) => {
    await expect(
        page.locator(".portfolio-list").locator(":scope > *")
    ).not.toHaveCount(0);
});
