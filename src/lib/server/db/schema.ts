import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core';

const baseFields = {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow()
};

export const userTable = pgTable('user', {
	...baseFields,

	username: text('username').notNull(),
	name: text('name'),
	githubId: integer('github_id'),
	googleId: text('google_id'),
	email: text('email'),
	age: integer('age'),
	phone_number: text('phone_number')
});

export const houseTable = pgTable('house', {
	...baseFields,

	name: text('name').notNull()
});

export const houseUsersTable = pgTable('house_users', {
	...baseFields,

	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),
	house_id: uuid('house_id')
		.references(() => houseTable.id)
		.notNull()
});

//Auth tables

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
