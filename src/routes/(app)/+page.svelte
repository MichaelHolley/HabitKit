<script lang="ts">
	import GoalCardComponent from '$lib/components/Goal/GoalCardComponent.svelte';
	import LastXDays from '$lib/components/Habit/LastDaysOverviewComponent.svelte';
	import HabitOverviewItem from '$lib/components/Habit/OverviewItemComponent.svelte';
	import type { Goal } from '@prisma/client';
	import type { PageServerData } from './$types';

	const { data } = $props<{ data: PageServerData }>();
	const visibleGoals = $derived(data.goals.filter((g: Goal) => !g.complete));
</script>

<section class="my-6">
	<div class="flex flex-row items-center justify-between gap-4 xs:justify-start">
		<h2 class="text-3xl font-semibold">Habits</h2>
		<a href="/create" class="btn btn-outline btn-primary btn-sm">+ Track New</a>
	</div>

	{#if data.habits.length > 0}
		<div class="my-3 mt-2 max-w-lg">
			<LastXDays habits={data.habits} />
		</div>
	{/if}

	<div class="my-3">
		<div class="habit-overview-grid grid flex-wrap justify-start gap-3">
			{#each data.habits as habit}
				<HabitOverviewItem {habit} />
			{/each}
		</div>
	</div>
</section>

<section class="my-6 mt-8">
	<div class="flex flex-row items-center justify-between gap-4 xs:justify-start">
		<h2 class="text-3xl font-semibold">Goals</h2>
		<a href="/goal/create" class="btn btn-outline btn-primary btn-sm">+ Add</a>
	</div>

	<div class="goal-overview-grid my-3 mt-2 grid flex-wrap justify-start gap-3">
		{#each visibleGoals as goal}
			<GoalCardComponent {goal} />
		{/each}
	</div>
</section>

<style>
	.habit-overview-grid {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}

	.goal-overview-grid {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>
