import { test, expect } from '@playwright/test';

test('Verify Advaitha Yogam rebranding and i18n', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 1. Verify Branding
  const title = await page.title();
  expect(title).toContain('Advaitha Yogam');

  const heroTitle = page.locator('h1');
  await expect(heroTitle).toContainText('Advaitha Yogam');

  // 2. Verify Language Switcher existence
  const langSwitcher = page.locator('button:has(.lucide-globe)');
  await expect(langSwitcher).toBeVisible();

  // 3. Verify specific Indian language option (Telugu)
  await langSwitcher.click();
  const teluguOption = page.locator('button:has-text("తెలుగు")');
  await expect(teluguOption).toBeVisible();

  // 4. Test redirection of a previously static button
  const startJourney = page.locator('button:has-text("Begin Journey"), button:has-text("ప్రయాణాన్ని ప్రారంభించండి")');
  await startJourney.first().click();
  await expect(page).toHaveURL(/.*articles/);
});
