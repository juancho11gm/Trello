import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test.describe('Test UI', () => {
  test('Test title page', async ({ page }) => {
    await expect(page).toHaveTitle(/Trello Clone/i);
  });

  test('Create new column', async ({ page }) => {
    await page.getByRole('button', { name: '+ Add another list' }).click();
    await page.getByPlaceholder('Add new element').fill('My new Column');
    await page.getByRole('button', { name: 'create' }).click();
    await page.getByText('My new Column');
  });

  test('Move column', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 800 });
    const columns = await page.locator('.column').all();
    const [firstColumn] = columns;
    const firstColumnText = await firstColumn.locator('.column-title').textContent();
    // The column is in the first place
    expect(firstColumnText).toStrictEqual('To Do');

    const firstColumnBounding = await firstColumn?.boundingBox();

    const columnsContainer = await page.locator('ul[data-rbd-droppable-id=columns]');
    const columnsBoundingBox = await columnsContainer.boundingBox();
    const columnsContainerWidth = columnsBoundingBox?.width ?? 0;
    const x = firstColumnBounding?.x ?? 0;
    const y = columnsBoundingBox?.y ?? 0;

    const targetValue: number = 0.5; // 50%

    // Drag and Drop the first column 50% of the columns container
    // https://github.com/microsoft/playwright/issues/13855
    await page.mouse.move(x, y, { steps: 10 });
    await firstColumn?.hover();
    await page.mouse.down();
    // https://github.com/microsoft/playwright/issues/13855
    await page.mouse.move(x + columnsContainerWidth * targetValue, y, { steps: 10 });
    await page.mouse.up();

    // The column was moved to the second place
    const [, secondColumn] = await page.locator('.column').all();
    const secondColumnText = await secondColumn.locator('.column-title').textContent();
    expect(secondColumnText).toStrictEqual('To Do');
  });
});
