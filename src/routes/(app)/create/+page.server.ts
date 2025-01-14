import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createHabit } from '$lib/server/habit';

export const actions: Actions = {
	createHabit: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		const description = formData.get('description');

		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const habit = await createHabit(name as string, event.locals.user.id, description as string);

		return redirect(302, `/${habit.id}`);
	}
};
