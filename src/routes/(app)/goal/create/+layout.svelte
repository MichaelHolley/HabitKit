<script lang="ts">
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<NavigateBackButton class="mb-3" backUrl="/" />

{@render children()}
