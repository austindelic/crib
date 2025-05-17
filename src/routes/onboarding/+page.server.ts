import { format } from 'date-fns';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { updateUser } from '$lib/server/db/queries/user';
import type { User } from '$lib/server/db/types';
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(schema));
		if (!event.locals.user) {
			return fail(401, { message: 'No user?' });
		}
		const user_data: User = {
			...event.locals.user,
			name: form.data.name,
			email: form.data.email,
			dob: format(form.data.dob, 'MM-dd-yyyy'),
			phone_number: form.data.phone_number ?? null
		};

		if (!form.valid) {
			return fail(401);
		}
		if (!event.locals.user) {
			return fail(401, { message: 'User not authenticated' });
		}
		const updated_user = await updateUser(user_data);
		if (updated_user) {
			redirect(302, '/');
		}
	}
};
