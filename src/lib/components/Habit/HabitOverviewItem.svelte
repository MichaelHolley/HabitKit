<script lang="ts">
	import { enhance } from '$app/forms';
	import { Prisma } from '@prisma/client';
	import dayjs from 'dayjs';
	import HabitActivityHistory from './HabitActivityHistory.svelte';

	let { habit } = $props();
</script>

<div class="flex flex-col gap-1">
	<div class="flex flex-row justify-between">
		<a href="/{habit.id}">
			<span class="link-hover link text-lg decoration-accent">
				{habit.name} <span class="text-accent">&rsaquo;</span>
			</span></a
		>
		<form method="POST" action="{habit.id}?/addToday" use:enhance>
			<button
				class="btn btn-outline btn-accent btn-xs"
				title="Add Today"
				disabled={(habit.dates as Prisma.JsonArray).includes(dayjs().format('YYYY-MM-DD'))}
				>+</button
			>
		</form>
	</div>
	<a href="/{habit.id}" class="rounded-lg bg-base-200 p-4">
		<HabitActivityHistory dates={habit.dates} showWeeks={12} />
	</a>
</div>
