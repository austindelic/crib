import { eq } from 'drizzle-orm';
import { db } from '../index';
import { userTable } from '../schema';
import type { User, UserDraft } from '../types';

export async function getUserFromGitHubId(githubId: number): Promise<User | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.githubId, githubId));
	return user ?? null;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.googleId, googleId));
	return user ?? null;
}

export async function createUser(user_data: UserDraft): Promise<User | null> {
	const [user] = await db.insert(userTable).values(user_data).returning();
	return user ?? null;
}
