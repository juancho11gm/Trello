import { test } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test('Create new Task', async ({ page }) => {
  const [firstColumn] = await page.locator('.column').all();
  await firstColumn.getByRole('button', { name: '+ Add another Task' }).click();
  await page.getByPlaceholder('Add new element').fill('My new Task');
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText('My new Task');
});
