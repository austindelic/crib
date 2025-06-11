import type { InferSelectModel } from 'drizzle-orm';
import * as schema from '$server/db/schema';

type Nullable<T> = { [P in keyof T]: T[P] | null };

export type User = InferSelectModel<typeof schema.userTable>;
export type UserDraft = Omit<User, 'id'>;
export type UserNullable = Nullable<User>;

export type House = InferSelectModel<typeof schema.houseTable>;
export type HouseDraft = Omit<House, 'id'>;
export type HouseNullable = Nullable<House>;

export type HouseUser = InferSelectModel<typeof schema.houseUserTable>;
export type HouseUserDraft = Omit<HouseUser, 'id'>;
export type HouseUserNullable = Nullable<HouseUser>;

export type Session = InferSelectModel<typeof schema.sessionTable>;
export type SessionDraft = Omit<Session, 'id'>;
export type SessionNullable = Nullable<Session>;

export type HouseJoinCode = InferSelectModel<typeof schema.houseJoinCodeTable>;
export type HouseJoinCodeDraft = Omit<HouseJoinCode, 'createdAt'>;
export type HouseJoinCodeNullable = Nullable<HouseJoinCode>;

export type HouseIssue = InferSelectModel<typeof schema.houseIssueTable>;
export type HouseIssueDraft = Omit<HouseIssue, 'id'>;
export type HouseIssueNullable = Nullable<HouseIssue>;

export type HouseChore = InferSelectModel<typeof schema.houseChoreTable>;
export type HouseChoreDraft = Omit<HouseChore, 'id'>;
export type HouseChoreNullable = Nullable<HouseChore>;

export type HouseChat = InferSelectModel<typeof schema.houseChatTable>;
export type HouseChatDraft = Omit<HouseChat, 'id'>;
export type HouseChatNullable = Nullable<HouseChat>;
