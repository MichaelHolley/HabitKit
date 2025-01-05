import { deleteHabit, getHabitForUser, updateDates } from '$lib/server/habit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}

	const habit = await getHabitForUser(event.params.id, event.locals.user.id);

	return { habit: habit };
};

export const actions: Actions = {
	addDate: async (event) => {
		const formData = await event.request.formData();
		const date = formData.get('date') as string;

		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const habit = await getHabitForUser(event.params.id, event.locals.user.id);

		if (habit && habit.dates && typeof habit.dates === 'object' && Array.isArray(habit.dates)) {
			const dates = habit.dates as Prisma.JsonArray;

			if (!dates.includes(date)) {
				dates.push(date);
			}

			await updateDates(event.params.id, event.locals.user.id, dates as string[]);
		}
	},
	delete: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		await deleteHabit(event.params.id, event.locals.user.id);

		return redirect(302, `/`);
	}
};
