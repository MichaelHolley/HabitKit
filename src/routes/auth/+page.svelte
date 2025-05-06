<script lang="ts">
	import { enhance } from '$app/forms';
	import ThemeSwitchComponent from '$lib/components/ThemeSwitchComponent.svelte';
	import { toasts } from '$lib/stores/toast';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	const { form } = $props<{ form: ActionData }>();

	export const handleLogin: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success' || result.type === 'redirect') {
				toasts.show('Welcome!', 'success');
			} else if (result.type === 'error' || result.type === 'failure') {
				toasts.show('Submission failed!', 'error');
			}

			await update();
		};
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-8">
	<div class="text-center">
		<h1 class="text-secondary pb-2 text-2xl">Welcome to Ascent</h1>
		<p>Keep track of your habits and goals</p>
	</div>
	<form method="POST" action="?/login" use:enhance={handleLogin} class="flex flex-col gap-3">
		<input name="username" placeholder="Username" class="input input-bordered" required />
		<input
			type="password"
			placeholder="Password"
			name="password"
			class="input input-bordered"
			required
		/>
		<button class="btn btn-primary">Login</button>
		<button class="btn btn-outline btn-secondary" formaction="?/register">Register</button>
	</form>
	{#if form?.message}
		<p class="text-error">{form.message}</p>
	{/if}
</div>

<div class="absolute top-3 right-3"><ThemeSwitchComponent /></div>
