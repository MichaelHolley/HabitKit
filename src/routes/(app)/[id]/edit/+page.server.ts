import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createHabit } from '$lib/server/habit';
import type { PageServerLoad } from '../$types';
import { getHabitForUser } from '$lib/server/habit';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}

	const habit = await getHabitForUser(event.params.id, event.locals.user.id);

	if (habit === null) {
		return redirect(302, '/');
	}

	return { habit: habit };
};

export const actions: Actions = {
	updateHabit: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get('title');
		const description = formData.get('description');

		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const habit = await createHabit(title as string, event.locals.user.id, description as string);

		return redirect(302, `/${habit.id}`);
	}
};
