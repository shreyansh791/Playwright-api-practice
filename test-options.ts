import { test as base } from '@playwright/test'

export type TestOptions = {
    globalsQaURL: string
    angularRealworldHow: string
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', { option: true }],
    angularRealworldHow: async({page},use)=>{
        await page.goto('https://angular.realworld.how/')
        await page.getByText('Sign in').first().click()
        // Use the fixture value in the test.
        await use('')
    }
})