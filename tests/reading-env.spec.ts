import { test } from "@playwright/test"

test('reading env', async ({ page }) => {

    await page.goto(process.env.URL)

});
