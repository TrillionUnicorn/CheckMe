<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let email = $state('');
	let waitlistSubmitted = $state(false);
	let waitlistError = $state('');

	onMount(() => {
		// Hero animation
		gsap.from('.hero-title', {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from('.hero-subtitle', {
			opacity: 0,
			y: 30,
			duration: 1,
			delay: 0.3,
			ease: 'power3.out'
		});

		gsap.from('.hero-cta', {
			opacity: 0,
			y: 20,
			duration: 1,
			delay: 0.6,
			ease: 'power3.out'
		});

		// Parallax effect for hero background
		gsap.to('.hero-bg', {
			yPercent: 30,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero',
				start: 'top top',
				end: 'bottom top',
				scrub: true
			}
		});

		// Animate stats on scroll
		gsap.from('.stat-card', {
			opacity: 0,
			y: 50,
			stagger: 0.2,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.stats-section',
				start: 'top 80%'
			}
		});

		// Animate features
		gsap.from('.feature-card', {
			opacity: 0,
			y: 50,
			stagger: 0.15,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.features-section',
				start: 'top 80%'
			}
		});
	});

	async function handleWaitlistSubmit(e: Event) {
		e.preventDefault();
		waitlistError = '';

		if (!email || !email.includes('@')) {
			waitlistError = 'Please enter a valid email address';
			return;
		}

		try {
			// Store in localStorage for now (will be replaced with API call)
			const waitlist = JSON.parse(localStorage.getItem('checkme_waitlist') || '[]');
			waitlist.push({ email, timestamp: new Date().toISOString() });
			localStorage.setItem('checkme_waitlist', JSON.stringify(waitlist));

			waitlistSubmitted = true;
			email = '';
		} catch (error) {
			waitlistError = 'Something went wrong. Please try again.';
		}
	}
</script>

<svelte:head>
	<title>CheckMe - Universal Identity Verification & Anti-Fraud Platform</title>
	<meta
		name="description"
		content="Stop fraud before it happens. CheckMe verifies identities, businesses, documents, and communications using AI-powered fraud detection in under 2 seconds."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-bg"></div>
	<div class="hero-content">
		<h1 class="hero-title">
			Verify Before You Trust.<br />
			<span class="gradient-text">Stop Fraud Instantly.</span>
		</h1>
		<p class="hero-subtitle">
			The only platform that instantly verifies any person, business, document, or communication
			using AI and real-time data - stopping fraud before it happens.
		</p>
		<div class="hero-cta">
			<a href="/verify" class="btn btn-primary btn-lg">
				🚀 Start Free Verification
			</a>
			<a href="/pitch" class="btn btn-secondary btn-lg">
				📊 View Pitch Deck
			</a>
		</div>
		<div class="hero-stats">
			<div class="hero-stat">
				<div class="stat-number">100K+</div>
				<div class="stat-label">Daily Verifications</div>
			</div>
			<div class="hero-stat">
				<div class="stat-number">99.2%</div>
				<div class="stat-label">Accuracy Rate</div>
			</div>
			<div class="hero-stat">
				<div class="stat-number">&lt;2s</div>
				<div class="stat-label">Response Time</div>
			</div>
		</div>
	</div>
</section>

