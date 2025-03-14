<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<div class="max-w-md">
	<h3 class="pb-4 text-3xl">Update Habit</h3>
	<form method="POST" action="?/updateHabit" use:enhance class="flex flex-col items-end gap-3">
		<label class="input w-full">
			<span>Title</span>
			<input
				type="text"
				name="title"
				bind:value={data.habit.title}
				required
				placeholder="Enter title..."
			/>
		</label>
		<label class="input w-full">
			<span>Description</span>
			<input
				type="text"
				name="description"
				bind:value={data.habit.description}
				placeholder="Enter description..."
			/>
			<span class="badge badge-neutral badge-xs">Optional</span>
		</label>
		<button class="btn btn-primary w-fit">Update</button>
	</form>
</div>
