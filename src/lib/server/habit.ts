import { prisma } from './prisma';

export const getHabitForUser = async (id: string, userId: string) => {
	const habit = await prisma.habit.findUnique({
		where: {
			id: id,
			userId: userId
		}
	});

	return habit;
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
	await prisma.habit.update({
		where: { id: id, userId: userId },
		data: {
			dates
		}
	});
};

export const createHabit = async (name: string, userId: string) => {
	const habit = await prisma.habit.create({
		data: {
			name: name as string,
			userId: userId,
			dates: []
		}
	});

	return habit;
};

export const deleteHabit = async (id: string, userId: string) => {
	await prisma.habit.delete({
		where: {
			id: id,
			userId: userId
		}
	});
};
