import type { House, User } from '$schema_types';
import { getHousesFromUserId } from '$server/db/queries/house_users';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user: User = locals.user;
	const houses: House[] | null = await getHousesFromUserId(user.id);
	return {
		user,
		houses
	};
}) satisfies LayoutServerLoad;
