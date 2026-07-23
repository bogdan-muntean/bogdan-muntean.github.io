const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("toggles light mode on and off", async ({ page }) => {
    const html = page.locator("html");
    const body = page.locator("body");

    await expect(html).not.toHaveClass(/light-mode/);
    await expect(body).not.toHaveClass(/light-mode/);

    await page.locator(".theme-btn").click();
    await expect(html).toHaveClass(/light-mode/);
    await expect(body).toHaveClass(/light-mode/);

    await page.locator(".theme-btn").click();
    await expect(html).not.toHaveClass(/light-mode/);
    await expect(body).not.toHaveClass(/light-mode/);
});
