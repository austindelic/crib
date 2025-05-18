import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';
import { db } from '../index';
import { houseJoinCodeTable } from '../schema';
import type { HouseJoinCodeDraft, HouseJoinCode } from '../types';

export async function getHouseJoinCodeFromId(id: string): Promise<HouseJoinCode | null> {
	const [join_code] = await db
		.select()
		.from(houseJoinCodeTable)
		.where(eq(houseJoinCodeTable.id, id));
	return join_code ?? null;
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
