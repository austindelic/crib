import type { InferSelectModel } from 'drizzle-orm';
import * as schema from './schema';

export type User = InferSelectModel<typeof schema.userTable>;
export type House = InferSelectModel<typeof schema.houseTable>;
export type HouseUsers = InferSelectModel<typeof schema.houseUsersTable>;
export type Session = InferSelectModel<typeof schema.sessionTable>;
