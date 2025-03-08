<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Goal } from '@prisma/client';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import CardComponent from '../CardComponent.svelte';
	import DropDownComponent from '../DropDownComponent.svelte';
	import CheckIconComponent from '../Icons/CheckIconComponent.svelte';
	import TashIconComponent from '../Icons/TashIconComponent.svelte';
	import GoalDeleteModal from './GoalDeleteModal.svelte';
	import GoalEditModal from './GoalEditModal.svelte';

	const { goal } = $props<{ goal: Goal }>();

	let deleteModal: HTMLDialogElement | null = $state(null);
	let editModal: HTMLDialogElement | null = $state(null);

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
					<div class="divider my-0"></div>
					<li>
						<div class="flex flex-row p-0">
							<button
								title="Delete Goal"
								onclick={() => editModal?.showModal()}
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
								onclick={() => deleteModal?.showModal()}
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

<GoalDeleteModal bind:deleteModal {goal} />

<GoalEditModal bind:editModal {goal} />
