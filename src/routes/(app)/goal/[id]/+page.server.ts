import { completeGoal, deleteGoal, nextStage, previousStage } from '$lib/server/goal';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	nextStage: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		await nextStage(event.params.id, event.locals.user.id);
	},
	previousStage: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		await previousStage(event.params.id, event.locals.user.id);
	},
	delete: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		await deleteGoal(event.params.id, event.locals.user.id);

		return redirect(302, `/`);
	},
	complete: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		await completeGoal(event.params.id, event.locals.user.id);

		return redirect(302, `/`);
	}
};
