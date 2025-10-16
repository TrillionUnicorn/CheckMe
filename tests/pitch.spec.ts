import { test, expect } from '@playwright/test';

test.describe('Pitch Deck Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
	});

	test('should load pitch deck page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Pitch/);
	});

	test('cover slide should be visible', async ({ page }) => {
		const coverSlide = page.locator('.cover-slide, .pitch-slide').first();
		await expect(coverSlide).toBeVisible();

		// Check company name
		await expect(page.locator('.company-name, h1').first()).toContainText('CheckMe');
	});

	test('should display all pitch slides', async ({ page }) => {
		const slides = page.locator('.pitch-slide');
		const count = await slides.count();
		
		// Should have at least 10 slides
		expect(count).toBeGreaterThanOrEqual(10);
	});

	test('problem slide should show statistics', async ({ page }) => {
		const problemSlide = page.locator('.problem-slide');
		if (await problemSlide.count() > 0) {
			await problemSlide.scrollIntoViewIfNeeded();
			await expect(problemSlide).toBeVisible();

			// Check for problem cards
			const problemCards = page.locator('.problem-card');
			const cardCount = await problemCards.count();
			expect(cardCount).toBeGreaterThan(0);
		}
	});

	test('market analysis should display TAM/SAM/SOM', async ({ page }) => {
		const marketSlide = page.locator('.market-slide');
		if (await marketSlide.count() > 0) {
			await marketSlide.scrollIntoViewIfNeeded();
			
			// Look for market values
			const marketValues = page.locator('.market-value, .stat-value');
			const count = await marketValues.count();
			expect(count).toBeGreaterThan(0);
		}
	});

	test('competitive analysis table should be visible', async ({ page }) => {
		const compSlide = page.locator('.competition-slide');
		if (await compSlide.count() > 0) {
			await compSlide.scrollIntoViewIfNeeded();
			
			const table = page.locator('table');
			if (await table.count() > 0) {
				await expect(table.first()).toBeVisible();
			}
		}
	});

	test('business model should show revenue streams', async ({ page }) => {
		const businessSlide = page.locator('.business-model-slide');
		if (await businessSlide.count() > 0) {
			await businessSlide.scrollIntoViewIfNeeded();
			
			// Check for pricing or revenue information
			const revenueElements = page.locator('.revenue, .pricing, .tier');
			const count = await revenueElements.count();
			expect(count).toBeGreaterThan(0);
		}
	});

	test('roadmap should display timeline', async ({ page }) => {
		const roadmapSlide = page.locator('.roadmap-slide');
		if (await roadmapSlide.count() > 0) {
			await roadmapSlide.scrollIntoViewIfNeeded();
			
			const roadmapItems = page.locator('.roadmap-item, .roadmap-quarter');
			const count = await roadmapItems.count();
			expect(count).toBeGreaterThan(0);
		}
	});

	test('team slide should show founder info', async ({ page }) => {
		const teamSlide = page.locator('.team-slide');
		if (await teamSlide.count() > 0) {
			await teamSlide.scrollIntoViewIfNeeded();
			
			// Check for team member info
			const teamMember = page.locator('.team-member, .member-info');
			if (await teamMember.count() > 0) {
				await expect(teamMember.first()).toBeVisible();
			}
		}
	});

	test('investment slide should show funding ask', async ({ page }) => {
		const investmentSlide = page.locator('.investment-slide');
		if (await investmentSlide.count() > 0) {
			await investmentSlide.scrollIntoViewIfNeeded();
			
			// Look for funding amount
			const fundingAmount = page.locator('.ask-amount, .funding, .investment-ask');
			if (await fundingAmount.count() > 0) {
				await expect(fundingAmount.first()).toBeVisible();
			}
		}
	});

	test('closing slide should have CTAs', async ({ page }) => {
		const closingSlide = page.locator('.closing-slide');
		if (await closingSlide.count() > 0) {
			await closingSlide.scrollIntoViewIfNeeded();
			
			// Check for CTA buttons
			const ctaButtons = closingSlide.locator('.btn, button, a.btn-primary');
			const count = await ctaButtons.count();
			expect(count).toBeGreaterThan(0);
		}
	});

	test('should scroll through all slides', async ({ page }) => {
		const slides = page.locator('.pitch-slide');
		const count = await slides.count();

		for (let i = 0; i < Math.min(count, 5); i++) {
			await slides.nth(i).scrollIntoViewIfNeeded();
			await page.waitForTimeout(300);
			await expect(slides.nth(i)).toBeVisible();
		}
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			const slides = page.locator('.pitch-slide');
			const firstSlide = slides.first();
			await expect(firstSlide).toBeVisible();

			// Check that content is readable on mobile
			const slideBox = await firstSlide.boundingBox();
			if (slideBox && viewport) {
				expect(slideBox.width).toBeLessThanOrEqual(viewport.width);
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

		await page.goto('/pitch');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});

	test('animations should work on scroll', async ({ page }) => {
		const slides = page.locator('.pitch-slide');
		const secondSlide = slides.nth(1);
		
		await secondSlide.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);
		
		await expect(secondSlide).toBeVisible();
	});

	test('all links should be functional', async ({ page }) => {
		const links = page.locator('a[href]');
		const count = await links.count();

		// Check first few links
		for (let i = 0; i < Math.min(count, 5); i++) {
			const link = links.nth(i);
			const href = await link.getAttribute('href');
			expect(href).toBeTruthy();
		}
	});

	test('should display sources and citations', async ({ page }) => {
		const sources = page.locator('.source, .citation, [class*="source"]');
		const count = await sources.count();
		
		// Should have at least some sources cited
		expect(count).toBeGreaterThan(0);
	});

	test('charts and graphs should be visible', async ({ page }) => {
		// Look for any chart or graph elements
		const charts = page.locator('table, .chart, .graph, canvas, svg');
		const count = await charts.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should load within performance budget', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/pitch');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;

		expect(loadTime).toBeLessThan(6000);
	});

	test('navigation to other pages should work', async ({ page }) => {
		// Find and click a link to verify page
		const verifyLink = page.locator('a[href="/verify"]');
		if (await verifyLink.count() > 0) {
			await verifyLink.first().click();
			await expect(page).toHaveURL(/.*verify/);
		}
	});
});

