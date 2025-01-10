import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getUserHabits } from '$lib/server/habit';
import { Prisma } from '@prisma/client';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth');
	}

	const habits = await getUserHabits(event.locals.user.id);

	// create a const summary which is an array of objects with the habit dates of the last 30 days. dates have the format YYYY-MM-DD as string
	const summary = habits.map((habit) => {
		let dates = habit.dates as Prisma.JsonArray;
		const today = new Date();

		if (typeof dates === 'object' && Array.isArray(dates)) {
			dates = dates.filter((date) => {
				const dateAsDate = new Date(date as string);
				return dateAsDate.getTime() > today.getTime() - 30 * 24 * 60 * 60 * 1000;
			});
		}

		console.log(dates);

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
