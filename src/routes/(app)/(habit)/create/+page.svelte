<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	let title = $state('');
	let description = $state('');
	let presetModal: HTMLDialogElement;

	function selectPreset(preset: { title: string; description?: string }) {
		title = preset.title;

		if (preset.description) {
			description = preset.description;
		}

		presetModal.close();
	}
</script>

<div class="max-w-md">
	<div class="mb-4 flex flex-row items-end justify-between gap-3">
		<h3 class="text-3xl">Create Habit</h3>
		<p>
			or <button
				class="link link-primary"
				onclick={() => {
					presetModal.showModal();
				}}>use a Preset</button
			>
		</p>
	</div>
	<form method="POST" action="?/createHabit" use:enhance class="flex flex-col items-end gap-3">
		<label class="form-control w-full text-sm">
			<div class="label">
				<span class="label-text">Title</span>
			</div>
			<input
				name="title"
				class="input input-bordered"
				placeholder="Enter title..."
				bind:value={title}
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
				bind:value={description}
			/>
		</label>
		<button class="btn btn-primary w-fit">+ Create</button>
	</form>
</div>

<dialog id="preset_modal" bind:this={presetModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Select a Preset</h3>
		<p class="mb-3 py-1">Choose a preset to get started quickly and customize later.</p>
		<div class="-mr-4 flex max-h-80 grow flex-col gap-1 self-stretch overflow-y-scroll pr-4">
			{#each data.presetOptions as preset}
				<button
					class="border-base-300 bg-base-200 hover:bg-base-300 rounded-md border px-4 py-2 text-left"
					onclick={() => selectPreset(preset)}
				>
					<div>{preset.title}</div>
					{#if preset.description}
						<div class="text-xs text-neutral-400">{preset.description}</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
