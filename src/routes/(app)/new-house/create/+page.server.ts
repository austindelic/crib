import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/form_schemas/create_house.schema';
import type { HouseDraft } from '$schema_types';
import { createHouse } from '$lib/server/db/queries/house';
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(schema));
		if (!event.locals.user) {
			return fail(401, { message: 'No user?' });
		}

		if (!form.valid) {
			return fail(401);
		}
		if (!event.locals.user) {
			return fail(401, { message: 'User not authenticated' });
		}

		const house_data = {
			name: form.data.house_name,
			user_id: event.locals.user.id
		} as HouseDraft;
		const house = await createHouse(house_data);
		if (house) {
			redirect(302, '/');
		}
	}
};
