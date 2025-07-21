<script lang="ts">
	import dayjs from 'dayjs';
	import ActivityBubble from './ActivityBubbleComponent.svelte';
	import CardComponent from '../CardComponent.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const { habits } = $props();
	const today = dayjs();

	let containerWidth = $state(0);
	const visibleDays = $derived(Math.ceil(containerWidth / 16) - 1);

	const daysProgress = new Tween(0, {
		duration: 800,
		easing: cubicOut
	});

	$effect(() => {
		daysProgress.set(visibleDays);
	});

	const showDaysValue = $derived(Math.ceil(daysProgress.current));
</script>

<CardComponent>
	<div class="p-4 pt-2">
		<h4 class="text-base-content/60 mb-1 text-right text-xs">
			Last <span class="text-base-content">{showDaysValue}</span> Days
		</h4>
		<div class="flex flex-row justify-between gap-3">
			<div class="flex flex-col justify-between">
				{#each habits as habit}
					<a class="link-hover link hover:text-secondary text-sm" href="/{habit.id}">
						{habit.title}
					</a>
				{/each}
			</div>

			<div class="my-1 flex grow flex-col">
				<div bind:clientWidth={containerWidth} class="flex h-full flex-col justify-between">
					{#each habits as habit}
						<div class="flex flex-row justify-end gap-1">
							{#each { length: visibleDays }, i}
								<ActivityBubble
									active={habit.dates.includes(
										today.subtract(visibleDays - (i + 1), 'days').format('YYYY-MM-DD')
									)}
									title={today.subtract(visibleDays - (i + 1), 'days').format('ddd YYYY-MM-DD')}
									delay={i * 20}
								/>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</CardComponent>
