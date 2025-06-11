import { eq } from 'drizzle-orm';
import { db } from '../index';
import { userTable } from '../schema';
import type { UserDraft, User } from '$schema_types';

export async function getUserFromGitHubId(githubId: number): Promise<User | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.github_id, githubId));
	return user ?? null;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.google_id, googleId));
	return user ?? null;
}

export async function getUserFromId(id: string): Promise<User | null> {
	const [user] = await db.select().from(userTable).where(eq(userTable.id, id));
	return user ?? null;
}

export async function createUser(user_data: UserDraft): Promise<User | null> {
	const [user] = await db.insert(userTable).values(user_data).returning();
	return user ?? null;
}

export async function updateUser(user_data: User): Promise<User | null> {
	const [updated_user] = await db
		.update(userTable)
		.set(user_data)
		.where(eq(userTable.id, user_data.id))
		.returning();

	return updated_user ?? null;
}
