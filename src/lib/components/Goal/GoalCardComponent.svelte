<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import type { Goal } from '@prisma/client';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import CardComponent from '../CardComponent.svelte';
	import DropDownComponent from '../DropDownComponent.svelte';
	import { ICON_MAP } from '../icons';
	import GoalDeleteModal from './GoalDeleteModal.svelte';
	import GoalEditModal from './GoalEditModal.svelte';
	import { defaultHandleSubmit } from '$lib/utils/form';

	const { goal } = $props<{ goal: Goal }>();

	let deleteModal: HTMLDialogElement | null = $state(null);
	let editModal: HTMLDialogElement | null = $state(null);

	const titleDisplay = $derived(goal.title.replace('{}', goal.target));
	const descrDisplay = $derived(goal.description.replace('{}', goal.target));

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
	<div class="flex h-full flex-col justify-between p-4">
		<div>
			<div class="flex flex-row justify-between gap-1">
				<span class="group-hover:text-secondary text-lg">{titleDisplay}</span>
				<form method="POST" action="/goal/{goal.id}?/nextStage" use:enhance={defaultHandleSubmit}>
					<button
						class="btn btn-outline btn-secondary btn-xs px-0.5"
						title="Next"
						disabled={goal.stage === goal.target}
					>
						<Icon icon={ICON_MAP.plus} class="text-lg" />
					</button>
				</form>
			</div>
			<p class="text-base-content/60 line-clamp-2 text-xs">{descrDisplay}</p>
		</div>

		<div>
			<div class="flex flex-col">
				<div class="mt-4 flex flex-row justify-center">
					<div
						class="radial-progress border-base-300 bg-base-300 text-secondary border-4 shadow-md"
						style="--value:{progressValue}"
						role="progressbar"
					>
						{#if goal.stage < goal.target}
							{goal.stage}/{goal.target}
						{:else}
							<Icon icon={ICON_MAP.check} class="text-xl" />
						{/if}
					</div>
				</div>
			</div>
			<div class="-mb-2 flex flex-row justify-end">
				<DropDownComponent class="dropdown-end  dropdown-top">
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
								<div class="flex w-full flex-row items-center gap-1 text-start">
									<Icon icon={ICON_MAP.minus} class="text-lg" />
									Previous
								</div>
							</button>
						</form>
					</li>
					<li>
						<form
							method="POST"
							action="/goal/{goal.id}?/complete"
							use:enhance={defaultHandleSubmit}
							class="flex flex-row p-0"
						>
							<button
								title="Complete Goal"
								class="btn btn-ghost btn-sm btn-block"
								disabled={goal.stage !== goal.target}
							>
								<div class="flex w-full flex-row items-center gap-1 text-start">
									<Icon icon={ICON_MAP.check} class="text-lg" />
									Complete
								</div>
							</button>
						</form>
					</li>
					<div class="divider my-0"></div>
					<li>
						<div class="flex flex-row p-0">
							<button
								title="Edit Goal"
								onclick={() => editModal?.showModal()}
								class="btn btn-ghost btn-sm btn-block"
							>
								<div class="flex w-full flex-row items-center gap-1 text-start">
									<Icon icon={ICON_MAP.edit} class="text-lg" />
									Edit
								</div>
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
									<Icon icon={ICON_MAP.delete} class="text-lg" />
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
