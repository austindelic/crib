import type { House, User } from '$schema_types';
import { getHousesFromUserId } from '$server/db/queries/house_users';
import { getRoute, safeRedirect } from '$server/utils';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, route }) => {
	const user: User = locals.user;
	const houses: House[] | null = await getHousesFromUserId(user.id);
	const current_route = getRoute(route.id);
	if (!user.dob) {
		safeRedirect(current_route, '/onboarding');
		// internal logic to force onboarding.
	} else {
		if (current_route == '/onboarding') {
			redirect(302, '/');
		}
	}

	return {
		user,
		houses
	};
}) satisfies LayoutServerLoad;
