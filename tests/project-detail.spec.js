const { test, expect } = require("@playwright/test");
const { collectConsoleErrors } = require("./helpers");

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("opens via click and populates the correct project", async ({
    page,
}) => {
    const errors = collectConsoleErrors(page);

    await page.locator(".portfolio-image").first().click();

    const dialog = page.locator("#project-detail");
    await expect(dialog).toHaveJSProperty("open", true);
    await expect(page.locator("#project-detail-title")).toHaveText(
        "Fintrack - Budget Tracker App"
    );

    expect(errors).toEqual([]);
});

test("opens via keyboard (Enter on the focused trigger)", async ({
    page,
}) => {
    await page.locator(".portfolio-image").first().focus();
    await page.keyboard.press("Enter");

    await expect(page.locator("#project-detail")).toHaveJSProperty(
        "open",
        true
    );
});

test("closes via the explicit close button", async ({ page }) => {
    await page.locator(".portfolio-image").first().click();
    await page.locator(".project-detail-close").click();

    await expect(page.locator("#project-detail")).toHaveJSProperty(
        "open",
        false
    );
});

test("closes via Escape", async ({ page }) => {
    await page.locator(".portfolio-image").first().click();
    await page.keyboard.press("Escape");

    await expect(page.locator("#project-detail")).toHaveJSProperty(
        "open",
        false
    );
});

test("closes via backdrop click", async ({ page }) => {
    await page.locator(".portfolio-image").first().click();
    await expect(page.locator("#project-detail")).toHaveJSProperty(
        "open",
        true
    );

    // A corner of the viewport is outside the dialog's content box but still
    // within the dialog element's own backdrop-covered area.
    await page.mouse.click(5, 5);

    await expect(page.locator("#project-detail")).toHaveJSProperty(
        "open",
        false
    );
});

test("focus moves into the overlay on open and returns to the trigger on close", async ({
    page,
}) => {
    const trigger = page.locator(".portfolio-image").first();
    await trigger.click();

    await expect(page.locator(".project-detail-close")).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(trigger).toBeFocused();
});

test("Tab never reaches real page content behind the overlay", async ({
    page,
}) => {
    // Chromium's native <dialog> focus containment doesn't necessarily
    // cycle back to the first focusable element - tabbing past the last one
    // can land on <body> or the <dialog> element itself for a step before
    // returning to dialog content. That's fine: the actual requirement is
    // that focus never reaches a real interactive element *behind* the
    // dialog (nav links, the menu, theme toggle, back-to-top, etc.).
    await page.locator(".portfolio-image").first().click();

    const dialog = page.locator("#project-detail");
    for (let i = 0; i < 6; i++) {
        await page.keyboard.press("Tab");
        const reachedBackgroundContent = await dialog.evaluate((el) => {
            const active = document.activeElement;
            const isDialogOrBody =
                active === el || active === document.body;
            return !isDialogOrBody && !el.contains(active);
        });
        expect(reachedBackgroundContent).toBe(false);
    }
});

test("renders with description/media omitted when empty (Fintrack, today's real data)", async ({
    page,
}) => {
    await page.locator(".portfolio-image").first().click();

    await expect(page.locator(".project-detail-description")).toBeHidden();
    await expect(page.locator(".project-detail-media")).toBeHidden();
});

test("renders the description when populated (YourSpecialist)", async ({
    page,
}) => {
    await page.locator(".portfolio-image").nth(3).click();

    await expect(page.locator("#project-detail-title")).toHaveText(
        "YourSpecialist"
    );
    const description = page.locator(".project-detail-description");
    await expect(description).toBeVisible();
    await expect(description).toContainText("Medical Locator site project");
});

test("disabled/active link styling matches the card's own convention", async ({
    page,
}) => {
    // Fintrack: liveLink empty, repoLink set.
    await page.locator(".portfolio-image").first().click();
    const links = page.locator("#project-detail .portfolio-links a");
    await expect(links.nth(0)).toHaveClass("active-icon");
    await expect(links.nth(1)).toHaveClass("disable-icon");
});
