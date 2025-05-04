import 'dotenv/config';
import { seed } from 'drizzle-seed';
import * as schema from '../src/lib/server/db/schema';
import { db, pool } from '../src/lib/server/db/index';

export async function seed_db() {
	await seed(db, schema);
	console.log('Database seeded successfully!');
	pool.end();
}

seed_db();
