import type { HouseIssue, HouseIssueDraft } from '$schema_types';
import {
	createHouseIssue,
	getHouseIssueFromId,
	getHouseIssuesFromHouseId,
	updateHouseIssue
} from '$server/db/queries/issues';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema as create_schema } from '$lib/form_schemas/issue/create_issue.schema';
import { schema as edit_schema } from '$lib/form_schemas/issue/edit_issue.schema';

import type { Actions, PageServerLoad } from './$types';
import { base } from '$app/paths';
import { throwError } from '$utils/error.utils';

export const load: PageServerLoad = async (event) => {
	const { house_id } = event.params;
	const issues: HouseIssue[] | null = await getHouseIssuesFromHouseId(house_id);
	const create_form = await superValidate(event, zod(create_schema));
	const edit_form = await superValidate(event, zod(edit_schema));
	return {
		issues,
		create_form,
		edit_form
	};
};

export const actions: Actions = {
	create: async (event) => {
		const { id: user_id } = event.locals.user;
		const { house_id } = event.params;
		const { data: form_data } = await superValidate(event, zod(create_schema));
		const issue_data = {
			...form_data,
			user_id,
			house_id
		} as HouseIssueDraft;
		const new_issue = await createHouseIssue(issue_data);
		if (!new_issue) {
			throwError('FAILED_TO_CREATE_HOUSE_ISSUE');
		}
		return {};
	},
	edit: async (event) => {
		const { data: form_data } = await superValidate(event, zod(edit_schema));
		const base_issue = await getHouseIssueFromId(form_data.id);
		if (!base_issue) {
			throwError('HOUSE_ISSUE_DOES_NOT_EXIST');
		}
		const issue_data: HouseIssue = {
			...base_issue,
			...form_data,
			last_updated: new Date(Date.now())
		};
		const updates_issue: HouseIssue | null = await updateHouseIssue(issue_data);
		if (!updates_issue) {
			throwError('FAILED_TO_UPDATE_HOUSE_ISSUE');
		}
		return {};
	}
};
