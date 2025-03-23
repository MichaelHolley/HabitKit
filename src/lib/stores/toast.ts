import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
	message: string;
	type: ToastType;
	id: string;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	return {
		subscribe,
		show: (message: string, type: ToastType = 'info') => {
			const id = `${Date.now()}_${type}`;
			update((toasts) => [...toasts, { message, type, id }]);

			// Auto-remove after 3 seconds
			setTimeout(() => {
				update((toasts) => toasts.filter((t) => t.id !== id));
			}, 3000);
		},
		remove: (id: string) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		}
	};
}

export const toasts = createToastStore();
