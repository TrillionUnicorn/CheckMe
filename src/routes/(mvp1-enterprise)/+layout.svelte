<script lang="ts">
	import '../../app.css';
</script>

<div class="mvp1-enterprise">
	<slot />
</div>

<style>
	.mvp1-enterprise {
		--primary-color: #1e3a8a;
		--secondary-color: #d97706;
		--accent-color: #ffffff;
		--text-color: #1e293b;
		--bg-color: #f8fafc;
	}

	:global(.mvp1-enterprise) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}
</style>

