<script>
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	let { children } = $props();
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/" />
</div>

{@render children()}
