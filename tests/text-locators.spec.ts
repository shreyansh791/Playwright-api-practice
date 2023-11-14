import { test } from "@playwright/test"

test('locator text', async ({ page }) => {
    await page.goto('https://www.google.com/')
    await page.locator('text=images').click() // working
    // below will look for exact match
    // await page.locator('text="Images"').click() // working

});
