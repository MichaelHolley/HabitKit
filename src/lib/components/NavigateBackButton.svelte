<script>
	import { goto } from '$app/navigation';
	const { backUrl } = $props();
</script>

<div>
	<button class="link-hover link link-primary" onclick={() => goto(backUrl)}>Go back</button>
</div>
