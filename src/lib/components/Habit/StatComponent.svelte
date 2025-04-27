<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';
	import { ICON_MAP } from '../icons';

	const {
		title,
		description,
		trend,
		value,
		children,
		loading = false
	} = $props<{
		title: string;
		value?: string | number;
		children?: Snippet;
		description?: string;
		trend?: 'up' | 'down';
		loading?: boolean;
	}>();
</script>

<div>
	<div class="stat place-items-center">
		<div class="stat-title flex flex-row items-center gap-1">
			{#if loading && !title}
				<div class="skeleton h-4 w-28"></div>
			{:else}
				{title}
				{#if trend === 'up'}
					<Icon icon={ICON_MAP.arrowRightUp} class="text-success" />
				{:else if trend === 'down'}
					<Icon icon="ic:baseline-arrow-downward" class="text-error" />
				{/if}
			{/if}
		</div>
		<div class="stat-value">
			{#if loading}
				<div class="skeleton my-2 h-8 w-8"></div>
			{:else}
				{#if value}
					{value}
				{/if}
				{#if children}
					<div class="min-h-5">
						{@render children()}
					</div>
				{/if}
			{/if}
		</div>
		{#if loading}
			<div class="skeleton mb-2 h-4 w-32"></div>
		{:else if description}
			<div class="stat-desc">
				{description}
			</div>
		{/if}
	</div>
</div>
