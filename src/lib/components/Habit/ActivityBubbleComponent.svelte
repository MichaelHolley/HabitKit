<script lang="ts">
	let { title, active } = $props();
</script>

<div
	class="h-3 w-3 rounded-sm bg-neutral"
	class:active
	class:motion-preset-pop={active}
	{title}
></div>

<style>
	.active {
		@apply bg-base-content;
	}
</style>
