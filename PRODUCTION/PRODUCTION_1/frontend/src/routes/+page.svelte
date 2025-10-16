<script lang="ts">
	let email = $state('');
	let submitted = $state(false);

	function handleSubmit() {
		if (email) {
			submitted = true;
			// In real app, this would call API
			console.log('Submitted:', email);
		}
	}
</script>

<svelte:head>
	<title>CheckMe - Universal Identity Verification</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Header -->
	<header class="bg-white shadow-sm">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex justify-between items-center">
				<div class="text-2xl font-bold text-blue-600">CheckMe</div>
				<div class="space-x-4">
					<a href="/login" class="text-gray-600 hover:text-gray-900">Login</a>
					<a href="/signup" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
						Sign Up
					</a>
				</div>
			</div>
		</nav>
	</header>

	<!-- Hero Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center">
			<h1 class="text-5xl font-bold text-gray-900 mb-6">
				Universal Identity Verification
			</h1>
			<p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
				70-90% cheaper than competitors. Open source. Developer-first. 
				Verify identities in seconds with our AI-powered platform.
			</p>
			
			<div class="flex justify-center gap-4 mb-12">
				<a href="/verify" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
					Start Free Verification
				</a>
				<a href="/docs" class="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300">
					View Documentation
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
				<div>
					<div class="text-4xl font-bold text-blue-600">100K+</div>
					<div class="text-gray-600">Verifications</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-blue-600">99.2%</div>
					<div class="text-gray-600">Accuracy</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-blue-600">&lt;2s</div>
					<div class="text-gray-600">Avg Time</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="bg-white py-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-bold text-center mb-12">Why Choose CheckMe?</h2>
			
			<div class="grid md:grid-cols-3 gap-8">
				<div class="p-6 border rounded-lg">
					<div class="text-4xl mb-4">💰</div>
					<h3 class="text-xl font-bold mb-2">70-90% Cheaper</h3>
					<p class="text-gray-600">
						Starting at $0.10 per verification vs $1-10 from competitors
					</p>
				</div>

				<div class="p-6 border rounded-lg">
					<div class="text-4xl mb-4">🔓</div>
					<h3 class="text-xl font-bold mb-2">Open Source</h3>
					<p class="text-gray-600">
						MIT licensed. No vendor lock-in. Full transparency.
					</p>
				</div>

				<div class="p-6 border rounded-lg">
					<div class="text-4xl mb-4">⚡</div>
					<h3 class="text-xl font-bold mb-2">Developer First</h3>
					<p class="text-gray-600">
						10+ SDKs, excellent docs, integrate in minutes.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing -->
	<section class="py-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
			
			<div class="grid md:grid-cols-3 gap-8">
				<!-- Free -->
				<div class="border rounded-lg p-8">
					<h3 class="text-2xl font-bold mb-4">Free</h3>
					<div class="text-4xl font-bold mb-4">$0</div>
					<ul class="space-y-3 mb-8">
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							1,000 verifications/month
						</li>
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							All core features
						</li>
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							Community support
						</li>
					</ul>
					<a href="/signup" class="block text-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">
						Get Started
					</a>
				</div>

				<!-- Starter -->
				<div class="border-2 border-blue-600 rounded-lg p-8 relative">
					<div class="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm">
						Most Popular
					</div>
					<h3 class="text-2xl font-bold mb-4">Starter</h3>
					<div class="text-4xl font-bold mb-4">$49<span class="text-lg text-gray-600">/mo</span></div>
					<ul class="space-y-3 mb-8">
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							5,000 verifications/month
						</li>
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							$0.10 each additional
						</li>
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							Email support
						</li>
					</ul>
					<a href="/signup" class="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
						Get Started
					</a>
				</div>

				<!-- Professional -->
				<div class="border rounded-lg p-8">
					<h3 class="text-2xl font-bold mb-4">Professional</h3>
					<div class="text-4xl font-bold mb-4">$199<span class="text-lg text-gray-600">/mo</span></div>
					<ul class="space-y-3 mb-8">
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							20,000 verifications/month
						</li>
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							$0.08 each additional
						</li>
						<li class="flex items-center">
							<span class="text-green-500 mr-2">✓</span>
							Priority support
						</li>
					</ul>
					<a href="/signup" class="block text-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">
						Get Started
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Waitlist -->
	<section class="bg-blue-600 py-20">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold text-white mb-6">Join the Waitlist</h2>
			<p class="text-xl text-blue-100 mb-8">
				Be the first to know when we launch new features
			</p>
			
			{#if submitted}
				<div class="bg-white text-green-600 px-6 py-4 rounded-lg font-semibold">
					✓ Thanks! We'll be in touch soon.
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="flex gap-4 max-w-md mx-auto">
					<input
						type="email"
						bind:value={email}
						placeholder="Enter your email"
						required
						class="flex-1 px-4 py-3 rounded-lg"
					/>
					<button
						type="submit"
						class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
					>
						Join
					</button>
				</form>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 text-white py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid md:grid-cols-4 gap-8">
				<div>
					<div class="text-2xl font-bold mb-4">CheckMe</div>
					<p class="text-gray-400">
						Universal identity verification platform
					</p>
				</div>
				<div>
					<h4 class="font-bold mb-4">Product</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="/verify" class="hover:text-white">Verification</a></li>
						<li><a href="/pricing" class="hover:text-white">Pricing</a></li>
						<li><a href="/docs" class="hover:text-white">Documentation</a></li>
					</ul>
				</div>
				<div>
					<h4 class="font-bold mb-4">Company</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="/about" class="hover:text-white">About</a></li>
						<li><a href="/contact" class="hover:text-white">Contact</a></li>
						<li><a href="/blog" class="hover:text-white">Blog</a></li>
					</ul>
				</div>
				<div>
					<h4 class="font-bold mb-4">Legal</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="/privacy" class="hover:text-white">Privacy</a></li>
						<li><a href="/terms" class="hover:text-white">Terms</a></li>
					</ul>
				</div>
			</div>
			<div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
				© 2024 CheckMe. All rights reserved.
			</div>
		</div>
	</footer>
</div>

