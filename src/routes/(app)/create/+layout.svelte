<script>
	import NavigateBackButton from '$lib/components/NavigateBackButton.svelte';
	let { children } = $props();
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/" />
</div>

{@render children()}
