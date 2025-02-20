<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class="card rounded-md border border-base-300 bg-base-200 {className}">
	{@render children()}
</div>

<style>
	.card {
		box-shadow:
			rgba(0, 0, 0, 0.16) 0px 3px 6px,
			rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}
</style>
