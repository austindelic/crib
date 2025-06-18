import type { House, User } from '$schema_types';
import { getRoute, safeRedirect } from '$utils/routing.utils';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getHouseFromId } from '$server/db/queries/house';
import { isUserInHouse } from '$server/db/queries/house_users';
import { throwError } from '$utils/error.utils';

export const load: LayoutServerLoad = async ({ params, locals, route }) => {
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
		throwError('HOUSE_NOT_FOUND');
	}
	const is_valid_house_member = await isUserInHouse(user.id, house.id);
	if (!is_valid_house_member) {
		throwError('NOT_MEMBER_OF_HOUSE'); //act like the house does not exist at all if user is not member
	}

	return {
		user,
		house
	};
};
