import type { Actions } from './$types';
import type { HouseJoinCodeDraft, User } from '$schema_types';
import {
	createHouseJoinCode,
	deleteOldJoinCodesFromUser
} from '$server/db/queries/house_join_code';
import { env } from '$env';
import { throwError } from '$utils/error.utils';

export const actions: Actions = {
	default: async ({ locals, params }) => {
		//create and new code.
		const house_id = params.house_id; //this is the mose MVP code i have ever seen.
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
			throwError('FAILED_TO_CREATE_JOINCODE');
		}
		//remove all codes from only THIS user EXCLUDING the one we just made.
		const result = await deleteOldJoinCodesFromUser(join_code);
		if (result === null) {
			throwError('FAILED_TO_DELETE_OLD_USER_JOINCODES');
		}
		const join_code_url = `${env.URL}/new-house/join?code=${join_code.id}`;
		return { join_code: join_code.id, join_code_url };
	}
};
