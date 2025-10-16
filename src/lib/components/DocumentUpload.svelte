<script lang="ts">
	let files = $state<FileList | null>(null);
	let uploading = $state(false);
	let uploadProgress = $state(0);
	let uploadResult = $state<any>(null);
	let error = $state('');

	let fileInput = $state<HTMLInputElement>();

	const acceptedTypes = [
		'image/jpeg',
		'image/png',
		'image/jpg',
		'application/pdf',
		'image/webp'
	];

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		files = target.files;
		error = '';
		uploadResult = null;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const droppedFiles = e.dataTransfer?.files;
		if (droppedFiles && droppedFiles.length > 0) {
			files = droppedFiles;
			error = '';
			uploadResult = null;
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
	}

	async function handleUpload() {
		if (!files || files.length === 0) {
			error = 'Please select a file to upload';
			return;
		}

		const file = files[0];
		
		if (!acceptedTypes.includes(file.type)) {
			error = 'Invalid file type. Please upload JPG, PNG, PDF, or WebP files.';
			return;
		}

		if (file.size > 10 * 1024 * 1024) {
			error = 'File size must be less than 10MB';
			return;
		}

		uploading = true;
		uploadProgress = 0;
		error = '';

		try {
			// Simulate upload progress
			const progressInterval = setInterval(() => {
				uploadProgress += 10;
				if (uploadProgress >= 90) {
					clearInterval(progressInterval);
				}
			}, 200);

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			clearInterval(progressInterval);
			uploadProgress = 100;

			// Simulate verification result
			uploadResult = {
				status: 'verified',
				confidence: 95,
				documentType: 'Government ID',
				details: {
					documentNumber: '***-***-1234',
					issueDate: '2020-01-15',
					expiryDate: '2030-01-15',
					holderName: 'John Doe',
					verified: true
				},
				checks: [
					{ name: 'Document Authenticity', passed: true },
					{ name: 'Photo Quality', passed: true },
					{ name: 'Data Extraction', passed: true },
					{ name: 'Fraud Detection', passed: true }
				]
			};

			// Store in localStorage
			const uploads = JSON.parse(localStorage.getItem('checkme_uploads') || '[]');
			uploads.push({
				filename: file.name,
				timestamp: new Date().toISOString(),
				result: uploadResult
			});
			localStorage.setItem('checkme_uploads', JSON.stringify(uploads));

		} catch (err) {
			error = 'Upload failed. Please try again.';
		} finally {
			uploading = false;
		}
	}

	function resetUpload() {
		files = null;
		uploadResult = null;
		uploadProgress = 0;
		error = '';
		if (fileInput) {
			fileInput.value = '';
		}
	}
</script>

