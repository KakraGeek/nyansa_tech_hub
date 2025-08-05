import { test, expect } from '@playwright/test';

// Mobile-specific E2E tests
test.describe('Nyansa Tech Hub - Mobile E2E Testing', () => {
  
  // Use mobile viewport for all tests
  test.use({ viewport: { width: 375, height: 667 } });

  test('Mobile navigation and menu functionality', async ({ page }) => {
    await page.goto('/');
    
    // Check if mobile menu button exists
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="navigation"], [data-testid="mobile-menu"], .mobile-menu-button');
    
    if (await mobileMenuButton.isVisible()) {
      // Test mobile menu toggle
      await mobileMenuButton.click();
      await expect(page.locator('nav, [role="navigation"], .mobile-nav')).toBeVisible();
      
      // Test menu item navigation
      const menuItems = page.locator('nav a, .mobile-nav a');
      if (await menuItems.count() > 0) {
        await menuItems.first().click();
        await page.waitForTimeout(1000);
      }
      
      // Close menu
      await mobileMenuButton.click();
    }
  });

  test('Mobile touch interactions and gestures', async ({ page }) => {
    await page.goto('/');
    
    // Test touch scrolling
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await page.waitForTimeout(500);
    
    // Test touch targets (minimum 44px)
    const buttons = page.locator('button, a[role="button"]');
    for (let i = 0; i < Math.min(await buttons.count(), 3); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
    
    // Test swipe gestures (if applicable)
    const carousel = page.locator('.carousel, .slider, [data-carousel]');
    if (await carousel.isVisible()) {
      // Simulate swipe
      await page.mouse.down();
      await page.mouse.move(200, 300);
      await page.mouse.up();
    }
  });

  test('Mobile form interactions', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Test mobile keyboard interactions
    const nameInput = page.locator('input[name="name"], input[placeholder*="name"]');
    await nameInput.click();
    await nameInput.fill('Mobile Test User');
    
    const emailInput = page.locator('input[name="email"], input[placeholder*="email"]');
    await emailInput.click();
    await emailInput.fill('mobile@test.com');
    
    const messageInput = page.locator('textarea[name="message"], textarea[placeholder*="message"]');
    await messageInput.click();
    await messageInput.fill('Testing mobile form submission');
    
    // Test mobile form submission
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Check for success/error message
    await expect(page.locator('text=Thank you, text=Message sent, text=Success, text=Error').first()).toBeVisible({ timeout: 10000 });
  });

  test('Mobile responsive images and media', async ({ page }) => {
    await page.goto('/');
    
    // Test responsive images
    const images = page.locator('img');
    for (let i = 0; i < Math.min(await images.count(), 5); i++) {
      const image = images.nth(i);
      await expect(image).toBeVisible();
      
      // Check if image is properly sized for mobile
      const box = await image.boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(375); // Should fit mobile viewport
      }
    }
    
    // Test video elements (if any)
    const videos = page.locator('video');
    if (await videos.count() > 0) {
      await expect(videos.first()).toBeVisible();
    }
  });

  test('Mobile performance and loading', async ({ page }) => {
    // Test mobile page load performance
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    
    // Mobile page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Test mobile-specific loading states
    const loadingSpinners = page.locator('.loading, .spinner, [aria-label*="loading"]');
    if (await loadingSpinners.count() > 0) {
      await expect(loadingSpinners.first()).not.toBeVisible({ timeout: 5000 });
    }
  });

  test('Mobile accessibility and screen reader support', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile-specific accessibility features
    const focusableElements = page.locator('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    // Test tab navigation on mobile
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Test mobile-specific ARIA attributes
    const mobileMenu = page.locator('[aria-expanded], [aria-hidden], [aria-label*="mobile"]');
    if (await mobileMenu.count() > 0) {
      const ariaExpanded = await mobileMenu.first().getAttribute('aria-expanded');
      expect(ariaExpanded).toBeTruthy();
    }
  });

  test('Mobile error handling and offline behavior', async ({ page }) => {
    // Test mobile network error handling
    await page.route('**/*', route => route.abort());
    await page.goto('/');
    
    // Should show error message on mobile
    await expect(page.locator('text=Error, text=Something went wrong, text=No internet').first()).toBeVisible({ timeout: 5000 });
    
    // Restore network
    await page.unroute('**/*');
    
    // Test mobile-specific error states
    await page.goto('/');
    const errorMessages = page.locator('.error, .alert, [role="alert"]');
    if (await errorMessages.count() > 0) {
      await expect(errorMessages.first()).toBeVisible();
    }
  });

  test('Mobile browser compatibility', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Test mobile-specific browser features
    if (browserName === 'webkit') {
      // Safari mobile specific tests
      await expect(page.locator('meta[name="viewport"]')).toBeVisible();
    } else if (browserName === 'chromium') {
      // Chrome mobile specific tests
      await expect(page.locator('meta[name="theme-color"]')).toBeVisible();
    }
    
    // Test mobile viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta).toContain('width=device-width');
  });

  test('Mobile user journey simulation', async ({ page }) => {
    // Simulate complete mobile user journey
    await page.goto('/');
    
    // 1. Mobile user lands on homepage
    await expect(page.locator('h1')).toBeVisible();
    
    // 2. User scrolls through content
    await page.evaluate(() => {
      window.scrollTo(0, 200);
    });
    await page.waitForTimeout(500);
    
    // 3. User interacts with mobile menu
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="navigation"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      await mobileMenuButton.click(); // Close menu
    }
    
    // 4. User scrolls to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // 5. User fills mobile form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Mobile User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('mobile@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Mobile test message');
    
    // 6. User submits form
    await page.locator('button[type="submit"], input[type="submit"]').click();
    
    // 7. User sees confirmation
    await expect(page.locator('text=Thank you, text=Message sent, text=Success').first()).toBeVisible({ timeout: 10000 });
    
    // 8. User scrolls back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  });
}); 