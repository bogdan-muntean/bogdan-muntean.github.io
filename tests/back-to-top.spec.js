const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("appears after scrolling and returns to top on click", async ({
    page,
}) => {
    const backToTop = page.locator("#back-to-top");
    await expect(backToTop).not.toHaveClass(/show/);

    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(backToTop).toHaveClass(/show/);

    await backToTop.click();
    await expect
        .poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 })
        .toBeLessThan(50);
});
