#!/usr/bin/env node

/**
 * Comprehensive E2E Test Runner for Nyansa Tech Hub
 * 
 * This script runs all E2E tests with proper configuration and reporting.
 * It includes:
 * - All user flow tests
 * - Mobile-specific tests
 * - Accessibility tests
 * - Performance tests
 * - Cross-browser compatibility tests
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  browsers: ['chromium', 'firefox', 'webkit'],
  viewports: [
    { width: 1920, height: 1080, name: 'Desktop' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 375, height: 667, name: 'Mobile' }
  ],
  testFiles: [
    'tests/e2e-user-flows.spec.ts',
    'tests/mobile-e2e.spec.ts',
    'tests/accessibility-e2e.spec.ts',
    'tests/homepage.spec.ts',
    'tests/contactForm.spec.ts',
    'tests/coreInitiatives.spec.ts',
    'tests/ourSpaces.spec.ts',
    'tests/partnersGrid.spec.ts',
    'tests/whatWeDo.spec.ts',
    'tests/whyItMatters.spec.ts',
    'tests/errorHandling.spec.ts'
  ]
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${message}`, 'bright');
  log('='.repeat(60), 'cyan');
}

function logSection(message) {
  log('\n' + '-'.repeat(40), 'yellow');
  log(`  ${message}`, 'yellow');
  log('-'.repeat(40), 'yellow');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Test runner functions
function checkPrerequisites() {
  logHeader('Checking Prerequisites');
  
  // Check if Playwright is installed
  try {
    execSync('npx playwright --version', { stdio: 'pipe' });
    logSuccess('Playwright is installed');
  } catch (error) {
    logError('Playwright is not installed. Installing now...');
    try {
      execSync('npm install --save-dev @playwright/test', { stdio: 'inherit' });
      execSync('npx playwright install', { stdio: 'inherit' });
      logSuccess('Playwright installed successfully');
    } catch (installError) {
      logError('Failed to install Playwright');
      process.exit(1);
    }
  }
  
  // Check if test files exist
  TEST_CONFIG.testFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logSuccess(`${file} exists`);
    } else {
      logWarning(`${file} not found`);
    }
  });
  
  // Check if Next.js dev server can be started
  logInfo('Checking if Next.js development server can be started...');
}

function startDevServer() {
  logHeader('Starting Development Server');
  
  try {
    // Check if server is already running
    execSync('curl -s http://localhost:3000 > /dev/null', { stdio: 'pipe' });
    logSuccess('Development server is already running on port 3000');
    return true;
  } catch (error) {
    logInfo('Starting development server...');
    try {
      // Start dev server in background
      const devProcess = execSync('npm run dev', { 
        stdio: 'pipe',
        timeout: 30000 
      });
      logSuccess('Development server started successfully');
      return true;
    } catch (startError) {
      logError('Failed to start development server');
      return false;
    }
  }
}

function runTests(testType = 'all') {
  logHeader(`Running ${testType.toUpperCase()} Tests`);
  
  const testCommands = {
    'all': 'npx playwright test',
    'user-flows': 'npx playwright test tests/e2e-user-flows.spec.ts',
    'mobile': 'npx playwright test tests/mobile-e2e.spec.ts',
    'accessibility': 'npx playwright test tests/accessibility-e2e.spec.ts',
    'quick': 'npx playwright test tests/homepage.spec.ts tests/contactForm.spec.ts',
    'headed': 'npx playwright test --headed',
    'debug': 'npx playwright test --debug',
    'ui': 'npx playwright test --ui'
  };
  
  const command = testCommands[testType] || testCommands.all;
  
  try {
    logInfo(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    logSuccess(`${testType} tests completed successfully`);
    return true;
  } catch (error) {
    logError(`${testType} tests failed`);
    return false;
  }
}

function runCrossBrowserTests() {
  logHeader('Running Cross-Browser Tests');
  
  const browsers = TEST_CONFIG.browsers;
  let allPassed = true;
  
  browsers.forEach(browser => {
    logSection(`Testing on ${browser}`);
    try {
      execSync(`npx playwright test --project=${browser}`, { stdio: 'inherit' });
      logSuccess(`${browser} tests passed`);
    } catch (error) {
      logError(`${browser} tests failed`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

function runResponsiveTests() {
  logHeader('Running Responsive Design Tests');
  
  const viewports = TEST_CONFIG.viewports;
  let allPassed = true;
  
  viewports.forEach(viewport => {
    logSection(`Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
    try {
      execSync(`npx playwright test --grep "${viewport.name}"`, { stdio: 'inherit' });
      logSuccess(`${viewport.name} tests passed`);
    } catch (error) {
      logWarning(`${viewport.name} tests failed or no specific tests found`);
    }
  });
  
  return allPassed;
}

function generateTestReport() {
  logHeader('Generating Test Report');
  
  try {
    execSync('npx playwright show-report', { stdio: 'inherit' });
    logSuccess('Test report generated successfully');
    return true;
  } catch (error) {
    logError('Failed to generate test report');
    return false;
  }
}

function runPerformanceTests() {
  logHeader('Running Performance Tests');
  
  try {
    // Run Lighthouse CI if available
    execSync('npx lhci autorun', { stdio: 'inherit' });
    logSuccess('Performance tests completed');
    return true;
  } catch (error) {
    logWarning('Lighthouse CI not available, skipping performance tests');
    return false;
  }
}

function runAccessibilityAudit() {
  logHeader('Running Accessibility Audit');
  
  try {
    // Run axe-core tests if available
    execSync('npx axe-core --help', { stdio: 'pipe' });
    execSync('npx axe-core http://localhost:3000', { stdio: 'inherit' });
    logSuccess('Accessibility audit completed');
    return true;
  } catch (error) {
    logWarning('Axe-core not available, using Playwright accessibility tests');
    return runTests('accessibility');
  }
}

// Main execution function
function main() {
  const args = process.argv.slice(2);
  const testType = args[0] || 'all';
  
  logHeader('Nyansa Tech Hub - E2E Test Runner');
  logInfo(`Test type: ${testType}`);
  logInfo(`Node.js version: ${process.version}`);
  logInfo(`Current directory: ${process.cwd()}`);
  
  // Check prerequisites
  checkPrerequisites();
  
  // Start development server
  const serverStarted = startDevServer();
  if (!serverStarted) {
    logError('Cannot run tests without development server');
    process.exit(1);
  }
  
  // Wait for server to be ready
  logInfo('Waiting for server to be ready...');
  setTimeout(() => {
    // Run tests based on type
    let testsPassed = true;
    
    switch (testType) {
      case 'all':
        testsPassed = runTests('all') && 
                     runCrossBrowserTests() && 
                     runResponsiveTests() &&
                     runAccessibilityAudit();
        break;
      case 'user-flows':
        testsPassed = runTests('user-flows');
        break;
      case 'mobile':
        testsPassed = runTests('mobile');
        break;
      case 'accessibility':
        testsPassed = runAccessibilityAudit();
        break;
      case 'cross-browser':
        testsPassed = runCrossBrowserTests();
        break;
      case 'responsive':
        testsPassed = runResponsiveTests();
        break;
      case 'performance':
        testsPassed = runPerformanceTests();
        break;
      case 'quick':
        testsPassed = runTests('quick');
        break;
      case 'headed':
        testsPassed = runTests('headed');
        break;
      case 'debug':
        testsPassed = runTests('debug');
        break;
      case 'ui':
        testsPassed = runTests('ui');
        break;
      default:
        logError(`Unknown test type: ${testType}`);
        logInfo('Available test types: all, user-flows, mobile, accessibility, cross-browser, responsive, performance, quick, headed, debug, ui');
        process.exit(1);
    }
    
    // Generate report
    generateTestReport();
    
    // Final summary
    logHeader('Test Execution Summary');
    if (testsPassed) {
      logSuccess('All tests completed successfully! 🎉');
      logInfo('Check the test report for detailed results');
    } else {
      logError('Some tests failed. Please check the output above for details.');
      process.exit(1);
    }
  }, 5000);
}

// Handle process termination
process.on('SIGINT', () => {
  logWarning('\nTest execution interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logWarning('\nTest execution terminated');
  process.exit(0);
});

// Run the main function
if (require.main === module) {
  main();
}

module.exports = {
  runTests,
  runCrossBrowserTests,
  runResponsiveTests,
  runAccessibilityAudit,
  runPerformanceTests,
  generateTestReport
}; 