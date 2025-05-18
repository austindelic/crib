import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { selectHouseFromJoinCode } from '$lib/server/db/queries/house_join_code';
import { createHouseUser } from '$lib/server/db/queries/house_users';
import type { HouseUserDraft } from '$lib/server/db/types';
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
		const join_code_data = form.data.join_code;
		const house = await selectHouseFromJoinCode(join_code_data);
		if (!house) {
			throw new Error('Failed to select house from join code');
		}
		const house_user_data = {
			user_id: event.locals.user.id,
			house_id: house?.id
		} as HouseUserDraft;
		const house_user = await createHouseUser(house_user_data);
		if (house_user) {
			redirect(302, '/');
		}
	}
};
