const { test, expect } = require("@playwright/test");
const { collectConsoleErrors } = require("./helpers");

test("loads with no console errors and all main sections present", async ({
    page,
}) => {
    const errors = collectConsoleErrors(page);

    await page.goto("/");

    await expect(page).toHaveTitle(/Bogdan Muntean/);

    const sectionIds = [
        "#home-section",
        "#about-me-section",
        "#my-skills-section",
        "#work-experience-section",
        "#timeline-section",
        "#portfolio-section",
        "#contact-section",
    ];
    for (const id of sectionIds) {
        await expect(page.locator(id)).toBeVisible();
    }

    expect(errors).toEqual([]);
});
