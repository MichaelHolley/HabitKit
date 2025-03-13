<script lang="ts">
	import Icon from '@iconify/svelte';
	import { ICON_MAP } from './icons';

	const { backUrl } = $props<{ backUrl: string }>();
</script>

<a class="link-hover link decoration-secondary flex items-center space-x-1" href={backUrl}>
	<Icon icon={ICON_MAP.arrowLeft} class="text-secondary" />Go back
</a>
