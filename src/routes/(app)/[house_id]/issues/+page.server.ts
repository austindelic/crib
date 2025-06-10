import type { HouseIssue, HouseIssueDraft } from '$schema_types';
import { createHouseIssue, getHouseIssuesFromHouseId } from '$server/db/queries/issues';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/form_schemas/create_issue.schema';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { house_id } = event.params;
	const issues: HouseIssue[] | null = await getHouseIssuesFromHouseId(house_id);
	const create_form = await superValidate(event, zod(schema));
	return {
		issues,
		create_form
	};
};

export const actions: Actions = {
	create: async (event) => {
		const { id: user_id } = event.locals.user;
		const { house_id } = event.params;
		const { data: form_data } = await superValidate(event, zod(schema));
		const issue_data = {
			...form_data,
			user_id,
			house_id
		} as HouseIssueDraft;
		const issue = await createHouseIssue(issue_data);
		if (!issue) {
			// TODO: throw error for no issue created
		}
		return {};
	}
};
