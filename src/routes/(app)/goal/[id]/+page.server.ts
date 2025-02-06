import { nextStage } from '$lib/server/goal';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	nextStage: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		await nextStage(event.params.id, event.locals.user.id);
	}
};
