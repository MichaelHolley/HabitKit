<script lang="ts">
	import { toasts } from '$lib/stores/toast';
</script>

<div class="toast toast-end z-50">
	{#each $toasts as toast (toast.id)}
		<div class="alert alert-{toast.type} alert-soft">
			<span>{toast.message}</span>
			<!-- <button
				class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
				on:click={() => toasts.remove(toast.id)}
			>
				<Icon icon="mdi:close" />
			</button> -->
		</div>
	{/each}
</div>
