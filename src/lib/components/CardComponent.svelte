<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class="border-base-300 bg-base-200 rounded-box border {className} shadow-md">
	{@render children()}
</div>
