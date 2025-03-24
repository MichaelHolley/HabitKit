<script lang="ts">
	import { ICON_MAP } from '$lib/components/icons';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';
	import ToastComponent from '$lib/components/ToastComponent.svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<main class="container mx-auto min-h-screen px-3">
	{@render children()}
	<ToastComponent />
</main>

<footer class="bg-base-300 py-4">
	<div class="container mx-auto">
		<a
			href="https://github.com/MichaelHolley/HabitKit/issues"
			target="_blank"
			class="group link-hover link flex flex-row items-center justify-center gap-3 text-sm transition-all"
		>
			<Icon icon={ICON_MAP.github} class="size-8 group-hover:scale-105" />
			Report issues on GitHub
		</a>
	</div>
</footer>
