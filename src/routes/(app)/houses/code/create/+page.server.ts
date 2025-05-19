import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import type { HouseDraft, HouseJoinCodeDraft } from '$lib/server/db/types';
import { createHouse } from '$lib/server/db/queries/house';
import { createHouseJoinCode } from '$lib/server/db/queries/house_join_code';
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
		redirect(302, '/');
	},
	createJoinCode: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'User not authenticated' });
		}

		// Generate a random join code
        const join_house_code_data = {
            user_id: event.locals.user,
            house_id: 

        } as HouseJoinCodeDraft;
		const join_house_code = await createHouseJoinCode();

		// Optionally, save the join code to the database here

		// Return the join code to the client
		return {
			success: true,
			joinCode
		};
	}
};
