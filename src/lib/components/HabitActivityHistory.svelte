<script lang="ts">
	import { onMount } from 'svelte';

	let { dates, showWeeks } = $props();
	const activeDateSet = $derived(new Set(dates));

	const days: Date[] = $state([]);

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const today = new Date();
	const startDate = new Date(today);
	// set the start date to the monday of showWeeks weeks ago from today
	startDate.setDate(today.getDate() - today.getDay() + 1 - 7 * showWeeks);

	onMount(() => {
		let current = new Date(startDate);
		while (current <= today) {
			current.setDate(current.getDate() + 1);
			days.push(new Date(current));
		}
	});

	const formatDate = (date: Date) => date.toISOString().split('T')[0];
</script>

<div class="grid grid-flow-col grid-rows-8 items-center justify-center gap-1 text-[0.5rem]">
	<div></div>
	<div class="pr-1">Mon</div>
	<div></div>
	<div class="pr-1">Wed</div>
	<div></div>
	<div class="pr-1">Fri</div>
	<div></div>
	<div class="pr-1">Sun</div>
	{#each days as day, i}
		{#if i % 7 === 0 && day.getDate() <= 7}
			<div class="-mr-2">
				{months[days[i + 6].getMonth()]}
			</div>
		{:else if i % 7 === 0}
			<div></div>
		{/if}
		<div
			class="h-3 w-3 rounded-sm bg-neutral"
			class:active={activeDateSet.has(formatDate(day))}
			title={formatDate(day)}
		></div>
	{/each}
</div>

<style>
	.active {
		@apply bg-primary;
	}
</style>
