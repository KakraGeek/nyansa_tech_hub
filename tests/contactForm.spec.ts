import { test, expect } from '@playwright/test';

test('Contact form works with valid and invalid inputs', async ({ page }) => {
  await page.goto('/');

  // Invalid case
  await page.click('[type="submit"]');
  await expect(page.locator('[data-testid="form-error"]')).toBeVisible();

  // Valid case
  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="message"]', 'This is a test message.');
  await page.click('[type="submit"]');

  await expect(page.locator('[data-testid="form-success"]')).toBeVisible();
});
