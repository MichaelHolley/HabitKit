<script lang="ts">
	import { enhance } from '$app/forms';
	import CardComponent from '../CardComponent.svelte';

	const { goal } = $props();

	const value = $derived(Math.floor(goal.stage / goal.target) * 100);
</script>

<CardComponent class="group h-full">
	<div class="flex h-full w-[220px] flex-col justify-between p-4 pt-2">
		<div class="flex flex-col">
			<div class="flex flex-row justify-between gap-1">
				<h3 class="text-xl group-hover:text-primary">{goal.title}</h3>
				<form method="POST" action="{goal.id}?/next" use:enhance>
					<button class="btn btn-outline btn-secondary btn-xs" title="Next">+</button>
				</form>
			</div>
			<p class="text-xs text-neutral-400">{goal.description}</p>
		</div>
		<div class="mt-4 flex flex-row justify-center">
			<div
				class="radial-progress border-4 border-base-300 bg-base-300 text-primary"
				style="--value:{value}"
				role="progressbar"
			>
				{goal.stage}/{goal.target}
			</div>
		</div>
	</div>
</CardComponent>
