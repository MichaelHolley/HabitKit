import { toasts } from '$lib/stores/toast';
import type { SubmitFunction } from '@sveltejs/kit';

export const defaultHandleSubmit: SubmitFunction = () => {
	return async ({ result, update }) => {
		if (result.type === 'success' || result.type === 'redirect') {
			toasts.show('Operation successful!', 'success');
		} else if (result.type === 'error') {
			toasts.show(result.error?.message || 'Operation failed!', 'error');
		}

		await update();
	};
};
