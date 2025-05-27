import type { House, User } from '$schema_types';
import { getRoute, safeRedirect } from '$utils/routing.utils';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getHouseFromId } from '$server/db/queries/house';
import { isUserInHouse } from '$server/db/queries/house_users';

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
	const is_valid_house_member = await isUserInHouse(user.id, house.id);
	console.log(is_valid_house_member);
	if (!is_valid_house_member) {
		redirect(302, '/');
	}

	return {
		user,
		house
	};
}) satisfies LayoutServerLoad;
