import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test('Move column', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 800 });
  const columns = await page.locator('.column').all();
  const [firstColumn] = columns;
  const firstColumnTitle = await firstColumn.locator('.column-title');
  const firstColumnTextContent = await firstColumnTitle.textContent();
  // The column is in the first place
  expect(firstColumnTextContent).toStrictEqual('To Do');

  const firstColumnTitleBox = await firstColumnTitle.boundingBox();
  const x1 = firstColumnTitleBox?.x ?? 0;
  const y1 = firstColumnTitleBox?.y ?? 0;

  const columnsContainer = await page.locator('ul[data-rbd-droppable-id=all-columns]');
  const columnsBoundingBox = await columnsContainer.boundingBox();
  const columnsContainerWidth = columnsBoundingBox?.width ?? 0;
  const targetValue: number = 0.5; // 50%
  const x2 = x1 + columnsContainerWidth * targetValue;
  const y2 = y1;

  // Drag and Drop the first column 50% of the columns container
  await page.mouse.move(0, 0);
  // https://github.com/microsoft/playwright/issues/13855
  await page.mouse.move(x1, y1, { steps: 10 });
  await page.mouse.down();
  // https://github.com/microsoft/playwright/issues/13855
  await page.mouse.move(x2, y2, { steps: 10 });
  await page.mouse.up();

  await page.waitForTimeout(500);

  const [, secondColumn] = await page.locator('.column').all();
  const secondColumnText = await secondColumn.locator('.column-title').textContent();
  // The column was moved to the second place
  expect(secondColumnText).toStrictEqual('To Do');
});
