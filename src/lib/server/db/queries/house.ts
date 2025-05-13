import { eq } from 'drizzle-orm';
import { db } from '../index';
import { houseTable } from '../schema';
import type { House, HouseDraft } from '../types';

export async function getHouseFromId(id: string): Promise<House | null> {
	const [user] = await db.select().from(houseTable).where(eq(houseTable.id, id));
	return user ?? null;
}

export async function createHouse(house_data: HouseDraft): Promise<House | null> {
	const [user] = await db.insert(houseTable).values(house_data).returning();
	return user ?? null;
}
