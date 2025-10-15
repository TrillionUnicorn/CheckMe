import { test, expect, devices } from '@playwright/test';

const viewports = [
	{ name: 'Mobile Portrait', width: 375, height: 667 },
	{ name: 'Mobile Landscape', width: 667, height: 375 },
	{ name: 'Tablet Portrait', width: 768, height: 1024 },
	{ name: 'Tablet Landscape', width: 1024, height: 768 },
	{ name: 'Desktop', width: 1920, height: 1080 },
	{ name: 'Large Desktop', width: 2560, height: 1440 }
];

const pages = ['/', '/verify', '/pitch', '/contact'];

test.describe('Responsive Design Tests', () => {
	for (const viewport of viewports) {
		test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
			test.use({
				viewport: { width: viewport.width, height: viewport.height }
			});

			for (const pagePath of pages) {
				test(`${pagePath} should be responsive`, async ({ page }) => {
					await page.goto(pagePath);
					await page.waitForLoadState('networkidle');

					// Check that page is visible
					const body = page.locator('body');
					await expect(body).toBeVisible();

					// Check for horizontal scroll (should not exist)
					const hasHorizontalScroll = await page.evaluate(() => {
						return document.documentElement.scrollWidth > document.documentElement.clientWidth;
					});
					expect(hasHorizontalScroll).toBe(false);

					// Check that main content is within viewport
					const mainContent = page.locator('main, .container, section').first();
					if (await mainContent.count() > 0) {
						const box = await mainContent.boundingBox();
						if (box) {
							expect(box.width).toBeLessThanOrEqual(viewport.width + 1);
						}
					}

					// Take screenshot for visual regression
					await page.screenshot({
						path: `tests/screenshots/${viewport.name.replace(/\s+/g, '-')}-${pagePath.replace(/\//g, '-') || 'home'}.png`,
						fullPage: false
					});
				});
			}

			test('navigation should work on all viewports', async ({ page }) => {
				await page.goto('/');

				// Check if navigation is accessible
				const nav = page.locator('nav, header, .nav, .navigation');
				if (await nav.count() > 0) {
					await expect(nav.first()).toBeVisible();
				}

				// Try to navigate to verify page
				const verifyLink = page.locator('a[href="/verify"]').first();
				if (await verifyLink.isVisible()) {
					await verifyLink.click();
					await expect(page).toHaveURL(/.*verify/);
				}
			});

			test('buttons should be tappable', async ({ page }) => {
				await page.goto('/');

				const buttons = page.locator('button, .btn, a.btn-primary');
				const count = await buttons.count();

				for (let i = 0; i < Math.min(count, 3); i++) {
					const button = buttons.nth(i);
					if (await button.isVisible()) {
						const box = await button.boundingBox();
						if (box) {
							// Buttons should be at least 44x44 for touch targets
							if (viewport.width < 768) {
								expect(box.height).toBeGreaterThanOrEqual(40);
							}
						}
					}
				}
			});

			test('text should be readable', async ({ page }) => {
				await page.goto('/');

				// Check font sizes
				const headings = page.locator('h1, h2, h3');
				const count = await headings.count();

				for (let i = 0; i < Math.min(count, 3); i++) {
					const heading = headings.nth(i);
					if (await heading.isVisible()) {
						const fontSize = await heading.evaluate((el) => {
							return window.getComputedStyle(el).fontSize;
						});
						const size = parseInt(fontSize);
						
						// Headings should be at least 16px
						expect(size).toBeGreaterThanOrEqual(16);
					}
				}
			});

			test('images should scale properly', async ({ page }) => {
				await page.goto('/');

				const images = page.locator('img');
				const count = await images.count();

				for (let i = 0; i < Math.min(count, 5); i++) {
					const img = images.nth(i);
					if (await img.isVisible()) {
						const box = await img.boundingBox();
						if (box) {
							// Images should not overflow viewport
							expect(box.width).toBeLessThanOrEqual(viewport.width);
						}
					}
				}
			});
		});
	}

	test('should handle orientation changes', async ({ page, browser }) => {
		// Test portrait to landscape
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Change to landscape
		await page.setViewportSize({ width: 667, height: 375 });
		await page.waitForTimeout(500);

		// Page should still be functional
		const body = page.locator('body');
		await expect(body).toBeVisible();
	});

	test('should work on different devices', async ({ browser }) => {
		const deviceTests = [
			{ device: devices['iPhone 12'], name: 'iPhone 12' },
			{ device: devices['iPad Pro'], name: 'iPad Pro' },
			{ device: devices['Desktop Chrome'], name: 'Desktop Chrome' }
		];

		for (const { device, name } of deviceTests) {
			const context = await browser.newContext(device);
			const page = await context.newPage();

			await page.goto('/');
			await page.waitForLoadState('networkidle');

			// Check that page loads
			await expect(page.locator('body')).toBeVisible();

			await context.close();
		}
	});

	test('touch interactions should work on mobile', async ({ page, browser }) => {
		const context = await browser.newContext(devices['iPhone 12']);
		const mobilePage = await context.newPage();

		await mobilePage.goto('/');

		// Test tap on button
		const button = mobilePage.locator('button, .btn').first();
		if (await button.isVisible()) {
			await button.tap();
			await mobilePage.waitForTimeout(500);
		}

		await context.close();
	});

	test('should not have layout shifts', async ({ page }) => {
		await page.goto('/');

		// Measure CLS (Cumulative Layout Shift)
		const cls = await page.evaluate(() => {
			return new Promise((resolve) => {
				let clsValue = 0;
				const observer = new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						if (!(entry as any).hadRecentInput) {
							clsValue += (entry as any).value;
						}
					}
				});
				observer.observe({ type: 'layout-shift', buffered: true });

				setTimeout(() => {
					observer.disconnect();
					resolve(clsValue);
				}, 3000);
			});
		});

		// CLS should be less than 0.1 (good)
		expect(cls).toBeLessThan(0.1);
	});

	test('should handle zoom levels', async ({ page }) => {
		await page.goto('/');

		// Test 150% zoom
		await page.evaluate(() => {
			document.body.style.zoom = '1.5';
		});
		await page.waitForTimeout(500);

		// Page should still be functional
		const body = page.locator('body');
		await expect(body).toBeVisible();

		// Reset zoom
		await page.evaluate(() => {
			document.body.style.zoom = '1';
		});
	});

	test('should work with reduced motion', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Page should still load and be functional
		const body = page.locator('body');
		await expect(body).toBeVisible();
	});

	test('should work in dark mode', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Page should still be visible
		const body = page.locator('body');
		await expect(body).toBeVisible();
	});
});

