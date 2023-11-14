import { test, expect } from '@playwright/test';

test('wait commands ', async ({ page }) => {
    page.waitForTimeout(5000)// HARD WAIT not recommended
    // page.locator('').waitFor()
    // page.locator('').waitFor({ state: 'visible', timeout: 10000 })
    // await expect(page.locator('')).toContainText('', { timeout: 10000 })


});
