// src/hooks.server.ts
import { validateSessionToken } from '$server/auth/session';
import { dev } from '$app/environment';
import { setSessionTokenCookie, deleteSessionTokenCookie } from '$server/auth/cookies';
import type { Handle } from '@sveltejs/kit';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

export const handle: Handle = async ({ event, resolve }) => {
	injectAnalytics({ mode: dev ? 'development' : 'production' });
	const token = event.cookies.get('session') ?? null;

	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	const { session, user } = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expires_at);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};
