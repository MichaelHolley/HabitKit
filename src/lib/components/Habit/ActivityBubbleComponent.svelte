<script>
	import { scale } from 'svelte/transition';

	let { title, active, delay = 0 } = $props();
</script>

<div
	class="h-3 w-3 rounded-sm bg-neutral"
	class:active
	in:scale={{ duration: active ? 200 : 0, delay }}
	{title}
></div>

<style>
	.active {
		@apply bg-base-content;
	}
</style>
