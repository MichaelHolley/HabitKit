<script lang="ts">
	import { enhance } from '$app/forms';
	import HabitActivityHistory from '$lib/components/HabitActivityHistory.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let deleteModal: HTMLDialogElement;
</script>

<h2 class="mb-3 text-3xl">{data.habit?.name}</h2>
<div class="grid gap-x-3 text-start text-xs">
	<p class="text-neutral-400">Created:</p>
	<p class="text-neutral-400">
		{data.habit?.createdAt.toLocaleString('de', { dateStyle: 'medium', timeStyle: 'short' })}
	</p>
	<p class="text-neutral-400">Updated:</p>
	<p class="text-neutral-400">
		{data.habit?.updatedAt.toLocaleString('de', { dateStyle: 'medium', timeStyle: 'short' })}
	</p>
</div>

<div class="my-3 flex flex-row">
	<button class="btn btn-error btn-xs" onclick={() => deleteModal.showModal()}>Delete</button>
</div>

<div class="my-6 flex flex-row flex-wrap items-start gap-8">
	<div class="flex overflow-x-scroll pb-4">
		<HabitActivityHistory dates={data.habit?.dates} showWeeks={52} />
	</div>

	<form
		method="post"
		action="?/addDate"
		use:enhance
		class="flex max-w-md grow flex-col items-end gap-3"
	>
		<label class="flex w-full flex-col gap-1 text-sm">
			Date
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
			<form method="post" action="?/delete" use:enhance>
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
