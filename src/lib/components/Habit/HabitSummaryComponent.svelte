<script lang="ts">
	import dayjs from 'dayjs';
	import ActivityBubble from './ActivityBubble.svelte';

	let { summary }: { summary: { id: string; name: string; dates: string[] }[] } = $props();

	const thirtyDaysAgo = dayjs().subtract(30, 'days');
</script>

{#snippet summaryDateLabel(date: dayjs.Dayjs)}
	<div>{date.format('DD')}</div>
	<div>{date.format(' MMM')}</div>
{/snippet}

<div class="flex flex-shrink">
	<div class="overflow-hidden rounded-lg bg-base-200 p-4">
		<div class="relative grid items-center gap-1 overflow-x-scroll pb-4 text-[0.5rem]">
			<div class="col-span-1"></div>
			<div class="col-span-5">{@render summaryDateLabel(thirtyDaysAgo.add(1, 'day'))}</div>
			<div class="col-span-5">{@render summaryDateLabel(thirtyDaysAgo.add(6, 'day'))}</div>
			<div class="col-span-5">{@render summaryDateLabel(thirtyDaysAgo.add(11, 'day'))}</div>
			<div class="col-span-5">{@render summaryDateLabel(thirtyDaysAgo.add(16, 'day'))}</div>
			<div class="col-span-5">{@render summaryDateLabel(thirtyDaysAgo.add(21, 'day'))}</div>
			<div class="col-span-4">{@render summaryDateLabel(thirtyDaysAgo.add(26, 'day'))}</div>
			<div class="col-span-1">{@render summaryDateLabel(thirtyDaysAgo.add(30, 'day'))}</div>

			{#each summary as summaryItem}
				<a class="link-hover link link-primary sticky left-0 mr-2 text-sm" href="/{summaryItem.id}"
					>{summaryItem.name}</a
				>
				{#each { length: 30 } as _, i}
					<ActivityBubble
						active={summaryItem.dates.includes(
							thirtyDaysAgo.add(i + 1, 'day').format('YYYY-MM-DD')
						)}
						title={thirtyDaysAgo.add(i + 1, 'day').format('YYYY-MM-DD')}
					/>
				{/each}
			{/each}
		</div>
	</div>
</div>

<style>
	.grid {
		grid-template-columns: repeat(31, auto);
	}
</style>
