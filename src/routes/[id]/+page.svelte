<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitActivityHistory from '$lib/components/HabitActivityHistory.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2 class="mb-3 text-3xl">{data.habit?.name}</h2>
<div class="grid gap-x-3 text-start text-xs">
	<p class="text-neutral-400">Created:</p>
	<p class="text-neutral-400">{data.habit?.createdAt.toLocaleString()}</p>
	<p class="text-neutral-400">Updated:</p>
	<p class="text-neutral-400">{data.habit?.updatedAt.toLocaleString()}</p>
</div>

<div class="col-span-2 my-3 flex flex-row">
	<form method="post" action="?/delete" use:enhance>
		<button class="btn btn-error btn-xs">Delete</button>
	</form>
</div>

<div class="my-6 flex flex-row flex-wrap items-end gap-8">
	<div class="flex overflow-x-scroll pb-4">
		<HabitActivityHistory dates={data.habit?.dates} showWeeks={52} />
	</div>

	<form method="post" action="?/addDate" use:enhance class="flex max-w-xs grow flex-col gap-3">
		<label class="flex flex-col gap-1 text-sm">
			Date
			<input name="date" type="date" class="input input-bordered" required />
		</label>

		<button class="btn btn-primary">+ Add Date</button>
	</form>
</div>

<style>
	.grid {
		grid-template-columns: auto 1fr;
	}
</style>
