import { test, expect } from "@playwright/test"
test('gets the json from api and adds a new fruit', async ({ page }) => {
    
     // Mock the api call before navigating
    await page.route('**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody[0].name = "Playwright Updated"
        responseBody[0].id = 100
        // Fulfill using the original response, while patching the response body
        // with the given JSON object.
        // await route.fulfill({ response, body: JSON.stringify(responseBody) }); // working 
    //     Below code is not working due to body format not in string 
        // await route.fulfill({ body: responseBody }); // not working
        await route.fulfill({ body: JSON.stringify(responseBody) }); // working
        // await route.fulfill({ response, body: JSON.stringify(responseBody) });  // working

    });

    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Assert that the new fruit is visible
    await expect(page.getByText('Playwright Updated', { exact: true })).toBeVisible();
});