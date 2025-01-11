<script lang="ts">
	import { enhance } from '$app/forms';
	import NavigateBackButton from '$lib/components/NavigateBackButton.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/{data.habit.id}" />
</div>

<h2 class="mb-3 text-3xl">{data.habit?.name}</h2>
<div class="max-w-lg overflow-x-auto">
	<table class="table table-xs">
		<thead>
			<tr>
				<th>Date</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each data.habit.dates as date}
				<tr>
					<td>{date}</td>
					<td>
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="date" value={date} />
							<button class="btn btn-outline btn-error btn-xs">Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
