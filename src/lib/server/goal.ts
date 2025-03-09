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

	return goals;
};

export const createGoal = async (
	title: string,
	target: number,
	userId: string,
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
	description?: string,
	target?: number
) => {
	const goal = await prisma.goal.update({
		where: { userId: userId, id: id },
		data: {
			title,
			description,
			target
		}
	});

	return goal;
};

export const nextStage = async (id: string, userId: string) => {
	const currentGoal = await prisma.goal.findUnique({
		where: { id, userId }
	});

	if (!currentGoal || currentGoal.stage >= currentGoal.target) {
		return currentGoal;
	}

	const goal = await prisma.goal.update({
		where: { userId, id },
		data: {
			stage: {
				increment: 1
			}
		}
	});

	return goal;
};

export const previousStage = async (id: string, userId: string) => {
	const currentGoal = await prisma.goal.findUnique({
		where: { id, userId }
	});

	if (!currentGoal || currentGoal.stage <= 0) {
		return currentGoal;
	}

	const goal = await prisma.goal.update({
		where: { userId, id },
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

export const completeGoal = async (id: string, userId: string) => {
	return await prisma.goal.update({
		where: { userId, id },
		data: {
			complete: true
		}
	});
};
