<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Goal } from '@prisma/client';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import CardComponent from '../CardComponent.svelte';
	import DropDownComponent from '../DropDownComponent.svelte';
	import CheckIconComponent from '../Icons/CheckIconComponent.svelte';
	import TashIconComponent from '../Icons/TashIconComponent.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	const { goal } = $props<{ goal: Goal }>();
	let loading = $state(false);
	let deleteModal: HTMLDialogElement;
	let editModal: HTMLDialogElement;

	let editGoal: Goal = $state(structuredClone(goal));

	const progress = new Tween(0, {
		duration: 800,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(Math.ceil((goal.stage / goal.target) * 100));
	});

	const progressValue = $derived(progress.current);

	const openEditModal = () => {
		editGoal = structuredClone(goal);
		editModal.showModal();
	};

	const handleUpdateSubmit: SubmitFunction = async () => {
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

<CardComponent class="group">
	<div class="flex h-full flex-col justify-between p-4 pt-2">
		<div>
			<div class="flex flex-row justify-between gap-1">
				<span class="text-lg group-hover:text-primary">{goal.title}</span>
				<form method="POST" action="/goal/{goal.id}?/nextStage" use:enhance>
					<button
						class="btn btn-outline btn-secondary btn-xs"
						title="Next"
						disabled={goal.stage === goal.target}
					>
						+
					</button>
				</form>
			</div>
			<p class="line-clamp-2 text-xs text-neutral-400">{goal.description}</p>
		</div>

		<div>
			<div class="flex flex-col">
				<div class="mt-4 flex flex-row justify-center">
					<div
						class="radial-progress border-4 border-base-300 bg-base-300 text-primary"
						style="--value:{progressValue}"
						role="progressbar"
					>
						{#if goal.stage < goal.target}
							{goal.stage}/{goal.target}
						{:else}
							<CheckIconComponent />
						{/if}
					</div>
				</div>
			</div>
			<div class="-mb-2 -mr-2 flex flex-row justify-end">
				<DropDownComponent>
					<li>
						<form
							method="POST"
							action="/goal/{goal.id}?/previousStage"
							use:enhance
							class="flex flex-row p-0"
						>
							<button
								title="Previous Stage"
								disabled={goal.stage === 0}
								class="btn btn-ghost btn-sm btn-block"
							>
								<div class="w-full text-start">- Previous</div>
							</button>
						</form>
					</li>
					<div class="divider my-0"></div>
					<li>
						<form
							method="POST"
							action="/goal/{goal.id}?/complete"
							use:enhance
							class="flex flex-row p-0"
						>
							<button
								title="Complete Goal"
								class="btn btn-ghost btn-sm btn-block"
								disabled={goal.stage !== goal.target}
							>
								<div class="flex w-full flex-row items-center gap-1 text-start">
									<CheckIconComponent class="h-3 w-3" />
									Complete
								</div>
							</button>
						</form>
					</li>
					<li>
						<div class="flex flex-row p-0">
							<button
								title="Delete Goal"
								onclick={openEditModal}
								class="btn btn-ghost btn-sm btn-block"
							>
								<div class="flex w-full flex-row items-center gap-1 text-start">Edit</div>
							</button>
						</div>
					</li>
					<li>
						<div class="flex flex-row p-0">
							<button
								title="Delete Goal"
								onclick={() => deleteModal.showModal()}
								class="btn btn-ghost btn-sm btn-block"
							>
								<div class="flex w-full flex-row items-center gap-1 text-start">
									<TashIconComponent class="h-3 w-3" />
									Delete
								</div>
							</button>
						</div>
					</li>
				</DropDownComponent>
			</div>
		</div>
	</div>
</CardComponent>

<dialog id="delete_modal" bind:this={deleteModal} class="modal modal-bottom sm:modal-middle">
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
			<form method="POST" action="/goal/{goal.id}?/delete" use:enhance>
				<button class="btn btn-error">Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="edit_modal" bind:this={editModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Edit Goal</h3>
		<form
			method="POST"
			action="/goal/{goal.id}?/update"
			use:enhance={handleUpdateSubmit}
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
