<script lang="ts">
	const { completionRate, loading = false } = $props<{
		completionRate: number;
		loading?: boolean;
	}>();

	type EngagementScore = 'low' | 'medium' | 'high';

	const engagementScore: EngagementScore = $derived.by(() => {
		if (completionRate < 0.33) {
			return 'low';
		} else if (completionRate < 0.66) {
			return 'medium';
		} else {
			return 'high';
		}
	});
</script>

<div>
	<div class="stat place-items-center">
		<div class="stat-value mb-4 pt-4">
			{#if loading}
				<div class="skeleton my-2 h-8 w-8"></div>
			{:else}
				<div
					class="*:bg-base-100 *:border-base-content/60 text-2xs flex h-2 flex-row gap-1 text-center font-bold *:h-full *:w-12 *:rounded-full *:border"
				>
					<div class="{engagementScore === 'low' ? '!bg-secondary' : ''} ">
						{#if engagementScore === 'low'}<div class="-mt-4">LOW</div>{/if}
					</div>
					<div class={engagementScore === 'medium' ? '!bg-accent' : ''}>
						{#if engagementScore === 'medium'}<div class="-mt-4">MEDIUM</div>{/if}
					</div>
					<div class={engagementScore === 'high' ? '!bg-primary' : ''}>
						{#if engagementScore === 'high'}<div class="-mt-4">HIGH</div>{/if}
					</div>
				</div>
			{/if}
		</div>
		<div class="stat-desc">Engagement Score</div>
	</div>
</div>
