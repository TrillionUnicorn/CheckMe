<script lang="ts">
	import { verificationAPI } from '$lib/api/verification';
	
	let verificationType = $state('company');
	let inputValue = $state('');
	let loading = $state(false);
	let result = $state<any>(null);
	let error = $state('');

	const verificationTypes = [
		{ value: 'company', label: 'Company/Business', placeholder: 'Enter company name or registration number' },
		{ value: 'domain', label: 'Domain/Website', placeholder: 'Enter domain name (e.g., example.com)' },
		{ value: 'phone', label: 'Phone Number', placeholder: 'Enter phone number with country code' },
		{ value: 'email', label: 'Email Address', placeholder: 'Enter email address' }
	];

	async function handleVerification() {
		if (!inputValue.trim()) {
			error = 'Please enter a value to verify';
			return;
		}

		loading = true;
		error = '';
		result = null;

		try {
			result = await verificationAPI.verify(verificationType, inputValue.trim());
		} catch (err) {
			error = err instanceof Error ? err.message : 'Verification failed';
		} finally {
			loading = false;
		}
	}

	function resetForm() {
		inputValue = '';
		result = null;
		error = '';
	}
</script>

<div class="verification-form">
	<div class="form-group">
		<label class="form-label">Verification Type</label>
		<select bind:value={verificationType} class="form-select" onchange={resetForm}>
			{#each verificationTypes as type}
				<option value={type.value}>{type.label}</option>
			{/each}
		</select>
	</div>

	<div class="form-group">
		<label class="form-label">
			{verificationTypes.find(t => t.value === verificationType)?.label}
		</label>
		<div class="input-group">
			<input
				type="text"
				bind:value={inputValue}
				placeholder={verificationTypes.find(t => t.value === verificationType)?.placeholder}
				class="form-input"
				disabled={loading}
			/>
			<button
				onclick={handleVerification}
				disabled={loading || !inputValue.trim()}
				class="btn btn-primary"
			>
				{#if loading}
					<div class="loading"></div>
					Verifying...
				{:else}
					🔍 Verify
				{/if}
			</button>
		</div>
	</div>

	{#if error}
		<div class="alert alert-danger">
			{error}
		</div>
	{/if}

	{#if result}
		<div class="verification-result">
			<div class="result-header">
				<div class="result-status {result.status}">
					<span class="status-icon">
						{#if result.status === 'verified'}
							✅
						{:else if result.status === 'warning'}
							⚠️
						{:else}
							❌
						{/if}
					</span>
					<span class="status-text">
						{result.status === 'verified' ? 'Verified' : 
						 result.status === 'warning' ? 'Warning' : 'Not Verified'}
					</span>
				</div>
				<div class="confidence-score">
					Confidence: {result.confidence}%
				</div>
			</div>

			<div class="result-details">
				<h4>Details</h4>
				{#if result.details}
					{#each Object.entries(result.details) as [key, value]}
						<div class="detail-item">
							<span class="detail-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
							<span class="detail-value">{value}</span>
						</div>
					{/each}
				{/if}
			</div>

			{#if result.warnings && result.warnings.length > 0}
				<div class="result-warnings">
					<h4>⚠️ Warnings</h4>
					<ul>
						{#each result.warnings as warning}
							<li>{warning}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if result.recommendations && result.recommendations.length > 0}
				<div class="result-recommendations">
					<h4>💡 Recommendations</h4>
					<ul>
						{#each result.recommendations as recommendation}
							<li>{recommendation}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.verification-form {
		max-width: 600px;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #374151;
	}

	.form-select,
	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	.form-select:focus,
	.form-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.input-group {
		display: flex;
		gap: 0.75rem;
	}

	.input-group .form-input {
		flex: 1;
	}

	.verification-result {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.75rem;
		padding: 1.5rem;
		margin-top: 1.5rem;
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.result-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.result-status.verified {
		color: #059669;
	}

	.result-status.warning {
		color: #d97706;
	}

	.result-status.failed {
		color: #dc2626;
	}

	.confidence-score {
		background: #e2e8f0;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #475569;
	}

	.result-details h4,
	.result-warnings h4,
	.result-recommendations h4 {
		margin: 0 0 0.75rem 0;
		color: #374151;
		font-size: 1rem;
		font-weight: 600;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #f1f5f9;
	}

	.detail-key {
		font-weight: 500;
		color: #64748b;
	}

	.detail-value {
		color: #1e293b;
		text-align: right;
	}

	.result-warnings,
	.result-recommendations {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e2e8f0;
	}

	.result-warnings ul,
	.result-recommendations ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.result-warnings li,
	.result-recommendations li {
		margin-bottom: 0.5rem;
		color: #374151;
	}

	@media (max-width: 640px) {
		.input-group {
			flex-direction: column;
		}
		
		.result-header {
			flex-direction: column;
			gap: 0.75rem;
			align-items: flex-start;
		}
		
		.detail-item {
			flex-direction: column;
			gap: 0.25rem;
		}
		
		.detail-value {
			text-align: left;
		}
	}
</style>
