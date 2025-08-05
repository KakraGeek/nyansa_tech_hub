import { test, expect } from '@playwright/test';

test('homepage renders essential content', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Nyansa Tech Hub/i);
  await expect(page.locator('text=Hero')).toBeVisible();
  await expect(page.locator('text=What We Do')).toBeVisible();
  await expect(page.locator('text=Core Initiatives')).toBeVisible();
  await expect(page.locator('text=Our Spaces')).toBeVisible();
  await expect(page.locator('text=Contact')).toBeVisible();

  const cta = page.locator('role=button[name=/get started/i]');
  await expect(cta).toBeVisible();
  await cta.hover();
});
