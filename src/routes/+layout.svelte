<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<header>
		<nav class="navbar">
			<div class="nav-brand">
				<a href="/" class="brand-link">
					<span class="brand-icon">🔍</span>
					<span class="brand-text">CheckMe</span>
				</a>
			</div>
			<div class="nav-links">
				<a href="/" class="nav-link">Dashboard</a>
				<a href="/verify" class="nav-link">Verify</a>
				<a href="/reports" class="nav-link">Reports</a>
				<a href="/api" class="nav-link">API</a>
			</div>
		</nav>
	</header>

	<main class="main-content">
		{@render children?.()}
	</main>

	<footer class="footer">
		<div class="footer-content">
			<p>&copy; 2024 CheckMe - Open Source Verification Platform</p>
			<div class="footer-links">
				<a href="/about">About</a>
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
				<a href="https://github.com/TrillionUnicorn/CheckMe" target="_blank">GitHub</a>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background-color: #f8fafc;
		color: #1e293b;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.navbar {
		background: white;
		border-bottom: 1px solid #e2e8f0;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.nav-brand .brand-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #1e293b;
		font-weight: 700;
		font-size: 1.5rem;
	}

	.brand-icon {
		margin-right: 0.5rem;
		font-size: 1.8rem;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-link {
		text-decoration: none;
		color: #64748b;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: all 0.2s;
	}

	.nav-link:hover {
		color: #3b82f6;
		background-color: #f1f5f9;
	}

	.main-content {
		flex: 1;
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	.footer {
		background: white;
		border-top: 1px solid #e2e8f0;
		padding: 2rem;
		margin-top: auto;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #64748b;
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
	}

	.footer-links a {
		color: #64748b;
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: #3b82f6;
	}

	@media (max-width: 768px) {
		.navbar {
			padding: 1rem;
			flex-direction: column;
			gap: 1rem;
		}

		.nav-links {
			gap: 1rem;
		}

		.main-content {
			padding: 1rem;
		}

		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}
</style>
