import { nanoid } from 'nanoid';
import { and, eq, not } from 'drizzle-orm';
import { db } from '../index';
import { houseJoinCodeTable, houseTable } from '../schema';
import type { HouseJoinCodeDraft, HouseJoinCode, House } from '$schema_types';

export async function selectAllHouseJoinCode(): Promise<HouseJoinCode[] | null> {
	const house_join_codes = await db.select().from(houseJoinCodeTable);
	return house_join_codes;
}

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

export async function deleteOldJoinCodesFromUser(
	join_code_data: HouseJoinCode
): Promise<number | null> {
	const result = await db
		.delete(houseJoinCodeTable)
		.where(
			and(
				eq(houseJoinCodeTable.user_id, join_code_data.user_id),
				not(eq(houseJoinCodeTable.id, join_code_data.id)),
				eq(houseJoinCodeTable.house_id, join_code_data.house_id)
			)
		)
		.execute();
	return result.rowCount;
}
