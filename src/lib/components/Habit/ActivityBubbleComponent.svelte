<script lang="ts">
	import { scale } from 'svelte/transition';

	const { title, active, delay = 0 } = $props<{ title: string; active: boolean; delay?: number }>();
</script>

<div
	class="size-3 rounded-xs {active ? 'bg-base-content/60 dark:bg-base-content' : 'bg-base-300'}"
	in:scale={{ duration: 100, delay }}
	{title}
></div>
