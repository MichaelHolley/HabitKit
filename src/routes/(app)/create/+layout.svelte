<script lang="ts">
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/" />
</div>

{@render children()}
