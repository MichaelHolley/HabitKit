<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitHistory from '$lib/components/Habit/HistoryComponent.svelte';
	import NavigateBackButton from '$lib/components/NavigateBackButtonComponent.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import SummaryComponent from '$lib/components/Habit/SummaryComponent.svelte';

	const { data } = $props<{ data: PageData }>();
	let deleteModal: HTMLDialogElement;
</script>

<div>
	<NavigateBackButton backUrl="/" />
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

<div class="mb-4 mt-6 flex flex-row flex-wrap justify-between gap-2">
	<div class="flex flex-row gap-2">
		<form method="POST" action="?/addToday" use:enhance class="flex flex-col justify-start">
			<button
				class="btn btn-outline btn-secondary btn-xs"
				title="Add Today"
				disabled={data.habit.dates.includes(dayjs().format('YYYY-MM-DD'))}>+ Today</button
			>
		</form>
		<a href="/{data.habit.id}/values" class="btn btn-outline btn-accent btn-xs">Show Values</a>
	</div>
	<div class="flex flex-row gap-2">
		<a href="/{data.habit.id}/edit" class="btn btn-outline btn-error btn-xs">Edit</a>
		<button class="btn btn-error btn-xs" onclick={() => deleteModal.showModal()}>Delete</button>
	</div>
</div>

<HabitHistory dates={data.habit?.dates} />

<div class="my-6 flex flex-row flex-wrap items-center justify-end gap-8">
	<form
		method="POST"
		action="?/addDate"
		use:enhance
		class="flex max-w-full grow flex-col items-end gap-3 sm:max-w-md"
	>
		<label class="form-control w-full text-sm">
			<input
				name="date"
				type="date"
				class="input input-bordered"
				placeholder="Select a date"
				required
			/>
		</label>

		<button class="btn btn-primary w-fit">+ Add Date</button>
	</form>
</div>

{#if !!data.summary}
	<SummaryComponent summary={data.summary} />
{/if}

<dialog id="delete_modal" bind:this={deleteModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Confirmation</h3>
		<p class="py-4">Are you sure you want to delete this habit?</p>
		<p>This action cannot be undone.</p>
		<div class="modal-action">
			<form method="POST" action="?/delete" use:enhance>
				<button class="btn btn-error">Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
