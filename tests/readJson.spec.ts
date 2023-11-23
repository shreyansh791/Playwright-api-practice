import {test,expect} from "@playwright/test"
const testData = JSON.parse(JSON.stringify(require("../test-data/readjson.json")));
test('read json file', async ({ page }) => {
    console.log("testData ", testData.username)
    await page.goto("https://freelance-learn-automation.vercel.app/login")

    await page.locator("//input[@id='email1']").fill(testData.username)
    await page.locator("//input[@id='password1']").fill(testData.password)
    console.log("testData ", testData.address.area)
});

const testData2 = require("../test-data/testlogin.json");

test.describe('Data Driven Test', () => {
    for(const data of testData2)
    {
        test(`login with user ${data.id}`, async ({ page }) => {
            console.log("testData.length ", testData2.length)
            for (let index = 0; index < testData2.length; index++) {
                console.log(testData2[index])
                
            }
        })
    }});