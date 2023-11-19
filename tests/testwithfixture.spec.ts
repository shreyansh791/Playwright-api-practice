import { expect } from "@playwright/test";
import { test } from "../test-options";

test('fixture demo', async ({ page,angularRealworldHow }) => {
    await page.getByPlaceholder('Email').fill('username')
});
// Playwright Test is based on the concept of test fixtures. 
// Test fixtures are used to establish environment for each test,
//  giving the test everything it needs and nothing else.
//  Test fixtures are isolated between tests.
//  With fixtures, you can group tests based on their meaning, 
// instead of their common setup.
