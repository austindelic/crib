import { generateSessionToken, createSession } from '$lib/server/auth/session';
import { setSessionTokenCookie } from '$lib/server/auth/cookies';
import { github } from '$lib/server/auth/oauth';
import { getUserFromGitHubId, createUser } from '$lib/server/db/queries/user';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import type { UserDraft } from '$schema_types';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUsername = githubUser.login;

	const existingUser = await getUserFromGitHubId(githubUserId);

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id!);
		setSessionTokenCookie(event, sessionToken, session.expires_at!);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	const user = await createUser({
		github_id: githubUserId,
		username: githubUsername,
		avatar_provider: 'github'
	} as UserDraft);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user!.id!);
	setSessionTokenCookie(event, sessionToken, session.expires_at!);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
