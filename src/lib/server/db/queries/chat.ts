import { houseChatTable } from '$server/db/schema';
import { db } from '$server/db/index';
import type { HouseChat, HouseChatDraft } from '$schema_types';
import { eq } from 'drizzle-orm';

export async function createHouseChat(house_chat_data: HouseChatDraft): Promise<HouseChat | null> {
	const [house_chat] = await db.insert(houseChatTable).values(house_chat_data).returning();

	return house_chat ?? null;
}

export async function getHouseChatsFromHouseId(house_id: string): Promise<HouseChat[] | null> {
	const result = await db
		.select()
		.from(houseChatTable)
		.where(eq(houseChatTable.house_id, house_id));

	return result.length ? result : null;
}
