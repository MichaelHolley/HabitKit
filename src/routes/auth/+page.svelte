<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	const { form } = $props<{ form: ActionData }>();
</script>

<div class="flex h-screen flex-col items-center justify-center gap-8">
	<div class="text-center">
		<h1 class="pb-2 text-2xl text-primary">Welcome to HabitKit</h1>
		<p>Keep track of your habits and goals</p>
	</div>
	<form method="POST" action="?/login" use:enhance class="flex flex-col gap-3">
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Username</span>
			</div>
			<input name="username" placeholder="Username" class="input input-bordered" required />
		</label>
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				type="password"
				placeholder="Password"
				name="password"
				class="input input-bordered"
				required
			/>
		</label>
		<button class="btn btn-primary">Login</button>
		<button class="btn btn-outline btn-primary" formaction="?/register">Register</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
