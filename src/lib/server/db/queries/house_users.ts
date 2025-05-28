import { houseTable, houseUserTable } from '$server/db/schema';
import { db } from '$server/db/index';
import type { House, HouseUser, HouseUserDraft } from '$schema_types';
import { eq, and } from 'drizzle-orm';

export async function createHouseUser(house_user_data: HouseUserDraft): Promise<HouseUser | null> {
	const [house_user] = await db.insert(houseUserTable).values(house_user_data).returning();

	return house_user ?? null;
}

export async function isUserInHouse(user_id: string, house_id: string): Promise<boolean> {
	const result = await db
		.select({
			houseUser: houseUserTable
		})
		.from(houseUserTable)
		.where(and(eq(houseUserTable.user_id, user_id), eq(houseUserTable.house_id, house_id)));
	return result.length > 0;
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
