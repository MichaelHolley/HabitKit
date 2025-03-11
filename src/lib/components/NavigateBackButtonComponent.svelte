<script lang="ts">
	import Icon from '@iconify/svelte';
	import { ICON_MAP } from './icons';

	const { backUrl } = $props<{ backUrl: string }>();
</script>

<a class="link-hover link flex flex-row items-center gap-1 decoration-secondary" href={backUrl}>
	<Icon icon={ICON_MAP.arrowLeft} class="text-secondary" />Go back
</a>
