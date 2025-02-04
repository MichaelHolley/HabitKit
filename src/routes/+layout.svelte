<script lang="ts">
	import GitHubIconComponent from '$lib/components/Icons/GitHubIconComponent.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';
	const { children } = $props<{ children: Snippet }>();
</script>

<main class="container mx-auto min-h-screen px-3">
	{@render children()}
</main>

<footer class="bg-base-300 py-4">
	<div class="container mx-auto">
		<a
			href="https://github.com/MichaelHolley/HabitKit/issues"
			target="_blank"
			class="group link-hover link flex flex-row items-center justify-center gap-3 text-sm transition-all"
		>
			<GitHubIconComponent class="h-6 w-6 group-hover:scale-105" />
			Report issues on GitHub
		</a>
	</div>
</footer>
