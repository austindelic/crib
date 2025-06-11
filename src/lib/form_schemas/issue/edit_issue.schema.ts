import { z } from 'zod';

export const schema = z.object({
	id: z.string(),
	name: z.string().min(1, { message: 'Issue name cannot be empty' }),
	description: z.string()
});
