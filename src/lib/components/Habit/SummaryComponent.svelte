<script lang="ts">
	import dayjs from 'dayjs';
	import CardComponent from '../CardComponent.svelte';
	import LineChartComponent from '../Charts/LineChartComponent.svelte';
    
	const { summary } = $props<{
		summary: {
			longest: string[];
			current: string[];
			completionRate: number;
			mostActive: { day: string; count: number } | undefined;
			completionRateByWeek: { week: string; count: number }[];
		};
	}>();
</script>

<CardComponent class="p-4">
	<div class="flex flex-row flex-wrap items-center justify-center gap-4">
		<div>
			<div class="stat place-items-center">
				<div class="stat-title">Longest Streak</div>
				<div class="stat-value">{summary.longest.length}</div>
				{#if summary.longest.length > 0}
					<div class="stat-desc">
						Starting {dayjs(summary.longest[0]).format('DD MMM YYYY')}
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
						Starting {dayjs(summary.current[0]).format('DD MMM YYYY')}
					</div>
				{/if}
			</div>
		</div>
		<div>
			<div class="stat place-items-center">
				<div class="stat-title">Completion Rate</div>
				<div class="stat-value">{Math.floor(summary.completionRate * 100)}%</div>
				<div class="stat-desc">Active days since starting</div>
			</div>
		</div>
		<div>
			<div class="stat place-items-center">
				<div class="stat-title">Most Active</div>
				<div class="stat-value">{summary.mostActive?.day}</div>
				<div class="stat-desc">with {summary.mostActive?.count} days</div>
			</div>
		</div>
	</div>
	<div>
		<LineChartComponent
			series={[
				{
					data: [...summary.completionRateByWeeks.map((r) => Math.ceil(r.count * 100))],
					name: 'Completion Rate',
					type: 'line'
				}
			]}
			xaxis={{ categories: summary.completionRateByWeeks.map((r) => r.week) }}
			yaxis={{ title: { text: 'Completion Rate in %' } }}
		/>
	</div>
</CardComponent>
