<script>
	import '../app.css';
	let { children } = $props();
</script>

<main class="container mx-auto px-3">
	{@render children()}
</main>
