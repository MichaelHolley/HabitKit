<script>
	import { onMount } from 'svelte';

	let { dates } = $props();
	let weeks = $state([]);

	const activeDateSet = $derived(new Set(dates));

	let today = new Date();
	let startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1); // Start from 11 months ago
	let endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Adjust to the end of the current month

	onMount(() => {
		let current = new Date(startDate);

		while (current <= endDate) {
			let week = [];
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
