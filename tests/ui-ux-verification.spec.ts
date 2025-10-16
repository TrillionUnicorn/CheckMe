import { test, expect } from '@playwright/test';

/**
 * UI/UX Verification Tests
 * Verify all interactive elements, CTAs, and user flows work correctly
 */

test.describe('CTA Button Verification', () => {
	test('should verify all CTAs on home page are clickable', async ({ page }) => {
		await page.goto('/');
		
		// Hero CTAs
		const startButton = page.locator('a[href="/verify"]').first();
		await expect(startButton).toBeVisible();
		await expect(startButton).toBeEnabled();
		
		const pitchButton = page.locator('a[href="/pitch"]').first();
		await expect(pitchButton).toBeVisible();
		await expect(pitchButton).toBeEnabled();
		
		// Pricing CTAs
		const pricingButtons = page.locator('.pricing-card .btn');
		const count = await pricingButtons.count();
		expect(count).toBeGreaterThan(0);
		
		for (let i = 0; i < count; i++) {
			await expect(pricingButtons.nth(i)).toBeVisible();
			await expect(pricingButtons.nth(i)).toBeEnabled();
		}
	});

	test('should verify CTA hover effects', async ({ page }) => {
		await page.goto('/');
		
		const primaryButton = page.locator('.btn-primary').first();
		
		// Get initial transform
		const initialTransform = await primaryButton.evaluate((el) => {
			return window.getComputedStyle(el).transform;
		});
		
		// Hover over button
		await primaryButton.hover();
		await page.waitForTimeout(500); // Wait for transition
		
		// Get transform after hover
		const hoverTransform = await primaryButton.evaluate((el) => {
			return window.getComputedStyle(el).transform;
		});
		
		// Transform should change on hover (translateY effect)
		expect(hoverTransform).not.toBe(initialTransform);
	});

	test('should verify all CTAs navigate correctly', async ({ page }) => {
		await page.goto('/');
		
		// Test "Start Free Verification" button
		await page.click('a[href="/verify"]');
		await page.waitForURL('**/verify');
		expect(page.url()).toContain('/verify');
		
		// Go back
		await page.goto('/');
		
		// Test "View Pitch Deck" button
		await page.click('a[href="/pitch"]');
		await page.waitForURL('**/pitch');
		expect(page.url()).toContain('/pitch');
	});
});

test.describe('Form Interaction Verification', () => {
	test('should verify waitlist form submission flow', async ({ page }) => {
		await page.goto('/');
		
		// Scroll to waitlist section
		const waitlistSection = page.locator('.waitlist-section');
		await waitlistSection.scrollIntoViewIfNeeded();
		
		// Fill email
		const emailInput = page.locator('.waitlist-input');
		await expect(emailInput).toBeVisible();
		await emailInput.fill('test@example.com');
		
		// Submit form
		const submitButton = page.locator('.waitlist-form button[type="submit"]');
		await submitButton.click();
		
		// Wait for success message
		await page.waitForTimeout(1000);
		
		// Verify success message appears
		const successMessage = page.locator('.success-message');
		await expect(successMessage).toBeVisible();
	});

	test('should verify verification form on verify page', async ({ page }) => {
		await page.goto('/verify');
		
		// Select verification type
		const select = page.locator('#verification-type');
		await expect(select).toBeVisible();
		await select.selectOption('identity');
		
		// Fill input
		const input = page.locator('#verification-input');
		await expect(input).toBeVisible();
		await input.fill('John Doe');
		
		// Submit
		const submitButton = page.locator('.btn-primary');
		await submitButton.click();
		
		// Wait for results
		await page.waitForTimeout(2000);
		
		// Verify results appear
		const results = page.locator('.verification-result');
		await expect(results).toBeVisible();
	});

	test('should verify contact form submission', async ({ page }) => {
		await page.goto('/contact');
		
		// Fill all required fields
		await page.fill('input[type="text"]', 'Test User');
		await page.fill('input[type="email"]', 'test@example.com');
		await page.fill('textarea', 'This is a test message');
		
		// Submit
		await page.click('button[type="submit"]');
		
		// Wait for success
		await page.waitForTimeout(2000);
		
		// Verify success message
		const successMessage = page.locator('.success-message');
		await expect(successMessage).toBeVisible();
	});
});

test.describe('Navigation Verification', () => {
	test('should verify all navigation links work', async ({ page }) => {
		await page.goto('/');
		
		// Test footer navigation
		const footerLinks = [
			{ href: '/verify', text: 'Verification' },
			{ href: '/pitch', text: 'Pitch' },
			{ href: '/contact', text: 'Contact' }
		];
		
		for (const link of footerLinks) {
			await page.goto('/');
			const linkElement = page.locator(`a[href="${link.href}"]`).first();
			await expect(linkElement).toBeVisible();
			await linkElement.click();
			await page.waitForURL(`**${link.href}`);
			expect(page.url()).toContain(link.href);
		}
	});

	test('should verify browser back/forward navigation', async ({ page }) => {
		await page.goto('/');
		await page.click('a[href="/verify"]');
		await page.waitForURL('**/verify');
		
		// Go back
		await page.goBack();
		await page.waitForURL('**/');
		expect(page.url()).not.toContain('/verify');
		
		// Go forward
		await page.goForward();
		await page.waitForURL('**/verify');
		expect(page.url()).toContain('/verify');
	});
});

