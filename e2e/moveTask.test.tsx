import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  if (baseURL !== undefined) await page.goto(baseURL);
});

test('Move task to another column', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 800 });
  const tasks = await page.locator('.task').all();
  const [, secondTask] = tasks;
  const secondTaskText = await secondTask.textContent();

  expect(secondTaskText).toStrictEqual('Learn TypeScript🗑');

  const secondTaskBox = await secondTask.boundingBox();

  if (secondTaskBox == null) throw Error('No second task.');

  const { x: secondBoxX, y: secondBoxY, width: secondBoxWidth } = secondTaskBox;
  const x1 = secondBoxX ?? 0;
  const y1 = secondBoxY ?? 0;

  const x2 = x1 + secondBoxWidth;
  const y2 = y1;

  await page.mouse.move(0, 0);
  // https://github.com/microsoft/playwright/issues/13855
  await page.mouse.move(x1 + 5, y1 + 5, { steps: 10 });
  await page.mouse.down();
  // https://github.com/microsoft/playwright/issues/13855
  await page.mouse.move(x2, y2, { steps: 10 });
  await page.mouse.up();

  await page.waitForTimeout(1000);

  const newTasks = await page.locator('.task').all();
  const [, , thirdhTask] = newTasks;
  const thirdhTaskText = await thirdhTask.textContent();
  // Move second task to second column in the second position = third task.
  expect(thirdhTaskText).toStrictEqual('Learn TypeScript🗑');
});
