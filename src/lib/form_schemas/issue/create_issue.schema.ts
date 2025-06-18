import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(1, { message: 'Issue name cannot be empty' }),
	description: z.string(),
	priority: z.string()
});
