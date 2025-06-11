// routes/login/google/callback/+server.ts
import { generateSessionToken, createSession } from '$lib/server/auth/session';
import { setSessionTokenCookie } from '$lib/server/auth/cookies';
import { createUser, getUserFromGoogleId, updateUser } from '$lib/server/db/queries/user';
import { google } from '$lib/server/auth/oauth';
import { decodeIdToken } from 'arctic';
import type { User, UserDraft } from '$schema_types';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { throwError } from '$utils/error.utils';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
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
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const claims = decodeIdToken(tokens.idToken()) as {
		sub: string;
		name?: string;
		picture?: string;
	};
	const googleUserId = claims.sub;
	const username = claims.name;
	const avatarUrl = claims.picture ?? null;
	const existingUser: User | null = await getUserFromGoogleId(googleUserId);

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id!);
		setSessionTokenCookie(event, sessionToken, session.expires_at!);
		if (!existingUser.avatar_url) {
			const updated_user: User | null = await updateUser({
				...existingUser,
				avatar_url: avatarUrl ?? null
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
		username: username,
		google_id: googleUserId,
		avatar_url: avatarUrl
	} as UserDraft;

	const user: User | null = await createUser(user_data);
	if (!user) {
		throwError('FAILED_TO_CREATE_USER_FROM_GOOGLE');
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
