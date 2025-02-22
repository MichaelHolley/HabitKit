<script lang="ts">
	import { enhance } from '$app/forms';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import CardComponent from '../CardComponent.svelte';
	import CheckIconComponent from '../Icons/CheckIconComponent.svelte';
	import DropDownComponent from '../DropDownComponent.svelte';
	import type { Goal } from '@prisma/client';

	const { goal } = $props<{ goal: Goal }>();

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
						<form method="POST" action="/goal/{goal.id}?/nextStage" use:enhance class="p-0">
							<button
								title="Next Stage"
								disabled={goal.stage === goal.target}
								class="w-full px-3 py-1"
							>
								+ Next
							</button>
						</form>
					</li>
					<li>
						<form method="POST" action="/goal/{goal.id}?/previousStage" use:enhance class="p-0">
							<button title="Previous Stage" disabled={goal.stage === 0} class="w-full px-3 py-1">
								- Previous
							</button>
						</form>
					</li>
					<div class="divider my-0"></div>
					<li>
						<form method="POST" action="/goal/{goal.id}?/complete" use:enhance class="p-0">
							<button title="Delete" class="btn btn-ghost btn-xs btn-block"> Complete </button>
						</form>
					</li>
					<li>
						<form method="POST" action="/goal/{goal.id}?/delete" use:enhance class="p-0">
							<button title="Delete" class="btn btn-ghost btn-xs btn-block"> Delete </button>
						</form>
					</li>
				</DropDownComponent>
			</div>
		</div>
	</div>
</CardComponent>
