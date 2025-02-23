<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Goal } from '@prisma/client';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import CardComponent from '../CardComponent.svelte';
	import DropDownComponent from '../DropDownComponent.svelte';
	import CheckIconComponent from '../Icons/CheckIconComponent.svelte';
	import TashIconComponent from '../Icons/TashIconComponent.svelte';

	const { goal } = $props<{ goal: Goal }>();
	let deleteModal: HTMLDialogElement;

	const progress = new Tween(0, {
		duration: 800,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(Math.ceil((goal.stage / goal.target) * 100));
	});

	const progressValue = $derived(progress.current);
</script>

<CardComponent class="group">
	<div class="flex h-full flex-col justify-between p-4 pt-2">
		<div>
			<div class="flex flex-row justify-between gap-1">
				<a href="/goal/{goal.id}">
					<span class="link-hover link text-lg group-hover:text-primary">{goal.title}</span>
				</a>
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
			<a href="/goal/{goal.id}">
				<p class="text-xs text-neutral-400">{goal.description}</p>
			</a>
		</div>

		<div>
			<a href="/goal/{goal.id}">
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
			</a>
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
								<div class="flex w-full flex-row gap-1 text-start">
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
								onclick={() => deleteModal.showModal()}
								class="btn btn-ghost btn-sm btn-block"
							>
								<div class="flex w-full flex-row gap-1 text-start">
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
