import 'dotenv/config';
import { reset } from 'drizzle-seed';
import * as schema from '../src/lib/server/db/schema';
import { db, pool } from '../src/lib/server/db/index';

export async function reset_entries() {
	await reset(db, schema);
	console.log('Database reset successfully!');
	pool.end();
}
reset_entries();
