import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const TEST_MODE = true;
export const load: LayoutServerLoad = async (event) => {
	// Allow root page (/) to be public
	if (event.route.id === '/' || event.route.id === '/home' || event.route.id === '/login') {
		return {};
	}
	if (TEST_MODE) {
		if (event.route.id === '/test') {
			return {};
		}
	}
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}
	if (!event.locals.user.dob) {
		throw redirect(302, '/onboarding');
	}
	return {
		user: event.locals.user
	};
};
