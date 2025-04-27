<script lang="ts">
	const { completionRate, class: className } = $props<{
		completionRate: number;
		class?: string;
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

<div class={className}>
	<div
		class="*:bg-base-100 *:border-base-content/60 text-2xs flex h-2 flex-row gap-1 text-center font-bold *:h-full *:w-12 *:rounded-full *:border"
	>
		<div class={engagementScore === 'low' ? '!bg-secondary' : ''}>
			{#if engagementScore === 'low'}<div class="-mt-4">LOW</div>{/if}
		</div>
		<div class={engagementScore === 'medium' ? '!bg-accent' : ''}>
			{#if engagementScore === 'medium'}<div class="-mt-4">MEDIUM</div>{/if}
		</div>
		<div class={engagementScore === 'high' ? '!bg-primary' : ''}>
			{#if engagementScore === 'high'}<div class="-mt-4">HIGH</div>{/if}
		</div>
	</div>
</div>
