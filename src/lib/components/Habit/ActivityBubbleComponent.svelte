<script lang="ts">
	let { title, active, delay = 0 } = $props();
</script>

<div
	class="h-3 w-3 rounded-sm bg-neutral"
	class:active
	class:motion-preset-pop={active}
	{title}
	style="animation-delay: {delay}ms"
></div>

<style>
	.active {
		@apply bg-base-content;
	}
</style>
