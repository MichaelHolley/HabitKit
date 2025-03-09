<script lang="ts">
	import { page } from '$app/state';
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/{page.data.habit.id}" />
</div>

{@render children()}
