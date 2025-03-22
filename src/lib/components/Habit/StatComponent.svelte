<script lang="ts">
	import type { StatItem } from '$lib/utils/stats';
	import Icon from '@iconify/svelte';
	import { ICON_MAP } from '../icons';

	const { stat, loading = false } = $props<{ stat: StatItem; loading?: boolean }>();
</script>

<div>
	<div class="stat place-items-center">
		<div class="stat-title flex flex-row gap-1">
			{#if loading && !stat.title}
				<div class="skeleton h-4 w-28"></div>
			{:else}
				{stat.title}
				{#if stat.trend === 'up'}
					<Icon icon={ICON_MAP.arrowRightUp} class="text-success" />
				{:else if stat.trend === 'down'}
					<Icon icon="ic:baseline-arrow-downward" class="text-error" />
				{/if}
			{/if}
		</div>
		<div class="stat-value">
			{#if loading}
				<div class="skeleton my-2 h-8 w-8"></div>
			{:else}
				{stat.value}
			{/if}
		</div>
		{#if loading}
			<div class="skeleton mb-2 h-4 w-32"></div>
		{:else if stat.description}
			<div class="stat-desc">
				{stat.description}
			</div>
		{/if}
	</div>
</div>
