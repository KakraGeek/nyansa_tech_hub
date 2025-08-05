import { test, expect } from '@playwright/test';

test('Why It Matters section renders highlight quote and text clearly', async ({ page }) => {
  await page.goto('/');
  const quote = page.locator('[data-testid="impact-quote"]');
  await expect(quote).toBeVisible();
  await expect(quote).toContainText(/Africa/i);
});
