import { test, expect } from '@playwright/test';

test('verify branding and auth-based download', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Verify Branding
  await expect(page.locator('text=Advaitha Yogam').first()).toBeVisible();

  // Navigate to article
  await page.goto('http://localhost:5173/article/mithya');

  // Check for "Login to Download" when unauthenticated
  const loginToDownload = page.locator('text=Login to Download');
  await expect(loginToDownload).toBeVisible();

  // Verify language switcher exists
  const globeIcon = page.locator('nav .lucide-globe');
  await expect(globeIcon).toBeVisible();

  await page.screenshot({ path: 'final-verification.png' });
});
