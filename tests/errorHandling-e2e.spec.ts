import { test, expect } from '@playwright/test';

// E2E Error Handling Tests for Nyansa Tech Hub
test.describe('Error Handling E2E Tests', () => {
  
  test('should handle network errors gracefully', async ({ page }) => {
    // Block all network requests to simulate network failure
    await page.route('**/*', route => route.abort());
    
    await page.goto('/');
    
    // Should show error message or fallback content
    const errorMessage = page.locator('text=Error, text=Something went wrong, text=No internet, text=Network error, text=Unable to load');
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    
    // Restore network
    await page.unroute('**/*');
  });

  test('should handle form validation errors', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Submit empty form to trigger validation errors
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should show validation error messages
    const validationErrors = page.locator('text=required, text=Please fill in, text=This field is required, text=Invalid email, text=Please enter a valid email');
    await expect(validationErrors.first()).toBeVisible();
  });

  test('should handle server errors during form submission', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Fill form with valid data
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Test User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Test message');
    
    // Block the form submission endpoint to simulate server error
    await page.route('**/api/contact', route => route.abort());
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should show server error message
    const serverError = page.locator('text=Server error, text=Something went wrong, text=Unable to send message, text=Please try again later');
    await expect(serverError.first()).toBeVisible({ timeout: 10000 });
    
    // Restore API
    await page.unroute('**/api/contact');
  });

  test('should handle rate limiting errors', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Fill form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Test User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Test message');
    
    // Mock rate limit response
    await page.route('**/api/contact', route => 
      route.fulfill({ 
        status: 429, 
        body: JSON.stringify({ error: 'Too many requests' }) 
      })
    );
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should show rate limit error message
    const rateLimitError = page.locator('text=Too many attempts, text=Rate limit, text=Please wait, text=Try again later');
    await expect(rateLimitError.first()).toBeVisible({ timeout: 10000 });
    
    // Restore API
    await page.unroute('**/api/contact');
  });

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => 
      route.continue({ delay: 2000 }) // 2 second delay
    );
    
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Page should still load, even if slowly
    await expect(page.locator('h1')).toBeVisible();
    
    // Should show loading indicators
    const loadingIndicator = page.locator('.loading, .spinner, [aria-label*="loading"]');
    if (await loadingIndicator.count() > 0) {
      await expect(loadingIndicator.first()).toBeVisible();
    }
    
    // Restore normal network
    await page.unroute('**/*');
  });

  test('should handle 404 errors gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');
    
    // Should show 404 error page
    const notFoundMessage = page.locator('text=404, text=Page not found, text=Not Found, text=This page doesn\'t exist');
    await expect(notFoundMessage.first()).toBeVisible();
    
    // Should have a way to navigate back
    const backLink = page.locator('a[href="/"], a[href*="home"], text=Go back, text=Home');
    if (await backLink.count() > 0) {
      await expect(backLink.first()).toBeVisible();
    }
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Inject a JavaScript error
    await page.evaluate(() => {
      // Simulate a JavaScript error
      console.error('Test JavaScript error');
      // Trigger an error event
      window.dispatchEvent(new ErrorEvent('error', { 
        message: 'Test error',
        filename: 'test.js',
        lineno: 1
      }));
    });
    
    // Page should still be functional despite JavaScript errors
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=What We Do')).toBeVisible();
  });

  test('should handle image loading errors', async ({ page }) => {
    await page.goto('/');
    
    // Block image requests to simulate image loading failures
    await page.route('**/*.{png,jpg,jpeg,gif,webp}', route => route.abort());
    
    // Page should still load and be functional
    await expect(page.locator('h1')).toBeVisible();
    
    // Images should show fallback or error state
    const images = page.locator('img');
    for (let i = 0; i < Math.min(await images.count(), 3); i++) {
      const image = images.nth(i);
      // Check if image has error handling (alt text, fallback, etc.)
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Restore image loading
    await page.unroute('**/*.{png,jpg,jpeg,gif,webp}');
  });

  test('should handle form submission timeout', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Fill form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Test User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Test message');
    
    // Mock a slow API response that times out
    await page.route('**/api/contact', route => 
      new Promise(resolve => {
        setTimeout(() => {
          route.fulfill({ status: 200, body: '{}' });
        }, 15000); // 15 second delay (longer than typical timeout)
      })
    );
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should show timeout or loading state
    const timeoutMessage = page.locator('text=Request timeout, text=Taking too long, text=Please try again');
    await expect(timeoutMessage.first()).toBeVisible({ timeout: 20000 });
    
    // Restore API
    await page.unroute('**/api/contact');
  });

  test('should handle malformed API responses', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Fill form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Test User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Test message');
    
    // Mock malformed JSON response
    await page.route('**/api/contact', route => 
      route.fulfill({ 
        status: 200, 
        body: 'Invalid JSON {', 
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should handle malformed response gracefully
    const errorMessage = page.locator('text=Error, text=Something went wrong, text=Invalid response');
    await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });
    
    // Restore API
    await page.unroute('**/api/contact');
  });

  test('should provide retry functionality for recoverable errors', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Fill form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Test User');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Test message');
    
    // Mock server error first, then success
    let attemptCount = 0;
    await page.route('**/api/contact', route => {
      attemptCount++;
      if (attemptCount === 1) {
        route.fulfill({ status: 500, body: 'Server error' });
      } else {
        route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
      }
    });
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Should show error first
    const errorMessage = page.locator('text=Server error, text=Something went wrong');
    await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });
    
    // Should show retry button
    const retryButton = page.locator('text=Retry, text=Try again, button:has-text("Retry")');
    if (await retryButton.count() > 0) {
      await retryButton.first().click();
      
      // Should succeed on retry
      const successMessage = page.locator('text=Thank you, text=Message sent, text=Success');
      await expect(successMessage.first()).toBeVisible({ timeout: 10000 });
    }
    
    // Restore API
    await page.unroute('**/api/contact');
  });
}); 