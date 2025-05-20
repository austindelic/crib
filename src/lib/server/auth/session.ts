import { sessionTable } from '../db/schema';
import type { User, Session } from '$lib/schema-types';
import { eq } from 'drizzle-orm';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { db } from '../db/index';
import {
	createSessionStrict,
	selectSessionFromIdWithUser,
	updateSessionExpirydate,
	deleteSessionFromId
} from '../db/queries/session';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, user_id: string): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		user_id,
		expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await createSessionStrict(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await selectSessionFromIdWithUser(sessionId);
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (Date.now() >= session.expires_at.getTime()) {
		await deleteSessionFromId(session.id);
		return { session: null, user: null };
	}
	if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		updateSessionExpirydate(session.expires_at, session.id);
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateAllSessions(userId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.user_id, userId));
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
