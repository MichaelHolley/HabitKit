<script lang="ts">
	let isOpen = $state(false);
	let trigger: HTMLElement;
	let dropdown: HTMLElement;
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
			!dropdown.contains(event.target as Node)
		) {
			isOpen = false;
		}
	}

	// - missing click outside handler
</script>

<div class="dropdown-container">
	<button
		class="btn btn-ghost btn-xs"
		aria-label="Options"
		bind:this={trigger}
		onclick={toggleDropdown}>...</button
	>
	{#if isOpen}
		<div
			bind:this={dropdown}
			class="dropdown absolute right-0 z-50 max-h-40 min-w-48 rounded-md border border-base-100 bg-base-300 {direction}"
		>
			<div class="dropdown-item">Item 1</div>
			<div class="dropdown-item">Item 2</div>
			<div class="dropdown-item">Item 3</div>
		</div>
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

	.dropdown > .dropdown-item {
		@apply p-1;
	}

	.dropdown-item:hover {
		@apply bg-base-100;
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
