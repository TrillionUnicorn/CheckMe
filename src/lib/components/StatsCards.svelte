<script lang="ts">
	import { onMount } from 'svelte';
	
	let stats = $state({
		totalVerifications: 0,
		scamsDetected: 0,
		trustedBusinesses: 0,
		communityReports: 0
	});

	let loading = $state(true);

	onMount(async () => {
		// Simulate API call with realistic mock data
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		stats = {
			totalVerifications: 125847,
			scamsDetected: 3421,
			trustedBusinesses: 89234,
			communityReports: 15672
		};
		
		loading = false;
	});
</script>

<div class="stats-grid">
	<div class="stat-card">
		<div class="stat-icon">🔍</div>
		<div class="stat-content">
			<div class="stat-number">
				{#if loading}
					<div class="loading"></div>
				{:else}
					{stats.totalVerifications.toLocaleString()}
				{/if}
			</div>
			<div class="stat-label">Total Verifications</div>
		</div>
	</div>

	<div class="stat-card danger">
		<div class="stat-icon">⚠️</div>
		<div class="stat-content">
			<div class="stat-number">
				{#if loading}
					<div class="loading"></div>
				{:else}
					{stats.scamsDetected.toLocaleString()}
				{/if}
			</div>
			<div class="stat-label">Scams Detected</div>
		</div>
	</div>

	<div class="stat-card success">
		<div class="stat-icon">✅</div>
		<div class="stat-content">
			<div class="stat-number">
				{#if loading}
					<div class="loading"></div>
				{:else}
					{stats.trustedBusinesses.toLocaleString()}
				{/if}
			</div>
			<div class="stat-label">Trusted Businesses</div>
		</div>
	</div>

	<div class="stat-card info">
		<div class="stat-icon">👥</div>
		<div class="stat-content">
			<div class="stat-number">
				{#if loading}
					<div class="loading"></div>
				{:else}
					{stats.communityReports.toLocaleString()}
				{/if}
			</div>
			<div class="stat-label">Community Reports</div>
		</div>
	</div>
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		padding: 1.5rem;
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.stat-card.success {
		border-left: 4px solid #10b981;
	}

	.stat-card.danger {
		border-left: 4px solid #ef4444;
	}

	.stat-card.info {
		border-left: 4px solid #3b82f6;
	}

	.stat-icon {
		font-size: 2rem;
		opacity: 0.8;
	}

	.stat-content {
		flex: 1;
	}

	.stat-number {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 0.25rem;
	}

	.stat-label {
		color: #64748b;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.loading {
		width: 1.5rem;
		height: 1.5rem;
		border: 2px solid #f3f4f6;
		border-top: 2px solid #3b82f6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@media (max-width: 640px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
		
		.stat-card {
			padding: 1rem;
		}
		
		.stat-number {
			font-size: 1.5rem;
		}
	}
</style>
