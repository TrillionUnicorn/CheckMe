# CheckMe Playwright Tests

This directory contains comprehensive end-to-end tests for the CheckMe platform using Playwright.

## 📁 Test Files

### `home.spec.ts` (20+ tests)
Tests for the home/landing page including:
- Hero section visibility and functionality
- Why Us section (5 feature cards)
- How It Works section (3 steps)
- Pricing section (3 tiers)
- Waitlist form submission
- Footer links and navigation
- Mobile responsiveness
- Performance metrics
- Console error detection
- Image loading
- Animations
- Meta tags
- Form validation

### `verify.spec.ts` (15+ tests)
Tests for the verification page including:
- Verification form functionality
- Document upload component
- File type validation
- Upload progress tracking
- Verification results display
- Risk score calculation
- Mobile responsiveness
- Form validation
- Multiple verifications
- Loading states
- Navigation

### `pitch.spec.ts` (15+ tests)
Tests for the pitch deck page including:
- All 11 slides visibility
- Cover slide
- Problem slide with statistics
- Market analysis (TAM/SAM/SOM)
- Competitive analysis table
- Business model and revenue streams
- Roadmap timeline
- Team information
- Investment slide
- Closing slide with CTAs
- Scroll functionality
- Mobile responsiveness
- Sources and citations

### `contact.spec.ts` (15+ tests)
Tests for the contact page including:
- Contact form visibility
- All form fields present
- Form submission
- Email validation
- Required field validation
- Contact information display
- Social media links
- FAQ section
- Loading states
- Form reset
- Mobile responsiveness
- Long message handling

### `responsive.spec.ts` (Comprehensive)
Responsive design tests including:
- 6 viewport sizes:
  - Mobile Portrait (375x667)
  - Mobile Landscape (667x375)
  - Tablet Portrait (768x1024)
  - Tablet Landscape (1024x768)
  - Desktop (1920x1080)
  - Large Desktop (2560x1440)
- All 4 pages tested on each viewport
- Horizontal scroll detection
- Content width verification
- Screenshot generation
- Navigation functionality
- Touch target sizes
- Text readability
- Image scaling
- Orientation changes
- Device-specific testing
- Touch interactions
- Layout shift detection (CLS)
- Zoom level handling
- Reduced motion support
- Dark mode support

## 🚀 Running Tests

### Install Dependencies
```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install project dependencies
bun install

# Install Playwright browsers (first time only)
bunx playwright install
```

### Run All Tests
```bash
# Run all tests
bun test

# Run tests in UI mode (interactive)
bun run test:ui

# Run tests in headed mode (see browser)
bun run test:headed
```

### Run Specific Tests
```bash
# Run only home page tests
bunx playwright test tests/home.spec.ts

# Run only verify page tests
bunx playwright test tests/verify.spec.ts

# Run only pitch deck tests
bunx playwright test tests/pitch.spec.ts

# Run only contact page tests
bunx playwright test tests/contact.spec.ts

# Run only responsive tests
bunx playwright test tests/responsive.spec.ts
```

### Run Tests on Specific Browser
```bash
# Run on Chromium only
bunx playwright test --project=chromium

# Run on Firefox only
bunx playwright test --project=firefox

# Run on WebKit (Safari) only
bunx playwright test --project=webkit

# Run on Mobile Chrome
bunx playwright test --project="Mobile Chrome"

# Run on Mobile Safari
bunx playwright test --project="Mobile Safari"

# Run on Tablet
bunx playwright test --project="Tablet"
```

### Debug Tests
```bash
# Run in debug mode
bunx playwright test --debug

# Run specific test in debug mode
bunx playwright test tests/home.spec.ts --debug

# Run with trace
bunx playwright test --trace on
```

## 📊 Test Reports

### View HTML Report
```bash
# Generate and open HTML report
bunx playwright show-report
```

### Screenshots
Failed tests automatically capture screenshots in:
- `test-results/` directory

Visual regression screenshots are saved in:
- `tests/screenshots/` directory

### Videos
Failed tests automatically record videos in:
- `test-results/` directory

## 🎯 Test Configuration

Configuration is in `playwright.config.ts`:

```typescript
{
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
}
```

## ✅ Test Coverage

### Pages Tested
- ✅ Home/Landing page (`/`)
- ✅ Verify page (`/verify`)
- ✅ Pitch Deck page (`/pitch`)
- ✅ Contact page (`/contact`)

### Browsers Tested
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)

### Devices Tested
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)
- ✅ Tablet (iPad Pro)

### Viewports Tested
- ✅ Mobile Portrait (375x667)
- ✅ Mobile Landscape (667x375)
- ✅ Tablet Portrait (768x1024)
- ✅ Tablet Landscape (1024x768)
- ✅ Desktop (1920x1080)
- ✅ Large Desktop (2560x1440)

## 🐛 Common Issues

### Tests Failing?

1. **Dev server not running**
   ```bash
   # Make sure dev server is running
   bun run dev
   ```

2. **Browsers not installed**
   ```bash
   # Install Playwright browsers
   bunx playwright install
   ```

3. **Port already in use**
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

4. **Outdated dependencies**
   ```bash
   # Update dependencies
   bun install
   ```

### Slow Tests?

1. **Run in parallel**
   ```bash
   # Tests run in parallel by default
   # Adjust workers in playwright.config.ts
   ```

2. **Run specific tests**
   ```bash
   # Only run tests you need
   bunx playwright test tests/home.spec.ts
   ```

3. **Skip slow tests**
   ```bash
   # Add .skip to slow tests
   test.skip('slow test', async ({ page }) => {
     // ...
   });
   ```

## 📝 Writing New Tests

### Test Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    // Your test code
    const element = page.locator('.your-selector');
    await expect(element).toBeVisible();
  });
});
```

### Best Practices

1. **Use descriptive test names**
   ```typescript
   test('should submit form successfully', async ({ page }) => {
     // Good: Clear what the test does
   });
   ```

2. **Use data-testid for selectors**
   ```typescript
   <button data-testid="submit-button">Submit</button>
   
   await page.click('[data-testid="submit-button"]');
   ```

3. **Wait for elements**
   ```typescript
   await expect(page.locator('.result')).toBeVisible({ timeout: 5000 });
   ```

4. **Clean up after tests**
   ```typescript
   test.afterEach(async ({ page }) => {
     // Clean up
   });
   ```

## 🎯 Success Criteria

Tests should pass with:
- ✅ No console errors
- ✅ All elements visible
- ✅ Forms working correctly
- ✅ Navigation functional
- ✅ Responsive on all devices
- ✅ Performance within budget
- ✅ No layout shifts
- ✅ Images loading correctly

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Bun Documentation](https://bun.sh/docs)

## 🤝 Contributing

When adding new features:
1. Write tests first (TDD)
2. Run tests locally
3. Ensure all tests pass
4. Create PR with test results

## 📞 Support

If tests are failing:
1. Check test output for errors
2. Review screenshots in `test-results/`
3. Run in debug mode: `bunx playwright test --debug`
4. Check `playwright-report/` for detailed results

---

**Total Tests**: 65+  
**Coverage**: All pages, all devices, all browsers  
**Status**: Ready to run! 🚀

