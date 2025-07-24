import { redirect } from '@sveltejs/kit';
import { getHabitForUser } from '$lib/server/habit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}

	const habit = await getHabitForUser(event.params.id, event.locals.user.id);

	if (habit === null) {
		return redirect(302, '/');
	}

	const dates = habit.dates || [];
	const csvContent = dates.join('\n');

	return new Response(csvContent, {
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': `attachment; filename=${event.params.id}.csv`
		}
	});
};
