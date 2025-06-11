import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema as create_schema } from '$lib/form_schemas/house/create_house.schema';
import { schema as join_scehma } from '$lib/form_schemas/house/join_house.schema';
import { createHouse } from '$server/db/queries/house';
import { throwError } from '$utils/error.utils';
import type { PageServerLoad, Actions } from './$types';
import type { HouseDraft, HouseUserDraft } from '$schema_types';
import { selectHouseFromJoinCode } from '$server/db/queries/house_join_code';
import { createHouseUser } from '$server/db/queries/house_users';

export const load: PageServerLoad = async () => {
	const create_house_form = await superValidate(zod(create_schema));
	const join_house_form = await superValidate(zod(join_scehma));
	return {
		create_house_form,
		join_house_form
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(create_schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const house_data = {
			name: form.data.house_name,
			user_id: event.locals.user.id
		} as HouseDraft;
		const house = await createHouse(house_data);
		if (!house) {
			throwError('FAILED_TO_CREATE_HOUSE');
		}
		redirect(302, '/');
	},

	join: async (event) => {
		const form = await superValidate(event, zod(join_scehma));
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
