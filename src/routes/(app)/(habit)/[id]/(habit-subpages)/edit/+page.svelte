<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<div class="max-w-md">
	<h3 class="pb-4 text-3xl">Update Habit</h3>
	<form method="POST" action="?/updateHabit" use:enhance class="flex flex-col items-end gap-3">
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend">Title</legend>
			<input
				type="text"
				class="input w-full"
				name="title"
				bind:value={data.habit.title}
				required
				placeholder="Enter title..."
			/>
		</fieldset>
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend">Description</legend>
			<input
				type="text"
				class="input w-full"
				name="description"
				bind:value={data.habit.description}
				placeholder="Enter description..."
			/>
			<p class="fieldset-label">Optional</p>
		</fieldset>
		<button class="btn btn-primary w-fit">Update</button>
	</form>
</div>
