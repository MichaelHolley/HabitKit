<script lang="ts">
	import dayjs from 'dayjs';
	const { longest, current }: { longest: string[]; current: string[] } = $props();
</script>

<div class="stats stats-vertical rounded-lg bg-base-200 p-4 xs:stats-horizontal">
	<div class="stat place-items-center">
		<div class="stat-title">Longest Streak</div>
		<div class="stat-value">{longest.length}</div>
		{#if longest.length > 0}
			<div class="stat-desc">
				Starting from {dayjs(longest[0]).format('DD MMM YYYY')}
			</div>
		{/if}
	</div>
	<div class="stat place-items-center">
		<div class="stat-title">Current Streak</div>
		<div class="stat-value">{current.length}</div>
		{#if current.length > 0}
			<div class="stat-desc">
				Starting from {dayjs(current[0]).format('DD MMM YYYY')}
			</div>
		{/if}
	</div>
</div>
