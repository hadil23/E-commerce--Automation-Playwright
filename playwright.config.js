// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Charge les variables du fichier .env (ex : BASE_URL)
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [

    {
        name: 'setup',
        testMatch: '**/auth.setup.spec.ts',
        use: {
            storageState: {
                cookies: [],
                origins: []
            }
        }
    },

    {
        name: 'login',
        testMatch: '**/login.spec.js',
        use: {
            ...devices['Desktop Chrome'],
            storageState: {
                cookies: [],
                origins: []
            }
        }
    },

    {
        name: 'chromium',
        testIgnore: [
            '**/login.spec.js',
            '**/auth.setup.spec.ts'
        ],
        use: {
            ...devices['Desktop Chrome'],
            storageState: 'playwright/.auth/user.json'
        },
        dependencies: ['setup']
    }
]
});