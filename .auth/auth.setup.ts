import { test as setup } from "@playwright/test"

const authFile = '.auth/user.json'

setup('authentication', async ({ page }) => {
    await page.goto('https://angular.realworld.io/');
    await page.getByText('Sign in').click()
    await page.getByPlaceholder('Email').fill('demo')
    await page.getByPlaceholder('Password').fill('demo')
    await page.getByRole('button', { name: 'Sign in' }).click()

    // ensuring that app got loaded
    await page.waitForResponse('https://api.realworld.io/api/tags')

    await page.context().storageState({ path: authFile })


})