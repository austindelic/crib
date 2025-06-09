import { houseChatTable, userTable } from '$server/db/schema';
import { db } from '$server/db/index';
import type { HouseChat, HouseChatDraft } from '$schema_types';
import { eq } from 'drizzle-orm';

export async function createHouseChat(house_chat_data: HouseChatDraft): Promise<HouseChat | null> {
	const [house_chat] = await db.insert(houseChatTable).values(house_chat_data).returning();

	return house_chat ?? null;
}

export async function getHouseChatsFromHouseIdWithUserName(
	house_id: string
): Promise<(HouseChat & { user_name: string })[] | null> {
	const result = await db
		.select({
			chat: houseChatTable,
			user_name: userTable.name // Only select the user's name
		})
		.from(houseChatTable)
		.innerJoin(userTable, eq(houseChatTable.user_id, userTable.id))
		.where(eq(houseChatTable.house_id, house_id));

	return result.length
		? result.map((row) => ({
				...row.chat,
				user_name: row.user_name ?? '' // Fallback to an empty string if user_name is null
			}))
		: null;
}
