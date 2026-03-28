import { test, expect } from '@playwright/test';

test('debug article page', async ({ page }) => {
  await page.goto('http://localhost:5173/article/mithya');
  await page.waitForTimeout(5000);
  const content = await page.content();
  console.log(content);
  await page.screenshot({ path: 'debug-article.png' });
});
