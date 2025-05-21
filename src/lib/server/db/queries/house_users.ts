import { houseTable, houseUserTable } from '../schema';
import { db } from '../index';
import type { House, HouseUser, HouseUserDraft } from '$schema_types';
import { eq } from 'drizzle-orm';

export async function createHouseUser(house_user_data: HouseUserDraft): Promise<HouseUser | null> {
	const [house_user] = await db.insert(houseUserTable).values(house_user_data).returning();

	return house_user ?? null;
}

export async function getHousesFromUserId(user_id: string): Promise<House[] | null> {
	const result = await db
		.select({
			houseUser: houseUserTable,
			house: houseTable
		})
		.from(houseUserTable)
		.innerJoin(houseTable, eq(houseUserTable.house_id, houseTable.id))
		.where(eq(houseUserTable.user_id, user_id));

	// Extract only the house objects
	const houses = result.map(({ house }) => house);

	return houses.length ? houses : null;
}
