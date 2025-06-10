import type { HouseIssue } from '$schema_types';
import { getHouseIssuesFromHouseId } from '$server/db/queries/issues';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { house_id } = params;
	const issues: HouseIssue[] | null = await getHouseIssuesFromHouseId(house_id);
	return {
		issues
	};
};
