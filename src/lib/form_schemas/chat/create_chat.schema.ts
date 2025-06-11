import { z } from 'zod';

export const schema = z.object({
	chat: z.string().min(1)
});
