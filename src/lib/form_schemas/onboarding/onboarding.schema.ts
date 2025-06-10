import { z } from 'zod';

export const schema = z.object({
	name: z.string(),
	email: z.string().email('Please enter a valid email.'),
	dob: z.coerce.date(),
	phone_number: z.string().optional()
});
