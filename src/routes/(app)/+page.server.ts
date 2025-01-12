import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { getUserHabits } from '$lib/server/habit';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth');
	}

	const habits = await getUserHabits(event.locals.user.id);

	const summary = habits.map((habit) => {
		let dates = habit.dates as Prisma.JsonArray;
		const thirtyDaysAgo = dayjs().subtract(30, 'days');

		if (typeof dates === 'object' && Array.isArray(dates)) {
			dates = dates.filter((date) => {
				const dateAsDate = dayjs(date as string);
				return dateAsDate > thirtyDaysAgo;
			});
		}

		return {
			id: habit.id,
			name: habit.name,
			dates: dates
		};
	});

	return { user: event.locals.user, habits: habits, summary: summary };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/auth');
	}
};
