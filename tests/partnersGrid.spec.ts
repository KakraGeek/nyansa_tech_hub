import { test, expect } from '@playwright/test';

test('Partners Grid loads logos and validates alt text', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('text=Our Partners');
  await expect(section).toBeVisible();

  const logos = page.locator('[data-testid="partner-logo"]');
  await expect(logos).toHaveCountGreaterThan(0);
  await expect(logos.first()).toHaveAttribute('alt', /.+/);
});
