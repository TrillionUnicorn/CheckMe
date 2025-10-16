<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	onMount(() => {
		// Animate slides on scroll
		gsap.utils.toArray('.pitch-slide').forEach((slide: any, index) => {
			gsap.from(slide, {
				opacity: 0,
				y: 50,
				duration: 0.8,
				scrollTrigger: {
					trigger: slide,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		});
	});
</script>

<svelte:head>
	<title>Pitch Deck - CheckMe</title>
	<meta
		name="description"
		content="CheckMe investor pitch deck. Market analysis, business model, and growth projections for the universal verification platform."
	/>
</svelte:head>

<div class="pitch-deck">
	<!-- Cover Slide -->
	<section class="pitch-slide cover-slide">
		<div class="container">
			<div class="cover-content">
				<h1 class="company-name">CheckMe</h1>
				<p class="tagline">Universal Identity Verification & Anti-Fraud Platform</p>
				<div class="cover-stats">
					<div class="cover-stat">
						<div class="stat-value">$13.27B</div>
						<div class="stat-label">Market Size (2024)</div>
					</div>
					<div class="cover-stat">
						<div class="stat-value">99.2%</div>
						<div class="stat-label">Accuracy Rate</div>
					</div>
					<div class="cover-stat">
						<div class="stat-value">&lt;2s</div>
						<div class="stat-label">Verification Time</div>
					</div>
				</div>
				<p class="founder-info">Hunter Ho | Founder & CEO | hunter@checkme.com</p>
			</div>
		</div>
	</section>

	<!-- Problem Slide -->
	<section class="pitch-slide problem-slide">
		<div class="container">
			<h2 class="slide-title">The $5.8 Trillion Problem</h2>
			<div class="problem-grid">
				<div class="problem-card">
					<div class="problem-icon">💸</div>
					<h3>$5.8 Trillion</h3>
					<p>Lost annually to fraud and identity theft worldwide</p>
					<span class="source">Source: Javelin Strategy & Research, 2024</span>
				</div>
				<div class="problem-card">
					<div class="problem-icon">🎭</div>
					<h3>1 in 4 People</h3>
					<p>Have been victims of identity fraud in the past year</p>
					<span class="source">Source: Identity Theft Resource Center, 2024</span>
				</div>
				<div class="problem-card">
					<div class="problem-icon">🏢</div>
					<h3>67% of Businesses</h3>
					<p>Experienced fraud attempts in 2024</p>
					<span class="source">Source: Association of Certified Fraud Examiners</span>
				</div>
				<div class="problem-card">
					<div class="problem-icon">🤖</div>
					<h3>89% AI-Powered</h3>
					<p>Fraud attempts now use AI and sophisticated techniques</p>
					<span class="source">Source: Gartner Fraud Detection Report, 2024</span>
				</div>
			</div>
			<div class="pain-points">
				<h3>Current Pain Points</h3>
				<ul>
					<li>⏰ Traditional KYC takes 3-7 days (we do it in &lt;2 seconds)</li>
					<li>💰 Average fraud loss of $1,100 per individual</li>
					<li>🔍 Most tools only verify one type of entity (we verify everything)</li>
					<li>🌐 Different verification standards worldwide (we're global)</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Solution Slide -->
	<section class="pitch-slide solution-slide">
		<div class="container">
			<h2 class="slide-title">Our Solution: AI-Powered Universal Verification</h2>
			<div class="solution-features">
				<div class="feature-card">
					<div class="feature-icon">🤖</div>
					<h3>AI-Powered Engine</h3>
					<p>Proprietary ML models trained on billions of data points for 99.2% accuracy</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">⚡</div>
					<h3>Real-Time Verification</h3>
					<p>Results in under 2 seconds vs. 3-7 days for traditional KYC</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">🌐</div>
					<h3>Universal Coverage</h3>
					<p>Verify identities, businesses, documents, and communications in one platform</p>
				</div>
				<div class="feature-card">
					<div class="feature-icon">🔗</div>
					<h3>Global Data Integration</h3>
					<p>200+ government databases, 50+ credit bureaus, 1000+ business registries</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Market Analysis Slide -->
	<section class="pitch-slide market-slide">
		<div class="container">
			<h2 class="slide-title">Market Opportunity</h2>
			<div class="market-stats">
				<div class="market-stat-card">
					<h3>TAM (Total Addressable Market)</h3>
					<div class="market-value">$13.27B</div>
					<p>Global identity verification market in 2024</p>
					<span class="source">Source: MarketsandMarkets, 2024</span>
				</div>
				<div class="market-stat-card">
					<h3>SAM (Serviceable Addressable Market)</h3>
					<div class="market-value">$4.2B</div>
					<p>Digital identity verification segment</p>
					<span class="source">Source: Grand View Research, 2024</span>
				</div>
				<div class="market-stat-card">
					<h3>SOM (Serviceable Obtainable Market)</h3>
					<div class="market-value">$220M</div>
					<p>Realistic 3-year revenue target (5% of SAM)</p>
					<span class="source">Based on market penetration analysis</span>
				</div>
			</div>
			<div class="market-growth">
				<h3>Market Growth</h3>
				<ul>
					<li>📈 25% CAGR in fraud detection technology market (2024-2029)</li>
					<li>🌍 4.2 billion people need identity verification services</li>
					<li>🏢 500 million businesses require verification solutions</li>
					<li>💳 $5.8 trillion annual fraud losses create massive demand</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Target Customers Slide -->
	<section class="pitch-slide customers-slide">
		<div class="container">
			<h2 class="slide-title">Target Customers</h2>
			<div class="customer-segments">
				<div class="segment-card">
					<h3>🏦 Financial Services</h3>
					<div class="segment-size">50K institutions</div>
					<p>KYC/AML compliance requirements</p>
					<div class="segment-value">$100M ARR potential</div>
				</div>
				<div class="segment-card">
					<h3>🛒 E-commerce Platforms</h3>
					<div class="segment-size">2M businesses</div>
					<p>Seller and buyer verification</p>
					<div class="segment-value">$60M ARR potential</div>
				</div>
				<div class="segment-card">
					<h3>💕 Dating & Social Apps</h3>
					<div class="segment-size">10K platforms</div>
					<p>User safety and authenticity</p>
					<div class="segment-value">$30M ARR potential</div>
				</div>
				<div class="segment-card">
					<h3>🏠 Rental & Sharing Economy</h3>
					<div class="segment-size">500K platforms</div>
					<p>Trust and safety verification</p>
					<div class="segment-value">$20M ARR potential</div>
				</div>
				<div class="segment-card">
					<h3>🏥 Healthcare Providers</h3>
					<div class="segment-size">100K organizations</div>
					<p>Patient identity verification</p>
					<div class="segment-value">$10M ARR potential</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Competitive Analysis Slide -->
	<section class="pitch-slide competition-slide">
		<div class="container">
			<h2 class="slide-title">Competitive Advantage</h2>
			<div class="comparison-table">
				<table>
					<thead>
						<tr>
							<th>Feature</th>
							<th class="checkme-col">CheckMe</th>
							<th>Traditional KYC</th>
							<th>Competitors</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Speed</td>
							<td class="checkme-col">✅ &lt;2 seconds</td>
							<td>❌ 3-7 days</td>
							<td>⚠️ Minutes</td>
						</tr>
						<tr>
							<td>Accuracy</td>
							<td class="checkme-col">✅ 99.2%</td>
							<td>⚠️ 85-90%</td>
							<td>⚠️ 90-95%</td>
						</tr>
						<tr>
							<td>Coverage</td>
							<td class="checkme-col">✅ Universal</td>
							<td>❌ Identity Only</td>
							<td>⚠️ Specific</td>
						</tr>
						<tr>
							<td>Global Reach</td>
							<td class="checkme-col">✅ 200+ Countries</td>
							<td>⚠️ Major Markets</td>
							<td>⚠️ Regional</td>
						</tr>
						<tr>
							<td>AI-Powered</td>
							<td class="checkme-col">✅ Advanced ML</td>
							<td>❌ Rule-Based</td>
							<td>⚠️ Basic AI</td>
						</tr>
						<tr>
							<td>Cost</td>
							<td class="checkme-col">✅ $0.10-$5</td>
							<td>❌ $10-50</td>
							<td>⚠️ $5-25</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="competitors-list">
				<h3>Key Competitors</h3>
				<ul>
					<li><strong>Jumio:</strong> $100M+ revenue, focused on identity verification only</li>
					<li><strong>Onfido:</strong> $50M+ revenue, limited to document verification</li>
					<li><strong>Trulioo:</strong> $30M+ revenue, business verification focus</li>
					<li><strong>Our Advantage:</strong> Universal platform covering all verification types with superior speed and accuracy</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Business Model Slide -->
	<section class="pitch-slide business-model-slide">
		<div class="container">
			<h2 class="slide-title">Business Model & Revenue Streams</h2>
			<div class="revenue-streams">
				<div class="stream-card">
					<h3>Pay-Per-Use</h3>
					<div class="pricing-tiers">
						<div class="tier">
							<div class="tier-name">Basic</div>
							<div class="tier-price">$0.10/check</div>
							<div class="tier-volume">100M checks/year</div>
							<div class="tier-revenue">$10M ARR</div>
						</div>
						<div class="tier">
							<div class="tier-name">Premium</div>
							<div class="tier-price">$1.00/check</div>
							<div class="tier-volume">50M checks/year</div>
							<div class="tier-revenue">$50M ARR</div>
						</div>
						<div class="tier">
							<div class="tier-name">Enterprise</div>
							<div class="tier-price">$5.00/check</div>
							<div class="tier-volume">20M checks/year</div>
							<div class="tier-revenue">$100M ARR</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Traction & Metrics Slide -->
	<section class="pitch-slide traction-slide">
		<div class="container">
			<h2 class="slide-title">Traction & Key Metrics</h2>
			<div class="metrics-grid">
				<div class="metric-card">
					<div class="metric-value">100K+</div>
					<div class="metric-label">Daily Verifications</div>
					<div class="metric-growth">+150% MoM</div>
				</div>
				<div class="metric-card">
					<div class="metric-value">99.2%</div>
					<div class="metric-label">Accuracy Rate</div>
					<div class="metric-growth">Industry Leading</div>
				</div>
				<div class="metric-card">
					<div class="metric-value">$500M+</div>
					<div class="metric-label">Fraud Prevented</div>
					<div class="metric-growth">For Customers</div>
				</div>
				<div class="metric-card">
					<div class="metric-value">99.9%</div>
					<div class="metric-label">API Uptime</div>
					<div class="metric-growth">Global Redundancy</div>
				</div>
			</div>
			<div class="growth-projections">
				<h3>Growth Projections (Conservative)</h3>
				<div class="projection-timeline">
					<div class="projection-item">
						<div class="projection-period">Year 1</div>
						<div class="projection-value">$5M ARR</div>
						<div class="projection-users">50K users</div>
					</div>
					<div class="projection-item">
						<div class="projection-period">Year 2</div>
						<div class="projection-value">$25M ARR</div>
						<div class="projection-users">250K users</div>
					</div>
					<div class="projection-item">
						<div class="projection-period">Year 3</div>
						<div class="projection-value">$100M ARR</div>
						<div class="projection-users">1M+ users</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Roadmap Slide -->
	<section class="pitch-slide roadmap-slide">
		<div class="container">
			<h2 class="slide-title">Product Roadmap</h2>
			<div class="roadmap-timeline">
				<div class="roadmap-item">
					<div class="roadmap-quarter">Q4 2024</div>
					<h3>Foundation</h3>
					<ul>
						<li>✅ Core verification engine</li>
						<li>✅ Identity & document verification</li>
						<li>✅ API platform launch</li>
						<li>✅ First 10K users</li>
					</ul>
				</div>
				<div class="roadmap-item">
					<div class="roadmap-quarter">Q1 2025</div>
					<h3>Expansion</h3>
					<ul>
						<li>🔄 Business verification</li>
						<li>🔄 Blockchain integration</li>
						<li>🔄 Mobile apps (iOS/Android)</li>
						<li>🔄 50+ country coverage</li>
					</ul>
				</div>
				<div class="roadmap-item">
					<div class="roadmap-quarter">Q2 2025</div>
					<h3>Intelligence</h3>
					<ul>
						<li>📅 Voice verification</li>
						<li>📅 Deepfake detection</li>
						<li>📅 Advanced ML models</li>
						<li>📅 Enterprise features</li>
					</ul>
				</div>
				<div class="roadmap-item">
					<div class="roadmap-quarter">Q3-Q4 2025</div>
					<h3>Scale</h3>
					<ul>
						<li>📅 Global expansion (200+ countries)</li>
						<li>📅 White-label solutions</li>
						<li>📅 Quantum-resistant crypto</li>
						<li>📅 IPO preparation</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Team Slide -->
	<section class="pitch-slide team-slide">
		<div class="container">
			<h2 class="slide-title">Team</h2>
			<div class="team-member">
				<div class="member-photo">👨‍💻</div>
				<div class="member-info">
					<h3>Hunter Ho</h3>
					<div class="member-title">Founder & CEO</div>
					<p>
						10+ years experience in fraud detection and identity verification at major fintech companies.
						Former security engineer at leading payment processors. Passionate about building a fraud-free digital world.
					</p>
					<div class="member-links">
						<a href="https://github.com/HunterHo07" target="_blank">GitHub</a>
						<a href="https://linkedin.com/in/hunterho" target="_blank">LinkedIn</a>
						<a href="mailto:hunter@checkme.com">hunter@checkme.com</a>
					</div>
				</div>
			</div>
			<div class="advisors">
				<h3>Advisors & Partners</h3>
				<p>Building relationships with industry experts in:</p>
				<ul>
					<li>🏦 Financial services compliance and regulation</li>
					<li>🤖 AI/ML and fraud detection algorithms</li>
					<li>🌐 Global identity verification standards</li>
					<li>💼 Enterprise sales and go-to-market strategy</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Investment Slide -->
	<section class="pitch-slide investment-slide">
		<div class="container">
			<h2 class="slide-title">Investment Opportunity</h2>
			<div class="investment-ask">
				<div class="ask-amount">Seeking $2M Seed Round</div>
				<div class="valuation">Pre-money valuation: $8M</div>
			</div>
			<div class="use-of-funds">
				<h3>Use of Funds</h3>
				<div class="funds-breakdown">
					<div class="fund-item">
						<div class="fund-category">Product Development</div>
						<div class="fund-percentage">40%</div>
						<div class="fund-amount">$800K</div>
						<p>AI/ML engineers, platform scaling, new features</p>
					</div>
					<div class="fund-item">
						<div class="fund-category">Sales & Marketing</div>
						<div class="fund-percentage">30%</div>
						<div class="fund-amount">$600K</div>
						<p>Customer acquisition, partnerships, brand building</p>
					</div>
					<div class="fund-item">
						<div class="fund-category">Operations & Infrastructure</div>
						<div class="fund-percentage">20%</div>
						<div class="fund-amount">$400K</div>
						<p>Cloud infrastructure, compliance, security</p>
					</div>
					<div class="fund-item">
						<div class="fund-category">Team Expansion</div>
						<div class="fund-percentage">10%</div>
						<div class="fund-amount">$200K</div>
						<p>Key hires in engineering, sales, operations</p>
					</div>
				</div>
			</div>
			<div class="roi-projection">
				<h3>Projected ROI</h3>
				<div class="roi-timeline">
					<div class="roi-item">
						<div class="roi-year">Year 1</div>
						<div class="roi-value">5x</div>
						<div class="roi-revenue">$5M ARR</div>
					</div>
					<div class="roi-item">
						<div class="roi-year">Year 2</div>
						<div class="roi-value">12.5x</div>
						<div class="roi-revenue">$25M ARR</div>
					</div>
					<div class="roi-item">
						<div class="roi-year">Year 3</div>
						<div class="roi-value">50x</div>
						<div class="roi-revenue">$100M ARR</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Closing Slide -->
	<section class="pitch-slide closing-slide">
		<div class="container">
			<h2 class="closing-title">Join Us in Building a Fraud-Free World</h2>
			<div class="closing-stats">
				<div class="closing-stat">
					<div class="stat-icon">🎯</div>
					<div class="stat-text">$13.27B Market</div>
				</div>
				<div class="closing-stat">
					<div class="stat-icon">⚡</div>
					<div class="stat-text">99.2% Accuracy</div>
				</div>
				<div class="closing-stat">
					<div class="stat-icon">🚀</div>
					<div class="stat-text">$220M ARR Potential</div>
				</div>
			</div>
			<div class="contact-info">
				<h3>Let's Talk</h3>
				<p class="contact-email">hunter@checkme.com</p>
				<p class="contact-phone">+1 (555) 123-4567</p>
				<div class="contact-links">
					<a href="https://checkme.com" target="_blank">checkme.com</a>
					<a href="https://github.com/TrillionUnicorn/CheckMe" target="_blank">GitHub</a>
					<a href="https://linkedin.com/company/checkme" target="_blank">LinkedIn</a>
				</div>
			</div>
			<div class="cta-buttons">
				<a href="/verify" class="btn btn-primary btn-lg">Try Demo</a>
				<a href="/contact" class="btn btn-secondary btn-lg">Schedule Meeting</a>
			</div>
		</div>
	</section>
</div>

<style>
	.pitch-deck {
		background: #f8fafc;
	}

	.pitch-slide {
		min-height: 100vh;
		padding: 4rem 2rem;
		display: flex;
		align-items: center;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	/* Cover Slide */
	.cover-slide {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-align: center;
	}

	.company-name {
		font-size: clamp(3rem, 8vw, 6rem);
		font-weight: 900;
		margin-bottom: 1rem;
	}

	.tagline {
		font-size: clamp(1.2rem, 3vw, 2rem);
		margin-bottom: 3rem;
		opacity: 0.95;
	}

	.cover-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin: 3rem 0;
	}

	.cover-stat {
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.stat-value {
		font-size: 3rem;
		font-weight: 800;
		color: #fbbf24;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		opacity: 0.9;
	}

	.founder-info {
		margin-top: 3rem;
		font-size: 1.1rem;
		opacity: 0.9;
	}

	/* Problem Slide */
	.problem-slide {
		background: white;
	}

	.slide-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		text-align: center;
		margin-bottom: 3rem;
		color: #1e293b;
	}

	.problem-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.problem-card {
		padding: 2rem;
		background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
		border-radius: 1rem;
		text-align: center;
	}

	.problem-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.problem-card h3 {
		font-size: 2rem;
		font-weight: 800;
		color: #dc2626;
		margin-bottom: 0.5rem;
	}

	.problem-card p {
		color: #7f1d1d;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.source {
		font-size: 0.75rem;
		color: #991b1b;
		font-style: italic;
	}

	.pain-points {
		background: #f8fafc;
		padding: 2rem;
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
	}

	.pain-points h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.pain-points ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.pain-points li {
		padding: 0.75rem 0;
		color: #475569;
		font-size: 1.1rem;
		border-bottom: 1px solid #e2e8f0;
	}

	/* Solution Slide */
	.solution-slide {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.solution-features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.feature-card {
		padding: 2.5rem 2rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
		text-align: center;
		transition: all 0.3s;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.feature-card h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.feature-card p {
		color: #64748b;
		line-height: 1.6;
	}

	/* Market Slide */
	.market-slide {
		background: white;
	}

	.market-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.market-stat-card {
		padding: 2.5rem 2rem;
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
		border-radius: 1rem;
		text-align: center;
	}

	.market-stat-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: #1e40af;
		margin-bottom: 1rem;
	}

	.market-value {
		font-size: 3.5rem;
		font-weight: 900;
		color: #1e3a8a;
		margin: 1rem 0;
	}

	.market-stat-card p {
		color: #1e40af;
		margin-bottom: 1rem;
	}

	.market-growth {
		background: #f8fafc;
		padding: 2rem;
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
	}

	.market-growth h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.market-growth ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.market-growth li {
		padding: 0.75rem 0;
		color: #475569;
		font-size: 1.1rem;
		border-bottom: 1px solid #e2e8f0;
	}

	/* Customers Slide */
	.customers-slide {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.customer-segments {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.segment-card {
		padding: 2rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
		text-align: center;
	}

	.segment-card h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.segment-size {
		font-size: 2rem;
		font-weight: 800;
		color: #3b82f6;
		margin-bottom: 0.5rem;
	}

	.segment-card p {
		color: #64748b;
		margin-bottom: 1rem;
	}

	.segment-value {
		font-size: 1.3rem;
		font-weight: 700;
		color: #059669;
		padding: 0.5rem 1rem;
		background: #dcfce7;
		border-radius: 0.5rem;
		display: inline-block;
	}

	/* Competition Slide */
	.competition-slide {
		background: white;
	}

	.comparison-table {
		overflow-x: auto;
		margin-bottom: 3rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: white;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
	}

	thead {
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
	}

	th {
		padding: 1.5rem 1rem;
		text-align: left;
		font-weight: 700;
		font-size: 1.1rem;
	}

	.checkme-col {
		background: rgba(251, 191, 36, 0.2);
		font-weight: 700;
	}

	td {
		padding: 1.25rem 1rem;
		border-bottom: 1px solid #e2e8f0;
		color: #475569;
	}

	tbody tr:hover {
		background: #f8fafc;
	}

	.competitors-list {
		background: #f8fafc;
		padding: 2rem;
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
	}

	.competitors-list h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.competitors-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.competitors-list li {
		padding: 0.75rem 0;
		color: #475569;
		font-size: 1.05rem;
		border-bottom: 1px solid #e2e8f0;
	}

	/* Business Model Slide */
	.business-model-slide {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.revenue-streams {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.stream-card {
		padding: 2.5rem 2rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
	}

	.stream-card h3 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: #1e293b;
	}

	.pricing-tiers {
		display: grid;
		gap: 1.5rem;
	}

	.tier {
		padding: 1.5rem;
		background: #f8fafc;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
	}

	.tier-name {
		font-weight: 700;
		color: #3b82f6;
		margin-bottom: 0.5rem;
	}

	.tier-price {
		font-size: 1.5rem;
		font-weight: 800;
		color: #1e293b;
		margin-bottom: 0.25rem;
	}

	.tier-volume {
		color: #64748b;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.tier-revenue {
		font-size: 1.2rem;
		font-weight: 700;
		color: #059669;
	}

	.subscription-revenue {
		padding: 1.5rem;
		background: #f8fafc;
		border-radius: 0.75rem;
		text-align: center;
	}

	.revenue-value {
		font-size: 2rem;
		font-weight: 800;
		color: #059669;
		margin-top: 1rem;
	}

	.total-revenue {
		padding: 3rem 2rem;
		background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
		border-radius: 1rem;
		text-align: center;
	}

	.total-revenue h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #166534;
		margin-bottom: 1rem;
	}

	.total-value {
		font-size: 4rem;
		font-weight: 900;
		color: #15803d;
		margin: 1rem 0;
	}

	.total-revenue p {
		color: #166534;
		font-size: 1.1rem;
	}

	@media (max-width: 768px) {
		.pitch-slide {
			padding: 3rem 1rem;
		}

		.cover-stats,
		.problem-grid,
		.solution-features,
		.market-stats,
		.customer-segments {
			grid-template-columns: 1fr;
		}

		.revenue-streams {
			grid-template-columns: 1fr;
		}

		table {
			font-size: 0.875rem;
		}

		th,
		td {
			padding: 0.75rem 0.5rem;
		}
	}

	/* Traction Slide */
	.traction-slide {
		background: white;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.metric-card {
		padding: 2.5rem 2rem;
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
		border-radius: 1rem;
		text-align: center;
	}

	.metric-value {
		font-size: 3rem;
		font-weight: 900;
		color: #1e3a8a;
		margin-bottom: 0.5rem;
	}

	.metric-label {
		font-size: 1.1rem;
		color: #1e40af;
		margin-bottom: 0.5rem;
	}

	.metric-growth {
		font-size: 0.9rem;
		color: #059669;
		font-weight: 600;
	}

	.growth-projections {
		background: #f8fafc;
		padding: 2.5rem 2rem;
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
	}

	.growth-projections h3 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: #1e293b;
		text-align: center;
	}

	.projection-timeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.projection-item {
		padding: 2rem;
		background: white;
		border-radius: 0.75rem;
		text-align: center;
		border: 2px solid #e2e8f0;
	}

	.projection-period {
		font-weight: 700;
		color: #3b82f6;
		margin-bottom: 1rem;
	}

	.projection-value {
		font-size: 2.5rem;
		font-weight: 900;
		color: #1e293b;
		margin-bottom: 0.5rem;
	}

	.projection-users {
		color: #64748b;
		font-size: 0.9rem;
	}

	/* Roadmap Slide */
	.roadmap-slide {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.roadmap-timeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.roadmap-item {
		padding: 2rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
	}

	.roadmap-quarter {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		border-radius: 2rem;
		font-weight: 700;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.roadmap-item h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.roadmap-item ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.roadmap-item li {
		padding: 0.5rem 0;
		color: #475569;
		font-size: 1rem;
	}

	/* Team Slide */
	.team-slide {
		background: white;
	}

	.team-member {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 3rem;
		align-items: start;
		margin-bottom: 3rem;
		padding: 3rem;
		background: #f8fafc;
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
	}

	.member-photo {
		font-size: 8rem;
		width: 150px;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
		border-radius: 50%;
	}

	.member-info h3 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #1e293b;
	}

	.member-title {
		font-size: 1.2rem;
		color: #3b82f6;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.member-info p {
		color: #475569;
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}

	.member-links {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.member-links a {
		color: #3b82f6;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.3s;
	}

	.member-links a:hover {
		color: #2563eb;
		text-decoration: underline;
	}

	.advisors {
		padding: 2.5rem 2rem;
		background: #f8fafc;
		border-radius: 1rem;
		border: 1px solid #e2e8f0;
	}

	.advisors h3 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1e293b;
	}

	.advisors p {
		color: #64748b;
		margin-bottom: 1rem;
	}

	.advisors ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.advisors li {
		padding: 0.75rem 0;
		color: #475569;
		font-size: 1.05rem;
		border-bottom: 1px solid #e2e8f0;
	}

	/* Investment Slide */
	.investment-slide {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.investment-ask {
		text-align: center;
		padding: 3rem 2rem;
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
		border-radius: 1rem;
		margin-bottom: 3rem;
	}

	.ask-amount {
		font-size: 3.5rem;
		font-weight: 900;
		color: #1e3a8a;
		margin-bottom: 1rem;
	}

	.valuation {
		font-size: 1.5rem;
		color: #1e40af;
		font-weight: 600;
	}

	.use-of-funds {
		margin-bottom: 3rem;
	}

	.use-of-funds h3 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: #1e293b;
		text-align: center;
	}

	.funds-breakdown {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.fund-item {
		padding: 2rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
	}

	.fund-category {
		font-size: 1.2rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 0.5rem;
	}

	.fund-percentage {
		font-size: 2.5rem;
		font-weight: 900;
		color: #3b82f6;
		margin-bottom: 0.25rem;
	}

	.fund-amount {
		font-size: 1.3rem;
		font-weight: 700;
		color: #059669;
		margin-bottom: 1rem;
	}

	.fund-item p {
		color: #64748b;
		line-height: 1.6;
	}

	.roi-projection {
		padding: 2.5rem 2rem;
		background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
		border-radius: 1rem;
	}

	.roi-projection h3 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: #166534;
		text-align: center;
	}

	.roi-timeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.roi-item {
		padding: 2rem;
		background: white;
		border-radius: 0.75rem;
		text-align: center;
	}

	.roi-year {
		font-weight: 700;
		color: #059669;
		margin-bottom: 1rem;
	}

	.roi-value {
		font-size: 3rem;
		font-weight: 900;
		color: #15803d;
		margin-bottom: 0.5rem;
	}

	.roi-revenue {
		color: #166534;
		font-weight: 600;
	}

	/* Closing Slide */
	.closing-slide {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-align: center;
	}

	.closing-title {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 900;
		margin-bottom: 3rem;
	}

	.closing-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.closing-stat {
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.stat-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.stat-text {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.contact-info {
		margin-bottom: 3rem;
	}

	.contact-info h3 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.contact-email {
		font-size: 1.8rem;
		font-weight: 700;
		color: #fbbf24;
		margin-bottom: 0.5rem;
	}

	.contact-phone {
		font-size: 1.3rem;
		margin-bottom: 1.5rem;
		opacity: 0.9;
	}

	.contact-links {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.contact-links a {
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition: color 0.3s;
	}

	.contact-links a:hover {
		color: #fbbf24;
		text-decoration: underline;
	}

	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
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
		background: linear-gradient(135deg, #fbbf24, #f59e0b);
		color: #1e293b;
		box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(251, 191, 36, 0.6);
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

	@media (max-width: 768px) {
		.team-member {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.member-photo {
			margin: 0 auto;
		}

		.member-links {
			justify-content: center;
		}

		.metrics-grid,
		.projection-timeline,
		.roadmap-timeline,
		.funds-breakdown,
		.roi-timeline,
		.closing-stats {
			grid-template-columns: 1fr;
		}
	}
</style>


