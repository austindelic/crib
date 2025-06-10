import { format } from 'date-fns';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/form_schemas/onboarding/onboarding.schema';
import { updateUser } from '$lib/server/db/queries/user';
import type { User } from '$schema_types';
import { throwError } from '$utils/error.utils';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions: Actions = {
	submit: async (event) => {
		const form = await superValidate(event, zod(schema));
		if (!event.locals.user) {
			throwError('USER_NOT_LOGGED_IN');
		}
		if (!event.locals.user) {
			throwError('USER_FORBIDDEN');
		}

		const user_data: User = {
			...event.locals.user,
			name: form.data.name,
			email: form.data.email,
			dob: format(form.data.dob, 'MM-dd-yyyy'),
			phone_number: form.data.phone_number ?? null
		};

		const updated_user = await updateUser(user_data);
		if (!updated_user) {
			throwError('FAILED_TO_ONBOARD_USER');
		}
		redirect(302, '/'); //should happen automatically but just in case
	}
};
