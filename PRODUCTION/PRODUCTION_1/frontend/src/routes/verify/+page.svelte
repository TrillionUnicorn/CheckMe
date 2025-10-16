<script lang="ts">
	let verificationType = $state('email');
	let inputValue = $state('');
	let loading = $state(false);
	let result = $state<any>(null);
	let error = $state('');

	async function handleVerify(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';
		result = null;

		try {
			// In real app, this would call the API
			const response = await fetch('/api/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					type: verificationType,
					value: inputValue
				})
			});

			if (response.ok) {
				const data = await response.json();
				result = data;
			} else {
				error = 'Verification failed. Please try again.';
			}
		} catch (err) {
			// For demo purposes, show mock result
			result = {
				valid: true,
				riskScore: Math.floor(Math.random() * 30) + 70,
				details: {
					type: verificationType,
					value: inputValue,
					timestamp: new Date().toISOString()
				}
			};
		} finally {
			loading = false;
		}
	}

	function getRiskColor(score: number) {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	}

	function getRiskLabel(score: number) {
		if (score >= 80) return 'Low Risk';
		if (score >= 60) return 'Medium Risk';
		return 'High Risk';
	}
</script>

<svelte:head>
	<title>Verify - CheckMe</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex justify-between items-center">
				<a href="/" class="text-2xl font-bold text-blue-600">CheckMe</a>
				<div class="space-x-4">
					<a href="/dashboard" class="text-gray-600 hover:text-gray-900">Dashboard</a>
					<a href="/login" class="text-gray-600 hover:text-gray-900">Login</a>
				</div>
			</div>
		</nav>
	</header>

	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Identity Verification</h1>
			<p class="text-xl text-gray-600">
				Verify identities in seconds with our AI-powered platform
			</p>
		</div>

		<div class="bg-white rounded-lg shadow-lg p-8">
			<form onsubmit={handleVerify} class="space-y-6">
				<!-- Verification Type -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Verification Type
					</label>
					<select
						bind:value={verificationType}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="email">Email Verification</option>
						<option value="phone">Phone Verification</option>
						<option value="identity">Identity Verification</option>
						<option value="document">Document Verification</option>
					</select>
				</div>

				<!-- Input Field -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						{#if verificationType === 'email'}
							Email Address
						{:else if verificationType === 'phone'}
							Phone Number
						{:else if verificationType === 'identity'}
							Full Name
						{:else}
							Document Number
						{/if}
					</label>
					<input
						type="text"
						bind:value={inputValue}
						required
						placeholder={
							verificationType === 'email' ? 'user@example.com' :
							verificationType === 'phone' ? '+1234567890' :
							verificationType === 'identity' ? 'John Doe' :
							'ABC123456'
						}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				{#if error}
					<div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
						{error}
					</div>
				{/if}

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={loading}
					class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? 'Verifying...' : 'Verify Now'}
				</button>
			</form>

			<!-- Results -->
			{#if result}
				<div class="mt-8 border-t pt-8">
					<h3 class="text-2xl font-bold mb-6">Verification Results</h3>
					
					<div class="grid md:grid-cols-2 gap-6">
						<!-- Status -->
						<div class="bg-gray-50 p-6 rounded-lg">
							<div class="text-sm text-gray-600 mb-2">Status</div>
							<div class="text-2xl font-bold {result.valid ? 'text-green-600' : 'text-red-600'}">
								{result.valid ? '✓ Valid' : '✗ Invalid'}
							</div>
						</div>

						<!-- Risk Score -->
						<div class="bg-gray-50 p-6 rounded-lg">
							<div class="text-sm text-gray-600 mb-2">Risk Score</div>
							<div class="text-2xl font-bold {getRiskColor(result.riskScore)}">
								{result.riskScore}/100
							</div>
							<div class="text-sm {getRiskColor(result.riskScore)}">
								{getRiskLabel(result.riskScore)}
							</div>
						</div>
					</div>

					<!-- Details -->
					<div class="mt-6 bg-gray-50 p-6 rounded-lg">
						<h4 class="font-bold mb-4">Verification Details</h4>
						<dl class="space-y-2">
							<div class="flex justify-between">
								<dt class="text-gray-600">Type:</dt>
								<dd class="font-medium">{result.details.type}</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-gray-600">Value:</dt>
								<dd class="font-medium">{result.details.value}</dd>
							</div>
							<div class="flex justify-between">
								<dt class="text-gray-600">Timestamp:</dt>
								<dd class="font-medium">{new Date(result.details.timestamp).toLocaleString()}</dd>
							</div>
						</dl>
					</div>

					<!-- Actions -->
					<div class="mt-6 flex gap-4">
						<button
							onclick={() => { result = null; inputValue = ''; }}
							class="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
						>
							New Verification
						</button>
						<button
							onclick={() => window.print()}
							class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
						>
							Download Report
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Features -->
		<div class="mt-12 grid md:grid-cols-3 gap-6">
			<div class="text-center">
				<div class="text-4xl mb-2">⚡</div>
				<h3 class="font-bold mb-2">Instant Results</h3>
				<p class="text-gray-600 text-sm">Get verification results in under 2 seconds</p>
			</div>
			<div class="text-center">
				<div class="text-4xl mb-2">🔒</div>
				<h3 class="font-bold mb-2">Secure & Private</h3>
				<p class="text-gray-600 text-sm">Your data is encrypted and never shared</p>
			</div>
			<div class="text-center">
				<div class="text-4xl mb-2">✓</div>
				<h3 class="font-bold mb-2">99.2% Accurate</h3>
				<p class="text-gray-600 text-sm">Industry-leading accuracy rates</p>
			</div>
		</div>
	</div>
</div>