<div class="document-upload">
	<h3>📄 Document Verification</h3>
	<p class="upload-description">
		Upload government IDs, passports, driver's licenses, or other identity documents for verification.
	</p>

	{#if !uploadResult}
		<div
			class="drop-zone"
			class:dragging={false}
			ondrop={handleDrop}
			ondragover={handleDragOver}
			role="button"
			tabindex="0"
			aria-label="Drop zone for document upload"
		>
			<div class="drop-zone-content">
				<div class="upload-icon">📤</div>
				<p class="drop-zone-text">
					Drag and drop your document here, or
					<label for="file-input" class="file-label">browse</label>
				</p>
				<input
					id="file-input"
					type="file"
					accept=".jpg,.jpeg,.png,.pdf,.webp"
					onchange={handleFileSelect}
					bind:this={fileInput}
					style="display: none;"
				/>
				<p class="file-types">Supported: JPG, PNG, PDF, WebP (Max 10MB)</p>
			</div>
		</div>

		{#if files && files.length > 0}
			<div class="selected-file">
				<div class="file-info">
					<span class="file-icon">📎</span>
					<span class="file-name">{files[0].name}</span>
					<span class="file-size">({(files[0].size / 1024 / 1024).toFixed(2)} MB)</span>
				</div>
				<button onclick={resetUpload} class="btn-remove">✕</button>
			</div>
		{/if}

		{#if error}
			<div class="alert alert-danger">{error}</div>
		{/if}

		{#if uploading}
			<div class="upload-progress">
				<div class="progress-bar">
					<div class="progress-fill" style="width: {uploadProgress}%"></div>
				</div>
				<p class="progress-text">Uploading and analyzing... {uploadProgress}%</p>
			</div>
		{/if}

		<button
			onclick={handleUpload}
			disabled={!files || uploading}
			class="btn btn-primary btn-upload"
		>
			{#if uploading}
				<span class="loading"></span>
				Verifying Document...
			{:else}
				🔍 Verify Document
			{/if}
		</button>
	{:else}
		<div class="verification-result">
			<div class="result-header">
				<div class="result-status {uploadResult.status}">
					<span class="status-icon">
						{#if uploadResult.status === 'verified'}
							✅
						{:else}
							❌
						{/if}
					</span>
					<span class="status-text">
						{uploadResult.status === 'verified' ? 'Document Verified' : 'Verification Failed'}
					</span>
				</div>
				<div class="confidence-score">
					Confidence: {uploadResult.confidence}%
				</div>
			</div>

			<div class="result-details">
				<h4>Document Details</h4>
				<div class="detail-grid">
					{#each Object.entries(uploadResult.details) as [key, value]}
						<div class="detail-item">
							<span class="detail-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
							<span class="detail-value">{value}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="verification-checks">
				<h4>Verification Checks</h4>
				<div class="checks-grid">
					{#each uploadResult.checks as check}
						<div class="check-item">
							<span class="check-icon">{check.passed ? '✅' : '❌'}</span>
							<span class="check-name">{check.name}</span>
						</div>
					{/each}
				</div>
			</div>

			<button onclick={resetUpload} class="btn btn-secondary">
				Upload Another Document
			</button>
		</div>
	{/if}
</div>

<style>
	.document-upload {
		margin-top: 2rem;
		padding: 2rem;
		background: #f8fafc;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
	}

	.document-upload h3 {
		margin: 0 0 0.5rem 0;
		color: #1e293b;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.upload-description {
		color: #64748b;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.drop-zone {
		border: 2px dashed #cbd5e1;
		border-radius: 0.75rem;
		padding: 3rem 2rem;
		text-align: center;
		background: white;
		transition: all 0.3s;
		cursor: pointer;
	}

	.drop-zone:hover {
		border-color: #3b82f6;
		background: #f8fafc;
	}

	.drop-zone.dragging {
		border-color: #3b82f6;
		background: #eff6ff;
	}

	.drop-zone-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.upload-icon {
		font-size: 3rem;
	}

	.drop-zone-text {
		color: #475569;
		font-size: 1.1rem;
		margin: 0;
	}

	.file-label {
		color: #3b82f6;
		text-decoration: underline;
		cursor: pointer;
		font-weight: 600;
	}

	.file-label:hover {
		color: #2563eb;
	}

	.file-types {
		color: #94a3b8;
		font-size: 0.875rem;
		margin: 0;
	}

	.selected-file {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: white;
		border-radius: 0.5rem;
		margin-top: 1rem;
		border: 1px solid #e2e8f0;
	}

	.file-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.file-icon {
		font-size: 1.5rem;
	}

	.file-name {
		font-weight: 600;
		color: #1e293b;
	}

	.file-size {
		color: #64748b;
		font-size: 0.875rem;
	}

	.btn-remove {
		background: none;
		border: none;
		color: #94a3b8;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		transition: color 0.3s;
	}

	.btn-remove:hover {
		color: #dc2626;
	}

	.upload-progress {
		margin-top: 1.5rem;
	}

	.progress-bar {
		width: 100%;
		height: 0.5rem;
		background: #e2e8f0;
		border-radius: 9999px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #3b82f6, #2563eb);
		transition: width 0.3s;
	}

	.progress-text {
		text-align: center;
		color: #64748b;
		margin-top: 0.5rem;
		font-size: 0.875rem;
	}

	.btn-upload {
		width: 100%;
		margin-top: 1.5rem;
	}

	.verification-result {
		background: white;
		padding: 2rem;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.result-status {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-weight: 700;
		font-size: 1.25rem;
	}

	.result-status.verified {
		color: #059669;
	}

	.status-icon {
		font-size: 1.5rem;
	}

	.confidence-score {
		background: #e2e8f0;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #475569;
	}

	.result-details h4,
	.verification-checks h4 {
		margin: 0 0 1rem 0;
		color: #1e293b;
		font-size: 1.125rem;
		font-weight: 600;
	}

	.detail-grid {
		display: grid;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem;
		background: #f8fafc;
		border-radius: 0.5rem;
	}

	.detail-key {
		font-weight: 500;
		color: #64748b;
	}

	.detail-value {
		color: #1e293b;
		font-weight: 600;
	}

	.checks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.check-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: #f8fafc;
		border-radius: 0.5rem;
	}

	.check-icon {
		font-size: 1.25rem;
	}

	.check-name {
		color: #475569;
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.document-upload {
			padding: 1.5rem;
		}

		.drop-zone {
			padding: 2rem 1rem;
		}

		.result-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.detail-item {
			flex-direction: column;
			gap: 0.25rem;
		}

		.checks-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

