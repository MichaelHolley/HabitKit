<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="container mx-auto px-3 py-8">
	{@render children()}
</main>
