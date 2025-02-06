import { createGoal } from '$lib/server/goal';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		presetOptions: [
			{
				title: 'Read 12 Books',
				description: 'Read at least 12 books in a year',
				target: 12
			},
			{
				title: 'Write 6 Blog Posts',
				description: 'Write at least 12 blog posts in a year',
				target: 6
			},
			{
				title: 'Run a marathon',
				description: 'Run a marathon in a year',
				target: 1
			}
		]
	};
};

export const actions: Actions = {
	createGoal: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get('title');
		const description = formData.get('description');
		const target = parseInt(formData.get('target') as string);

		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const goal = await createGoal(
			title as string,
			target,
			event.locals.user.id,
			description as string
		);

		return redirect(302, `/${goal.id}`);
	}
};
