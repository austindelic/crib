import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';
import { env } from '$lib/server/env';
import { createClient } from '@supabase/supabase-js';

export const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
