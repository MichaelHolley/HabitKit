<script>
	import { page } from '$app/state';
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	let { children } = $props();
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/{page.data.habit.id}" />
</div>

{@render children()}
