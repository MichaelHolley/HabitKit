<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitActivityHistory from '$lib/components/HabitActivityHistory.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h2 class="text-3xl">{data.habit?.name}</h2>
	<p class="text-sm text-neutral-400">Created: {data.habit?.createdAt.toLocaleString()}</p>
	<p class="text-sm text-neutral-400">Updated: {data.habit?.updatedAt.toLocaleString()}</p>
</div>

<div class="my-6">
	<HabitActivityHistory dates={data.habit?.dates} />
</div>

<form method="post" action="?/addDate" use:enhance class="flex max-w-lg flex-col gap-3">
	<label class="flex flex-col gap-1 text-sm">
		Date
		<input name="date" type="date" class="input input-bordered" required />
	</label>

	<button class="btn btn-primary">+ Add Date</button>
</form>
