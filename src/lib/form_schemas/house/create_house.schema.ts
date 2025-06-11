import { z } from 'zod';

export const schema = z.object({
	house_name: z.string().min(1, { message: 'House name cannot be empty' })
});
