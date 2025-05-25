import type { Actions } from './$types';
import type { HouseJoinCodeDraft, User } from '$schema_types';
import { createHouseJoinCode } from '$server/db/queries/house_join_code';
import { error } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const house_id = formData.get('house_id') as string;
		const user = locals.user as User;
		const join_code_value = Math.random().toString(36).substring(2, 8).toUpperCase();
		const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		const house_join_code = {
			id: join_code_value,
			user_id: user.id,
			house_id,
			expires_at
		} as HouseJoinCodeDraft;

		const join_code = await createHouseJoinCode(house_join_code);
		if (!join_code) {
			throw error(500, 'Failed to create join code. Please try again later.');
		}
		return { join_code: join_code.id };
	}
};
