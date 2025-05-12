import { GitHub, Google } from 'arctic';
import { env } from '$lib/server/env';

export const github = new GitHub(
	env.GITHUB_CLIENT_ID,
	env.GITHUB_CLIENT_SECRET,
	`${env.URL}/login/github/callback`
);

export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	`${env.URL}/login/google/callback`
);
