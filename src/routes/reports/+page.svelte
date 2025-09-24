<script lang="ts">
	import { onMount } from 'svelte';
	import { reportsAPI } from '$lib/api/reports';
	
	let reports = $state<any[]>([]);
	let loading = $state(true);
	let filter = $state('all');
	let searchQuery = $state('');
	let filteredReports = $state<any[]>([]);

	const filterOptions = [
		{ value: 'all', label: 'All Reports' },
		{ value: 'scam', label: 'Scams' },
		{ value: 'warning', label: 'Warnings' },
		{ value: 'verified', label: 'Verified' }
	];

	onMount(async () => {
		try {
			reports = await reportsAPI.getRecent(50);
			filteredReports = reports;
		} catch (error) {
			console.error('Failed to load reports:', error);
		} finally {
			loading = false;
		}
	});

	function applyFilters() {
		let filtered = reports;

		// Apply status filter
		if (filter !== 'all') {
			filtered = filtered.filter(report => report.status === filter);
		}

		// Apply search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter(report => 
				report.target.toLowerCase().includes(query) ||
				report.description.toLowerCase().includes(query)
			);
		}

		filteredReports = filtered;
	}

	$effect(() => {
		applyFilters();
	});

	function getStatusBadgeClass(status: string) {
		switch (status) {
			case 'verified': return 'badge-success';
			case 'warning': return 'badge-warning';
			case 'scam': return 'badge-danger';
			default: return 'badge-secondary';
		}
	}

	function getStatusIcon(status: string) {
		switch (status) {
			case 'verified': return '✅';
			case 'warning': return '⚠️';
			case 'scam': return '❌';
			default: return '❓';
		}
	}

	function formatTimeAgo(timestamp: string) {
		const now = new Date();
		const reportTime = new Date(timestamp);
		const diffInMinutes = Math.floor((now.getTime() - reportTime.getTime()) / (1000 * 60));
		
		if (diffInMinutes < 1) return 'Just now';
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
		
		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) return `${diffInHours}h ago`;
		
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays}d ago`;
	}
</script>

<svelte:head>
	<title>Community Reports - CheckMe</title>
	<meta name="description" content="Browse community reports about companies, domains, phone numbers, and email addresses." />
</svelte:head>

<div class="reports-page">
	<div class="page-header">
		<h1>Community Reports</h1>
		<p class="page-description">
			Browse reports submitted by our community members. Help others stay safe by sharing your experiences.
		</p>
	</div>

	<div class="reports-controls">
		<div class="search-box">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search reports..."
				class="form-input"
			/>
		</div>
		
		<div class="filter-tabs">
			{#each filterOptions as option}
				<button
					class="filter-tab {filter === option.value ? 'active' : ''}"
					onclick={() => filter = option.value}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>

	<div class="reports-content">
		{#if loading}
			<div class="loading-state">
				<div class="loading"></div>
				<p>Loading community reports...</p>
			</div>
		{:else if filteredReports.length === 0}
			<div class="empty-state">
				<div class="empty-icon">📋</div>
				<h3>No reports found</h3>
				<p>Try adjusting your search or filter criteria.</p>
			</div>
		{:else}
			<div class="reports-grid">
				{#each filteredReports as report}
					<div class="report-card">
						<div class="report-header">
							<div class="report-type">
								<span class="type-icon">
									{#if report.type === 'company'}
										🏢
									{:else if report.type === 'domain'}
										🌐
									{:else if report.type === 'phone'}
										📱
									{:else}
										📧
									{/if}
								</span>
								<span class="type-label">{report.type}</span>
							</div>
							<div class="report-status">
								<span class="badge {getStatusBadgeClass(report.status)}">
									{getStatusIcon(report.status)} {report.status}
								</span>
							</div>
						</div>
						
						<div class="report-content">
							<div class="report-target">{report.target}</div>
							<div class="report-description">{report.description}</div>
						</div>
						
						<div class="report-footer">
							<div class="report-meta">
								<span class="report-time">{formatTimeAgo(report.timestamp)}</span>
								<span class="report-votes">
									👍 {report.upvotes} 👎 {report.downvotes}
								</span>
							</div>
							<div class="report-actions">
								<button class="btn-link">View Details</button>
								<button class="btn-link">Vote</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.reports-page {
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

	.reports-controls {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		align-items: center;
	}

	.search-box {
		flex: 1;
		max-width: 400px;
	}

	.filter-tabs {
		display: flex;
		gap: 0.5rem;
	}

	.filter-tab {
		padding: 0.5rem 1rem;
		border: 1px solid #e2e8f0;
		background: white;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
		color: #64748b;
	}

	.filter-tab:hover {
		background: #f8fafc;
		border-color: #cbd5e1;
	}

	.filter-tab.active {
		background: #3b82f6;
		color: white;
		border-color: #3b82f6;
	}

	.reports-content {
		min-height: 400px;
	}

	.loading-state,
	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: #64748b;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.empty-state h3 {
		margin: 0 0 0.5rem 0;
		color: #374151;
	}

	.reports-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.report-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.75rem;
		padding: 1.5rem;
		transition: all 0.2s;
	}

	.report-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-color: #cbd5e1;
	}

	.report-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.report-type {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.type-icon {
		font-size: 1.1rem;
	}

	.type-label {
		font-weight: 500;
		color: #475569;
		text-transform: capitalize;
	}

	.report-content {
		margin-bottom: 1rem;
	}

	.report-target {
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 0.5rem;
		word-break: break-all;
	}

	.report-description {
		color: #64748b;
		line-height: 1.5;
	}

	.report-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		padding-top: 1rem;
		border-top: 1px solid #f1f5f9;
	}

	.report-meta {
		display: flex;
		gap: 1rem;
		color: #64748b;
	}

	.report-time {
		font-weight: 500;
	}

	.report-votes {
		display: flex;
		gap: 0.5rem;
	}

	.report-actions {
		display: flex;
		gap: 0.75rem;
	}

	.btn-link {
		background: none;
		border: none;
		color: #3b82f6;
		text-decoration: underline;
		cursor: pointer;
		font-size: 0.875rem;
		padding: 0;
	}

	.btn-link:hover {
		color: #2563eb;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.badge-success {
		background-color: #dcfce7;
		color: #166534;
	}

	.badge-warning {
		background-color: #fef3c7;
		color: #92400e;
	}

	.badge-danger {
		background-color: #fee2e2;
		color: #991b1b;
	}

	.badge-secondary {
		background-color: #f1f5f9;
		color: #475569;
	}

	@media (max-width: 768px) {
		.reports-page {
			padding: 1rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.reports-controls {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.search-box {
			max-width: none;
		}

		.filter-tabs {
			justify-content: center;
			flex-wrap: wrap;
		}

		.reports-grid {
			grid-template-columns: 1fr;
		}

		.report-footer {
			flex-direction: column;
			gap: 0.75rem;
			align-items: flex-start;
		}
	}
</style>
