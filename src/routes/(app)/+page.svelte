<script lang="ts">
	import HabitOverviewItem from '$lib/components/Habit/HabitOverviewItemComponent.svelte';
	import LastXDays from '$lib/components/Habit/HabitSummaryComponent.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<section class="my-6">
	<div class="flex flex-row items-center justify-between gap-4 xs:justify-start">
		<h2 class="text-3xl">Habits</h2>
		<a href="/create" class="btn btn-outline btn-primary btn-sm">+ Track New</a>
	</div>

	{#if data.summary.length > 0}
		<div class="my-6">
			<h3 class="mb-2 text-xl">Last 30 Days</h3>
			<LastXDays summary={data.summary} />
		</div>
	{/if}

	<div class="my-6">
		<div class="habit-overview-grid grid flex-wrap justify-start gap-3">
			{#each data.habits as habit}
				<HabitOverviewItem {habit} />
			{/each}
		</div>
	</div>
</section>

<style>
	.habit-overview-grid {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>
