<script lang="ts">
	import VerificationForm from '$lib/components/VerificationForm.svelte';
	import StatsCards from '$lib/components/StatsCards.svelte';
	import RecentReports from '$lib/components/RecentReports.svelte';
</script>

<svelte:head>
	<title>CheckMe - Verification & Anti-Fraud Hub</title>
	<meta name="description" content="Verify companies, domains, phone numbers, and more with our comprehensive fraud detection platform." />
</svelte:head>

<div class="hero">
	<div class="hero-content">
		<h1 class="hero-title">
			Verify Before You Trust
		</h1>
		<p class="hero-description">
			CheckMe is your comprehensive verification hub. Check companies, domains, phone numbers, and more to protect yourself from scams and fraud.
		</p>
		<div class="hero-features">
			<div class="feature">
				<span class="feature-icon">🏢</span>
				<span>Business Registry</span>
			</div>
			<div class="feature">
				<span class="feature-icon">🌐</span>
				<span>Domain Analysis</span>
			</div>
			<div class="feature">
				<span class="feature-icon">📱</span>
				<span>Phone Verification</span>
			</div>
			<div class="feature">
				<span class="feature-icon">👥</span>
				<span>Community Reports</span>
			</div>
		</div>
	</div>
</div>

<div class="dashboard">
	<StatsCards />

	<div class="main-section">
		<div class="verification-section">
			<h2>Quick Verification</h2>
			<VerificationForm />
		</div>

		<div class="reports-section">
			<h2>Recent Community Reports</h2>
			<RecentReports />
		</div>
	</div>
</div>

<style>
	.hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 4rem 0;
		text-align: center;
		margin-bottom: 3rem;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.hero-description {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		opacity: 0.9;
		line-height: 1.6;
	}

	.hero-features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.feature {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		backdrop-filter: blur(10px);
	}

	.feature-icon {
		font-size: 1.5rem;
	}

	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.main-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.verification-section,
	.reports-section {
		background: white;
		padding: 2rem;
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
	}

	.verification-section h2,
	.reports-section h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
		color: #1e293b;
		font-size: 1.5rem;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.hero-title {
			font-size: 2rem;
		}

		.hero-description {
			font-size: 1rem;
		}

		.hero-features {
			grid-template-columns: 1fr;
		}

		.main-section {
			grid-template-columns: 1fr;
		}

		.dashboard {
			padding: 0 1rem;
		}
	}
</style>
