<script lang="ts">
	import VerificationForm from '$lib/components/VerificationForm.svelte';
	import DocumentUpload from '$lib/components/DocumentUpload.svelte';
</script>

<svelte:head>
	<title>Verify - CheckMe</title>
	<meta name="description" content="Verify companies, domains, phone numbers, and email addresses for fraud and legitimacy." />
</svelte:head>

<div class="verify-page">
	<div class="page-header">
		<h1>Verification Center</h1>
		<p class="page-description">
			Use our comprehensive verification tools to check the legitimacy of companies, domains, phone numbers, and email addresses. 
			Protect yourself from scams and fraud with real-time verification.
		</p>
	</div>

	<div class="verification-container">
		<div class="verification-main">
			<VerificationForm />
			<DocumentUpload />
		</div>
		
		<div class="verification-sidebar">
			<div class="info-card">
				<h3>🔍 How Verification Works</h3>
				<ul>
					<li><strong>Business Registry:</strong> Check official company registrations and status</li>
					<li><strong>Domain Analysis:</strong> Verify website legitimacy and security certificates</li>
					<li><strong>Phone Verification:</strong> Identify carrier, location, and spam reports</li>
					<li><strong>Email Validation:</strong> Check domain reputation and authentication records</li>
				</ul>
			</div>

			<div class="info-card">
				<h3>⚡ Quick Tips</h3>
				<ul>
					<li>Always verify before sharing personal information</li>
					<li>Check multiple sources for important decisions</li>
					<li>Report suspicious entities to help the community</li>
					<li>Trust your instincts - if something feels wrong, investigate further</li>
				</ul>
			</div>

			<div class="info-card">
				<h3>📊 Verification Stats</h3>
				<div class="stats-mini">
					<div class="stat-mini">
						<div class="stat-number">98.7%</div>
						<div class="stat-label">Accuracy Rate</div>
					</div>
					<div class="stat-mini">
						<div class="stat-number">&lt;2s</div>
						<div class="stat-label">Average Response</div>
					</div>
					<div class="stat-mini">
						<div class="stat-number">24/7</div>
						<div class="stat-label">Availability</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.verify-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 1rem;
	}

	.page-description {
		font-size: 1.125rem;
		color: #64748b;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.verification-container {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.verification-main {
		background: white;
		padding: 2rem;
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
	}

	.verification-sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-card {
		background: white;
		padding: 1.5rem;
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
	}

	.info-card h3 {
		margin: 0 0 1rem 0;
		color: #1e293b;
		font-size: 1.125rem;
		font-weight: 600;
	}

	.info-card ul {
		margin: 0;
		padding-left: 1.25rem;
		color: #475569;
	}

	.info-card li {
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}

	.stats-mini {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.stat-mini {
		text-align: center;
		padding: 1rem;
		background: #f8fafc;
		border-radius: 0.5rem;
	}

	.stat-mini .stat-number {
		font-size: 1.25rem;
		font-weight: 700;
		color: #3b82f6;
		margin-bottom: 0.25rem;
	}

	.stat-mini .stat-label {
		font-size: 0.75rem;
		color: #64748b;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.verify-page {
			padding: 1rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.verification-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.verification-main,
		.info-card {
			padding: 1.5rem;
		}

		.stats-mini {
			grid-template-columns: 1fr;
		}
	}
</style>
