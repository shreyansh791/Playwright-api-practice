import { test, expect } from '@playwright/test';
import data from "../test-data/data.json"

test.beforeEach(async ({ page }) => {
  // we need to create mock configuration
  // we need to add the code here before we go to main page this is very important concept
  // when  we want to create a mock we  need to configure it inside the playwright framework before browser make a call to certain API otherwise playwright won't know which API to intercept.
  // Routing provides the capability to modify network requests that are made by a page.
  await page.route('https://conduit.productionready.io/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(data)
    })
  })
  await page.goto('https://angular.realworld.io/');
});

test('has title', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit')
});