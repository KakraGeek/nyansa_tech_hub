import { test, expect } from '@playwright/test';

// Accessibility-focused E2E tests
test.describe('Nyansa Tech Hub - Accessibility E2E Testing', () => {
  
  test('WCAG 2.1 AA compliance - Keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation through all interactive elements
    const focusableElements = page.locator('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const focusableCount = await focusableElements.count();
    
    expect(focusableCount).toBeGreaterThan(0);
    
    // Test tab order
    for (let i = 0; i < Math.min(focusableCount, 10); i++) {
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
      await page.waitForTimeout(100);
    }
    
    // Test shift+tab for reverse navigation
    for (let i = 0; i < Math.min(focusableCount, 5); i++) {
      await page.keyboard.press('Shift+Tab');
      await expect(page.locator(':focus')).toBeVisible();
      await page.waitForTimeout(100);
    }
  });

  test('WCAG 2.1 AA compliance - ARIA labels and roles', async ({ page }) => {
    await page.goto('/');
    
    // Test buttons have accessible names
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      const textContent = await button.textContent();
      
      // Button should have either aria-label, aria-labelledby, or text content
      expect(ariaLabel || ariaLabelledBy || (textContent && textContent.trim().length > 0)).toBeTruthy();
    }
    
    // Test images have alt text
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      const role = await image.getAttribute('role');
      
      // Decorative images should have alt="" or role="presentation"
      if (role === 'presentation') {
        expect(alt).toBe('');
      } else {
        expect(alt).toBeTruthy();
      }
    }
    
    // Test form inputs have labels
    const inputs = page.locator('input, textarea, select');
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        expect(await label.count() > 0 || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('WCAG 2.1 AA compliance - Color contrast and visual design', async ({ page }) => {
    await page.goto('/');
    
    // Test that text is not relying solely on color to convey information
    const coloredText = page.locator('span[style*="color"], div[style*="color"]');
    for (let i = 0; i < await coloredText.count(); i++) {
      const element = coloredText.nth(i);
      const style = await element.getAttribute('style');
      const textContent = await element.textContent();
      
      // If text has color styling, it should also have other visual indicators
      if (style && style.includes('color') && textContent) {
        const fontWeight = await element.getAttribute('style');
        const textDecoration = await element.getAttribute('style');
        expect(fontWeight?.includes('font-weight') || textDecoration?.includes('text-decoration')).toBeTruthy();
      }
    }
    
    // Test focus indicators are visible
    const focusableElements = page.locator('button, a, input, textarea, select');
    for (let i = 0; i < Math.min(await focusableElements.count(), 5); i++) {
      const element = focusableElements.nth(i);
      await element.focus();
      
      // Check if focus indicator is visible
      const computedStyle = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          border: style.border,
          boxShadow: style.boxShadow
        };
      });
      
      expect(computedStyle.outline !== 'none' || 
             computedStyle.border !== 'none' || 
             computedStyle.boxShadow !== 'none').toBeTruthy();
    }
  });

  test('WCAG 2.1 AA compliance - Heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Test proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    expect(headingCount).toBeGreaterThan(0);
    
    // Test that there's only one h1
    const h1Elements = page.locator('h1');
    expect(await h1Elements.count()).toBe(1);
    
    // Test heading levels don't skip (e.g., h1 -> h3)
    const headingLevels = [];
    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.replace('h', ''));
      headingLevels.push(level);
    }
    
    // Check for proper heading hierarchy
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i] - headingLevels[i-1]).toBeLessThanOrEqual(1);
    }
  });

  test('WCAG 2.1 AA compliance - Screen reader support', async ({ page }) => {
    await page.goto('/');
    
    // Test ARIA landmarks
    const landmarks = page.locator('main, nav, header, footer, aside, [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"]');
    expect(await landmarks.count()).toBeGreaterThan(0);
    
    // Test skip links
    const skipLinks = page.locator('a[href^="#main"], a[href^="#content"], a[href^="#navigation"]');
    if (await skipLinks.count() > 0) {
      await expect(skipLinks.first()).toBeVisible();
    }
    
    // Test live regions for dynamic content
    const liveRegions = page.locator('[aria-live], [aria-atomic], [aria-relevant]');
    if (await liveRegions.count() > 0) {
      for (let i = 0; i < await liveRegions.count(); i++) {
        const region = liveRegions.nth(i);
        const ariaLive = await region.getAttribute('aria-live');
        expect(['polite', 'assertive', 'off']).toContain(ariaLive);
      }
    }
  });

  test('WCAG 2.1 AA compliance - Form accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to contact form
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Test form fieldset and legend
    const fieldsets = page.locator('fieldset');
    for (let i = 0; i < await fieldsets.count(); i++) {
      const fieldset = fieldsets.nth(i);
      const legend = fieldset.locator('legend');
      expect(await legend.count()).toBeGreaterThan(0);
    }
    
    // Test required field indicators
    const requiredInputs = page.locator('input[required], textarea[required], select[required]');
    for (let i = 0; i < await requiredInputs.count(); i++) {
      const input = requiredInputs.nth(i);
      const ariaRequired = await input.getAttribute('aria-required');
      expect(ariaRequired === 'true' || ariaRequired === null).toBeTruthy();
    }
    
    // Test error message association
    const inputs = page.locator('input, textarea, select');
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaDescribedBy = await input.getAttribute('aria-describedby');
      
      if (id) {
        const errorMessage = page.locator(`#${id}-error, [data-error-for="${id}"]`);
        if (await errorMessage.count() > 0) {
          expect(ariaDescribedBy).toBeTruthy();
        }
      }
    }
  });

  test('WCAG 2.1 AA compliance - Multimedia accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Test video accessibility
    const videos = page.locator('video');
    for (let i = 0; i < await videos.count(); i++) {
      const video = videos.nth(i);
      const controls = await video.getAttribute('controls');
      const ariaLabel = await video.getAttribute('aria-label');
      
      // Video should have controls or be described
      expect(controls || ariaLabel).toBeTruthy();
    }
    
    // Test audio accessibility
    const audioElements = page.locator('audio');
    for (let i = 0; i < await audioElements.count(); i++) {
      const audio = audioElements.nth(i);
      const controls = await audio.getAttribute('controls');
      const ariaLabel = await audio.getAttribute('aria-label');
      
      // Audio should have controls or be described
      expect(controls || ariaLabel).toBeTruthy();
    }
    
    // Test iframe accessibility
    const iframes = page.locator('iframe');
    for (let i = 0; i < await iframes.count(); i++) {
      const iframe = iframes.nth(i);
      const title = await iframe.getAttribute('title');
      const ariaLabel = await iframe.getAttribute('aria-label');
      
      // Iframe should have title or aria-label
      expect(title || ariaLabel).toBeTruthy();
    }
  });

  test('WCAG 2.1 AA compliance - Dynamic content updates', async ({ page }) => {
    await page.goto('/');
    
    // Test form submission feedback
    await page.locator('text=Contact Us').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Fill form and submit
    await page.locator('input[name="name"], input[placeholder*="name"]').fill('Accessibility Test');
    await page.locator('input[name="email"], input[placeholder*="email"]').fill('accessibility@test.com');
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill('Testing accessibility features');
    
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await submitButton.click();
    
    // Check for success/error message with proper ARIA attributes
    const feedbackMessage = page.locator('[role="alert"], [aria-live], .success, .error');
    await expect(feedbackMessage.first()).toBeVisible({ timeout: 10000 });
    
    // Test loading states
    const loadingIndicator = page.locator('[aria-label*="loading"], [aria-busy="true"], .loading');
    if (await loadingIndicator.count() > 0) {
      await expect(loadingIndicator.first()).toBeVisible();
      await expect(loadingIndicator.first()).not.toBeVisible({ timeout: 10000 });
    }
  });

  test('WCAG 2.1 AA compliance - Keyboard shortcuts and commands', async ({ page }) => {
    await page.goto('/');
    
    // Test escape key functionality
    const modals = page.locator('[role="dialog"], [role="modal"], .modal');
    if (await modals.count() > 0) {
      await page.keyboard.press('Escape');
      await expect(modals.first()).not.toBeVisible();
    }
    
    // Test enter key functionality
    const buttons = page.locator('button');
    for (let i = 0; i < Math.min(await buttons.count(), 3); i++) {
      const button = buttons.nth(i);
      await button.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
    }
    
    // Test space key functionality
    const checkboxes = page.locator('input[type="checkbox"]');
    for (let i = 0; i < Math.min(await checkboxes.count(), 2); i++) {
      const checkbox = checkboxes.nth(i);
      await checkbox.focus();
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
    }
  });

  test('WCAG 2.1 AA compliance - Language and internationalization', async ({ page }) => {
    await page.goto('/');
    
    // Test language declaration
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
    
    // Test language changes within content
    const langElements = page.locator('[lang]');
    for (let i = 0; i < await langElements.count(); i++) {
      const element = langElements.nth(i);
      const lang = await element.getAttribute('lang');
      expect(lang).toBeTruthy();
    }
    
    // Test text direction
    const dirElements = page.locator('[dir]');
    for (let i = 0; i < await dirElements.count(); i++) {
      const element = dirElements.nth(i);
      const dir = await element.getAttribute('dir');
      expect(['ltr', 'rtl', 'auto']).toContain(dir);
    }
  });

  test('WCAG 2.1 AA compliance - Complete accessibility audit', async ({ page }) => {
    await page.goto('/');
    
    // Comprehensive accessibility checklist
    const accessibilityChecks = [
      // Page structure
      { selector: 'main, [role="main"]', description: 'Main content area' },
      { selector: 'nav, [role="navigation"]', description: 'Navigation menu' },
      { selector: 'header, [role="banner"]', description: 'Page header' },
      { selector: 'footer, [role="contentinfo"]', description: 'Page footer' },
      
      // Content structure
      { selector: 'h1', description: 'Page title' },
      { selector: 'h2, h3, h4, h5, h6', description: 'Section headings' },
      
      // Interactive elements
      { selector: 'button, a, input, textarea, select', description: 'Interactive elements' },
      { selector: 'img[alt]', description: 'Images with alt text' },
      
      // Form elements
      { selector: 'label, [aria-label], [aria-labelledby]', description: 'Form labels' },
      { selector: 'input[required], textarea[required]', description: 'Required fields' },
    ];
    
    for (const check of accessibilityChecks) {
      const elements = page.locator(check.selector);
      const count = await elements.count();
      expect(count).toBeGreaterThan(0);
    }
    
    // Test focus management
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Test semantic HTML
    const semanticElements = page.locator('article, section, aside, header, footer, nav, main');
    expect(await semanticElements.count()).toBeGreaterThan(0);
    
    // Test ARIA landmarks
    const landmarks = page.locator('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"]');
    expect(await landmarks.count()).toBeGreaterThan(0);
  });
}); 