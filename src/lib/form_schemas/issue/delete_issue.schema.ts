import z from 'zod';

export const schema = z
	.object({
		name: z.string().min(1, { message: 'You must confirm the name of the issue' }),
		real_name: z.string(),
		id: z.string()
	})
	.refine((data) => data.real_name === data.name, {
		message: 'Names do not match',
		path: ['name'] // ← show error on the “name” input
	});
