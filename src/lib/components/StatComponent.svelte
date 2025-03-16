<script lang="ts">
	let {
		title,
		value,
		description,
		hideDesc = false
	} = $props<{
		title: string;
		value: string | number;
		description: string;
		hideDesc?: boolean;
	}>();
</script>

<div class="stat place-items-center">
	<div class="stat-title">{title}</div>
	<div class="stat-value">{value}</div>
	{#if !hideDesc}
		<div class="stat-desc">
			{description}
		</div>
	{/if}
</div>
