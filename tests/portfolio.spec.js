const { test, expect } = require("@playwright/test");
const { collectConsoleErrors } = require("./helpers");

test("clicking a portfolio title tab throws no console error", async ({
    page,
}) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/");

    await page.locator(".portfolio-title-box").first().click();

    expect(errors).toEqual([]);
});

test("portfolio title tab has an accessible label and no direct live-site link", async ({
    page,
}) => {
    await page.goto("/");

    const firstTab = page.locator(".portfolio-title-box").first();
    await expect(firstTab).toHaveAttribute("aria-label", /Show project/);
    await expect(
        firstTab.locator("a.active-title, a.disable-title")
    ).toHaveCount(0);
});

test("the first project's image and title tab are active on load", async ({
    page,
}) => {
    await page.goto("/");

    await expect(
        page.locator(".portfolio-carousel-image.is-active")
    ).toHaveCount(1);
    await expect(
        page.locator(".portfolio-carousel-image").first()
    ).toHaveClass(/is-active/);
    await expect(
        page.locator(".portfolio-title-box").first()
    ).toHaveClass(/is-active/);
});

test("clicking the next arrow advances the active project", async ({
    page,
}) => {
    await page.goto("/");

    // Scoped by aria-label since .portfolio-carousel-arrow-next is also
    // reused by the project-detail overlay's own image/video carousels.
    await page.getByLabel("Next project").click();

    await expect(
        page.locator(".portfolio-carousel-image").nth(1)
    ).toHaveClass(/is-active/);
    await expect(page.locator(".portfolio-title-box").nth(1)).toHaveClass(
        /is-active/
    );
    await expect(
        page.locator(".portfolio-carousel-image").first()
    ).not.toHaveClass(/is-active/);
});

test("clicking a title tab makes that project's image active", async ({
    page,
}) => {
    await page.goto("/");

    await page.locator(".portfolio-title-box").nth(3).click();

    await expect(page.locator(".portfolio-carousel-image").nth(3)).toHaveClass(
        /is-active/
    );
    await expect(page.locator(".portfolio-title-box").nth(3)).toHaveClass(
        /is-active/
    );
    await expect(page.locator(".portfolio-more-info")).toHaveAttribute(
        "data-project-id",
        "3"
    );
});

test("autoplay advances to the next project on its own", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".portfolio-title-box").nth(1)).toHaveClass(
        /is-active/,
        { timeout: 5000 }
    );
});

test("clicking an arrow stops autoplay from advancing again immediately", async ({
    page,
}) => {
    await page.goto("/");

    // Scoped by aria-label since .portfolio-carousel-arrow-next is also
    // reused by the project-detail overlay's own image/video carousels.
    await page.getByLabel("Next project").click();
    await expect(page.locator(".portfolio-title-box").nth(1)).toHaveClass(
        /is-active/
    );

    // If autoplay kept running, index 2 would become active well within 4s.
    await page.waitForTimeout(4500);
    await expect(page.locator(".portfolio-title-box").nth(1)).toHaveClass(
        /is-active/
    );
});
