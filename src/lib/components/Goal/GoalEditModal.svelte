<script lang="ts">
	import { enhance } from '$app/forms';
	import { toasts } from '$lib/stores/toast';
	import type { Goal } from '@prisma/client';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { goal, editModal = $bindable() } = $props<{
		goal: Goal;
		editModal: HTMLDialogElement | null;
	}>();

	let loading = $state(false);
	let editGoal = $state(structuredClone(goal));
	$effect(() => {
		editGoal = structuredClone(goal);
	});

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'success') {
				toasts.show('Success!', 'success');
				editModal.close();
			} else if (result.type === 'error') {
				toasts.show(result.error?.message || 'Operation failed!', 'error');
			}

			await update();
		};
	};
</script>

<dialog id="edit_modal_{goal.id}" bind:this={editModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Edit Goal</h3>
		<p class="text-sm">
			Include <span class="bg-base-200 rounded-xs p-1">&#123;&#125;</span> in title or description to
			print the current target value.
		</p>
		<form
			method="POST"
			action="/goal/{goal.id}?/update"
			use:enhance={handleSubmit}
			class="mt-4 flex flex-col items-end gap-3"
		>
			<label class="input w-full">
				<span class="label">Title</span>
				<input
					type="text"
					name="title"
					bind:value={editGoal.title}
					required
					placeholder="Enter title..."
				/>
			</label>
			<label class="input w-full">
				<span class="label">Description</span>
				<input
					type="text"
					name="description"
					bind:value={editGoal.description}
					placeholder="Enter description..."
				/>
				<span class="badge badge-neutral badge-xs">Optional</span>
			</label>
			<label class="input w-full">
				<span class="label">Value</span>
				<input
					type="number"
					name="target"
					bind:value={editGoal.target}
					required
					placeholder="Enter Target value..."
				/>
			</label>
			<div class="modal-action">
				<button class="btn btn-primary w-fit" disabled={loading}>Update</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
