import { deleteHabit, getHabitForUser, updateDates, type HabitDTO } from '$lib/server/habit';
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

	let summary = undefined;
	if (!!habit.dates && habit.dates.length > 0) {
		summary = getSummaryForHabit(habit);
	}

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
			const dates = habit.dates;
			if (!dates.includes(date)) {
				dates.push(date);
			}

			await updateDates(event.params.id, event.locals.user.id, dates);
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
			const dates = habit.dates;

			if (!dates.includes(today.format('YYYY-MM-DD'))) {
				dates.push(today.format('YYYY-MM-DD'));
			}

			await updateDates(event.params.id, event.locals.user.id, dates);
		}
	}
};

const getSummaryForHabit = (habit: HabitDTO) => {
	return getDatesData(habit.dates);
};

const getDatesData = (
	dates: string[]
): {
	longest: string[];
	current: string[];
	completionRate: number;
	mostActive: { day: string; count: number } | undefined;
	completionRateByWeeks: { week: string; count: number }[];
} => {
	const sortedDates = [...new Set(dates)]
		.map((date) => dayjs(date))
		.sort((a, b) => a.valueOf() - b.valueOf());

	const weekdayMap = new Map<string, number>();

	if (sortedDates.length === 0)
		return {
			longest: [],
			current: [],
			completionRate: 0,
			mostActive: undefined,
			completionRateByWeeks: []
		};

	let currentStreak = [sortedDates[0]];
	let maxStreak = [sortedDates[0]];

	for (let i = 0; i < sortedDates.length; i++) {
		const weekday = sortedDates[i].format('dddd');
		weekdayMap.set(weekday, (weekdayMap.get(weekday) || 0) + 1);

		if (i === 0) continue;

		if (sortedDates[i].diff(sortedDates[i - 1], 'day') === 1) {
			currentStreak.push(sortedDates[i]);
			if (currentStreak.length > maxStreak.length) {
				maxStreak = [...currentStreak];
			}
		} else {
			currentStreak = [sortedDates[i]];
		}
	}

	const daysSinceFirstDate = dayjs().diff(sortedDates[0], 'day') + 1;

	const weekdayMapArray = Array.from(weekdayMap.entries());
	weekdayMapArray.sort((a, b) => b[1] - a[1]);

	const weekMap = new Map<string, number>();
	for (let i = 0; i < sortedDates.length; i++) {
		const week = sortedDates[i].startOf('isoWeek').format('YYYY-MMM');
		weekMap.set(week, (weekMap.get(week) || 0) + 1);
	}

	// may leave some motnhs out, due to not have any entry
	const completionRateByMonths: { week: string; count: number }[] = [];
	for (const [key, value] of weekMap) {
		completionRateByMonths.push({ week: key, count: value ?? 0 });
	}

	return {
		longest: maxStreak.map((date) => date.format('YYYY-MM-DD')),
		current: currentStreak.map((date) => date.format('YYYY-MM-DD')),
		completionRate: sortedDates.length / daysSinceFirstDate,
		mostActive: { day: weekdayMapArray[0][0], count: weekdayMapArray[0][1] },
		completionRateByWeeks: completionRateByMonths
	};
};
