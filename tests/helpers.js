// Shared helpers for the smoke suite.

// Collects browser console errors and uncaught page exceptions so tests can
// assert a page interaction produced none, matching how the site has been
// manually verified throughout the stabilization phases.
function collectConsoleErrors(page) {
    const errors = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") {
            errors.push(msg.text());
        }
    });
    page.on("pageerror", (err) => {
        errors.push(err.message);
    });
    return errors;
}

module.exports = { collectConsoleErrors };
