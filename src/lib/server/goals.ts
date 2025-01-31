import { prisma } from './prisma';

export const getGoalForUser = async (id: string, userId: string) => {
	const goal = await prisma.goal.findUnique({
		where: {
			id,
			userId
		}
	});

	if (!goal) return null;

	return goal;
};

export const getUserGoals = async (userId: string) => {
	const goals = await prisma.goal.findMany({
		where: {
			userId
		}
	});

	return goals.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};

export const createGoal = async (
	title: string,
	userId: string,
	target: number,
	description?: string
) => {
	const goal = await prisma.goal.create({
		data: {
			title,
			description,
			userId,
			target
		}
	});

	return goal;
};

export const updateGoal = async (
	id: string,
	userId: string,
	title: string,
	description?: string
) => {
	const goal = await prisma.goal.update({
		where: { userId: userId, id: id },
		data: {
			title,
			description
		}
	});

	return goal;
};

export const nextStage = async (id: string, userId: string) => {
	const goal = await prisma.goal.update({
		where: { userId: userId, id: id },
		data: {
			stage: {
				increment: 1
			}
		}
	});

	return goal;
};

export const prevStage = async (id: string, userId: string) => {
	const goal = await prisma.goal.update({
		where: { userId: userId, id: id },
		data: {
			stage: {
				decrement: 1
			}
		}
	});

	return goal;
};

export const deleteGoal = async (id: string, userId: string) => {
	await prisma.goal.delete({
		where: {
			id: id,
			userId: userId
		}
	});
};
