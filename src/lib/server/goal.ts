import { prisma } from './prisma';

export const getGoalForUser = async (id: string, userId: string) => {
	const goal = await prisma.goal.findUnique({
		where: {
			id,
			userId,
			deletedAt: null
		}
	});

	if (!goal) return null;

	return goal;
};

export const getUserGoals = async (userId: string) => {
	const goals = await prisma.goal.findMany({
		where: {
			userId,
			deletedAt: null
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
		where: { userId: userId, id: id, deletedAt: null },
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
		where: { id, userId, deletedAt: null }
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
		where: { id, userId, deletedAt: null }
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
	await prisma.goal.update({
		where: { userId: userId, id: id },
		data: {
			deletedAt: new Date()
		}
	});
};

export const completeGoal = async (id: string, userId: string) => {
	return await prisma.goal.update({
		where: { userId, id, deletedAt: null },
		data: {
			complete: true
		}
	});
};
