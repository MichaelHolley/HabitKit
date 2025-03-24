<script lang="ts">
	import { enhance } from '$app/forms';
	import { ICON_MAP } from '$lib/components/icons';
	import { toasts } from '$lib/stores/toast';
	import Icon from '@iconify/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import type { LayoutData } from './$types';

	const { children, data } = $props<{ data: LayoutData; children: Snippet }>();

	export const handleLogout: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success' || result.type === 'redirect') {
				toasts.show('You were logged out!', 'success');
			} else if (result.type === 'error') {
				toasts.show('Logout failed!', 'error');
			}

			await update();
		};
	};
</script>

<div class="py-3 md:py-8">
	<noscript>
		<div role="alert" class="alert alert-warning mb-4">
			<span>Warning: JavaScript is required to have flawless experience within the app!</span>
		</div>
	</noscript>
	<div class="mb-7 flex flex-row items-center justify-between">
		<a href="/" class="text-primary flex flex-row gap-1 text-4xl font-bold">
			<img src="/habitkit-icon.svg" alt="Logo" width="38" />Habit<span class="text-secondary"
				>Kit</span
			>
		</a>
		<div class="text-right">
			<span class="text-xs">
				Logged in as <span class="font-extrabold">{data.user?.username ?? 'UNDEFINED'}</span>
			</span>
			<form method="POST" action="/?/logout" use:enhance={handleLogout}>
				<button class="text-md btn btn-link link-secondary btn-xs gap-1 px-0">
					<Icon icon={ICON_MAP.logout} />
					Sign out
				</button>
			</form>
		</div>
	</div>

	{@render children()}
</div>
