import { eq } from 'drizzle-orm';
import { db } from '../index';
import { userTable } from '../schema';
import type { UserNullable, UserDraft } from '../types';

const DISALLOW_NEW_USERS = false;

export async function getUserFromGitHubId(githubId: number): Promise<UserNullable | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.github_id, githubId));
	return user ?? null;
}

export async function getUserFromGoogleId(googleId: string): Promise<UserNullable | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.google_id, googleId));
	return user ?? null;
}

export async function getUserFromId(id: string): Promise<UserNullable | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.id, id));
	return user ?? null;
}

export async function createUser(user_data: UserDraft): Promise<UserNullable | null> {
	if (DISALLOW_NEW_USERS) {
		return null;
	}
	const [user] = await db.insert(userTable).values(user_data).returning();
	return user ?? null;
}
