<script lang="ts">
	import { enhance } from '$app/forms';
	import dayjs from 'dayjs';
	import HabitActivityHistory from './HistoryComponent.svelte';
	import CardComponent from '../CardComponent.svelte';

	const { habit } = $props();
</script>

<CardComponent class="p-4">
	<div class="flex flex-col gap-1">
		<div class="flex flex-row justify-between">
			<a href="/{habit.id}">
				<span class="link-hover link text-lg text-primary">{habit.title}</span></a
			>
			<form method="POST" action="{habit.id}?/addToday" use:enhance>
				<button
					class="btn btn-outline btn-secondary btn-xs"
					title="Add Today"
					disabled={habit.dates.includes(dayjs().format('YYYY-MM-DD'))}>+</button
				>
			</form>
		</div>
		<a href="/{habit.id}">
			<HabitActivityHistory dates={habit.dates} />
		</a>
	</div>
</CardComponent>
