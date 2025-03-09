<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Goal } from '@prisma/client';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { goal, editModal = $bindable() } = $props<{
		goal: Goal;
		editModal: HTMLDialogElement | null;
	}>();

	let loading = $state(false);
	let editGoal: Goal = $state(structuredClone(goal));

	const handleSubmit: SubmitFunction = async () => {
		loading = true;

		return async ({ result, update }) => {
			loading = false;
			update();

			if (result.type === 'success') {
				editModal.close();
				return result;
			}
		};
	};
</script>

<dialog id="edit_modal_{goal.id}" bind:this={editModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Edit Goal</h3>
		<form
			method="POST"
			action="/goal/{goal.id}?/update"
			use:enhance={handleSubmit}
			class="flex flex-col items-end gap-3"
		>
			<label class="form-control w-full text-sm">
				<div class="label">
					<span class="label-text">Title</span>
				</div>
				<input
					name="title"
					class="input input-bordered"
					placeholder="Enter title..."
					bind:value={editGoal.title}
					required
				/>
			</label>
			<label class="form-control w-full text-sm">
				<div class="label">
					<span class="label-text">Description (optional)</span>
				</div>
				<input
					name="description"
					class="input input-bordered"
					placeholder="Enter description..."
					bind:value={editGoal.description}
				/>
			</label>
			<label class="form-control w-full text-sm">
				<div class="label">
					<span class="label-text">Target</span>
				</div>
				<input
					name="target"
					type="number"
					class="input input-bordered"
					placeholder="Target Value"
					required
					bind:value={editGoal.target}
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
