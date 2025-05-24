import { toasts } from '$lib/stores/toast';
import type { SubmitFunction } from '@sveltejs/kit';

interface FormHandlerOptions {
	onBefore?: () => void | Promise<void>;
	onSuccess?: () => void | Promise<void>;
	onError?: () => void | Promise<void>;
	onFailure?: () => void | Promise<void>;
	onRedirect?: () => void | Promise<void>;
	onAfter?: () => void | Promise<void>;
	successMessage?: string;
	errorMessage?: string;
	failureMessage?: string;
	showToasts?: boolean;
}

export const createFormHandler = (options: FormHandlerOptions = {}): SubmitFunction => {
	const {
		onBefore,
		onSuccess,
		onError,
		onFailure,
		onRedirect,
		onAfter,
		successMessage = 'Success!',
		errorMessage = 'Operation failed!',
		failureMessage = 'Operation failed!',
		showToasts = true
	} = options;

	return () => {
		// Execute before hook
		onBefore?.();

		return async ({ result, update }) => {
			try {
				// Handle different result types
				if (result.type === 'success') {
					if (showToasts) {
						toasts.show(successMessage, 'success');
					}
					await onSuccess?.();
				} else if (result.type === 'redirect') {
					if (showToasts) {
						toasts.show(successMessage, 'success');
					}
					await onRedirect?.();
				} else if (result.type === 'error') {
					if (showToasts) {
						toasts.show(result.error?.message || errorMessage, 'error');
					}
					await onError?.();
				} else if (result.type === 'failure') {
					if (showToasts) {
						toasts.show(
							result.data?.message || JSON.stringify(result.data) || failureMessage,
							'warning'
						);
					}
					await onFailure?.();
				}

				await update();
			} finally {
				await onAfter?.();
			}
		};
	};
};

// Convenience functions for common use cases
export const defaultHandleSubmit = createFormHandler();

export const defaultHandleDeleteSubmit = createFormHandler({
	successMessage: 'Item deleted!',
	errorMessage: 'Deletion failed!'
});

// Utility for creating flash effects
export const createFlashHandler = (
	flashStateSetter: (value: boolean) => void,
	duration: number = 600,
	baseOptions: FormHandlerOptions = {}
) => {
	return createFormHandler({
		...baseOptions,
		onSuccess: async () => {
			flashStateSetter(true);
			setTimeout(() => flashStateSetter(false), duration);
			await baseOptions.onSuccess?.();
		},
		onRedirect: async () => {
			flashStateSetter(true);
			setTimeout(() => flashStateSetter(false), duration);
			await baseOptions.onRedirect?.();
		}
	});
};
