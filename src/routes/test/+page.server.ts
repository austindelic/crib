import type { PageServerLoad } from './$types';
import { getHouseUserFromUserId } from '$server/db/queries/house_users';
import type { User } from '$schema_types';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user as User;
	const houses = await getHouseUserFromUserId(user.id);
	return {
		user,
		houses
	};
};
