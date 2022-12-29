import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test('Test title page', async ({ page }) => {
  await expect(page).toHaveTitle(/Trello Clone/i);
});

test('Create new column', async ({ page }) => {
  await page.getByRole('button', { name: '+ Add another list' }).click();
  await page.getByPlaceholder('Add new element').fill('My new Column');
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText('My new Column');
});
