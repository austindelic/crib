import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { z } from 'zod';

const themes = ['light', 'dark'] as const;
const languages = ['en', 'es', 'fr'] as const;
const allergies = ['peanuts', 'dairy', 'gluten', 'soy', 'shellfish'] as const;

const schema = z.object({
	email: z.string().email('Please enter a valid email.'),
	bio: z.string().optional(),
	theme: z.enum(themes).default('light'),
	language: z.enum(languages).default('en'),
	marketingEmails: z.boolean().default(true),
	allergies: z.array(z.enum(allergies))
});

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schema))
	};
};
