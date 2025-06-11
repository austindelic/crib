import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/form_schemas/join_code/join_code.schema';
import { selectHouseFromJoinCode } from '$lib/server/db/queries/house_join_code';
import { createHouseUser } from '$lib/server/db/queries/house_users';
import type { HouseUserDraft } from '$schema_types';
import { throwError } from '$utils/error.utils';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions: Actions = {
	submit: async (event) => {
		const form = await superValidate(event, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		if (!event.locals.user) {
			throwError('USER_NOT_LOGGED_IN');
		}

		if (!event.locals.user) {
			if (!form.valid) {
				throwError('USER_FORBIDDEN');
			}
		}
		const join_code_data = form.data.join_code;
		const house = await selectHouseFromJoinCode(join_code_data);
		if (!house) {
			throwError('HOUSE_JOINCODE_DOES_NOT_EXIST');
		}
		const house_user_data = {
			user_id: event.locals.user.id,
			house_id: house?.id
		} as HouseUserDraft;
		const house_user = await createHouseUser(house_user_data);
		if (!house_user) {
			throwError('FAILED_TO_CREATE_HOUSE_USER');
		}
		redirect(302, '/');
	}
};
