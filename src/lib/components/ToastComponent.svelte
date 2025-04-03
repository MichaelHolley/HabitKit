<script lang="ts">
	import { toasts } from '$lib/stores/toast';
</script>

<div class="toast toast-end z-50">
	{#each $toasts as toast (toast.id)}
		<div
			class="alert alert-soft"
			class:alert-success={toast.type === 'success'}
			class:alert-error={toast.type === 'error'}
			class:alert-warning={toast.type === 'warning'}
			class:alert-info={toast.type === 'info'}
		>
			<span>{toast.message}</span>
		</div>
	{/each}
</div>
