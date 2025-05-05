import { eq } from 'drizzle-orm';
import { db } from '../index';
import { userTable } from '../schema';

export async function getUserFromGitHubId(githubId: number) {
	const [user] = await db.select().from(userTable).where(eq(userTable.githubId, githubId));
	return user ?? null;
}

export async function createUser(githubUserId: number, githubUsername: string) {
	const [user] = await db
		.insert(userTable)
		.values({
			githubId: githubUserId,
			username: githubUsername,
			email: '' // Set email if available
		})
		.returning();
	return user ?? null;
}
