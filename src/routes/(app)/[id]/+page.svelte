<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitActivityHistory from '$lib/components/Habit/HabitActivityHistory.svelte';
	import NavigateBackButton from '$lib/components/NavigateBackButton.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import { Prisma } from '@prisma/client';

	let { data }: { data: PageData } = $props();
	let deleteModal: HTMLDialogElement;
</script>

<div class="mb-3">
	<NavigateBackButton backUrl="/" />
</div>

<div class="mb-3">
	<h2 class="text-3xl">{data.habit?.name}</h2>
	<p class="text-xs text-neutral-400">{data.habit?.description}</p>
</div>
<div class="grid gap-x-3 text-xs text-neutral-400">
	<p>Created:</p>
	<p>
		{dayjs(data.habit.createdAt).format('DD MMM YYYY - HH:mm')}
	</p>
	<p>Updated:</p>
	<p>
		{dayjs(data.habit.updatedAt).format('DD MMM YYYY - HH:mm')}
	</p>
</div>

<div class="my-6 flex flex-row gap-3">
	<form method="POST" action="?/addToday" use:enhance>
		<button
			class="btn btn-outline btn-secondary btn-xs"
			title="Add Today"
			disabled={(data.habit.dates as Prisma.JsonArray).includes(dayjs().format('YYYY-MM-DD'))}
			>+ Today</button
		>
	</form>
	<a href="/{data.habit.id}/values" class="btn btn-outline btn-accent btn-xs">Show Values</a>
	<button class="btn btn-error btn-xs" onclick={() => deleteModal.showModal()}>Delete</button>
</div>

<div class="my-6 flex flex-row flex-wrap items-start gap-8">
	<div class="flex overflow-x-scroll pb-4">
		<HabitActivityHistory dates={data.habit?.dates} showWeeks={52} />
	</div>

	<form
		method="POST"
		action="?/addDate"
		use:enhance
		class="flex max-w-md grow flex-col items-end gap-3"
	>
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Date</span>
			</div>
			<input name="date" type="date" class="input input-bordered" required />
		</label>

		<button class="btn btn-primary w-fit">+ Add Date</button>
	</form>
</div>

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

<style>
	.grid {
		grid-template-columns: auto 1fr;
	}
</style>
