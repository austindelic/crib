import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core';

const baseFields = {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow()
};

export const users = pgTable('users', {
	...baseFields,

	username: text('username').notNull(),
	email: text('email').notNull(),
	age: integer('age'),
	name: text('name'),
	discordId: text('discord_id')
});

export const houses = pgTable('houses', {
	...baseFields,

	name: text('name').notNull()
});

export const house_users = pgTable('house_users', {
	...baseFields,

	user_id: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	house_id: uuid('house_id')
		.references(() => houses.id)
		.notNull()
});

//Auth tables
