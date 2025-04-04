<script lang="ts">
	import Icon from '@iconify/svelte';
	import { ICON_MAP } from './icons';

	const { children } = $props();
	const id = Math.random().toString(36).substring(2, 15);
</script>

<button
	class="btn btn-ghost btn-xs px-1"
	aria-label="Options"
	popovertarget="popover-{id}"
	style="anchor-name:--anchor-{id}"
>
	<Icon icon={ICON_MAP.more} />
</button>

<ul
	popover
	id="popover-{id}"
	class="menu dropdown menu-sm rounded-box bg-base-100 w-56 gap-1"
	style="position-anchor:--anchor-{id}"
>
	{@render children()}
</ul>
