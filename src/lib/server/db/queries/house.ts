import { eq } from 'drizzle-orm';
import { db } from '../index';
import { houseTable, houseUserTable } from '../schema';
import type { HouseNullable, HouseDraft, HouseUserDraft } from '$schema_types';

export async function getHouseFromId(id: string): Promise<HouseNullable | null> {
	const [house] = await db.select().from(houseTable).where(eq(houseTable.id, id));
	return house ?? null;
}

export async function createHouse(house_data: HouseDraft): Promise<HouseNullable | null> {
	const [house] = await db.insert(houseTable).values(house_data).returning();
	const house_user_data_draft = {
		user_id: house_data.user_id,
		house_id: house.id
	} as HouseUserDraft;
	const [house_user] = await db.insert(houseUserTable).values(house_user_data_draft).returning();
	if (!house_user) {
		return null;
	}
	return house ?? null;
}
