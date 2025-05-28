import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config(); // Load .env

// Define schema
const envSchema = z.object({
	URL: z.string().url(),
	SUPABASE_URL: z.string().url(),
	SUPABASE_ANON_KEY: z.string(),
	DATABASE_URL: z.string().url(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string()
});

// Validate
const result = envSchema.safeParse(process.env);
if (!result.success) {
	console.error('❌ Invalid environment variables:', result.error.format());
	process.exit(1);
}

export const env = result.data;
