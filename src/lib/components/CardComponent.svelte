<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class="rounded-md border border-base-300 bg-base-200 {className}">
	{@render children()}
</div>
