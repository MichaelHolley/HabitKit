<script lang="ts">
	import dayjs from 'dayjs';
	import CardComponent from '../CardComponent.svelte';
	import LineChartComponent from '../Charts/LineChartComponent.svelte';
	import StatComponent from '../StatComponent.svelte';

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
			<StatComponent
				title="Longest Streak"
				value={summary.longest.length}
				hideDesc={summary.longest.length <= 0}
				description="Starting {dayjs(summary.longest[0]).format('DD MMM YYYY')}"
			/>
		</div>
		<div>
			<StatComponent
				title="Current Streak"
				value={summary.current.length}
				description="Starting {dayjs(summary.current[0]).format('DD MMM YYYY')}"
				hideDesc={summary.current.length <= 0}
			/>
		</div>
		<div>
			<StatComponent
				title="Completion Rate"
				value={Math.floor(summary.completionRate * 100)}
				description="Active days since starting"
			/>
		</div>
		<div>
			<StatComponent
				title="Most Active"
				value={summary.mostActive?.day}
				description="with {summary.mostActive?.count} days"
			/>
		</div>
		<div class="-mb-6 flex max-w-xs flex-col justify-center">
			<LineChartComponent
				series={[
					{
						data: [...summary.completionRateByMonths.map((r) => Math.ceil(r.count * 100))],
						name: 'Completion Rate',
						type: 'line'
					}
				]}
				xaxis={{ categories: summary.completionRateByMonths.map((r) => r.week) }}
				yaxis={{ title: { text: 'Completion Rate in %' } }}
			/>
		</div>
	</div>
</CardComponent>
