import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async (event) => {
	// Allow root page (/) to be public
	if (event.route.id === '/' || event.route.id === '/home' || event.route.id === '/login') {
		return {};
	}
	// Require login for all other routes
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}
	return {
		user: event.locals.user
	};
};
