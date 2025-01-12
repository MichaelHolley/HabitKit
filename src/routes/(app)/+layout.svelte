<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import type { LayoutData } from './$types';

	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="container mx-auto px-3 py-8">
	<div class="mb-7 flex flex-row items-center justify-between">
		<span class="text-4xl font-bold text-primary">Habit<span class="text-accent">Kit</span></span>
		<div class="text-right">
			<span class="text-xs">
				Logged in as <span class="text-primary">{data.user?.username ?? 'UNDEFINED'}</span>
			</span>
			<form method="post" action="?/logout" use:enhance>
				<button class="text-md btn btn-link link-accent btn-xs px-0">Sign out</button>
			</form>
		</div>
	</div>

	{@render children()}
</div>
