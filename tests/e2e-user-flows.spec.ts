import { test, expect } from '@playwright/test';

// Test suite for comprehensive E2E user flows
test.describe('Nyansa Tech Hub - End-to-End User Flows', () => {
  
  // Test 1: Complete Homepage User Journey
  test('Complete homepage user journey with all sections', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Verify page loads correctly
    await expect(page).toHaveTitle(/Nyansa Tech Hub/i);
    await expect(page).toHaveURL(/.*\/$/);
    
    // Test Hero Section
    await expect(page.locator('h1')).toContainText(/Nyansa Tech Hub/i);
    await expect(page.locator('text=Empowering Innovation')).toBeVisible();
    
    // Test CTA button functionality
    const ctaButton = page.locator('role=button[name=/get started/i], role=button[name=/learn more/i], a[href*="#contact"]');
    await expect(ctaButton.first()).toBeVisible();
    await ctaButton.first().click();
    
    // Verify smooth scroll to contact section
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Contact Us')).toBeVisible();
    
    // Test What We Do section
    await page.goto('/');
    await expect(page.locator('text=What We Do')).toBeVisible();
    await expect(page.locator('text=Students')).toBeVisible();
    await expect(page.locator('text=Entrepreneurs')).toBeVisible();
    await expect(page.locator('text=Professionals')).toBeVisible();
    
    // Test Core Initiatives section
    await expect(page.locator('text=Core Initiatives')).toBeVisible();
    await expect(page.locator('text=Education')).toBeVisible();
    await expect(page.locator('text=Innovation')).toBeVisible();
    await expect(page.locator('text=Community')).toBeVisible();
    
    // Test Our Spaces section
    await expect(page.locator('text=Our Spaces')).toBeVisible();
    const spaceImages = page.locator('img[alt*="space"], img[alt*="facility"]');
    await expect(spaceImages.first()).toBeVisible();
    
    // Test Partners Grid
    await expect(page.locator('text=Our Partners')).toBeVisible();
    const partnerLogos = page.locator('img[alt*="partner"], img[alt*="logo"]');
    await expect(partnerLogos.first()).toBeVisible();
    
    // Test Why It Matters section
    await expect(page.locator('text=Why It Matters')).toBeVisible();
    
    // Test Footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=© 2024 Nyansa Tech Hub')).toBeVisible();
  });

  // Test 2: Contact Form Submission Flow
  test('Contact form submission with validation and error handling', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact section
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Test form validation - empty submission
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should show validation errors
    await expect(page.locator('text=required, text=Please fill in, text=This field is required').first()).toBeVisible();
    
    // Fill out form with valid data
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Test User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('This is a test message for E2E testing.');
    
    // Submit form
    await submitButton.click();
    
    // Check for success message or loading state
    await expect(page.locator('text=Thank you, text=Message sent, text=Success').first()).toBeVisible({ timeout: 10000 });
  });

  // Test 3: Navigation and Responsive Design
  test('Navigation functionality and responsive design', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop navigation
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Verify navigation menu is visible on desktop
    const navMenu = page.locator('nav, [role="navigation"]');
    await expect(navMenu).toBeVisible();
    
    // Test mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for mobile menu button
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="navigation"], [data-testid="mobile-menu"]');
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.locator('nav, [role="navigation"]')).toBeVisible();
    }
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
  });

  // Test 4: Accessibility Testing
  test('Accessibility compliance and keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Test ARIA labels and roles
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const role = await button.getAttribute('role');
      
      // Buttons should have either aria-label or accessible text
      if (!ariaLabel) {
        const text = await button.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    }
    
    // Test image alt text
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Test heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    expect(await headings.count()).toBeGreaterThan(0);
  });

  // Test 5: Interactive Elements and Animations
  test('Interactive elements and smooth animations', async ({ page }) => {
    await page.goto('/');
    
    // Test hover effects on buttons
    const buttons = page.locator('button, a[role="button"]');
    for (let i = 0; i < Math.min(await buttons.count(), 3); i++) {
      const button = buttons.nth(i);
      await button.hover();
      await page.waitForTimeout(200);
    }
    
    // Test smooth scrolling to sections
    const links = page.locator('a[href^="#"]');
    for (let i = 0; i < Math.min(await links.count(), 2); i++) {
      const link = links.nth(i);
      await link.click();
      await page.waitForTimeout(1000);
    }
    
    // Test form input interactions
    const inputs = page.locator('input, textarea');
    for (let i = 0; i < Math.min(await inputs.count(), 2); i++) {
      const input = inputs.nth(i);
      await input.click();
      await input.fill('Test input');
      await page.keyboard.press('Tab');
    }
  });

  // Test 6: Error Handling and Edge Cases
  test('Error handling and edge cases', async ({ page }) => {
    // Test 404 page
    await page.goto('/non-existent-page');
    await expect(page.locator('text=404, text=Page not found, text=Not Found').first()).toBeVisible();
    
    // Test network error handling
    await page.route('**/*', route => route.abort());
    await page.goto('/');
    await expect(page.locator('text=Error, text=Something went wrong').first()).toBeVisible({ timeout: 5000 });
    
    // Restore network
    await page.unroute('**/*');
  });

  // Test 7: Performance and Loading States
  test('Performance and loading states', async ({ page }) => {
    // Enable performance monitoring
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check if images are loading
    const images = page.locator('img');
    for (let i = 0; i < Math.min(await images.count(), 5); i++) {
      const image = images.nth(i);
      await expect(image).toBeVisible();
    }
    
    // Test page load performance
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  // Test 8: Cross-browser Compatibility
  test('Cross-browser compatibility', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Test basic functionality across browsers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=What We Do')).toBeVisible();
    
    // Browser-specific tests
    if (browserName === 'chromium') {
      // Chrome-specific tests
      await expect(page.locator('nav')).toBeVisible();
    } else if (browserName === 'firefox') {
      // Firefox-specific tests
      await expect(page.locator('main')).toBeVisible();
    } else if (browserName === 'webkit') {
      // Safari-specific tests
      await expect(page.locator('header')).toBeVisible();
    }
  });

  // Test 9: SEO and Meta Tags
  test('SEO and meta tags validation', async ({ page }) => {
    await page.goto('/');
    
    // Check meta tags
    const title = await page.title();
    expect(title).toContain('Nyansa Tech Hub');
    
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
    
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
  });

  // Test 10: Complete User Journey Simulation
  test('Complete user journey simulation', async ({ page }) => {
    // Simulate a complete user journey
    await page.goto('/');
    
    // 1. User lands on homepage
    await expect(page.locator('h1')).toBeVisible();
    
    // 2. User reads about what we do
    await page.locator('text=What We Do').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Students')).toBeVisible();
    
    // 3. User explores core initiatives
    await page.locator('text=Core Initiatives').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Education')).toBeVisible();
    
    // 4. User views our spaces
    await page.locator('text=Our Spaces').scrollIntoViewIfNeeded();
    await expect(page.locator('img[alt*="space"]').first()).toBeVisible();
    
    // 5. User checks out partners
    await page.locator('text=Our Partners').scrollIntoViewIfNeeded();
    await expect(page.locator('img[alt*="partner"]').first()).toBeVisible();
    
    // 6. User reads why it matters
    await page.locator('text=Why It Matters').scrollIntoViewIfNeeded();
    
    // 7. User decides to contact
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    
    // 8. User fills out contact form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('John Doe');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('john@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('I would like to learn more about your programs.');
    
    // 9. User submits form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // 10. User sees confirmation
    await expect(page.locator('text=Thank you, text=Message sent, text=Success').first()).toBeVisible({ timeout: 10000 });
    
    // 11. User scrolls back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // 12. User visits footer links
    const footerLinks = page.locator('footer a');
    if (await footerLinks.count() > 0) {
      await footerLinks.first().click();
      await page.waitForTimeout(1000);
    }
  });
}); 