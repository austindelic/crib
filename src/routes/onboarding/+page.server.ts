import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { updateUser } from '$lib/server/db/queries/user';
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		// const form = await superValidate(event, zod(schema));
		const form = await superValidate(event, zod(schema));
		if (!form.valid) {
			return fail(401);
		}
		if (!event.locals.user) {
			return fail(401, { message: 'User not authenticated' });
		}
		const updated_user = await updateUser(event.locals.user);
		if (updated_user) {
			redirect(302, '/')
		}
	}
};
