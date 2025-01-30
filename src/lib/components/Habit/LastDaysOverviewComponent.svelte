<script lang="ts">
	import dayjs from 'dayjs';
	import ActivityBubble from './ActivityBubbleComponent.svelte';

	let { habits } = $props();

	let containerWidth = $state(0);
	let visibleDays = $derived(Math.ceil((containerWidth - 92) / 16) - 1);

	const today = dayjs();
</script>

<div class="rounded-lg bg-base-200 p-4 pt-3">
	<div bind:clientWidth={containerWidth}>
		<h4 class="mb-1 text-right text-xs">Last {visibleDays} Days</h4>
		<div
			class="grid items-center gap-1 text-2xs"
			style="grid-template-columns: 1fr repeat({visibleDays}, auto) !important;"
		>
			{#each habits as habit}
				<a
					class="link-hover link link-primary sticky left-0 z-10 mr-2 bg-base-200 pr-1 text-sm"
					href="/{habit.id}">{habit.title}</a
				>
				{#each { length: visibleDays } as _, i}
					<ActivityBubble
						active={habit.dates.includes(
							today.subtract(visibleDays - i - 1, 'days').format('YYYY-MM-DD')
						)}
						title={today.subtract(visibleDays - i - 1, 'days').format('YYYY-MM-DD')}
					/>
				{/each}
			{/each}
		</div>
	</div>
</div>
