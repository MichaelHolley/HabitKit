<script lang="ts">
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import { onMount } from 'svelte';
	import ActivityBubble from './ActivityBubbleComponent.svelte';
	dayjs.extend(isoWeek);

	let { dates }: { dates: string[] } = $props();
	let containerWidth = $state(0);
	const days: dayjs.Dayjs[] = $state([]);

	const activeDateSet = $derived(new Set(dates));

	let visibleWeeks = $derived.by(() => {
		const calc = Math.ceil((containerWidth - 22) / 16) - 2;
		if (calc > maxShowWeeks) return maxShowWeeks;
		else return calc;
	});

	const maxShowWeeks = 52;
	const today = dayjs();
	const startDate = today.startOf('isoWeek').subtract(maxShowWeeks, 'weeks');
	onMount(() => {
		let current = startDate.clone();
		while (current.isBefore(today.add(1, 'day'), 'day')) {
			days.push(current.clone());
			current = current.add(1, 'day');
		}
	});

	const formatDate = (date: dayjs.Dayjs) => date.format('YYYY-MM-DD');
</script>

<div bind:clientWidth={containerWidth} class="flex-start justify-startg flex">
	<div class="grid grid-flow-col grid-rows-8 items-center justify-center gap-1 text-2xs">
		<div></div>
		<div class="sticky left-0 pr-1">Mon</div>
		<div></div>
		<div class="sticky left-0 pr-1">Wed</div>
		<div></div>
		<div class="sticky left-0 pr-1">Fri</div>
		<div></div>
		<div class="sticky left-0 pr-1">Sun</div>
		{#each days.slice(days.length - visibleWeeks * 7 - today.day()) as day, i}
			{#if i % 7 === 0 && day.date() <= 7}
				<div class="-mr-2">
					{day.add(6, 'days')?.format('MMM')}
				</div>
			{:else if i % 7 === 0}
				<div></div>
			{/if}
			<ActivityBubble
				active={activeDateSet.has(formatDate(day))}
				title={formatDate(day)}
				delay={dates.indexOf(day.format('YYYY-MM-DD')) * 20}
			/>
		{/each}
	</div>
</div>
