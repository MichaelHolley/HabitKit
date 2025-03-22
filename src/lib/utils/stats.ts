import type { HabitDTO } from '$lib/server/habit';
import dayjs from 'dayjs';

export const getHabitStats = (habit: HabitDTO) => {
	return getDatesData(habit.dates);
};

const getDatesData = (dates: string[]): StatItem[] => {
	const sortedDates = [...new Set(dates)]
		.map((date) => dayjs(date))
		.sort((a, b) => a.valueOf() - b.valueOf());

	const weekdayMap = new Map<string, number>();

	if (sortedDates.length === 0) return [];

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

	return [
		{
			title: 'Longest Streak',
			value: maxStreak.map((date) => date.format('YYYY-MM-DD')).length,
			description: `Starting ${dayjs(maxStreak[0]).format('DD MMM YYYY')}`
		},
		{
			title: 'Current Streak',
			value: currentStreak.map((date) => date.format('YYYY-MM-DD')).length,
			description: `Starting ${dayjs(currentStreak[0]).format('DD MMM YYYY')}`,
			trend: currentStreak.length >= maxStreak.length ? 'up' : undefined
		},
		{
			title: 'Completion Rate',
			value: Math.floor((sortedDates.length / daysSinceFirstDate) * 100) + '%',
			description: `Active days since starting`
		},
		{
			title: 'Most Active',
			value: weekdayMapArray[0][0],
			description: `${weekdayMapArray[0][1]} days`
		}
	];
};

export interface StatItem {
	title: string;
	value: string | number;
	description?: string;
	trend?: 'up' | 'down';
}
