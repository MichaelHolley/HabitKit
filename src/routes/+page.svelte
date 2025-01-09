<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitActivityHistory from '$lib/components/HabitActivityHistory.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="mb-7 flex flex-row items-center justify-between">
	<p class="text-xl">Welcome back, <span class="text-primary">{data.user.username}</span>!</p>
	<div class="flex flex-row items-center gap-3">
		<p>Not you?</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="btn btn-link px-0">Sign out</button>
		</form>
	</div>
</div>

<div class="mb-3 flex flex-row items-center gap-6">
	<h1 class="text-3xl">Habits</h1>
	<a href="/create" class="btn btn-outline btn-primary btn-sm">+ Track New</a>
</div>

<div class="flex flex-row flex-wrap justify-start gap-6">
	{#each data.habits as habit}
		<a href="/{habit.id}" class="flex flex-col gap-1">
			<span class="link-hover link link-primary text-xl">{habit.name}</span>
			<div class="rounded-lg bg-base-200 p-4">
				<HabitActivityHistory dates={habit.dates} showWeeks={12} />
			</div>
		</a>
	{/each}
</div>
