import { deleteHabit, getHabitForUser, updateDates } from '$lib/server/habit';
import { Prisma, type Habit } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import dayjs from 'dayjs';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}

	const habit = await getHabitForUser(event.params.id, event.locals.user.id);

	if (habit === null) {
		return redirect(302, '/');
	}

	const summary = getSummaryForHabit(habit);

	return { habit: habit, summary: summary };
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
	},
	addToday: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/');
		}

		const today = dayjs();
		const habit = await getHabitForUser(event.params.id, event.locals.user.id);

		if (habit && habit.dates && typeof habit.dates === 'object' && Array.isArray(habit.dates)) {
			const dates = habit.dates as Prisma.JsonArray;

			if (!dates.includes(today.format('YYYY-MM-DD'))) {
				dates.push(today.format('YYYY-MM-DD'));
			}

			await updateDates(event.params.id, event.locals.user.id, dates as string[]);
		}
	}
};

const getSummaryForHabit = (habit: Habit) => {
	const dates = habit.dates as Prisma.JsonArray as string[];

	const longestStreak = getLongestDateStreak(dates);
	const currentStreak = getCurrentDateStreak(dates);

	return { longestStreak, currentStreak };
};

const getLongestDateStreak = (dates: string[]) => {
	const sortedDates = [...new Set(dates)]
		.map((date) => dayjs(date))
		.sort((a, b) => a.valueOf() - b.valueOf());

	if (sortedDates.length === 0) return [];

	let currentStreak = [sortedDates[0]];
	let maxStreak = [sortedDates[0]];

	for (let i = 1; i < sortedDates.length; i++) {
		if (sortedDates[i].diff(sortedDates[i - 1], 'day') === 1) {
			currentStreak.push(sortedDates[i]);
			if (currentStreak.length > maxStreak.length) {
				maxStreak = [...currentStreak];
			}
		} else {
			currentStreak = [sortedDates[i]];
		}
	}

	return maxStreak.map((date) => date.format('YYYY-MM-DD'));
};

const getCurrentDateStreak = (dates: string[]) => {
	const sortedDates = [...new Set(dates)]
		.map((date) => dayjs(date))
		.sort((a, b) => a.valueOf() - b.valueOf());

	if (sortedDates.length === 0) return [];

	let currentStreak = [sortedDates[0]];

	for (let i = 1; i < sortedDates.length; i++) {
		if (sortedDates[i].diff(sortedDates[i - 1], 'day') === 1) {
			currentStreak.push(sortedDates[i]);
		} else {
			currentStreak = [sortedDates[i]];
		}
	}

	return currentStreak.map((date) => date.format('YYYY-MM-DD'));
};
