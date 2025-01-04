<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="mb-7 flex flex-row items-center justify-between">
	<p class="text-xl">Hi, {data.user.username}!</p>
	<div class="flex flex-row items-center gap-3">
		<p>Not you?</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="btn btn-link px-0">Sign out</button>
		</form>
	</div>
</div>

<div class="mb-3 flex flex-row items-center justify-between">
	<h1 class="text-3xl">Your Habits</h1>
	<a href="/create" class="btn btn-primary">Create Habit</a>
</div>

<div class="flex flex-col items-start justify-start gap-3">
	{#each data.habits as habit}
		<!-- <a href="/{habit.id}" class="btn btn-link btn-primary">{habit.name}</a> -->
	{/each}
</div>
