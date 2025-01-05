<script>
	import { onMount } from 'svelte';

	let { dates, showWeeks } = $props();
	const activeDateSet = $derived(new Set(dates));

	let weeks = $state([]);

	let today = new Date();
	let startDate = new Date(today);
	startDate.setDate(today.getDate() - today.getDay() + 1); // Set to the first day of the current week (Monday)
	startDate.setDate(startDate.getDate() - 7 * showWeeks); // Adjust to start from the past 51 weeks

	let endDate = new Date(today);
	endDate.setDate(endDate.getDate() + (7 - endDate.getDay())); // Ensure endDate is a Sunday

	onMount(() => {
		let current = new Date(startDate);

		while (current <= endDate) {
			let week = [];
			// Loop Monday to Sunday
			for (let i = 0; i < 7; i++) {
				week.push(new Date(current));
				current.setDate(current.getDate() + 1);
			}
			weeks.push(week);
		}
	});

	// Function to format dates as 'YYYY-MM-DD'
	const formatDate = (date) => date.toISOString().split('T')[0];
</script>

<div class="flex flex-col">
	{#each { length: 7 } as _, i}
		<div class="flex flex-row items-center gap-1 text-xs">
			{#if i === 0}
				<div class="min-w-8">Mon</div>
			{:else if i == 2}
				<div class="min-w-8">Wed</div>
			{:else if i == 4}
				<div class="min-w-8">Fri</div>
			{:else if i == 6}
				<div class="min-w-8">Sun</div>
			{:else}
				<div class="min-w-8"></div>
			{/if}
			{#each weeks as week}
				<div
					class="h-3 w-3 rounded-sm bg-neutral"
					class:active={activeDateSet.has(formatDate(week[i]))}
					title={formatDate(week[i])}
				></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.active {
		@apply bg-primary;
	}
</style>
