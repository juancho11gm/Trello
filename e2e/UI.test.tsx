import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test.describe('Test UI', () => {
  test('Test title page', async ({ page }) => {
    await expect(page).toHaveTitle(/Trello Clone/i);
  });
});
