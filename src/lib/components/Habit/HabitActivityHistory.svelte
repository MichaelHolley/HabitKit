<script lang="ts">
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import { onMount } from 'svelte';
	import ActivityBubble from './ActivityBubble.svelte';

	dayjs.extend(isoWeek);

	let { dates, showWeeks } = $props();
	const activeDateSet = $derived(new Set(dates));

	const days: dayjs.Dayjs[] = $state([]);

	const today = dayjs();
	const startDate = today.startOf('isoWeek').subtract(showWeeks, 'weeks');

	onMount(() => {
		let current = startDate.clone();
		while (current.isBefore(today.add(1, 'day'), 'day')) {
			days.push(current.clone());
			current = current.add(1, 'day');
		}
	});

	const formatDate = (date: dayjs.Dayjs) => date.format('YYYY-MM-DD');
</script>

<div class="grid grid-flow-col grid-rows-8 items-center justify-center gap-1 text-[0.5rem]">
	<div></div>
	<div class="sticky left-0 pr-1">Mon</div>
	<div></div>
	<div class="sticky left-0 pr-1">Wed</div>
	<div></div>
	<div class="sticky left-0 pr-1">Fri</div>
	<div></div>
	<div class="sticky left-0 pr-1">Sun</div>
	{#each days as day, i}
		{#if i % 7 === 0 && day.date() <= 7}
			<div class="-mr-2">
				{days[i + 6]?.format('MMM')}
			</div>
		{:else if i % 7 === 0}
			<div></div>
		{/if}
		<ActivityBubble active={activeDateSet.has(formatDate(day))} title={formatDate(day)} />
	{/each}
</div>
