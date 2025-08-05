import { test, expect } from '@playwright/test';

test('What We Do section displays target audience cards with proper labels and icons', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=What We Do')).toBeVisible();
  const cards = page.locator('[data-testid="audience-card"]');
  await expect(cards).toHaveCountGreaterThan(0);

  const cardTitles = await cards.allTextContents();
  for (const title of cardTitles) {
    expect(title.length).toBeGreaterThan(2);
  }

  await expect(cards.first().locator('img')).toHaveAttribute('alt', /.+/);
});
