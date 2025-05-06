import 'dotenv/config';
import { GitHub, Google } from 'arctic';

if (!process.env.GITHUB_CLIENT_ID) throw new Error('GITHUB_CLIENT_ID is not set');
if (!process.env.GITHUB_CLIENT_SECRET) throw new Error('GITHUB_CLIENT_SECRET is not set');

if (!process.env.GOOGLE_CLIENT_ID) throw new Error('GOOGLE_CLIENT_ID is not set');
if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error('GOOGLE_CLIENT_SECRET is not set');

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID,
	process.env.GITHUB_CLIENT_SECRET,
	null
);

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	'http://localhost:5173/login/google/callback'
);
