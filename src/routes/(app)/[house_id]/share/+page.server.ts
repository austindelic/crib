import type { Actions } from './$types';
import type { HouseJoinCodeDraft, User } from '$schema_types';
import {
	createHouseJoinCode,
	deleteOldJoinCodesFromUser
} from '$server/db/queries/house_join_code';
import { error } from '@sveltejs/kit';
import { env } from '$env';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		//create and new code.
		const formData = await request.formData();
		const house_id = formData.get('house_id') as string; //this is the mose MVP code i have ever seen.
		const user: User = locals.user;
		const join_code_value = Math.random().toString(36).substring(2, 8).toUpperCase();
		const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		const house_join_code_draft = {
			id: join_code_value,
			user_id: user.id,
			house_id,
			expires_at
		} as HouseJoinCodeDraft;
		//create and new code to the DB.
		const join_code = await createHouseJoinCode(house_join_code_draft);
		if (!join_code) {
			throw error(500, 'Failed to create join code. Please try again later.');
		}
		//remove all codes from only THIS user EXCLUDING the one we just made.
		const result = await deleteOldJoinCodesFromUser(join_code);
		if (!result) {
			throw error(500, 'i have NOOOO clue');
		}
		const join_code_url = `${env.URL}/new-house/join?code=${join_code.id}`;
		return { join_code: join_code.id, join_code_url };
	}
};
