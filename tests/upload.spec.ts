import { test, expect } from '@playwright/test';
import path from 'path';

test('file upload', async ({ page }) => {
    // Open url
    await page.goto("https://practice.sdetunicorns.com/cart");
    const filePath = path.join(__dirname, '../test-data/images/401issue.PNG');

    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = page.waitForEvent('filechooser');
            // upload test file
    await page.locator('input#input_1').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    // click the submit button
    await page.locator('#upload_1').click();
    // assertion
    await expect(page.locator('#wfu_messageblock_header_1_1'))
        .toContainText('uploaded successfully');
});


test.describe('Upload File', () => {
    test('should upload a test file', async ({ page }) => {
        // Open url
        await page.goto("https://practice.sdetunicorns.com/cart");

        // provide test file path
        const filePath = path.join(__dirname, '../test-data/images/401issue.PNG');
        console.log("File Path is ", filePath)

        // upload test file
        await page.setInputFiles('input#upfile_1', filePath);

        // click the submit button
        await page.locator('#upload_1').click();

        // assertion
        await expect(page.locator('#wfu_messageblock_header_1_1'))
            .toContainText('uploaded successfully');
    })

    test('should upload a test file on a hidden input field', async ({ page }) => {
        // Open url
        await page.goto("https://practice.automationbro.com/cart/");

        // provide test file path
        const filePath = path.join(__dirname, '../data/logotitle.png');

        // DOM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1');
            if (selector) {
                selector.className = ''
            }
        })

        // upload test file
        await page.setInputFiles('input#upfile_1', filePath); // throws error

        // click the submit button
        await page.locator('#upload_1').click();

        // assertion
        await expect(page.locator('#wfu_messageblock_header_1_1'))
            .toContainText('uploaded successfully');
    })
})