import { Prisma, PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}

	const habit = await prisma.habit.findFirst({
		where: {
			id: event.params.id,
			userId: event.locals.user.id
		}
	});

	return { habit: habit };
};

export const actions: Actions = {
	addDate: async (event) => {
		const formData = await event.request.formData();
		const date = formData.get('date') as string;

		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const habit = await prisma.habit.findFirst({
			where: {
				id: event.params.id,
				userId: event.locals.user.id
			}
		});

		const dates = habit?.dates ?? [];

		if (habit && habit.dates && typeof habit.dates === 'object' && Array.isArray(habit.dates)) {
			const dates = habit.dates as Prisma.JsonArray;

			if (!dates.includes(date)) {
				dates.push(date);
			}
		}

		await prisma.habit.update({
			where: { id: event.params.id },
			data: {
				dates
			}
		});

		return redirect(302, `/${event.params.id}`);
	}
};
