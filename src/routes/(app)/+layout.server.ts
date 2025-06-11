import type { House, User } from '$schema_types';
import { getHousesFromUserId } from '$server/db/queries/house_users';
import { getRoute, safeRedirect } from '$utils/routing.utils';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals, route }) => {
	const user: User = locals.user;
	if (!user) {
		redirect(302, '/');
	}
	const houses: House[] | null = await getHousesFromUserId(user.id);
	const current_route = getRoute(route.id);

	if (!user.dob) {
		safeRedirect(current_route, '/');
	} else {
		if (houses === null && current_route !== '/help') {
			safeRedirect(current_route, '/new-house');
		}
	}

	return {
		user,
		houses
	};
};
