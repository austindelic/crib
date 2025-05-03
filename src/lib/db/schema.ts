import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core'

const baseFields = {
    id: uuid('id').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
}

export const users = pgTable('users', {
    ...baseFields,

    username: text('username').notNull(),
    email: text('email'),
    eloScore: integer('elo_score').default(1000),
  })
  