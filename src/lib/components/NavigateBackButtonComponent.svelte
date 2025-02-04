<script lang="ts">
	const { backUrl } = $props<{ backUrl: string }>();
</script>

<a class="link-hover link decoration-secondary" href={backUrl}>
	<span class="text-secondary">&larr;</span>Go back
</a>
