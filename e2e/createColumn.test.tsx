import { test } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test('Create new column', async ({ page }) => {
  await page.getByRole('button', { name: '+ Add another Column' }).click();
  await page.getByPlaceholder('Add new element').fill('My new Column');
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText('My new Column');
});
