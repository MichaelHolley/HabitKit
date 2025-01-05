<script>
	import { goto } from '$app/navigation';
	const { backUrl } = $props();
</script>

<div>
	<button class="link-hover link link-primary" onclick={() => goto(backUrl)}>&larr; Go back</button>
</div>
