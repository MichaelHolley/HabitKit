<script lang="ts">
	import dayjs from 'dayjs';
	import ActivityBubble from './ActivityBubble.svelte';

	let { summary }: { summary: { id: string; name: string; dates: string[] }[] } = $props();

	const thirtyDaysAgo = dayjs().subtract(30, 'days');
</script>

<div class="flex flex-shrink">
	<div class="overflow-hidden rounded-lg bg-base-200 p-4">
		<div class="relative grid items-center gap-1 overflow-x-scroll py-2 text-[0.5rem]">
			{#each summary as summaryItem}
				<a
					class="link-hover link sticky left-0 mr-2 bg-base-200 pr-1 text-sm"
					href="/{summaryItem.id}">{summaryItem.name}</a
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
