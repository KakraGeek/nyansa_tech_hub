# 🧪 E2E Testing Guide - Nyansa Tech Hub

## 📋 Overview

This guide covers the comprehensive End-to-End (E2E) testing setup for the Nyansa Tech Hub website using Playwright. The testing suite includes user flow testing, mobile responsiveness, accessibility compliance, and cross-browser compatibility.

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Git**

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run test:install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test types
npm run test:ui          # Interactive UI mode
npm run test:headed      # Headed mode (see browser)
npm run test:debug       # Debug mode
```

## 📁 Test Structure

### Test Files

```
tests/
├── e2e-user-flows.spec.ts      # Complete user journey tests
├── mobile-e2e.spec.ts          # Mobile-specific tests
├── accessibility-e2e.spec.ts   # WCAG compliance tests
├── homepage.spec.ts            # Homepage functionality
├── contactForm.spec.ts         # Contact form testing
├── coreInitiatives.spec.ts     # Core initiatives section
├── ourSpaces.spec.ts          # Our spaces gallery
├── partnersGrid.spec.ts        # Partners grid functionality
├── whatWeDo.spec.ts           # What we do section
├── whyItMatters.spec.ts       # Why it matters section
└── errorHandling.spec.ts      # Error handling scenarios
```

### Test Categories

#### 1. **User Flow Tests** (`e2e-user-flows.spec.ts`)
- Complete homepage user journey
- Contact form submission flow
- Navigation and responsive design
- Interactive elements and animations
- Error handling and edge cases
- Performance and loading states
- Cross-browser compatibility
- SEO and meta tags validation
- Complete user journey simulation

#### 2. **Mobile Tests** (`mobile-e2e.spec.ts`)
- Mobile navigation and menu functionality
- Touch interactions and gestures
- Mobile form interactions
- Responsive images and media
- Mobile performance and loading
- Mobile accessibility and screen reader support
- Mobile error handling and offline behavior
- Mobile browser compatibility
- Mobile user journey simulation

#### 3. **Accessibility Tests** (`accessibility-e2e.spec.ts`)
- WCAG 2.1 AA compliance - Keyboard navigation
- ARIA labels and roles
- Color contrast and visual design
- Heading structure
- Screen reader support
- Form accessibility
- Multimedia accessibility
- Dynamic content updates
- Keyboard shortcuts and commands
- Language and internationalization
- Complete accessibility audit

## 🎯 Test Scenarios

### User Journey Scenarios

1. **New Visitor Journey**
   - Lands on homepage
   - Reads about what we do
   - Explores core initiatives
   - Views our spaces
   - Checks out partners
   - Reads why it matters
   - Decides to contact
   - Fills out contact form
   - Sees confirmation

2. **Returning User Journey**
   - Navigates directly to specific sections
   - Uses mobile menu
   - Submits contact form
   - Explores partner links

3. **Accessibility User Journey**
   - Uses keyboard navigation
   - Relies on screen reader
   - Tests focus management
   - Validates ARIA attributes

### Error Scenarios

1. **Network Errors**
   - Offline behavior
   - Slow network conditions
   - API failures

2. **Form Validation Errors**
   - Empty submissions
   - Invalid email formats
   - Missing required fields

3. **Browser Compatibility Issues**
   - Different browser engines
   - Various screen sizes
   - Different input methods

## 🛠️ Test Configuration

### Playwright Configuration (`playwright.config.ts`)

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

### Browser Configuration

The tests run on three major browsers:
- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

### Viewport Configuration

Tests cover multiple viewport sizes:
- **Desktop**: 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 375x667

## 📊 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# Show test report
npm run test:report
```

### Advanced Commands

```bash
# Run specific test file
npx playwright test tests/e2e-user-flows.spec.ts

# Run tests matching a pattern
npx playwright test --grep "contact form"

# Run tests on specific browser
npx playwright test --project=chromium

# Run tests with specific viewport
npx playwright test --grep "mobile"

# Generate HTML report
npx playwright test --reporter=html
```

### Custom Test Runner

