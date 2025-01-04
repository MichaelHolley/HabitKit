import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const actions: Actions = {
	createHabit: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');

		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const habit = await prisma.habit.create({
			data: {
				name: name as string,
				userId: event.locals.user.id,
				dates: []
			}
		});

		return redirect(302, `/${habit.id}`);
	}
};
