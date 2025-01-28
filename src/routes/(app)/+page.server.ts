import * as auth from '$lib/server/auth';
import { getUserHabits } from '$lib/server/habit';
import { fail, redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth');
	}

	const habits = await getUserHabits(event.locals.user.id);

	const summary = habits.map((habit) => {
		const thirtyDaysAgo = dayjs().subtract(30, 'days');
		const dates = habit.dates.filter((date) => {
			const dateAsDate = dayjs(date as string);
			return dateAsDate > thirtyDaysAgo;
		});

		return {
			id: habit.id,
			title: habit.title,
			dates: dates
		};
	});

	return { habits: habits, summary: summary };
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
