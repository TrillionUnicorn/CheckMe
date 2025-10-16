import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load home page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/CheckMe/);
	});

	test('hero section should be visible and functional', async ({ page }) => {
		// Check hero title
		const heroTitle = page.locator('.hero-title');
		await expect(heroTitle).toBeVisible();
		await expect(heroTitle).toContainText('Verify Before You Trust');

		// Check hero subtitle
		const heroSubtitle = page.locator('.hero-subtitle');
		await expect(heroSubtitle).toBeVisible();

		// Check CTAs
		const primaryCTA = page.locator('a[href="/verify"]').first();
		await expect(primaryCTA).toBeVisible();
		await expect(primaryCTA).toContainText('Start Free Verification');

		const secondaryCTA = page.locator('a[href="/pitch"]').first();
		await expect(secondaryCTA).toBeVisible();
		await expect(secondaryCTA).toContainText('View Pitch Deck');

		// Check hero stats
		await expect(page.locator('.hero-stats')).toBeVisible();
		await expect(page.locator('.stat-number').first()).toContainText('100K+');
	});

	test('why us section should display all cards', async ({ page }) => {
		const whyCards = page.locator('.why-card');
		await expect(whyCards).toHaveCount(5);

		// Check first card
		await expect(whyCards.first()).toContainText('Lightning Fast');
	});

	test('how it works section should show 3 steps', async ({ page }) => {
		const stepCards = page.locator('.step-card');
		await expect(stepCards).toHaveCount(3);

		// Check step numbers
		await expect(page.locator('.step-number').first()).toContainText('1');
		await expect(page.locator('.step-number').nth(1)).toContainText('2');
		await expect(page.locator('.step-number').nth(2)).toContainText('3');
	});

	test('pricing section should display all tiers', async ({ page }) => {
		const pricingCards = page.locator('.pricing-card');
		await expect(pricingCards).toHaveCount(3);

		// Check pricing amounts
		await expect(page.locator('.price-amount').first()).toContainText('$0.10');
		await expect(page.locator('.price-amount').nth(1)).toContainText('$1.00');
		await expect(page.locator('.price-amount').nth(2)).toContainText('$5.00');

		// Check "Most Popular" badge
		await expect(page.locator('.badge-popular')).toBeVisible();
	});

	test('waitlist form should work', async ({ page }) => {
		// Fill email
		const emailInput = page.locator('input[type="email"]').first();
		await emailInput.fill('test@example.com');

		// Submit form
		const submitButton = page.locator('button[type="submit"]').first();
		await submitButton.click();

		// Check success message
		await expect(page.locator('.success-message')).toBeVisible({ timeout: 5000 });
		await expect(page.locator('.success-message')).toContainText("You're on the list!");
	});

	test('footer should have all links', async ({ page }) => {
		const footer = page.locator('.footer');
		await expect(footer).toBeVisible();

		// Check footer links
		await expect(footer.locator('a[href="/verify"]')).toBeVisible();
		await expect(footer.locator('a[href="/pitch"]')).toBeVisible();
		await expect(footer.locator('a[href="/contact"]')).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Check mobile menu or responsive layout
			const heroTitle = page.locator('.hero-title');
			await expect(heroTitle).toBeVisible();

			// Check that cards stack on mobile
			const whyCards = page.locator('.why-card');
			const firstCard = whyCards.first();
			const secondCard = whyCards.nth(1);

			const firstBox = await firstCard.boundingBox();
			const secondBox = await secondCard.boundingBox();

			// On mobile, cards should stack vertically
			if (firstBox && secondBox) {
				expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 10);
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

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});

	test('all images should load', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const images = page.locator('img');
		const count = await images.count();

		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const isVisible = await img.isVisible();
			if (isVisible) {
				await expect(img).toHaveJSProperty('complete', true);
			}
		}
	});

	test('navigation links should work', async ({ page }) => {
		// Click on verify link
		await page.click('a[href="/verify"]');
		await expect(page).toHaveURL(/.*verify/);

		// Go back
		await page.goto('/');

		// Click on pitch link
		await page.click('a[href="/pitch"]');
		await expect(page).toHaveURL(/.*pitch/);

		// Go back
		await page.goto('/');

		// Click on contact link
		await page.click('a[href="/contact"]');
		await expect(page).toHaveURL(/.*contact/);
	});

	test('animations should trigger on scroll', async ({ page }) => {
		// Scroll to why us section
		await page.locator('.why-us-section').scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		// Check if cards are visible (animations should have completed)
		const whyCards = page.locator('.why-card');
		await expect(whyCards.first()).toBeVisible();
	});

	test('should have proper meta tags', async ({ page }) => {
		await page.goto('/');

		// Check title
		await expect(page).toHaveTitle(/CheckMe/);

		// Check meta description
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveAttribute('content', /.+/);
	});

	test('buttons should have hover effects', async ({ page, isMobile }) => {
		if (!isMobile) {
			const primaryButton = page.locator('.btn-primary').first();
			await expect(primaryButton).toBeVisible();

			// Hover over button
			await primaryButton.hover();
			await page.waitForTimeout(300);

			// Button should still be visible after hover
			await expect(primaryButton).toBeVisible();
		}
	});

	test('should handle form validation', async ({ page }) => {
		const emailInput = page.locator('input[type="email"]').first();
		const submitButton = page.locator('button[type="submit"]').first();

		// Try to submit without email
		await submitButton.click();

		// HTML5 validation should prevent submission
		const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(isInvalid).toBe(true);

		// Fill with invalid email
		await emailInput.fill('invalid-email');
		await submitButton.click();

		// Should still be invalid
		const stillInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(stillInvalid).toBe(true);
	});

	test('should load within performance budget', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;

		// Page should load within 5 seconds
		expect(loadTime).toBeLessThan(5000);
	});
});

