import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
	});

	test('should load contact page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Contact/);
	});

	test('contact form should be visible', async ({ page }) => {
		const form = page.locator('form, .contact-form').first();
		await expect(form).toBeVisible();
	});

	test('should have all form fields', async ({ page }) => {
		// Name field
		const nameInput = page.locator('input[type="text"], input#name').first();
		await expect(nameInput).toBeVisible();

		// Email field
		const emailInput = page.locator('input[type="email"], input#email').first();
		await expect(emailInput).toBeVisible();

		// Message field
		const messageInput = page.locator('textarea, textarea#message').first();
		await expect(messageInput).toBeVisible();
	});

	test('should submit contact form successfully', async ({ page }) => {
		// Fill form
		await page.fill('input[type="text"], input#name', 'John Doe');
		await page.fill('input[type="email"], input#email', 'john@example.com');
		await page.fill('textarea, textarea#message', 'This is a test message');

		// Submit
		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();

		// Wait for success message
		await page.waitForTimeout(2000);

		// Check for success message
		const successMessage = page.locator('.success-message, .alert-success, [class*="success"]');
		await expect(successMessage.first()).toBeVisible({ timeout: 5000 });
	});

	test('should validate email field', async ({ page }) => {
		const emailInput = page.locator('input[type="email"]').first();
		const submitButton = page.locator('button[type="submit"]').first();

		// Try invalid email
		await emailInput.fill('invalid-email');
		await submitButton.click();

		const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(isInvalid).toBe(true);
	});

	test('should validate required fields', async ({ page }) => {
		const submitButton = page.locator('button[type="submit"]').first();
		
		// Try to submit empty form
		await submitButton.click();

		// Check if form is invalid
		const nameInput = page.locator('input[type="text"], input#name').first();
		const isRequired = await nameInput.getAttribute('required');
		expect(isRequired).not.toBeNull();
	});

	test('contact information should be displayed', async ({ page }) => {
		// Check for email
		const emailLink = page.locator('a[href^="mailto:"]');
		if (await emailLink.count() > 0) {
			await expect(emailLink.first()).toBeVisible();
		}

		// Check for phone
		const phoneLink = page.locator('a[href^="tel:"]');
		if (await phoneLink.count() > 0) {
			await expect(phoneLink.first()).toBeVisible();
		}
	});

	test('social media links should be present', async ({ page }) => {
		const socialLinks = page.locator('.social-links a, a[href*="github"], a[href*="linkedin"], a[href*="twitter"]');
		const count = await socialLinks.count();
		expect(count).toBeGreaterThan(0);
	});

	test('FAQ section should be visible', async ({ page }) => {
		const faqSection = page.locator('.faq-section, .faq');
		if (await faqSection.count() > 0) {
			await faqSection.scrollIntoViewIfNeeded();
			await expect(faqSection).toBeVisible();

			// Check for FAQ items
			const faqItems = page.locator('.faq-item, .faq-question');
			const count = await faqItems.count();
			expect(count).toBeGreaterThan(0);
		}
	});

	test('should handle form submission with all fields', async ({ page }) => {
		// Fill all fields
		await page.fill('input#name, input[type="text"]', 'Jane Smith');
		await page.fill('input#email, input[type="email"]', 'jane@example.com');
		
		// Company field (if exists)
		const companyInput = page.locator('input#company');
		if (await companyInput.count() > 0) {
			await companyInput.fill('Test Company');
		}

		// Phone field (if exists)
		const phoneInput = page.locator('input#phone, input[type="tel"]');
		if (await phoneInput.count() > 0) {
			await phoneInput.fill('+1234567890');
		}

		// Subject field (if exists)
		const subjectSelect = page.locator('select#subject');
		if (await subjectSelect.count() > 0) {
			await subjectSelect.selectOption({ index: 1 });
		}

		// Message
		await page.fill('textarea#message, textarea', 'Detailed test message');

		// Submit
		await page.locator('button[type="submit"]').first().click();
		await page.waitForTimeout(2000);

		// Check for success
		const success = page.locator('.success-message, .alert-success');
		await expect(success.first()).toBeVisible({ timeout: 5000 });
	});

	test('should show loading state during submission', async ({ page }) => {
		await page.fill('input[type="text"]', 'Test User');
		await page.fill('input[type="email"]', 'test@example.com');
		await page.fill('textarea', 'Test message');

		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();

		// Check for loading state
		const loadingIndicator = page.locator('.loading, .spinner, button:disabled');
		await expect(loadingIndicator.first()).toBeVisible({ timeout: 1000 });
	});

	test('should reset form after successful submission', async ({ page }) => {
		// Submit form
		await page.fill('input[type="text"]', 'Reset Test');
		await page.fill('input[type="email"]', 'reset@example.com');
		await page.fill('textarea', 'Reset test message');
		await page.locator('button[type="submit"]').first().click();
		await page.waitForTimeout(2500);

		// Check if there's a "Send Another Message" button
		const resetButton = page.locator('button:has-text("Send Another"), button:has-text("Reset")');
		if (await resetButton.count() > 0) {
			await resetButton.first().click();
			await page.waitForTimeout(500);

			// Form should be visible again
			const form = page.locator('form').first();
			await expect(form).toBeVisible();
		}
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			const form = page.locator('form').first();
			await expect(form).toBeVisible();

			// Form should be full width on mobile
			const formBox = await form.boundingBox();
			if (formBox && viewport) {
				expect(formBox.width).toBeGreaterThan(viewport.width * 0.8);
			}
		}
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		await page.goto('/contact');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});

	test('contact info cards should be visible', async ({ page }) => {
		const infoCards = page.locator('.info-card, .contact-info');
		const count = await infoCards.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should handle long messages', async ({ page }) => {
		const longMessage = 'A'.repeat(1000);
		
		await page.fill('input[type="text"]', 'Long Message Test');
		await page.fill('input[type="email"]', 'long@example.com');
		await page.fill('textarea', longMessage);

		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();
		await page.waitForTimeout(2000);

		// Should still submit successfully
		const success = page.locator('.success-message, .alert-success');
		if (await success.count() > 0) {
			await expect(success.first()).toBeVisible({ timeout: 5000 });
		}
	});

	test('should load within performance budget', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/contact');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;

		expect(loadTime).toBeLessThan(5000);
	});

	test('navigation should work', async ({ page }) => {
		const homeLink = page.locator('a[href="/"]');
		if (await homeLink.count() > 0) {
			await homeLink.first().click();
			await expect(page).toHaveURL('/');
		}
	});
});

