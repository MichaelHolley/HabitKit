<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Goal } from '@prisma/client';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { goal, deleteModal = $bindable() } = $props<{
		goal: Goal;
		deleteModal: HTMLDialogElement | null;
	}>();

	let loading = $state(false);

	const handleSubmit: SubmitFunction = async () => {
		loading = true;

		return async ({ result, update }) => {
			loading = false;
			update();

			if (result.type === 'success') {
				deleteModal.close();
				return result;
			}
		};
	};
</script>

<dialog
	id="delete_modal_{goal.id}"
	bind:this={deleteModal}
	class="modal modal-bottom sm:modal-middle"
>
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Confirmation</h3>
		<p class="py-4">
			Are you sure you want to delete the goal <span class="italic">{goal.title}</span>?
		</p>
		<p>This action can not be undone.</p>
		<div class="modal-action">
			<form method="POST" action="/goal/{goal.id}?/delete" use:enhance={handleSubmit}>
				<button class="btn btn-error" disabled={loading}>Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
