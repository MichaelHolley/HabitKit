<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import CardComponent from '../CardComponent.svelte';
	import { ICON_MAP } from '../icons';
	import HabitActivityHistory from './HistoryComponent.svelte';

	const { habit } = $props();
</script>

<CardComponent class="group flex flex-col p-4">
	<div class="flex flex-row justify-between">
		<a href="/{habit.id}">
			<span class="link-hover link group-hover:text-primary text-lg">{habit.title}</span>
		</a>
		<form method="POST" action="/{habit.id}?/addToday" use:enhance>
			<button
				class="btn btn-outline btn-secondary btn-xs px-0.5"
				title="Add Today"
				disabled={habit.dates.includes(dayjs().format('YYYY-MM-DD'))}
			>
				<Icon icon={ICON_MAP.plus} class="text-lg" />
			</button>
		</form>
	</div>
	<a href="/{habit.id}">
		<p class="mb-1 line-clamp-2 text-xs text-neutral-400">{habit.description}</p>
		<HabitActivityHistory dates={habit.dates} />
	</a>
</CardComponent>
