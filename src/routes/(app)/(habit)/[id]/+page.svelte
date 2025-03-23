<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitHistory from '$lib/components/Habit/HistoryComponent.svelte';
	import StatComponent from '$lib/components/Habit/StatComponent.svelte';
	import { ICON_MAP } from '$lib/components/icons';
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import { getHabitStats, type StatItem } from '$lib/utils/stats';
	import CardComponent from '$lib/components/CardComponent.svelte';
	import { defaultHandleSubmit } from '$lib/utils/form';

	const { data } = $props<{ data: PageData }>();
	let deleteModal: HTMLDialogElement;

	let statsLoading = $state(true);
	let stats = $state<StatItem[]>([
		{ title: 'Longest Streak', value: '0', description: '' },
		{ title: 'Current Streak', value: '0', description: '' },
		{ title: 'Completion Rate', value: '0%', description: '' },
		{ title: 'Most Active', value: '0', description: '' }
	]);
	$effect(() => {
		if (data.habit.dates.length > 0) {
			getHabitStats(data.habit)
				.then((statsRes) => {
					stats = statsRes;
				})
				.finally(() => {
					statsLoading = false;
				});
		}
	});
</script>

<div>
	<div class="mb-3"><NavigateBackButton backUrl="/" /></div>
	<div class="mb-1 grid grid-cols-2">
		<div>
			<h2 class="text-3xl">{data.habit?.title}</h2>
		</div>
		<div class="items-center gap-x-3 text-right text-xs">
			<p class="text-2xs text-neutral-400 sm:text-xs">Modified at</p>
			<p>
				{dayjs(data.habit.updatedAt).format('DD MMM YYYY - HH:mm')}
			</p>
		</div>
	</div>
	<p class="text-xs text-neutral-400">{data.habit?.description}</p>
</div>

<div class="mt-6 mb-4 flex flex-row flex-wrap justify-between gap-2">
	<div class="flex flex-row gap-2">
		<form
			method="POST"
			action="?/addToday"
			use:enhance={defaultHandleSubmit}
			class="flex flex-col justify-start"
		>
			<button
				class="btn btn-outline btn-secondary btn-xs gap-0"
				title="Add Today"
				disabled={data.habit.dates.includes(dayjs().format('YYYY-MM-DD'))}
			>
				<Icon icon={ICON_MAP.plus} class="text-base" />
				Today
			</button>
		</form>
		<a href="/{data.habit.id}/values" class="btn btn-outline btn-accent btn-xs gap-1">
			<Icon icon={ICON_MAP.eye} class="text-base" />
			Show Values
		</a>
	</div>
	<div class="flex flex-row gap-2">
		<a href="/{data.habit.id}/edit" class="btn btn-outline btn-error btn-xs gap-1">
			<Icon icon={ICON_MAP.edit} class="text-base" />
			Edit
		</a>
		<button class="btn btn-error btn-xs gap-0" onclick={() => deleteModal?.showModal()}>
			<Icon icon={ICON_MAP.delete} class="text-base" />
			Delete
		</button>
	</div>
</div>

<HabitHistory dates={data.habit?.dates} />

<div class="my-6 mt-3 flex flex-row flex-wrap items-center justify-end gap-8">
	<form
		method="POST"
		action="?/addDate"
		use:enhance={defaultHandleSubmit}
		class="flex flex-row items-end gap-2"
	>
		<div class="join">
			<label class="input input-sm join-item w-full">
				<span class="label">Date</span>
				<input type="date" name="date" required />
			</label>
			<button class="btn btn-sm btn-primary join-item gap-0">
				<Icon icon={ICON_MAP.plus} class="text-base" />
				Date
			</button>
		</div>
	</form>
</div>

{#if data.habit.dates.length > 0 && !!stats && stats.length > 0}
	<CardComponent class="p-4">
		<div class="flex flex-row flex-wrap items-center justify-center gap-4">
			{#each stats as stat}
				<StatComponent {stat} loading={statsLoading} />
			{/each}
		</div>
	</CardComponent>
{/if}

<dialog id="delete_modal" bind:this={deleteModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Confirmation</h3>
		<p class="py-4">
			Are you sure you want to delete the habit <span class="italic">{data.habit.title}</span>?
		</p>
		<p>This action can not be undone.</p>
		<div class="modal-action">
			<form method="POST" action="?/delete" use:enhance={defaultHandleSubmit}>
				<button class="btn btn-error">Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
