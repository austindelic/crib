import 'dotenv/config';
import { seed, reset } from 'drizzle-seed';
import * as schema from '../src/lib/server/db/schema';
import { db, pool } from '../src/lib/server/db/index';

async function reseed_db() {
	await reset(db, schema);
	await seed(db, schema);
	console.log('Database reseeded successfully!');
	pool.end();
}

reseed_db();
