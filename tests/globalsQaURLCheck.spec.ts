import {  expect } from '@playwright/test';
import { test } from '../test-options';

test('globalsQaURL Test', async ({ page ,globalsQaURL}) => {
    await page.goto(globalsQaURL)
});

