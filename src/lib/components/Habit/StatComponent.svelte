<script lang="ts">
	import type { StatItem } from '$lib/utils/stats';
	import Icon from '@iconify/svelte';
	import { ICON_MAP } from '../icons';

	const { stat } = $props<{ stat: StatItem }>();
</script>

<div>
	<div class="stat place-items-center">
		<div class="stat-title flex flex-row gap-1">
			{stat.title}
			{#if stat.trend === 'up'}
				<Icon icon={ICON_MAP.arrowRightUp} class="text-success" />
			{:else if stat.trend === 'down'}
				<Icon icon="ic:baseline-arrow-downward" class="text-error" />
			{/if}
		</div>
		<div class="stat-value">{stat.value}</div>
		{#if stat.description}
			<div class="stat-desc">
				{stat.description}
			</div>
		{/if}
	</div>
</div>
