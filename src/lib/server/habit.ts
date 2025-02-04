import { type Habit as PrismaClientHabit } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from './prisma';

export const getHabitForUser = async (id: string, userId: string) => {
	const habit = await prisma.habit.findUnique({
		where: {
			id: id,
			userId: userId
		}
	});

	if (!habit) return null;

	return mapToSimpleModel(habit);
};

export const getUserHabits = async (userId: string) => {
	const habits = await prisma.habit.findMany({
		where: {
			userId: userId
		}
	});

	return habits
		.sort((a, b) => {
			const today = dayjs().startOf('day');
			const twoWeeksAgo = today.clone();
			twoWeeksAgo.subtract(14, 'day');

			const countActiveDays = (habit: PrismaClientHabit) => {
				return (habit.dates as string[]).filter((date) => {
					const dateObj = dayjs(date);
					return dateObj.isAfter(twoWeeksAgo) && dateObj.isBefore(today);
				}).length;
			};

			return countActiveDays(b) - countActiveDays(a);
		})
		.map(mapToSimpleModel);
};

export const updateDates = async (id: string, userId: string, dates: string[]) => {
	const habit = await prisma.habit.update({
		where: { id: id, userId: userId },
		data: {
			dates
		}
	});

	return mapToSimpleModel(habit);
};

export const createHabit = async (title: string, userId: string, description?: string) => {
	const habit = await prisma.habit.create({
		data: {
			title: title,
			description: description,
			userId: userId,
			dates: []
		}
	});

	return mapToSimpleModel(habit);
};

export const updateHabit = async (
	id: string,
	userId: string,
	title: string,
	description?: string
) => {
	const habit = await prisma.habit.update({
		where: { userId: userId, id: id },
		data: {
			title: title,
			description: description
		}
	});

	return mapToSimpleModel(habit);
};

export const deleteHabit = async (id: string, userId: string) => {
	await prisma.habit.delete({
		where: {
			id: id,
			userId: userId
		}
	});
};

const mapToSimpleModel = (habit: PrismaClientHabit): Habit => {
	return {
		id: habit.id,
		title: habit.title,
		description: habit.description,
		createdAt: habit.createdAt,
		updatedAt: habit.updatedAt,
		dates: (habit.dates as string[]).sort()
	};
};

export interface Habit {
	id: string;
	title: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
	dates: string[];
}
