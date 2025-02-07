<script lang="ts">
	import { enhance } from '$app/forms';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import CardComponent from '../CardComponent.svelte';
	import CheckIconComponent from '../Icons/CheckIconComponent.svelte';

	const { goal } = $props();

	const progress = new Tween(0, {
		duration: 800,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(Math.ceil((goal.stage / goal.target) * 100));
	});

	const progressValue = $derived(progress.current);
</script>

<CardComponent class="group h-full">
	<div class="flex w-[220px] flex-col justify-between p-4 pt-2">
		<div class="flex flex-row justify-between gap-1">
			<a href="/goal/{goal.id}">
				<span class="link-hover link text-lg group-hover:text-primary">{goal.title}</span>
			</a>
			<form method="POST" action="goal/{goal.id}?/nextStage" use:enhance>
				<button
					class="btn btn-outline btn-secondary btn-xs"
					title="Next"
					disabled={goal.stage === goal.target}>+</button
				>
			</form>
		</div>
		<a href="/goal/{goal.id}">
			<div class="flex flex-col">
				<p class="text-xs text-neutral-400">{goal.description}</p>
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
		<div class="flex flex-row justify-end">
			<button class="btn btn-ghost btn-xs invisible text-neutral-500 group-hover:visible"
				>•••</button
			>
		</div>
	</div>
</CardComponent>
