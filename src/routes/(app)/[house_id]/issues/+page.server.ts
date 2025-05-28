import type { House, User } from '$schema_types';

import type { PageServerLoad } from './$types';
import { getHousesFromUserId } from '$server/db/queries/house_users';

export const load: PageServerLoad = async (event) => {
	const user: User = event.locals.user;
	const houses: House[] | null = await getHousesFromUserId(user.id);
	return {
		user,
		houses
	};
};
