import { z } from 'zod';

export const schema = z.object({
	join_code: z.string().length(6, { message: 'Must be 6 characters' })
});
