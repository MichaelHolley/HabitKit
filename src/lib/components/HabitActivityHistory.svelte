<script>
	import { onMount } from 'svelte';

	let { dates } = $props();
	let weeks = $state([]);

	const activeDateSet = $derived(new Set(dates));

	let today = new Date();
	let startDate = new Date(today);
	startDate.setDate(today.getDate() - today.getDay() + 1); // Set to the first day of the current week (Monday)
	startDate.setDate(startDate.getDate() - 364); // Adjust to start from the past 51 weeks

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

<div class="flex">
	{#each weeks as week (week[0].toISOString())}
		<div class="mr-[1px] flex flex-col">
			{#each week as day (day.toISOString())}
				<div
					class="m-[1px] h-3 w-3 rounded-sm bg-neutral"
					class:active={activeDateSet.has(formatDate(day))}
					title={formatDate(day)}
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
