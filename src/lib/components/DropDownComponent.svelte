<script lang="ts">
	import Icon from '@iconify/svelte';
	import { ICON_MAP } from './icons';

	const { children } = $props();

	let isOpen = $state(false);
	let trigger: HTMLElement;
	let dropdown: HTMLElement | undefined = $state(undefined);
	let direction = $state('down');

	function toggleDropdown() {
		if (!isOpen) {
			const rect = trigger.getBoundingClientRect();
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;

			direction = spaceBelow < 200 && spaceAbove > spaceBelow ? 'up' : 'down';
		}
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			isOpen &&
			!trigger.contains(event.target as Node) &&
			!dropdown?.contains(event.target as Node)
		) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown-container">
	<div bind:this={trigger}>
		<button class="btn btn-ghost btn-xs px-1" aria-label="Options" onclick={toggleDropdown}>
			<Icon icon={ICON_MAP.more} />
		</button>
	</div>

	{#if isOpen}
		<ul
			bind:this={dropdown}
			class="menu dropdown menu-sm rounded-box bg-base-100 absolute right-0 z-50 w-56 gap-1 {direction}"
		>
			{@render children()}
		</ul>
	{/if}
</div>

<style>
	.dropdown-container {
		position: relative;
		display: inline-block;
	}

	.dropdown {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.dropdown.down {
		top: 100%;
		margin-top: 4px;
	}

	.dropdown.up {
		bottom: 100%;
		margin-bottom: 4px;
	}
</style>
