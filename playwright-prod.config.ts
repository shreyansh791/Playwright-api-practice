import { defineConfig, devices } from '@playwright/test';
import type { TestOptions1 } from './test-options';

require('dotenv').config();
// npx playwright test --config=playwright-prod.config.ts
export default defineConfig<TestOptions1>({
  reporter: 'html',
  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',
    headless:false
  },

  projects: [
    {
      name: 'chromium',
    
    }
  ]
});