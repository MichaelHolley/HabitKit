<script>
	import { enhance } from '$app/forms';
</script>

<div class="max-w-lg">
	<h3 class="pb-4 text-3xl">Create Habit</h3>
	<form method="post" action="?/createHabit" use:enhance class="flex flex-col gap-3">
		<label class="flex flex-col gap-1 text-sm">
			Name
			<input name="name" class="input input-bordered" />
		</label>

		<button class="btn btn-primary">Create</button>
	</form>
</div>