<!-- Why Us Section -->
<section class="why-us-section">
	<div class="container">
		<h2 class="section-title">Why Choose CheckMe?</h2>
		<div class="why-us-grid">
			<div class="why-card">
				<div class="why-icon">⚡</div>
				<h3>Lightning Fast</h3>
				<p>Get verification results in under 2 seconds, not days. Real-time fraud detection powered by AI.</p>
			</div>
			<div class="why-card">
				<div class="why-icon">🎯</div>
				<h3>99.2% Accuracy</h3>
				<p>Industry-leading fraud detection rate. Our AI models are trained on billions of data points.</p>
			</div>
			<div class="why-card">
				<div class="why-icon">🌐</div>
				<h3>Universal Coverage</h3>
				<p>Verify identities, businesses, documents, and communications - all in one platform.</p>
			</div>
			<div class="why-card">
				<div class="why-icon">💰</div>
				<h3>Cost Effective</h3>
				<p>Starting at $0.10 per check. Save 90% compared to traditional KYC solutions.</p>
			</div>
			<div class="why-card">
				<div class="why-icon">🔒</div>
				<h3>Bank-Grade Security</h3>
				<p>SOC 2 Type II certified. GDPR and CCPA compliant. Your data is always protected.</p>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="how-it-works-section">
	<div class="container">
		<h2 class="section-title">How It Works</h2>
		<p class="section-subtitle">Three simple steps to verify anyone or anything</p>
		<div class="steps-grid">
			<div class="step-card">
				<div class="step-number">1</div>
				<div class="step-icon">📤</div>
				<h3>Submit Information</h3>
				<p>Upload documents, enter details, or use our API to submit verification requests.</p>
			</div>
			<div class="step-arrow">→</div>
			<div class="step-card">
				<div class="step-number">2</div>
				<div class="step-icon">🤖</div>
				<h3>AI Analysis</h3>
				<p>Our AI engine analyzes data across 200+ databases and detects fraud patterns instantly.</p>
			</div>
			<div class="step-arrow">→</div>
			<div class="step-card">
				<div class="step-number">3</div>
				<div class="step-icon">✅</div>
				<h3>Get Results</h3>
				<p>Receive detailed verification reports with risk scores and actionable recommendations.</p>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section class="pricing-section">
	<div class="container">
		<h2 class="section-title">Simple, Transparent Pricing</h2>
		<p class="section-subtitle">Choose the plan that fits your needs</p>
		<div class="pricing-grid">
			<div class="pricing-card">
				<div class="pricing-header">
					<h3>Basic</h3>
					<div class="price">
						<span class="price-amount">$0.10</span>
						<span class="price-unit">per check</span>
					</div>
				</div>
				<ul class="pricing-features">
					<li>✅ Identity Verification</li>
					<li>✅ Email Verification</li>
					<li>✅ Phone Verification</li>
					<li>✅ Basic Risk Score</li>
					<li>✅ 1,000 free checks/month</li>
					<li>✅ API Access</li>
				</ul>
				<a href="/verify" class="btn btn-outline">Get Started</a>
			</div>

			<div class="pricing-card featured">
				<div class="badge-popular">Most Popular</div>
				<div class="pricing-header">
					<h3>Premium</h3>
					<div class="price">
						<span class="price-amount">$1.00</span>
						<span class="price-unit">per check</span>
					</div>
				</div>
				<ul class="pricing-features">
					<li>✅ Everything in Basic</li>
					<li>✅ Biometric Matching</li>
					<li>✅ Document Authentication</li>
					<li>✅ Business Verification</li>
					<li>✅ Social Media Analysis</li>
					<li>✅ Advanced Risk Scoring</li>
					<li>✅ Priority Support</li>
				</ul>
				<a href="/verify" class="btn btn-primary">Start Free Trial</a>
			</div>

			<div class="pricing-card">
				<div class="pricing-header">
					<h3>Enterprise</h3>
					<div class="price">
						<span class="price-amount">$5.00</span>
						<span class="price-unit">per check</span>
					</div>
				</div>
				<ul class="pricing-features">
					<li>✅ Everything in Premium</li>
					<li>✅ Custom ML Models</li>
					<li>✅ Real-time Monitoring</li>
					<li>✅ Compliance Reporting</li>
					<li>✅ White-label Integration</li>
					<li>✅ Dedicated Support 24/7</li>
					<li>✅ SLA Guarantees</li>
				</ul>
				<a href="/contact" class="btn btn-outline">Contact Sales</a>
			</div>
		</div>
		<div class="early-bird-banner">
			🎉 <strong>Early Adopter Pricing:</strong> Get 50% off your first 100K verifications!
		</div>
	</div>
</section>




<!-- Mission & Vision Section -->
<section class="mission-section">
	<div class="container">
		<div class="mission-grid">
			<div class="mission-card">
				<h2>🎯 Our Mission</h2>
				<p>
					To build a fraud-free digital world where trust is instant and verification is seamless.
					We empower individuals and businesses to make informed decisions by providing real-time,
					AI-powered fraud detection that stops scams before they happen.
				</p>
			</div>
			<div class="mission-card">
				<h2>🚀 Our Vision</h2>
				<p>
					To become the global standard for identity verification and fraud prevention. We envision
					a future where every digital interaction is protected by intelligent verification,
					eliminating the $5.8 trillion annual fraud losses worldwide.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Waitlist Section -->
