<script lang="ts">
	import { enhance } from '$app/forms';
	import ActivityBubble from '$lib/components/ActivityBubble.svelte';
	import HabitActivityHistory from '$lib/components/HabitActivityHistory.svelte';
	import dayjs from 'dayjs';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	const thirtyDaysAgo = dayjs().subtract(30, 'days');
</script>

<div class="mb-7 flex flex-row items-center justify-between">
	<p class="text-xl">Welcome back, <span class="text-primary">{data.user.username}</span>!</p>
	<div class="flex flex-row items-center gap-3">
		<p>Not you?</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="btn btn-link px-0">Sign out</button>
		</form>
	</div>
</div>

<section class="my-6">
	<div class="flex flex-row items-center gap-4">
		<h2 class="text-3xl">Habits</h2>
		<a href="/create" class="btn btn-outline btn-primary btn-sm">+ Track New</a>
	</div>

	<div class="my-6">
		<h3 class="mb-3 text-xl">Last 30 Days</h3>
		<div class="flex flex-shrink">
			<div class="grid items-center gap-1 rounded-lg bg-base-200 p-4 text-[0.5rem]">
				<div class="col-span-1"></div>
				<div class="col-span-5">{thirtyDaysAgo.add(1, 'day').format('DD-MMM')}</div>
				<div class="col-span-5">{thirtyDaysAgo.add(6, 'day').format('DD-MMM')}</div>
				<div class="col-span-5">{thirtyDaysAgo.add(11, 'day').format('DD-MMM')}</div>
				<div class="col-span-5">{thirtyDaysAgo.add(16, 'day').format('DD-MMM')}</div>
				<div class="col-span-5">{thirtyDaysAgo.add(21, 'day').format('DD-MMM')}</div>
				<div class="col-span-4">{thirtyDaysAgo.add(26, 'day').format('DD-MMM')}</div>
				<div class="col-span-1">{thirtyDaysAgo.add(30, 'day').format('DD-MMM')}</div>

				{#each data.summary as summaryItem}
					<a class="link-hover link link-primary mr-2 text-sm" href="/{summaryItem.id}"
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

	<div class="my-6">
		<h2 class="mb-3 text-2xl">Overview</h2>
		<div class="flex flex-row flex-wrap justify-start gap-6">
			{#each data.habits as habit}
				<a href="/{habit.id}" class="flex flex-col gap-1">
					<span class="link-hover link link-primary text-xl">{habit.name}</span>
					<div class="rounded-lg bg-base-200 p-4">
						<HabitActivityHistory dates={habit.dates} showWeeks={12} />
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		grid-auto-columns: min-content;
		grid-template-columns: repeat(31, auto);
	}
</style>
