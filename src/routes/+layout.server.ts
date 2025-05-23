import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getRoute, safeRedirect } from '$server/utils';

const PUBLIC_ROUTES = ['/home', '/home/pricing', '/home/about', '/home/contact'];
const TEST_ROUTES = ['/test'];

const CONFIG = {
	testMode: true
};

function isPublicRoute(route_id: string | null): boolean {
	return PUBLIC_ROUTES.includes(route_id ?? '');
}

function isTestRoute(route_id: string | null): boolean {
	return CONFIG.testMode && TEST_ROUTES.includes(route_id ?? '');
}
export const load = (async ({ locals, route }) => {
	const user = locals.user;
	const current_route = getRoute(route.id);
	if (user) {
		// there is a user
		if (!user.dob) {
			safeRedirect(current_route, '/onboarding');
			// internal logic to force onboarding.
		}
		return { user };
	} else {
		//there is no user

		if (current_route == '/') {
			throw redirect(302, '/home');
		}
		if (isPublicRoute(current_route) || isTestRoute(current_route)) {
			return {};
		}
	}

	//throw redirect(302, '/home');
}) satisfies LayoutServerLoad;
