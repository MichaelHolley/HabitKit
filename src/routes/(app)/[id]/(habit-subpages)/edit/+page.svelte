<script>
	import { enhance } from '$app/forms';

	const { data } = $props();
</script>

<div class="max-w-md">
	<h3 class="pb-4 text-3xl">Update Habit</h3>
	<form method="POST" action="?/updateHabit" use:enhance class="flex flex-col items-end gap-3">
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Title</span>
			</div>
			<input
				name="title"
				class="input input-bordered"
				placeholder="Enter title..."
				required
				value={data.habit.title}
			/>
		</label>
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Description (optional)</span>
			</div>
			<input
				name="description"
				class="input input-bordered"
				placeholder="Enter description..."
				maxlength="255"
				value={data.habit.description}
			/>
		</label>
		<button class="btn btn-primary w-fit">Update</button>
	</form>
</div>
