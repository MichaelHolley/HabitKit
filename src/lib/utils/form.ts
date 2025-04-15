import { toasts } from '$lib/stores/toast';
import type { SubmitFunction } from '@sveltejs/kit';

export const defaultHandleSubmit: SubmitFunction = () => {
	return async ({ result, update }) => {
		if (result.type === 'success' || result.type === 'redirect') {
			toasts.show('Success!', 'success');
		} else if (result.type === 'error') {
			toasts.show(result.error?.message || 'Operation failed!', 'error');
		} else if (result.type === 'failure') {
			toasts.show(
				result.data?.message || JSON.stringify(result.data) || 'Operation failed!',
				'warning'
			);
		}

		await update();
	};
};

export const defaultHandleDeleteSubmit: SubmitFunction = () => {
	return async ({ result, update }) => {
		if (result.type === 'success' || result.type === 'redirect') {
			toasts.show('Item deleted!', 'info');
		} else if (result.type === 'error') {
			toasts.show('Deletion failed!', 'error');
		} else if (result.type === 'failure') {
			toasts.show(
				result.data?.message || JSON.stringify(result.data) || 'Operation failed!',
				'warning'
			);
		}

		await update();
	};
};
