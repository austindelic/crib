import { pgTable, text, uuid, timestamp, integer, date } from 'drizzle-orm/pg-core';

const timestamps = {
	created_at: timestamp('created_at').defaultNow(),
	last_updated: timestamp('last_updated').defaultNow()
};

const baseFields = {
	id: uuid('id').defaultRandom().primaryKey(),
	...timestamps
};

export const userTable = pgTable('user', {
	...baseFields,

	username: text('username').notNull(),
	name: text('name'),
	github_id: integer('github_id'),
	google_id: text('google_id'),
	email: text('email'),
	dob: date('dob'),
	phone_number: text('phone_number'),
	avatar_url: text('avatar_url')
});

export const houseTable = pgTable('house', {
	...baseFields,

	name: text('name').notNull(),
	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),
	page_md: text('page_md')
});

export const houseUserTable = pgTable('house_user', {
	...baseFields,

	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),
	house_id: uuid('house_id')
		.references(() => houseTable.id)
		.notNull()
});

export const houseJoinCodeTable = pgTable('house_join_code', {
	id: text('id').primaryKey(),
	house_id: uuid('house_id')
		.references(() => houseTable.id)
		.notNull(),
	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),
	expires_at: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	...timestamps
});

export const houseIssueTable = pgTable('house_issues', {
	...baseFields,

	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),

	house_id: uuid('house_id')
		.references(() => houseTable.id)
		.notNull(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	priority: text('priority').notNull() //currently just as string for MVP still figuring out functionallity.
});

export const houseChoreTable = pgTable('house_chores', {
	...baseFields,

	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),

	house_id: uuid('house_id')
		.references(() => houseTable.id)
		.notNull(),
	chore: text('chore').notNull()
});

export const houseChatTable = pgTable('house_chat', {
	...baseFields,

	user_id: uuid('user_id')
		.references(() => userTable.id)
		.notNull(),

	house_id: uuid('house_id')
		.references(() => houseTable.id)
		.notNull(),
	chat: text('chat').notNull()
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => userTable.id),
	expires_at: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
