<script>
	import '../../app.css';

	let { children } = $props();
</script>

<div class="container mx-auto px-3 py-8">
	{@render children()}
</div>
