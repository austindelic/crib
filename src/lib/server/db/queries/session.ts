import { eq } from 'drizzle-orm';
import { db } from '../index';
import { sessionTable, userTable } from '../schema';
import type { SessionNullable, Session } from '../types';

export async function createSessionStrict(
	session_data: Session
): Promise<SessionNullable | null> {
	const [session] = await db.insert(sessionTable).values(session_data).returning();
	return session ?? null;
}

export async function updateSessionExpirydate(
	new_expiery_date: Date,
	session_id: string
): Promise<void> {
	await db
		.update(sessionTable)
		.set({
			expires_at: new_expiery_date
		})
		.where(eq(sessionTable.id, session_id));
}

export async function selectSessionFromIdWithUser(session_id: string) {
	const result = await db
		.select({ user: userTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(userTable, eq(sessionTable.user_id, userTable.id))
		.where(eq(sessionTable.id, session_id));
	return result ?? null;
}

export async function deleteSession(session_id: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, session_id));
}
