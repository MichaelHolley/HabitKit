import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const getHabitForUser = async (id: string, userId: string) => {
	const habit = await prisma.habit.findUnique({
		where: {
			id: id,
			userId: userId
		}
	});

	if (!habit) return null;

	return { ...habit, dates: (habit.dates as Prisma.JsonArray).sort().reverse() };
};

export const getUserHabits = async (userId: string) => {
	const habits = await prisma.habit.findMany({
		where: {
			userId: userId
		}
	});

	return habits.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};

export const updateDates = async (id: string, userId: string, dates: string[]) => {
	return await prisma.habit.update({
		where: { id: id, userId: userId },
		data: {
			dates
		}
	});
};

export const createHabit = async (title: string, userId: string, description?: string) => {
	return await prisma.habit.create({
		data: {
			title: title,
			description: description,
			userId: userId,
			dates: []
		}
	});
};

export const deleteHabit = async (id: string, userId: string) => {
	await prisma.habit.delete({
		where: {
			id: id,
			userId: userId
		}
	});
};
