import type { House, User } from '$schema_types';
import { getRoute, safeRedirect } from '$utils/routing.utils';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getHouseFromId } from '$server/db/queries/house';

export const load = (async ({ params, locals, route }) => {
	const { house_id } = params;
	const user: User = locals.user;
	const house: House | null = await getHouseFromId(house_id);
	const current_route = getRoute(route.id);

	if (!user.dob) {
		safeRedirect(current_route, '/onboarding');
		// internal logic to force onboarding.
	} else {
		if (current_route == '/onboarding') {
			redirect(302, '/');
		}
	}

	if (!house) {
		throw error(404, 'House not found');
	}

	return {
		user,
		house
	};
}) satisfies LayoutServerLoad;
