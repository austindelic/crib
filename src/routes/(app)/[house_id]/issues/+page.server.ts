import type { HouseIssue, HouseIssueDraft, User } from '$schema_types';
import {
	createHouseIssue,
	deleteHouseIssueFromId,
	getHouseIssueFromId,
	getHouseIssuesFromHouseId,
	updateHouseIssue
} from '$server/db/queries/issues';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema as create_schema } from '$lib/form_schemas/issue/create_issue.schema';
import { schema as edit_schema } from '$lib/form_schemas/issue/edit_issue.schema';
import { schema as delete_schema } from '$lib/form_schemas/issue/delete_issue.schema';
import type { Actions, PageServerLoad } from './$types';
import { throwError } from '$utils/error.utils';

export const load: PageServerLoad = async (event) => {
	const user: User = event.locals.user;
	const { house_id } = event.params;
	const issues: HouseIssue[] = (await getHouseIssuesFromHouseId(house_id)) ?? [];
	const create_form = await superValidate(event, zod(create_schema));
	const edit_form = await superValidate(event, zod(edit_schema));
	const delete_form = await superValidate(event, zod(delete_schema));
	return {
		user,
		issues,
		create_form,
		edit_form,
		delete_form
	};
};

export const actions: Actions = {
	create: async (event) => {
		const { id: user_id } = event.locals.user;
		const { house_id } = event.params;
		const form = await superValidate(event, zod(create_schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const issue_data = {
			...form.data,
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
		const form = await superValidate(event, zod(edit_schema));
		if (!form.valid) {
			// return the invalid form so your client <FieldErrors/> can show the message
			return fail(400, { form });
		}
		const base_issue = await getHouseIssueFromId(form.data.id);
		if (!base_issue) {
			throwError('HOUSE_ISSUE_DOES_NOT_EXIST');
		}
		const issue_data: HouseIssue = {
			...base_issue,
			...form.data,
			last_updated: new Date(Date.now())
		};
		const updates_issue: HouseIssue | null = await updateHouseIssue(issue_data);
		if (!updates_issue) {
			throwError('FAILED_TO_UPDATE_HOUSE_ISSUE');
		}
		return {};
	},
	delete: async (event) => {
		const { id: user_id } = event.locals.user;
		const { house_id } = event.params;
		const form = await superValidate(event, zod(delete_schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const issue = await getHouseIssueFromId(form.data.id);
		if (!issue) {
			throwError('HOUSE_ISSUE_DOES_NOT_EXIST');
		}
		if (
			!(
				form.data.id === issue.id &&
				form.data.name === issue.name &&
				user_id === issue.user_id &&
				house_id === issue.house_id
			)
		) {
			throwError('FAILED_TO_DELETE_HOUSE_ISSUE_FORBIDDEN');
		}
		await deleteHouseIssueFromId(form.data.id);
		return {};
	}
};
