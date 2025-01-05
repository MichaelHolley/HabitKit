import { hash } from '@node-rs/argon2';
import { prisma } from './prisma';

export const findUser = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: {
			username: username
		}
	});

	return user;
};

export const createUser = async (username: string, password: string) => {
	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	const user = await prisma.user.create({
		data: {
			username: username as string,
			passwordHash: passwordHash as string
		}
	});

	return user;
};
