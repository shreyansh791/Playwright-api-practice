import { test, expect } from '@playwright/test';
import data from "../test-data/data.json"
// Article is created using the API route
test.beforeEach(async ({ page }) => {
  await page.goto('https://angular.realworld.how/');
});
let accessToken;
test('delete article', async ({ page, request }) => {
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
  accessToken = await jsonResponse.user.token;
  console.log("Access Token ", accessToken);

  //  second API call to create article
  const articleCreationPayload = {
    "article": {
      "tagList": [],
      "title": "This article got created using Playwright Framework2",
      "description": "This article got created using Playwright Framework2",
      "body": "This article got created using Playwright Framework2"
    }
  }
  const articleResponse = await request.post('https://api.realworld.io/api/articles/', {
    data: articleCreationPayload,
    headers: {
      Authorization: `Token ${accessToken}`
    }

  })
  console.log("articleResponse body ", await articleResponse.body())
  const articleResponseBody = await articleResponse.json()
  console.log("articleResponse body in json  ", await articleResponse.json())
  expect(articleResponse.status()).toEqual(201)
  const slugId = articleResponseBody.article.slug
  console.log("slug ID ", slugId)
  // login to app
  await page.getByText('Sign in').click()
  await page.getByPlaceholder('Email').fill('demo')
  await page.getByPlaceholder('Password').fill('demo')
  await page.getByRole('button', { name: 'Sign in' }).click()

  // verify if article is created
  await page.getByText('Global Feed').click()
  await expect(page.locator('.preview-link h1').first())
    .toContainText('This article got created using Playwright Framework2')
  // delete call to delete the article.
  const deleteArticleResponse = await request.delete(`https://api.realworld.io/api/articles/${slugId}`, {
    headers: {
      Authorization: `Token ${accessToken}`
    }

  })
  await expect(deleteArticleResponse.status()).toEqual(204)
  // assert again to check if article is deleted
  await page.getByText('Global Feed').click()
  await expect(page.locator('.preview-link h1').first())
    .not.toContainText('This article got created using Playwright Framework2')

});



