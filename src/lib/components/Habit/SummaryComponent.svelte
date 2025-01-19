<script lang="ts">
	import dayjs from 'dayjs';
	const { summary } = $props();
</script>

<div class="stats stats-vertical rounded-lg bg-base-200 p-4 xs:stats-horizontal">
	<div class="stat place-items-center">
		<div class="stat-title">Longest Streak</div>
		<div class="stat-value">{summary.longestStreak.length}</div>
		{#if summary.longestStreak.length > 0}
			<div class="stat-desc">
				Starting from {dayjs(summary.longestStreak[0]).format('DD MMM YYYY')}
			</div>
		{/if}
	</div>
	<div class="stat place-items-center">
		<div class="stat-title">Current Streak</div>
		<div class="stat-value">{summary.currentStreak.length}</div>
		{#if summary.currentStreak.length > 0}
			<div class="stat-desc">
				Starting from {dayjs(summary.currentStreak[0]).format('DD MMM YYYY')}
			</div>
		{/if}
	</div>
	<div class="stat place-items-center">
		<div class="stat-title">Completion Rate</div>
		<div class="stat-value">{Math.floor(summary.completionRate * 100)}%</div>
		<div class="stat-desc">Active days since first date</div>
	</div>
</div>
