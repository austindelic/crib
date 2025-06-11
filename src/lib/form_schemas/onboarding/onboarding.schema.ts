import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(1, { message: 'Name cannot be empty' }),
	email: z
		.string()
		.email('Please enter a valid email.')
		.min(1, { message: 'Email cannot be empty' }),
	dob: z.coerce.date(),
	phone_number: z.string().optional()
});