<section class="waitlist-section">
	<div class="container">
		<div class="waitlist-content">
			<h2 class="section-title">Join the Waitlist</h2>
			<p class="section-subtitle">
				Be among the first to access our platform. Get early bird pricing and exclusive features.
			</p>

			{#if waitlistSubmitted}
				<div class="success-message">
					<div class="success-icon">✅</div>
					<h3>You're on the list!</h3>
					<p>We'll notify you when CheckMe launches. Check your email for confirmation.</p>
				</div>
			{:else}
				<form class="waitlist-form" onsubmit={handleWaitlistSubmit}>
					<div class="form-group">
						<input
							type="email"
							bind:value={email}
							placeholder="Enter your email address"
							class="waitlist-input"
							required
						/>
						<button type="submit" class="btn btn-primary btn-lg">
							Join Waitlist
						</button>
					</div>
					{#if waitlistError}
						<div class="error-message">{waitlistError}</div>
					{/if}
				</form>
				<div class="waitlist-benefits">
					<div class="benefit">✅ 50% off first 100K verifications</div>
					<div class="benefit">✅ Priority access to new features</div>
					<div class="benefit">✅ Dedicated onboarding support</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-col">
				<h3>CheckMe</h3>
				<p>Universal verification & fraud detection platform powered by AI.</p>
				<div class="social-links">
					<a href="https://github.com/TrillionUnicorn/CheckMe" target="_blank" rel="noopener">GitHub</a>
					<a href="https://linkedin.com/company/checkme" target="_blank" rel="noopener">LinkedIn</a>
					<a href="https://twitter.com/checkme" target="_blank" rel="noopener">Twitter</a>
				</div>
			</div>
			<div class="footer-col">
				<h4>Product</h4>
				<ul>
					<li><a href="/verify">Verification</a></li>
					<li><a href="/pitch">Pitch Deck</a></li>
					<li><a href="/#pricing">Pricing</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</div>
			<div class="footer-col">
				<h4>Resources</h4>
				<ul>
					<li><a href="/docs">Documentation</a></li>
					<li><a href="/api">API Reference</a></li>
					<li><a href="https://github.com/TrillionUnicorn/CheckMe">GitHub</a></li>
					<li><a href="/roadmap">Roadmap</a></li>
				</ul>
			</div>
			<div class="footer-col">
				<h4>Legal</h4>
				<ul>
					<li><a href="/privacy">Privacy Policy</a></li>
					<li><a href="/terms">Terms of Service</a></li>
					<li><a href="/security">Security</a></li>
					<li><a href="/compliance">Compliance</a></li>
				</ul>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2024 CheckMe. All rights reserved. Built with ❤️ by <a href="https://github.com/HunterHo07">Hunter Ho</a></p>
		</div>
	</div>
</footer>


<style>
	/* Hero Section */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.hero-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80');
		background-size: cover;
		background-position: center;
		opacity: 0.15;
		z-index: 0;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.hero-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: 1.5rem;
	}

	.gradient-text {
		background: linear-gradient(to right, #fbbf24, #f59e0b);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		line-height: 1.6;
		margin-bottom: 2.5rem;
		opacity: 0.95;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-cta {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 3rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s;
		cursor: pointer;
		border: none;
		font-size: 1rem;
	}

	.btn-lg {
		padding: 1rem 2rem;
		font-size: 1.1rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	.btn-outline {
		background: transparent;
		color: #3b82f6;
		border: 2px solid #3b82f6;
	}

	.btn-outline:hover {
		background: #3b82f6;
		color: white;
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 2rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.hero-stat {
		text-align: center;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 800;
		color: #fbbf24;
	}

	.stat-label {
		font-size: 0.9rem;
		opacity: 0.9;
		margin-top: 0.25rem;
	}

	/* Why Us Section */
	.why-us-section {
		padding: 6rem 0;
		background: white;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		text-align: center;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.section-subtitle {
		text-align: center;
		font-size: 1.2rem;
		color: #64748b;
		margin-bottom: 3rem;
	}



	.why-us-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.why-card {
		padding: 2rem;
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
		transition: all 0.3s;
	}

	.why-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.why-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.why-card h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		color: #1e293b;
	}

	.why-card p {
		color: #64748b;
		line-height: 1.6;
	}

	.how-it-works-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.steps-grid {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr;
		gap: 2rem;
		align-items: center;
		margin-top: 3rem;
	}

	.step-card {
		background: white;
		padding: 2.5rem 2rem;
		border-radius: 1rem;
		text-align: center;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
		position: relative;
	}

	.step-number {
		position: absolute;
		top: -1rem;
		left: 50%;
		transform: translateX(-50%);
		width: 2.5rem;
		height: 2.5rem;
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.2rem;
	}

	.step-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.step-card h3 {
		font-size: 1.3rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		color: #1e293b;
	}

	.step-card p {
		color: #64748b;
		line-height: 1.6;
	}

	.step-arrow {
		font-size: 2rem;
		color: #3b82f6;
		font-weight: 700;
	}

	.pricing-section {
		padding: 6rem 0;
		background: white;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.pricing-card {
		background: white;
		border: 2px solid #e2e8f0;
		border-radius: 1rem;
		padding: 2.5rem 2rem;
		position: relative;
		transition: all 0.3s;
	}

	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.pricing-card.featured {
		border-color: #3b82f6;
		box-shadow: 0 10px 40px rgba(59, 130, 246, 0.2);
	}

	.badge-popular {
		position: absolute;
		top: -1rem;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		padding: 0.5rem 1.5rem;
		border-radius: 2rem;
		font-weight: 600;
		font-size: 0.875rem;
	}

	.pricing-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.pricing-header h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.price {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.price-amount {
		font-size: 3rem;
		font-weight: 800;
		color: #3b82f6;
	}



	.price-unit {
		font-size: 0.9rem;
		color: #64748b;
	}

	.pricing-features {
		list-style: none;
		padding: 0;
		margin: 0 0 2rem 0;
	}

	.pricing-features li {
		padding: 0.75rem 0;
		color: #475569;
		border-bottom: 1px solid #f1f5f9;
	}

	.early-bird-banner {
		margin-top: 3rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #fbbf24, #f59e0b);
		color: white;
		text-align: center;
		border-radius: 0.75rem;
		font-size: 1.1rem;
	}

	.mission-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.mission-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 3rem;
	}

	.mission-card {
		padding: 3rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.mission-card h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.mission-card p {
		font-size: 1.1rem;
		line-height: 1.8;
		opacity: 0.95;
	}

	.waitlist-section {
		padding: 6rem 0;
		background: white;
	}

	.waitlist-content {
		max-width: 700px;
		margin: 0 auto;
		text-align: center;
	}

	.waitlist-form {
		margin: 3rem 0;
	}

	.form-group {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.waitlist-input {
		flex: 1;
		min-width: 300px;
		padding: 1rem 1.5rem;
		border: 2px solid #e2e8f0;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: all 0.3s;
	}

	.waitlist-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.waitlist-benefits {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.benefit {
		font-size: 0.95rem;
		color: #64748b;
	}

	.success-message {
		padding: 3rem;
		background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
		border-radius: 1rem;
		margin-top: 2rem;
	}

	.success-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.success-message h3 {
		font-size: 2rem;
		font-weight: 700;
		color: #166534;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		font-size: 1.1rem;
		color: #15803d;
	}

	.error-message {
		color: #dc2626;
		margin-top: 1rem;
		font-size: 0.9rem;
	}

	.footer {
		background: #1e293b;
		color: white;
		padding: 4rem 0 2rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.footer-col h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.footer-col h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #94a3b8;
	}

	.footer-col p {
		color: #cbd5e1;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.footer-col ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-col ul li {
		margin-bottom: 0.75rem;
	}

	.footer-col a {
		color: #cbd5e1;
		text-decoration: none;
		transition: color 0.3s;
	}

	.footer-col a:hover {
		color: #3b82f6;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.footer-bottom {
		padding-top: 2rem;
		border-top: 1px solid #334155;
		text-align: center;
		color: #94a3b8;
	}

	.footer-bottom a {
		color: #3b82f6;
		text-decoration: none;
	}

	.footer-bottom a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.steps-grid {
			grid-template-columns: 1fr;
		}

		.step-arrow {
			transform: rotate(90deg);
		}

		.hero-cta {
			flex-direction: column;
		}

		.btn-lg {
			width: 100%;
		}

		.mission-grid {
			grid-template-columns: 1fr;
		}

		.form-group {
			flex-direction: column;
		}

		.waitlist-input {
			min-width: 100%;
		}

		.waitlist-benefits {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
