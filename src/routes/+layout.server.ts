import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

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

function getRoute(route_id: string | null): string {
	return (route_id ?? '').replace(/\(.*?\)/g, ''); // removes all (group) parts
}

function safeRedirect(route: string | null, redirect_route: string, status_code = 302) {
	if (route != redirect_route) {
		throw redirect(status_code, redirect_route);
	}
}

export const load = (async ({ locals, route }) => {
	const user = locals.user;
	const current_route = getRoute(route.id);

	if (user) {
		// there is a user
		if (!user.dob) {
			safeRedirect(current_route, '/');
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