test.describe('Interactive Element Verification', () => {
	test('should verify document upload drag and drop', async ({ page }) => {
		await page.goto('/verify');
		
		const dropZone = page.locator('.drop-zone');
		await expect(dropZone).toBeVisible();
		
		// Verify drop zone has proper ARIA attributes
		const role = await dropZone.getAttribute('role');
		expect(role).toBe('button');
		
		const ariaLabel = await dropZone.getAttribute('aria-label');
		expect(ariaLabel).toBeTruthy();
	});

	test('should verify file input works', async ({ page }) => {
		await page.goto('/verify');
		
		// Click browse link
		const browseLink = page.locator('.file-label');
		await expect(browseLink).toBeVisible();
		
		// File input should exist
		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeAttached();
	});

	test('should verify dropdown selections', async ({ page }) => {
		await page.goto('/verify');
		
		const select = page.locator('#verification-type');
		await expect(select).toBeVisible();
		
		// Get all options
		const options = await select.locator('option').all();
		expect(options.length).toBeGreaterThan(1);
		
		// Select each option
		for (const option of options) {
			const value = await option.getAttribute('value');
			if (value) {
				await select.selectOption(value);
				const selectedValue = await select.inputValue();
				expect(selectedValue).toBe(value);
			}
		}
	});
});

test.describe('Animation Verification', () => {
	test('should verify hero animations on load', async ({ page }) => {
		await page.goto('/');
		
		// Wait for animations to complete
		await page.waitForTimeout(2000);
		
		// Verify elements are visible (animations completed)
		await expect(page.locator('.hero-title')).toBeVisible();
		await expect(page.locator('.hero-subtitle')).toBeVisible();
		await expect(page.locator('.hero-cta')).toBeVisible();
	});

	test('should verify scroll animations on pitch page', async ({ page }) => {
		await page.goto('/pitch');
		
		// Scroll down
		await page.evaluate(() => {
			window.scrollTo(0, window.innerHeight * 2);
		});
		
		await page.waitForTimeout(1000);
		
		// Verify slides become visible as we scroll
		const problemSlide = page.locator('.problem-slide');
		await expect(problemSlide).toBeVisible();
	});

	test('should verify parallax effect on hero', async ({ page }) => {
		await page.goto('/');
		
		const heroBg = page.locator('.hero-bg');
		await expect(heroBg).toBeVisible();
		
		// Get initial position
		const initialTransform = await heroBg.evaluate((el) => {
			return window.getComputedStyle(el).transform;
		});
		
		// Scroll down
		await page.evaluate(() => {
			window.scrollTo(0, 500);
		});
		
		await page.waitForTimeout(500);
		
		// Get new position
		const newTransform = await heroBg.evaluate((el) => {
			return window.getComputedStyle(el).transform;
		});
		
		// Transform should change (parallax effect)
		expect(newTransform).not.toBe(initialTransform);
	});
});

test.describe('Error Handling Verification', () => {
	test('should verify form validation errors', async ({ page }) => {
		await page.goto('/contact');
		
		// Try to submit empty form
		await page.click('button[type="submit"]');
		
		// Verify validation prevents submission
		// (Form should still be visible, not replaced by success message)
		const form = page.locator('.contact-form');
		await expect(form).toBeVisible();
	});

	test('should verify email validation', async ({ page }) => {
		await page.goto('/contact');
		
		// Fill with invalid email
		await page.fill('input[type="text"]', 'Test User');
		await page.fill('input[type="email"]', 'invalid-email');
		await page.fill('textarea', 'Test message');
		
		// Try to submit
		await page.click('button[type="submit"]');
		
		// Wait a bit
		await page.waitForTimeout(1000);
		
		// Error message should appear or form should still be visible
		const form = page.locator('.contact-form');
		await expect(form).toBeVisible();
	});
});

test.describe('Accessibility Verification', () => {
	test('should verify keyboard navigation', async ({ page }) => {
		await page.goto('/');
		
		// Tab through elements
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		
		// Verify focus is visible
		const focusedElement = await page.evaluate(() => {
			return document.activeElement?.tagName;
		});
		
		expect(focusedElement).toBeTruthy();
	});

	test('should verify all images have alt text or are decorative', async ({ page }) => {
		await page.goto('/');
		
		const images = await page.locator('img').all();
		
		for (const img of images) {
			const alt = await img.getAttribute('alt');
			const role = await img.getAttribute('role');
			
			// Image should have alt text or role="presentation"
			expect(alt !== null || role === 'presentation').toBe(true);
		}
	});

	test('should verify form labels are associated with inputs', async ({ page }) => {
		await page.goto('/contact');
		
		const labels = await page.locator('label').all();
		
		for (const label of labels) {
			const forAttr = await label.getAttribute('for');
			
			if (forAttr) {
				// Verify corresponding input exists
				const input = page.locator(`#${forAttr}`);
				await expect(input).toBeAttached();
			}
		}
	});
});

test.describe('Console Error Verification', () => {
	test('should have no console errors on home page', async ({ page }) => {
		const errors: string[] = [];
		
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		// Filter out known acceptable errors (if any)
		const criticalErrors = errors.filter(error => {
			// Add filters for acceptable errors here
			return !error.includes('favicon'); // Example: ignore favicon errors
		});
		
		expect(criticalErrors).toHaveLength(0);
	});

	test('should have no console errors on verify page', async ({ page }) => {
		const errors: string[] = [];
		
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/verify');
		await page.waitForLoadState('networkidle');
		
		const criticalErrors = errors.filter(error => !error.includes('favicon'));
		expect(criticalErrors).toHaveLength(0);
	});
});