Use the custom test runner for comprehensive testing:

```bash
# Run all tests with custom runner
node scripts/run-e2e-tests.js

# Run specific test types
node scripts/run-e2e-tests.js user-flows
node scripts/run-e2e-tests.js mobile
node scripts/run-e2e-tests.js accessibility
node scripts/run-e2e-tests.js cross-browser
node scripts/run-e2e-tests.js responsive
node scripts/run-e2e-tests.js performance
node scripts/run-e2e-tests.js quick
```

## 📈 Test Reports

### HTML Report

After running tests, generate an HTML report:

```bash
npx playwright show-report
```

The report includes:
- Test results summary
- Screenshots of failures
- Video recordings
- Performance metrics
- Error details

### Console Output

Tests provide detailed console output with:
- ✅ Success indicators
- ❌ Error messages
- ⚠️ Warnings
- ℹ️ Information

## 🔧 Writing New Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should perform specific action', async ({ page }) => {
    // Arrange
    await page.goto('/');
    
    // Act
    await page.click('button');
    
    // Assert
    await expect(page.locator('.result')).toBeVisible();
  });
});
```

### Best Practices

1. **Use Descriptive Test Names**
   ```typescript
   test('should display contact form when user clicks contact button', async ({ page }) => {
   ```

2. **Follow AAA Pattern**
   - **Arrange**: Set up test data and conditions
   - **Act**: Perform the action being tested
   - **Assert**: Verify the expected outcome

3. **Use Reliable Selectors**
   ```typescript
   // Good
   await page.locator('button[aria-label="Submit form"]').click();
   
   // Avoid
   await page.locator('button').nth(3).click();
   ```

4. **Handle Async Operations**
   ```typescript
   await expect(page.locator('.loading')).toBeVisible();
   await expect(page.locator('.loading')).not.toBeVisible({ timeout: 10000 });
   ```

5. **Test Accessibility**
   ```typescript
   await expect(page.locator('button')).toHaveAttribute('aria-label');
   ```

### Test Data Management

```typescript
// Use test fixtures for reusable data
const testData = {
  validUser: {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message'
  }
};

test('should submit form with valid data', async ({ page }) => {
  await page.locator('input[name="name"]').fill(testData.validUser.name);
  // ... rest of test
});
```

## 🐛 Debugging Tests

### Debug Mode

```bash
npm run test:debug
```

This opens Playwright Inspector for step-by-step debugging.

### Screenshots and Videos

Failed tests automatically capture:
- Screenshots at failure point
- Video recordings of the entire test
- Trace files for detailed analysis

### Common Issues

1. **Element Not Found**
   ```typescript
   // Wait for element to be visible
   await expect(page.locator('.element')).toBeVisible();
   ```

2. **Timing Issues**
   ```typescript
   // Wait for network idle
   await page.goto('/', { waitUntil: 'networkidle' });
   ```

3. **Dynamic Content**
   ```typescript
   // Wait for content to load
   await page.waitForSelector('.dynamic-content');
   ```

## 🔄 Continuous Integration

### GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:install
      - run: npm run build
      - run: npm start &
      - run: npm test
```

### Environment Variables

```bash
# Test environment
NODE_ENV=test
PLAYWRIGHT_BASE_URL=http://localhost:3000
```

## 📚 Additional Resources

### Documentation
- [Playwright Documentation](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)

### Tools
- [Playwright Inspector](https://playwright.dev/docs/debug)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Axe Core](https://github.com/dequelabs/axe-core)

### Community
- [Playwright Discord](https://discord.gg/playwright)
- [Testing Library](https://testing-library.com/)

## 🤝 Contributing

When adding new tests:

1. Follow the existing test structure
2. Include accessibility testing
3. Test multiple viewport sizes
4. Add proper error handling
5. Update this documentation
6. Run the full test suite before submitting

## 📞 Support

For questions about the testing setup:
1. Check the test output for specific errors
2. Review the Playwright documentation
3. Consult the accessibility guidelines
4. Contact the development team

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Nyansa Tech Hub Development Team 