<script>
	import { enhance } from '$app/forms';
</script>

<div class="max-w-md">
	<h3 class="pb-4 text-3xl">Create Habit</h3>
	<form method="POST" action="?/createHabit" use:enhance class="flex flex-col items-end gap-3">
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Name</span>
			</div>
			<input name="name" class="input input-bordered" required />
		</label>
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Description (optional)</span>
			</div>
			<input name="description" class="input input-bordered" />
		</label>
		<button class="btn btn-primary w-fit">+ Create</button>
	</form>
</div>
