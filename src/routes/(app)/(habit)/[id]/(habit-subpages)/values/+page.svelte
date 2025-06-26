<script lang="ts">
	import { enhance } from '$app/forms';
	import { defaultHandleDeleteSubmit } from '$lib/utils/form';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<h2 class="mb-3 text-3xl">{data.habit?.title}</h2>
<div class="max-w-lg overflow-x-auto">
	<table class="table-pin-rows table-xs table">
		{#each data.habit.dates as date, i}
			{#if i === 0 || !dayjs(date as string).isSame(dayjs(data.habit.dates[i - 1] as string), 'month')}
				<thead>
					<tr>
						<th colspan="2" class="text-base-content-300 pt-4">
							{dayjs(date as string).format('MMM YYYY')}
						</th>
					</tr>
				</thead>
			{/if}
			<tbody>
				<tr>
					<td class="pl-4">{dayjs(date as string).format('DD MMM YYYY (ddd)')}</td>
					<td>
						<form method="POST" action="?/delete" use:enhance={defaultHandleDeleteSubmit}>
							<input type="hidden" name="date" value={date} />
							<button class="btn btn-outline btn-error btn-xs">Delete</button>
						</form>
					</td>
				</tr>
			</tbody>
		{/each}
	</table>
</div>
