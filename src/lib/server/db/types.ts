import type { InferSelectModel } from 'drizzle-orm';
import * as schema from './schema';

// Utility: All fields nullable
type Nullable<T> = { [P in keyof T]: T[P] | null };

// --- User Types ---
export type User = InferSelectModel<typeof schema.userTable>; // Direct from schema
export type UserDraft = Omit<User, 'id' | 'createdAt'>; // For inserts
export type UserNullable = Nullable<User>; // All fields nullable

// --- House Types ---
export type House = InferSelectModel<typeof schema.houseTable>;
export type HouseDraft = Omit<House, 'id' | 'createdAt'>;
export type HouseNullable = Nullable<House>;

// --- HouseUsers Types ---
export type HouseUser = InferSelectModel<typeof schema.houseUserTable>;
export type HouseUserDraft = Omit<HouseUser, 'id' | 'createdAt'>;
export type HouseUserNullable = Nullable<HouseUser>;

// --- Session Types ---
export type Session = InferSelectModel<typeof schema.sessionTable>;
export type SessionDraft = Omit<Session, 'id' | 'createdAt'>;
export type SessionNullable = Nullable<Session>;

// --- HouseJoinCode Types ---
export type HouseJoinCode = InferSelectModel<typeof schema.houseJoinCodeTable>;
export type HouseJoinCodeDraft = Omit<HouseJoinCode, 'id' | 'createdAt'>;
export type HouseJoinCodeNullable = Nullable<Session>;
