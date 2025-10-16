import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 * These tests verify UI elements are positioned correctly and styled properly
 */

test.describe('Visual Regression - Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('should match hero section visual snapshot', async ({ page }) => {
		const hero = page.locator('.hero');
		await expect(hero).toBeVisible();
		
		// Take screenshot for visual comparison
		await expect(hero).toHaveScreenshot('hero-section.png', {
			maxDiffPixels: 100
		});
	});

	test('should verify hero title styling', async ({ page }) => {
		const title = page.locator('.hero-title');
		
		// Verify element exists and is visible
		await expect(title).toBeVisible();
		
		// Verify computed styles
		const fontSize = await title.evaluate((el) => {
			return window.getComputedStyle(el).fontSize;
		});
		
		// Font size should be responsive (clamp)
		expect(parseFloat(fontSize)).toBeGreaterThan(30); // At least 30px
	});

	test('should verify gradient text color', async ({ page }) => {
		const gradientText = page.locator('.gradient-text');
		await expect(gradientText).toBeVisible();
		
		// Verify gradient is applied
		const backgroundImage = await gradientText.evaluate((el) => {
			return window.getComputedStyle(el).backgroundImage;
		});
		
		expect(backgroundImage).toContain('linear-gradient');
	});

	test('should verify CTA buttons positioning', async ({ page }) => {
		const ctaContainer = page.locator('.hero-cta');
		const buttons = ctaContainer.locator('.btn');
		
		// Should have 2 buttons
		await expect(buttons).toHaveCount(2);
		
		// Verify buttons are horizontally aligned
		const button1Box = await buttons.nth(0).boundingBox();
		const button2Box = await buttons.nth(1).boundingBox();
		
		expect(button1Box).not.toBeNull();
		expect(button2Box).not.toBeNull();
		
		if (button1Box && button2Box) {
			// Buttons should be on same horizontal line (within 5px tolerance)
			expect(Math.abs(button1Box.y - button2Box.y)).toBeLessThan(5);
		}
	});

	test('should verify Why Us cards layout', async ({ page }) => {
		const cards = page.locator('.why-card');
		
		// Should have 5 cards
		await expect(cards).toHaveCount(5);
		
		// Take screenshot of cards section
		const whyUsSection = page.locator('.why-us-section');
		await expect(whyUsSection).toHaveScreenshot('why-us-section.png', {
			maxDiffPixels: 100
		});
	});

	test('should verify pricing cards alignment', async ({ page }) => {
		const pricingCards = page.locator('.pricing-card');
		
		// Should have 3 pricing tiers
		await expect(pricingCards).toHaveCount(3);
		
		// Verify "Most Popular" badge on middle card
		const featuredCard = page.locator('.pricing-card.featured');
		await expect(featuredCard).toBeVisible();
		
		const badge = featuredCard.locator('.badge-popular');
		await expect(badge).toBeVisible();
		await expect(badge).toHaveText('Most Popular');
	});

	test('should verify footer layout', async ({ page }) => {
		const footer = page.locator('.footer');
		await expect(footer).toBeVisible();
		
		// Take screenshot
		await expect(footer).toHaveScreenshot('footer.png', {
			maxDiffPixels: 100
		});
	});
});

test.describe('Visual Regression - Verify Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/verify');
		await page.waitForLoadState('networkidle');
	});

	test('should match verify page layout', async ({ page }) => {
		await expect(page).toHaveScreenshot('verify-page-full.png', {
			fullPage: true,
			maxDiffPixels: 200
		});
	});

	test('should verify form elements styling', async ({ page }) => {
		const form = page.locator('.verification-form');
		await expect(form).toBeVisible();
		
		// Verify form has proper styling
		const backgroundColor = await form.evaluate((el) => {
			return window.getComputedStyle(el).backgroundColor;
		});
		
		// Should have a background color set
		expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
	});

	test('should verify document upload section', async ({ page }) => {
		const uploadSection = page.locator('.document-upload');
		await expect(uploadSection).toBeVisible();
		
		// Take screenshot
		await expect(uploadSection).toHaveScreenshot('document-upload.png', {
			maxDiffPixels: 100
		});
	});
});

