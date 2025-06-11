import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/form_schemas/house/create_house.schema';
import { createHouse } from '$lib/server/db/queries/house';
import { throwError } from '$utils/error.utils';

import type { PageServerLoad, Actions } from './$types';
import type { HouseDraft } from '$schema_types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(schema));
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
	}
};
