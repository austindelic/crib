import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/form_schemas/onboarding/onboarding.schema';
import { throwError } from '$utils/error.utils';
import type { User } from '$schema_types';
import { format } from 'date-fns';
import { updateUser } from '$server/db/queries/user';

export const load: PageServerLoad = async ({ locals }) => {
	const user: User = locals.user;
	let onboarding_needed: boolean = false;
	const onboarding_form: Promise<SuperValidated<Infer<typeof schema>>> = superValidate(zod(schema));
	if (!user.dob) {
		onboarding_needed = true;
	}

	return {
		onboarding_form,
		onboarding_needed
	};
};

export const actions: Actions = {
	submit: async (event) => {
		const form = await superValidate(event, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		if (!event.locals.user) {
			throwError('USER_NOT_LOGGED_IN');
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
