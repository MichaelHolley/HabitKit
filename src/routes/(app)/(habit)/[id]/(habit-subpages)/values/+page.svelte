<script lang="ts">
	import { enhance } from '$app/forms';
	import { defaultHandleDeleteSubmit } from '$lib/utils/form';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	let currentMonth = $state<dayjs.Dayjs>(dayjs().startOf('month'));

	const displayedDates = $derived.by<dayjs.Dayjs[]>(() => {
		return data.habit.dates
			.map((date: string) => dayjs(date))
			.filter((date: dayjs.Dayjs) => date.isSame(currentMonth, 'month'))
			.sort((a: dayjs.Dayjs, b: dayjs.Dayjs) => b.diff(a));
	});

	const previousMonth = () => {
		currentMonth = currentMonth.subtract(1, 'month');
	};

	const nextMonth = () => {
		currentMonth = currentMonth.add(1, 'month');
	};
</script>

<h2 class="mb-3 text-3xl">{data.habit?.title}</h2>
<div class="my-4 max-w-lg overflow-x-auto">
	<div class="flex flex-row justify-between">
		<button class="btn btn-soft btn-accent btn-xs" onclick={previousMonth}>Previos</button>
		<p>{currentMonth.format('MMMM YYYY')}</p>
		<button class="btn btn-soft btn-accent btn-xs" onclick={nextMonth}>Next</button>
	</div>

	<table class="table-xs mt-6 table table-auto">
		<thead>
			<tr>
				<th></th>
				<th>Date</th>
				<th>Weekday</th>
				<th></th>
			</tr>
		</thead>
		{#each displayedDates as date, i}
			<tbody>
				<tr>
					<td class="text-base-content/25">{i + 1}</td>
					<td>{date.format('DD MMM YYYY')}</td>
					<td>{date.format('dddd')}</td>
					<td>
						<form method="POST" action="?/delete" use:enhance={defaultHandleDeleteSubmit}>
							<input type="hidden" name="date" value={date.format('YYYY-MM-DD')} />
							<button class="btn btn-soft btn-error btn-xs">Delete</button>
						</form>
					</td>
				</tr>
			</tbody>
		{/each}
	</table>
</div>
