<script lang="ts">
	import { scale } from 'svelte/transition';

	const { title, active, delay = 0 } = $props<{ title: string; active: boolean; delay?: number }>();
</script>

<div
	class="h-3 w-3 rounded-xs {active ? 'bg-base-content' : 'bg-neutral'}"
	in:scale={{ duration: active ? 200 : 0, delay }}
	{title}
></div>
