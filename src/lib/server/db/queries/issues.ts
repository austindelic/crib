import { eq } from 'drizzle-orm';
import { db } from '../index';
import { houseIssueTable } from '../schema';
import type { HouseIssueDraft, HouseIssue } from '$schema_types';

export async function getHouseIssueFromId(issue_id: string): Promise<HouseIssue | null> {
	const [issue] = await db.select().from(houseIssueTable).where(eq(houseIssueTable.id, issue_id));
	return issue ?? null;
}

export async function deleteHouseIssueFromId(issue_id: string) {
	await db.delete(houseIssueTable).where(eq(houseIssueTable.id, issue_id));
}

export async function getHouseIssuesFromHouseId(house_id: string): Promise<HouseIssue[] | null> {
	const issues = await db
		.select()
		.from(houseIssueTable)
		.where(eq(houseIssueTable.house_id, house_id));
	return issues ?? null;
}

export async function createHouseIssue(
	house_issue_data: HouseIssueDraft
): Promise<HouseIssue | null> {
	const [issue] = await db.insert(houseIssueTable).values(house_issue_data).returning();
	return issue ?? null;
}

export async function updateHouseIssue(house_issue_data: HouseIssue): Promise<HouseIssue | null> {
	const [updatedIssue] = await db
		.update(houseIssueTable)
		.set(house_issue_data)
		.where(eq(houseIssueTable.id, house_issue_data.id))
		.returning();

	return updatedIssue ?? null;
}
