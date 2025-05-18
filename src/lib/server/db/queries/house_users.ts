import { houseUserTable } from '../schema';
import { db } from '../index';
import type { HouseUser, HouseUserDraft } from '../types';

export async function createHouseUser(house_user_data: HouseUserDraft): Promise<HouseUser | null> {
	const [house_user] = await db.insert(houseUserTable).values(house_user_data).returning();

	return house_user ?? null;
}
