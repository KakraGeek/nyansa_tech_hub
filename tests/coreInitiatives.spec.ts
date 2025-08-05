import { test, expect } from '@playwright/test';

test('Core Initiatives section tabs work and display correct content', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Core Initiatives')).toBeVisible();

  const tabs = [
    { tab: '[data-testid="tab-tech-training"]', content: '[data-testid="content-tech-training"]' },
    { tab: '[data-testid="tab-career-assistance"]', content: '[data-testid="content-career-assistance"]' },
    { tab: '[data-testid="tab-prof-dev"]', content: '[data-testid="content-prof-dev"]' },
  ];

  for (const { tab, content } of tabs) {
    await page.click(tab);
    await expect(page.locator(content)).toBeVisible();
  }
});
