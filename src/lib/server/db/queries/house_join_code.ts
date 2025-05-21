import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';
import { db } from '../index';
import { houseJoinCodeTable, houseTable } from '../schema';
import type { HouseJoinCodeDraft, HouseJoinCode, House } from '$schema_types';

export async function selectHouseFromJoinCode(join_code_data: string): Promise<House | null> {
	const [house_join_code] = await db
		.select()
		.from(houseJoinCodeTable)
		.where(eq(houseJoinCodeTable.id, join_code_data));
	const [house] = await db
		.select()
		.from(houseTable)
		.where(eq(houseTable.id, house_join_code.house_id));
	return house ?? null;
}

export async function createHouseJoinCode(
	house_join_code_draft: HouseJoinCodeDraft
): Promise<HouseJoinCode | null> {
	const join_code_with_id = {
		...house_join_code_draft,
		id: nanoid(6).toUpperCase()
	};
	const [join_code] = await db.insert(houseJoinCodeTable).values(join_code_with_id).returning();
	return join_code ?? null;
}
