// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",
    // Tests within a file run serially; different files still parallelize
    // across workers. Avoids flaky contention when several tests in the
    // same file drive interactive DOM state (e.g. the mobile menu) against
    // the same single-process local dev server.
    fullyParallel: false,
    reporter: "list",
    use: {
        baseURL: "http://localhost:8080",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: {
        command: "npm run serve",
        url: "http://localhost:8080",
        reuseExistingServer: !process.env.CI,
        timeout: 15_000,
        stdout: "ignore",
        stderr: "ignore",
    },
});
