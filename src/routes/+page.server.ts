import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth');
	}

	const habits = await prisma.habit.findMany({
		where: { userId: event.locals.user.id }
	});

	return { user: event.locals.user, habits: habits };
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
