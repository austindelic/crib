import type { HouseIssue, User } from '$schema_types';
import type { PageServerLoad } from './$types';

import { getHouseIssueFromId } from '$server/db/queries/issues';
import { throwError } from '$utils/error.utils';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user: User = locals.user;
	const { issue_id, house_id } = params;

	const issue: HouseIssue | null = await getHouseIssueFromId(issue_id);

	if (!issue) {
		throwError('ISSUE_DOES_NOT_EXIST');
	}
	if (issue.house_id !== house_id) {
		throwError('ISSUE_DOES_NOT_HAVE_CORRECT_HOUSE_ID');
	}

	return {
		user,
		issue
	};
};
