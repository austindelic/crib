import { goto } from '$app/navigation';
import { redirect, type Page } from '@sveltejs/kit';

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

export function redirectToParent(page: Page<Record<string, string>, string | null>) {
	const currentPath = page.url.pathname;
	const segments: string[] = currentPath.split('/');
	if (segments.length > 1) {
		segments.pop();
		const parentPath = segments.join('/') + '/';
		goto(parentPath);
	}
}

export function redirectToChild(url: string, page: Page<Record<string, string>, string | null>) {
	const currentPath = page.url.pathname;
	const segments: string[] = currentPath.split('/');
	if (segments.length > 1) {
		segments.push(url);
		const parentPath = segments.join('/') + '/';
		goto(parentPath);
	}
}
