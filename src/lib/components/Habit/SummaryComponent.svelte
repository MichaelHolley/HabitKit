<script lang="ts">
	import dayjs from 'dayjs';
	const { summary } = $props();
</script>

<div class="flex flex-row flex-wrap items-center justify-center gap-4 rounded-lg bg-base-200 p-4">
	<div>
		<div class="stat place-items-center">
			<div class="stat-title">Longest Streak</div>
			<div class="stat-value">{summary.longest.length}</div>
			{#if summary.longest.length > 0}
				<div class="stat-desc">
					Starting from {dayjs(summary.longest[0]).format('DD MMM YYYY')}
				</div>
			{/if}
		</div>
	</div>
	<div>
		<div class="stat place-items-center">
			<div class="stat-title">Current Streak</div>
			<div class="stat-value">{summary.current.length}</div>
			{#if summary.current.length > 0}
				<div class="stat-desc">
					Starting from {dayjs(summary.current[0]).format('DD MMM YYYY')}
				</div>
			{/if}
		</div>
	</div>
	<div>
		<div class="stat place-items-center">
			<div class="stat-title">Completion Rate</div>
			<div class="stat-value">{Math.floor(summary.completionRate * 100)}%</div>
			<div class="stat-desc">Active days since first date</div>
		</div>
	</div>
</div>
