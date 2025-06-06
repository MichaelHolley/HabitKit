import type { HabitDTO } from '$lib/server/habit';
import dayjs from 'dayjs';

export const getHabitStats = async (habit: HabitDTO) => {
	return getDatesData(habit.dates);
};

const getDatesData = (dates: string[]): StatItem[] => {
	const sortedDates = [...new Set(dates)]
		.map((date) => dayjs(date))
		.sort((a, b) => a.valueOf() - b.valueOf());

	const weekdayMap = new Map<string, number>();

	if (sortedDates.length === 0) return [];

	let tempMaxStreak = [sortedDates[0]];
	let maxStreak = [sortedDates[0]];
	for (let i = 0; i < sortedDates.length; i++) {
		// most active weekday
		const weekday = sortedDates[i].format('dddd');
		weekdayMap.set(weekday, (weekdayMap.get(weekday) || 0) + 1);

		if (i === 0) continue;

		// check if date is max 1 day after previous date
		if (sortedDates[i].diff(sortedDates[i - 1], 'day') === 1) {
			tempMaxStreak.push(sortedDates[i]);
			if (tempMaxStreak.length > maxStreak.length) {
				maxStreak = [...tempMaxStreak];
			}
		} else {
			tempMaxStreak = [sortedDates[i]];
		}
	}

	// get the number of days since the first registered date
	const daysSinceStarted = dayjs().diff(sortedDates[0], 'day') + 1;

	// get the most active weekday from the map
	const weekdayMapArray = Array.from(weekdayMap.entries());
	weekdayMapArray.sort((a, b) => b[1] - a[1]);

	// get current streak from the back, and the current date should be tentative
	let countCurrentStreak = 0;
	let currentStreakLast: dayjs.Dayjs | null = sortedDates[sortedDates.length - 1];

	if (dayjs().diff(currentStreakLast, 'day') > 1) {
		currentStreakLast = null;
	} else {
		for (let i = sortedDates.length - 1; i >= 0; i--) {
			if (Math.abs(sortedDates[i].diff(currentStreakLast, 'day')) <= 1) {
				countCurrentStreak++;
				currentStreakLast = sortedDates[i];
			} else {
				break;
			}
		}
	}

	const maxStreakLength = maxStreak.map((date) => date.format('YYYY-MM-DD')).length;

	return [
		{
			title: 'Longest Streak',
			value: maxStreakLength,
			description: `Starting ${maxStreak[0].format('DD MMM YYYY')}`
		},
		{
			title: 'Current Streak',
			value: countCurrentStreak,
			description:
				countCurrentStreak != 0 && currentStreakLast
					? `Starting ${currentStreakLast.format('DD MMM YYYY')}`
					: 'Not on a streak',
			trend: countCurrentStreak >= maxStreakLength ? 'up' : undefined
		},
		{
			title: 'Completion Rate',
			value: Math.floor((sortedDates.length / daysSinceStarted) * 100) + '%',
			description: `${sortedDates.length} of ${daysSinceStarted} days`
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