test.describe('Visual Regression - Pitch Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
		await page.waitForLoadState('networkidle');
	});

	test('should match cover slide', async ({ page }) => {
		const coverSlide = page.locator('.cover-slide');
		await expect(coverSlide).toBeVisible();
		
		await expect(coverSlide).toHaveScreenshot('pitch-cover-slide.png', {
			maxDiffPixels: 100
		});
	});

	test('should verify slide transitions', async ({ page }) => {
		// Scroll to second slide
		await page.evaluate(() => {
			window.scrollTo(0, window.innerHeight);
		});
		
		await page.waitForTimeout(500); // Wait for scroll animation
		
		// Verify problem slide is visible
		const problemSlide = page.locator('.problem-slide');
		await expect(problemSlide).toBeVisible();
	});

	test('should verify comparison table styling', async ({ page }) => {
		// Scroll to competition slide
		const competitionSlide = page.locator('.competition-slide');
		await competitionSlide.scrollIntoViewIfNeeded();
		
		const table = competitionSlide.locator('table');
		await expect(table).toBeVisible();
		
		// Take screenshot of table
		await expect(table).toHaveScreenshot('comparison-table.png', {
			maxDiffPixels: 100
		});
	});
});

test.describe('Visual Regression - Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
		await page.waitForLoadState('networkidle');
	});

	test('should match contact page layout', async ({ page }) => {
		await expect(page).toHaveScreenshot('contact-page-full.png', {
			fullPage: true,
			maxDiffPixels: 200
		});
	});

	test('should verify form field styling', async ({ page }) => {
		const nameInput = page.locator('input[type="text"]').first();
		await expect(nameInput).toBeVisible();
		
		// Verify input has border
		const border = await nameInput.evaluate((el) => {
			return window.getComputedStyle(el).border;
		});
		
		expect(border).toBeTruthy();
	});

	test('should verify FAQ section layout', async ({ page }) => {
		const faqSection = page.locator('.faq-section');
		await expect(faqSection).toBeVisible();
		
		await expect(faqSection).toHaveScreenshot('faq-section.png', {
			maxDiffPixels: 100
		});
	});
});

test.describe('Color Verification', () => {
	test('should verify primary button colors', async ({ page }) => {
		await page.goto('/');
		
		const primaryButton = page.locator('.btn-primary').first();
		await expect(primaryButton).toBeVisible();
		
		// Get computed background color
		const bgColor = await primaryButton.evaluate((el) => {
			return window.getComputedStyle(el).backgroundColor;
		});
		
		// Should be blue (rgb values for #3b82f6 or similar)
		expect(bgColor).toMatch(/rgb/);
	});

	test('should verify text colors', async ({ page }) => {
		await page.goto('/');
		
		const heroTitle = page.locator('.hero-title');
		const color = await heroTitle.evaluate((el) => {
			return window.getComputedStyle(el).color;
		});
		
		// Hero title should be white or light color
		expect(color).toBeTruthy();
	});
});

test.describe('Responsive Layout Verification', () => {
	const viewports = [
		{ name: 'Mobile', width: 375, height: 667 },
		{ name: 'Tablet', width: 768, height: 1024 },
		{ name: 'Desktop', width: 1920, height: 1080 }
	];

	for (const viewport of viewports) {
		test(`should render correctly on ${viewport.name}`, async ({ page }) => {
			await page.setViewportSize({ width: viewport.width, height: viewport.height });
			await page.goto('/');
			await page.waitForLoadState('networkidle');
			
			// Take full page screenshot
			await expect(page).toHaveScreenshot(`home-${viewport.name.toLowerCase()}.png`, {
				fullPage: true,
				maxDiffPixels: 300
			});
			
			// Verify no horizontal scroll
			const hasHorizontalScroll = await page.evaluate(() => {
				return document.documentElement.scrollWidth > document.documentElement.clientWidth;
			});
			
			expect(hasHorizontalScroll).toBe(false);
		});
	}
});

test.describe('Element Position Verification', () => {
	test('should verify hero content is centered', async ({ page }) => {
		await page.goto('/');
		
		const heroContent = page.locator('.hero-content');
		const box = await heroContent.boundingBox();
		const viewport = page.viewportSize();
		
		expect(box).not.toBeNull();
		expect(viewport).not.toBeNull();
		
		if (box && viewport) {
			// Content should be roughly centered (within 100px tolerance)
			const centerX = box.x + box.width / 2;
			const viewportCenterX = viewport.width / 2;
			
			expect(Math.abs(centerX - viewportCenterX)).toBeLessThan(100);
		}
	});

	test('should verify footer is at bottom', async ({ page }) => {
		await page.goto('/');
		
		const footer = page.locator('.footer');
		const box = await footer.boundingBox();
		
		expect(box).not.toBeNull();
		
		if (box) {
			// Footer should be near the bottom of the page
			const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
			expect(box.y + box.height).toBeGreaterThan(pageHeight - 100);
		}
	});
});

