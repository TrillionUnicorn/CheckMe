<script lang="ts">
	import { onMount } from 'svelte';
	import { reportsAPI } from '$lib/api/reports';
	
	let reports = $state<any[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			reports = await reportsAPI.getRecent();
		} catch (error) {
			console.error('Failed to load reports:', error);
		} finally {
			loading = false;
		}
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

<div class="reports-container">
	{#if loading}
		<div class="loading-state">
			<div class="loading"></div>
			<p>Loading recent reports...</p>
		</div>
	{:else if reports.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📋</div>
			<p>No recent reports available</p>
		</div>
	{:else}
		<div class="reports-list">
			{#each reports as report}
				<div class="report-item">
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
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="reports-footer">
			<a href="/reports" class="btn btn-secondary">View All Reports</a>
		</div>
	{/if}
</div>

<style>
	.reports-container {
		max-width: 600px;
	}

	.loading-state,
	.empty-state {
		text-align: center;
		padding: 3rem 1rem;
		color: #64748b;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.reports-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.report-item {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		padding: 1rem;
		transition: all 0.2s;
	}

	.report-item:hover {
		background: #f1f5f9;
		border-color: #cbd5e1;
	}

	.report-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
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
		margin-bottom: 0.75rem;
	}

	.report-target {
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 0.25rem;
		word-break: break-all;
	}

	.report-description {
		color: #64748b;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.report-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
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
		gap: 0.5rem;
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

	.reports-footer {
		margin-top: 1.5rem;
		text-align: center;
	}

	@media (max-width: 640px) {
		.report-header {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}
		
		.report-footer {
			flex-direction: column;
			gap: 0.75rem;
			align-items: flex-start;
		}
		
		.report-meta {
			flex-direction: column;
			gap: 0.25rem;
		}
	}
</style>
