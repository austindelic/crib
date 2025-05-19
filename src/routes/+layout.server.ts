import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const PUBLIC_ROUTES = ['/home', '/login', '/home/pricing', '/home/about', '/homecontact'];
const TEST_ROUTES = ['/test'];

const CONFIG = {
	testMode: true,
	onboardingPath: '/onboarding',
	loginPath: '/login'
};

function isPublicRoute(route_id: string | null): boolean {
	return PUBLIC_ROUTES.includes(route_id ?? '');
}

function isTestRoute(route_id: string | null): boolean {
	return CONFIG.testMode && TEST_ROUTES.includes(route_id ?? '');
}

export const load = (async ({ locals, route }) => {
	const user = locals.user;
	const route_id = route.id;
	if (user) {
		if (!user.dob) {
			if (route_id !== CONFIG.onboardingPath) {
				throw redirect(302, CONFIG.onboardingPath);
			}
		} else if (route_id == '/onboarding') {
			throw redirect(302, '/');
		}
		return { user };
	} else {
		if (route_id == '/') {
			throw redirect(302, '/home');
		}
		if (isPublicRoute(route_id) || isTestRoute(route_id)) {
			return {};
		}
	}

	throw redirect(302, CONFIG.loginPath);
}) satisfies LayoutServerLoad;
