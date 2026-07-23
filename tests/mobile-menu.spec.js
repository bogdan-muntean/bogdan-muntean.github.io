const { test, expect } = require("@playwright/test");

test.use({ viewport: { width: 375, height: 667 } });

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("opens on nav-icon click", async ({ page }) => {
    await page.locator("#nav-icon").click();
    await expect(page.locator("#nav-icon")).toHaveClass(/open/);
    await expect(page.locator("#menu")).toHaveClass(/open/);
});

test("closes when a menu link is clicked", async ({ page }) => {
    await page.locator("#nav-icon").click();
    await expect(page.locator("#menu")).toHaveClass(/open/);

    await page.locator(".menu-link").first().click();
    await expect(page.locator("#menu")).not.toHaveClass(/open/);
});

test("closes on outside click", async ({ page }) => {
    await page.locator("#nav-icon").click();
    await expect(page.locator("#menu")).toHaveClass(/open/);

    // Click near the bottom of the viewport, clear of the open dropdown
    // (which overlays the top of the page at this breakpoint).
    await page.mouse.click(200, 640);
    await expect(page.locator("#menu")).not.toHaveClass(/open/);
});

test("closes when resized above the mobile breakpoint", async ({ page }) => {
    await page.locator("#nav-icon").click();
    await expect(page.locator("#menu")).toHaveClass(/open/);

    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator("#menu")).not.toHaveClass(/open/);
});
