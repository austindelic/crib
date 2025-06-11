import { generateSessionToken, createSession } from '$server/auth/session';
import { setSessionTokenCookie } from '$server/auth/cookies';
import { github } from '$server/auth/oauth';
import { getUserFromGitHubId, createUser, updateUser } from '$server/db/queries/user';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import type { User, UserDraft } from '$schema_types';
import { throwError } from '$utils/error.utils';

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
		if (!existingUser.avatar_url) {
			const updated_user: User | null = await updateUser({
				...existingUser,
				avatar_url: `https://avatars.githubusercontent.com/u/${githubUserId}`
			});
			if (!updated_user) {
				throwError('FAILED_TO_UPDATE_USER_AVATAR_URL');
			}
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}
	const user_data = {
		github_id: githubUserId,
		username: githubUsername,
		avatar_url: `https://avatars.githubusercontent.com/u/${githubUserId}`
	} as UserDraft;

	const user: User | null = await createUser(user_data);
	if (!user) {
		throwError('FAILED_TO_CREATE_USER_FROM_GITHUB');
	}
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
