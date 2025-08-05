import { test, expect } from '@playwright/test';

test('Our Spaces image gallery opens and closes modal viewer', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('text=Our Spaces');
  await expect(section).toBeVisible();

  const image = page.locator('[data-testid="gallery-image"]').first();
  await image.click();
  const modal = page.locator('[data-testid="lightbox"]');
  await expect(modal).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
});
