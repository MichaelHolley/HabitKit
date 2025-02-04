<script lang="ts">
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek';
	import ActivityBubble from './ActivityBubbleComponent.svelte';
	dayjs.extend(isoWeek);

	const { dates } = $props<{ dates: string[] }>();
	let containerWidth = $state(0);

	const activeDateSet = $derived(new Set(dates));

	const today = dayjs();
	const visibleWeeks = $derived(Math.floor((containerWidth - 22) / 16) - 1);
	const showDays = $derived(visibleWeeks * 7 + today.day());

	const activityDate = (i: number) =>
		today.subtract(showDays - (i + 1), 'days').format('YYYY-MM-DD');
</script>

<div bind:clientWidth={containerWidth} class="flex flex-row justify-end">
	<div class="grid grid-flow-col grid-rows-8 items-center justify-center gap-1 text-2xs">
		<div></div>
		<div class="sticky left-0 pr-1">Mon</div>
		<div></div>
		<div class="sticky left-0 pr-1">Wed</div>
		<div></div>
		<div class="sticky left-0 pr-1">Fri</div>
		<div></div>
		<div class="sticky left-0 pr-1">Sun</div>
		{#each { length: showDays }, i}
			{#if i % 7 === 0 && today.subtract(showDays - i, 'days').date() <= 7}
				<div class="-mr-2">
					{today
						.subtract(visibleWeeks * 7 - i, 'days')
						.add(6, 'days')
						?.format('MMM')}
				</div>
			{:else if i % 7 === 0}
				<div></div>
			{/if}
			<ActivityBubble
				active={activeDateSet.has(activityDate(i))}
				title={activityDate(i)}
				delay={dates.indexOf(activityDate(i)) * 10}
			/>
		{/each}
	</div>
</div>
