import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth/session';
import { deleteSessionTokenCookie } from '$lib/server/auth/cookies';
import type { House, User } from '$schema_types';

import type { Actions, PageServerLoad } from './$types';
import { getHousesFromUserId } from '$server/db/queries/house_users';

export const load: PageServerLoad = async (event) => {
	const user: User = event.locals.user;
	const houses: House[] | null = await getHousesFromUserId(user.id);
	return {
		user,
		houses
	};
};
