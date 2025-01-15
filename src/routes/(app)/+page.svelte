<script lang="ts">
	import HabitOverviewItem from '$lib/components/Habit/HabitOverviewItem.svelte';
	import LastXDays from '$lib/components/Habit/HabitSummaryComponent.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<section class="my-6">
	<div class="xs:justify-start flex flex-row items-center justify-between gap-4">
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
		<div class="flex flex-row flex-wrap justify-start gap-6">
			{#each data.habits as habit}
				<HabitOverviewItem {habit} />
			{/each}
		</div>
	</div>
</section>
