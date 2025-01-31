<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="rounded-md border border-base-300 bg-base-200">
	{@render children()}
</div>
