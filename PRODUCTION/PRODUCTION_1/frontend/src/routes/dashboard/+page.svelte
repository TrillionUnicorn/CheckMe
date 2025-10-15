<script lang="ts">
	// Mock data for demo
	let stats = {
		totalVerifications: 1247,
		thisMonth: 342,
		successRate: 98.5,
		avgResponseTime: 1.8
	};

	let recentVerifications = [
		{ id: '1', type: 'Email', value: 'user@example.com', status: 'Valid', riskScore: 95, date: '2024-10-14 10:30' },
		{ id: '2', type: 'Phone', value: '+1234567890', status: 'Valid', riskScore: 88, date: '2024-10-14 09:15' },
		{ id: '3', type: 'Identity', value: 'John Doe', status: 'Valid', riskScore: 92, date: '2024-10-14 08:45' },
		{ id: '4', type: 'Document', value: 'ABC123456', status: 'Invalid', riskScore: 45, date: '2024-10-13 16:20' },
		{ id: '5', type: 'Email', value: 'test@test.com', status: 'Valid', riskScore: 78, date: '2024-10-13 14:10' }
	];

	function getStatusColor(status: string) {
		return status === 'Valid' ? 'text-green-600' : 'text-red-600';
	}

	function getRiskColor(score: number) {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	}
</script>

<svelte:head>
	<title>Dashboard - CheckMe</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex justify-between items-center">
				<a href="/" class="text-2xl font-bold text-blue-600">CheckMe</a>
				<div class="flex items-center space-x-4">
					<a href="/verify" class="text-gray-600 hover:text-gray-900">New Verification</a>
					<a href="/settings" class="text-gray-600 hover:text-gray-900">Settings</a>
					<button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
						Logout
					</button>
				</div>
			</div>
		</nav>
	</header>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Page Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
			<p class="text-gray-600">Welcome back! Here's your verification overview.</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid md:grid-cols-4 gap-6 mb-8">
			<div class="bg-white p-6 rounded-lg shadow">
				<div class="text-sm text-gray-600 mb-2">Total Verifications</div>
				<div class="text-3xl font-bold text-gray-900">{stats.totalVerifications.toLocaleString()}</div>
				<div class="text-sm text-green-600 mt-2">↑ All time</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="text-sm text-gray-600 mb-2">This Month</div>
				<div class="text-3xl font-bold text-gray-900">{stats.thisMonth}</div>
				<div class="text-sm text-green-600 mt-2">↑ 12% from last month</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="text-sm text-gray-600 mb-2">Success Rate</div>
				<div class="text-3xl font-bold text-gray-900">{stats.successRate}%</div>
				<div class="text-sm text-green-600 mt-2">↑ 0.5% improvement</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="text-sm text-gray-600 mb-2">Avg Response Time</div>
				<div class="text-3xl font-bold text-gray-900">{stats.avgResponseTime}s</div>
				<div class="text-sm text-green-600 mt-2">↓ 0.2s faster</div>
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="bg-white rounded-lg shadow p-6 mb-8">
			<h2 class="text-xl font-bold mb-4">Quick Actions</h2>
			<div class="grid md:grid-cols-4 gap-4">
				<a href="/verify" class="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700">
					<span class="text-2xl mr-2">+</span>
					New Verification
				</a>
				<a href="/api-keys" class="flex items-center justify-center bg-gray-200 text-gray-900 px-6 py-4 rounded-lg hover:bg-gray-300">
					<span class="text-2xl mr-2">🔑</span>
					API Keys
				</a>
				<a href="/analytics" class="flex items-center justify-center bg-gray-200 text-gray-900 px-6 py-4 rounded-lg hover:bg-gray-300">
					<span class="text-2xl mr-2">📊</span>
					Analytics
				</a>
				<a href="/docs" class="flex items-center justify-center bg-gray-200 text-gray-900 px-6 py-4 rounded-lg hover:bg-gray-300">
					<span class="text-2xl mr-2">📚</span>
					Documentation
				</a>
			</div>
		</div>

		<!-- Recent Verifications -->
		<div class="bg-white rounded-lg shadow">
			<div class="p-6 border-b">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-bold">Recent Verifications</h2>
					<a href="/verifications" class="text-blue-600 hover:text-blue-700">View All →</a>
				</div>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Type
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Value
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Risk Score
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Date
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each recentVerifications as verification}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
										{verification.type}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{verification.value}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="text-sm font-medium {getStatusColor(verification.status)}">
										{verification.status}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="text-sm font-medium {getRiskColor(verification.riskScore)}">
										{verification.riskScore}/100
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{verification.date}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm">
									<button class="text-blue-600 hover:text-blue-700 mr-3">View</button>
									<button class="text-gray-600 hover:text-gray-700">Download</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Usage & Billing -->
		<div class="mt-8 grid md:grid-cols-2 gap-6">
			<div class="bg-white rounded-lg shadow p-6">
				<h3 class="text-lg font-bold mb-4">Monthly Usage</h3>
				<div class="space-y-4">
					<div>
						<div class="flex justify-between text-sm mb-2">
							<span class="text-gray-600">Verifications Used</span>
							<span class="font-medium">342 / 1,000</span>
						</div>
						<div class="w-full bg-gray-200 rounded-full h-2">
							<div class="bg-blue-600 h-2 rounded-full" style="width: 34.2%"></div>
						</div>
					</div>
					<div class="text-sm text-gray-600">
						658 verifications remaining this month
					</div>
					<a href="/upgrade" class="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
						Upgrade Plan
					</a>
				</div>
			</div>

			<div class="bg-white rounded-lg shadow p-6">
				<h3 class="text-lg font-bold mb-4">Current Plan</h3>
				<div class="space-y-4">
					<div>
						<div class="text-2xl font-bold text-gray-900">Free Plan</div>
						<div class="text-gray-600">1,000 verifications/month</div>
					</div>
					<ul class="space-y-2 text-sm">
						<li class="flex items-center text-gray-600">
							<span class="text-green-500 mr-2">✓</span>
							All core features
						</li>
						<li class="flex items-center text-gray-600">
							<span class="text-green-500 mr-2">✓</span>
							Community support
						</li>
						<li class="flex items-center text-gray-600">
							<span class="text-green-500 mr-2">✓</span>
							API access
						</li>
					</ul>
					<a href="/pricing" class="block text-center bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300">
						View All Plans
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

