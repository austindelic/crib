import { getHouseIssuesFromHouseId } from '$server/db/queries/issues';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { house_id } = params;
	const issues = await getHouseIssuesFromHouseId(house_id);
	return {
		issues
	};
};
