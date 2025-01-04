import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth');
	}

	const habits = [];
	return { user: event.locals.user, habits };
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
