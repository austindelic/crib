import { deleteSessionsFromUserId } from '$lib/server/db/queries/session';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
	const { user } = locals;
	if (!user) {
		return new Response('Unauthorised', { status: 401 });
	}

	await deleteSessionsFromUserId(user.id);

	// Optionally clear the session from cookies etc. here too if you're using a session store

	return json({ success: true });
};
