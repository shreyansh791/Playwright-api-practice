import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {

    await page.goto('/');
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await page.screenshot({ path: "screenshots/first.png" })

    await page.locator('.tag-list').nth(1).screenshot({ path: "screenshots/tags.png" })
});