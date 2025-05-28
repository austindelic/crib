import { redirect } from '@sveltejs/kit';

export function getRoute(route_id: string | null): string {
	return (route_id ?? '')
		.replace(/\(.*?\)/g, '') // remove groups
		.replace(/\/{2,}/g, '/'); // replace double slashes with single
}

export function safeRedirect(route: string | null, redirect_route: string, status_code = 302) {
	if (route != redirect_route) {
		redirect(status_code, redirect_route);
	}
}
