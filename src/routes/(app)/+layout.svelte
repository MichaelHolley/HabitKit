<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import type { LayoutData } from './$types';

	const { children, data } = $props<{ data: LayoutData; children: Snippet }>();
</script>

<div class="py-3 md:py-8">
	<noscript>
		<div role="alert" class="alert alert-warning mb-4">
			<span>Warning: JavaScript is required to have flawless experience within the app!</span>
		</div>
	</noscript>
	<div class="mb-7 flex flex-row items-center justify-between">
		<a href="/" class="flex flex-row gap-1 text-4xl font-bold text-primary">
			<img src="/habitkit-icon.svg" alt="Logo" width="38" />Habit<span class="text-secondary"
				>Kit</span
			>
		</a>
		<div class="text-right">
			<span class="text-xs">
				Logged in as <span class="font-extrabold">{data.user?.username ?? 'UNDEFINED'}</span>
			</span>
			<form method="POST" action="/?/logout" use:enhance>
				<button class="text-md btn btn-link link-secondary btn-xs px-0">Sign out</button>
			</form>
		</div>
	</div>

	{@render children()}
</div>
