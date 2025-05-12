// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { SessionStrict, UserStrict } from '$lib/server/db/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserStrict | null;
			session: SessionStrict | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
