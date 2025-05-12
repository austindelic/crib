import type { InferSelectModel } from 'drizzle-orm';
import * as schema from './schema';

// Utility: All fields nullable
type Nullable<T> = { [P in keyof T]: T[P] | null };

// --- User Types ---
export type UserStrict = InferSelectModel<typeof schema.userTable>; // Direct from schema
export type UserDraft = Omit<UserStrict, 'id' | 'createdAt'>; // For inserts
export type User = Nullable<UserStrict>; // All fields nullable

// --- House Types ---
export type HouseStrict = InferSelectModel<typeof schema.houseTable>;
export type HouseDraft = Omit<HouseStrict, 'id' | 'createdAt'>;
export type House = Nullable<HouseStrict>;

// --- HouseUsers Types ---
export type HouseUsersStrict = InferSelectModel<typeof schema.houseUsersTable>;
export type HouseUsersDraft = Omit<HouseUsersStrict, 'id' | 'createdAt'>;
export type HouseUsers = Nullable<HouseUsersStrict>;

// --- Session Types ---
export type SessionStrict = InferSelectModel<typeof schema.sessionTable>;
export type SessionDraft = Omit<SessionStrict, 'id' | 'createdAt'>;
export type Session = Nullable<SessionStrict>;
