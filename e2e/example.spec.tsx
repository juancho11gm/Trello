import { test, expect } from '@playwright/test';

test('Test title page', async ({ page, baseURL }) => {
  baseURL !== undefined && (await page.goto(baseURL));
  await expect(page).toHaveTitle(/Trello clone/i);
});
