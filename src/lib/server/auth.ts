import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from './prisma';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = await prisma.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
		}
	});
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await prisma.session.findUnique({
		where: { id: sessionId },
		include: {
			user: {
				select: {
					id: true,
					username: true
				}
			}
		}
	});

	if (!result) {
		return { session: null, user: null };
	}

	const { expiresAt } = result;
	const sessionExpired = Date.now() >= expiresAt.getTime();
	if (sessionExpired) {
		await prisma.session.delete({ where: { id: sessionId } });
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		const updatedSession = await prisma.session.update({
			where: { id: sessionId },
			data: { expiresAt: new Date(Date.now() + DAY_IN_MS * 30) }
		});
		return { session: updatedSession, user: result.user };
	}

	return { session: result, user: result.user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await prisma.session.delete({ where: { id: sessionId } });
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/',
		httpOnly: true,
		secure: true
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
