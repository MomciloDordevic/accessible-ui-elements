import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Helpful while learning: opens an HTML report after the run (especially when something fails)
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:5173/accessible-ui-elements/',
    trace: 'on-first-retry', // records a “time travel” trace if a test fails once and retries
  },
  webServer: {
    command: 'npm run dev -- --host --port 5173',
    url: 'http://localhost:5173/accessible-ui-elements/',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
