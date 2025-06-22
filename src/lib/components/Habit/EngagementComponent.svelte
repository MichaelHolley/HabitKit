<script lang="ts">
	const { completionRate, class: className } = $props<{
		completionRate: number;
		class?: string;
	}>();

	type EngagementScore = 'apathic' | 'interested' | 'committed' | 'obsessed';

	const engagementScore: EngagementScore = $derived.by(() => {
		if (completionRate < 0.15) {
			return 'apathic' as EngagementScore;
		} else if (completionRate < 0.4) {
			return 'interested';
		} else if (completionRate < 0.7) {
			return 'committed';
		} else {
			return 'obsessed';
		}
	});
</script>

<div class={className}>
	<div class="h-5"></div>
	<div
		class="*:bg-base-100 *:border-base-content/60 text-2xs flex h-2 flex-row gap-1 text-center font-bold *:h-full *:w-12 *:rounded-full *:border"
	>
		<div class={engagementScore === 'apathic' ? '!bg-secondary' : ''}>
			{#if engagementScore === 'apathic'}<div class="-mt-4">Apathic</div>{/if}
		</div>
		<div class={engagementScore === 'interested' ? '!bg-primary' : ''}>
			{#if engagementScore === 'interested'}<div class="-mt-4">Interested</div>{/if}
		</div>
		<div class={engagementScore === 'committed' ? '!bg-info' : ''}>
			{#if engagementScore === 'committed'}<div class="-mt-4">Commited</div>{/if}
		</div>
		<div class={engagementScore === 'obsessed' ? '!bg-accent' : ''}>
			{#if engagementScore === 'obsessed'}<div class="-mt-4">Obsessed</div>{/if}
		</div>
	</div>
</div>
