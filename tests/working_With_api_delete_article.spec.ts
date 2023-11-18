import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  
});
// Article is created using the UI route
test('has title', async ({ page, request }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit')
  await page.getByText('Sign in').click()
  await page.getByPlaceholder('Email').fill('demo')
  await page.getByPlaceholder('Password').fill('demo')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.getByText('New Article').click()

  await page.getByPlaceholder('Article Title').fill("Playwright is awesome")
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('Playwright12')
  await page.getByPlaceholder('Write your article (in markdown)').fill('Playwright12')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  // below line is important we are instructing playwright to wait for the api call response.
  const articleResponse = await page.waitForResponse('https://api.realworld.io/api/articles/')
  const articleResponseBody = await articleResponse.json()
  console.log("articleResponseBody ", articleResponseBody)
  const slugId = articleResponseBody.article.slug
  console.log("Slug ID ", slugId)
  await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
  await page.getByRole('link', { name: 'Home' }).nth(1).click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')
  const loginPayload = {
    "user": {
      "email": "demo",
      "password": "demo"
    }
  }
  const loginResponse = await request.post('https://api.realworld.io/api/users/login',
    {
      data: loginPayload
    }
  )
  const jsonResponse = await loginResponse.json();
  const accessToken = await jsonResponse.user.token;
  const deleteArticleResponse = await request.delete(`https://api.realworld.io/api/articles/${slugId}`, {
    headers: {
      Authorization: `Token ${accessToken}`
    }

  })
  await expect(deleteArticleResponse.status()).toEqual(204)
  // verify again
  await page.getByText('Global Feed').click()
  await expect(page.locator('.preview-link h1').first())
    .not.toContainText('Playwright is awesome')

});




