import 'dotenv/config';
import { seed, reset } from 'drizzle-seed';
import * as schema from '../src/lib/server/db/schema';
import { db, pool } from '../src/lib/server/db/index';

async function main() {
	const arg = process.argv[2];

	if (arg === 'seed' || arg === 's') {
		await seed(db, schema);
		console.log('Database seeded successfully!');
	} else if (arg === 'reset' || arg === 'r') {
		await reset(db, schema);
		console.log('Database reset successfully!');
	} else if (arg === 'reseed' || arg === 'rs') {
		await reset(db, schema);
		await seed(db, schema);
		console.log('Database reseeded successfully!');
	} else {
		console.log('Usage: node db-tools.js [seed|reset|reseed]');
	}
	pool.end();
}

main();
