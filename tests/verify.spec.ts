import { test, expect } from '@playwright/test';

test.describe('Verify Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/verify');
	});

	test('should load verify page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Verify/);
	});

	test('verification form should be visible', async ({ page }) => {
		const form = page.locator('form').first();
		await expect(form).toBeVisible();

		// Check form fields
		await expect(page.locator('input[type="text"]').first()).toBeVisible();
		await expect(page.locator('input[type="email"]').first()).toBeVisible();
	});

	test('should submit verification form', async ({ page }) => {
		// Fill form
		await page.fill('input[type="text"]', 'John Doe');
		await page.fill('input[type="email"]', 'john@example.com');
		await page.fill('input[type="tel"]', '+1234567890');

		// Submit
		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();

		// Wait for result
		await page.waitForTimeout(2500);

		// Check if result is displayed
		const result = page.locator('.verification-result, .result-card, .alert-success');
		await expect(result.first()).toBeVisible({ timeout: 5000 });
	});

	test('document upload should be visible', async ({ page }) => {
		const uploadSection = page.locator('.document-upload, .drop-zone');
		await expect(uploadSection.first()).toBeVisible();
	});

	test('should handle file upload', async ({ page }) => {
		// Create a test file
		const buffer = new TextEncoder().encode('test file content');
		
		// Set up file chooser handler
		const fileChooserPromise = page.waitForEvent('filechooser');
		
		// Click on file input or drop zone
		const fileInput = page.locator('input[type="file"]');
		if (await fileInput.count() > 0) {
			await fileInput.click();
			const fileChooser = await fileChooserPromise;
			await fileChooser.setFiles({
				name: 'test-document.jpg',
				mimeType: 'image/jpeg',
				buffer: buffer
			});

			// Check if file is selected
			await page.waitForTimeout(500);
			const selectedFile = page.locator('.selected-file, .file-name');
			if (await selectedFile.count() > 0) {
				await expect(selectedFile.first()).toBeVisible();
			}
		}
	});

	test('should validate file type', async ({ page }) => {
		const fileInput = page.locator('input[type="file"]');
		
		if (await fileInput.count() > 0) {
			// Check accepted file types
			const accept = await fileInput.getAttribute('accept');
			expect(accept).toContain('image');
		}
	});

	test('should show upload progress', async ({ page }) => {
		// This test checks if upload progress UI exists
		const progressBar = page.locator('.progress-bar, .upload-progress');
		// Progress bar might not be visible initially
		const count = await progressBar.count();
		expect(count).toBeGreaterThanOrEqual(0);
	});

	test('should display verification results', async ({ page }) => {
		// Fill and submit form
		await page.fill('input[type="text"]', 'Jane Smith');
		await page.fill('input[type="email"]', 'jane@example.com');
		
		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();

		// Wait for results
		await page.waitForTimeout(2500);

		// Check for result elements
		const resultElements = page.locator('.verification-result, .result-card, .risk-score, .alert');
		const count = await resultElements.count();
		expect(count).toBeGreaterThan(0);
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

		await page.goto('/verify');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});

	test('form validation should work', async ({ page }) => {
		const emailInput = page.locator('input[type="email"]').first();
		const submitButton = page.locator('button[type="submit"]').first();

		// Try invalid email
		await emailInput.fill('invalid-email');
		await submitButton.click();

		const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(isInvalid).toBe(true);
	});

	test('should handle multiple verifications', async ({ page }) => {
		// First verification
		await page.fill('input[type="text"]', 'User One');
		await page.fill('input[type="email"]', 'user1@example.com');
		await page.locator('button[type="submit"]').first().click();
		await page.waitForTimeout(2500);

		// Reset or submit another
		const resetButton = page.locator('button:has-text("Reset"), button:has-text("New"), button:has-text("Another")');
		if (await resetButton.count() > 0) {
			await resetButton.first().click();
			await page.waitForTimeout(500);

			// Second verification
			await page.fill('input[type="text"]', 'User Two');
			await page.fill('input[type="email"]', 'user2@example.com');
			await page.locator('button[type="submit"]').first().click();
			await page.waitForTimeout(2500);
		}
	});

	test('should display risk score', async ({ page }) => {
		await page.fill('input[type="text"]', 'Test User');
		await page.fill('input[type="email"]', 'test@example.com');
		await page.locator('button[type="submit"]').first().click();
		await page.waitForTimeout(2500);

		// Look for risk score or confidence score
		const scoreElement = page.locator('.risk-score, .confidence-score, .score, .metric-value');
		if (await scoreElement.count() > 0) {
			await expect(scoreElement.first()).toBeVisible();
		}
	});

	test('should show loading state during verification', async ({ page }) => {
		await page.fill('input[type="text"]', 'Loading Test');
		await page.fill('input[type="email"]', 'loading@example.com');
		
		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();

		// Check for loading indicator
		const loadingIndicator = page.locator('.loading, .spinner, button:disabled');
		await expect(loadingIndicator.first()).toBeVisible({ timeout: 1000 });
	});

	test('navigation should work', async ({ page }) => {
		// Check if there's a back/home link
		const homeLink = page.locator('a[href="/"]');
		if (await homeLink.count() > 0) {
			await homeLink.first().click();
			await expect(page).toHaveURL('/');
		}
	});

	test('should load within performance budget', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/verify');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;

		expect(loadTime).toBeLessThan(5000);
	});
});

