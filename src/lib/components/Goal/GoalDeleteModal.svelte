<script lang="ts">
	import { enhance } from '$app/forms';
	import { defaultHandleDeleteSubmit } from '$lib/utils/form';
	import type { Goal } from '@prisma/client';

	let { goal, deleteModal = $bindable() } = $props<{
		goal: Goal;
		deleteModal: HTMLDialogElement | null;
	}>();

	const goalTitle = $derived(goal.title.replace('{}', goal.target));
</script>

<dialog
	id="delete_modal_{goal.id}"
	bind:this={deleteModal}
	class="modal modal-bottom sm:modal-middle"
>
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Confirmation</h3>
		<p class="py-4">
			Are you sure you want to delete the goal <span class="italic">{goalTitle}</span>?
		</p>
		<p>This action can not be undone.</p>
		<div class="modal-action">
			<form method="POST" action="/goal/{goal.id}?/delete" use:enhance={defaultHandleDeleteSubmit}>
				<button class="btn btn-error">Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
