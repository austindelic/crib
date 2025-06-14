import { error as svelteError } from '@sveltejs/kit';

export const ERRORS = {
	USER_NOT_LOGGED_IN: { status: 404, message: 'USER_NOT_LOGGED_IN' },
	NOT_MEMBER_OF_HOUSE: { status: 404, message: 'NOT_MEMBER_OF_HOUSE' },
	HOUSE_NOT_FOUND: { status: 404, message: 'HOUSE_NOT_FOUND' },
	USER_FORBIDDEN: { status: 403, message: 'USER_FORBIDDEN' },
	FAILED_TO_SELECT_HOUSE_FROM_JOINCODE: {
		status: 500,
		message: 'FAILED_SELECT_HOUSE_FROM_JOINCODE'
	},
	FAILED_TO_CREATE_JOINCODE: { status: 500, message: 'FAILED_TO_CREATE_JOINCODE' },
	FAILED_TO_DELETE_OLD_USER_JOINCODES: {
		status: 500,
		message: 'FAILED_TO_DELETE_OLD_USER_JOINCODES'
	},
	HOUSE_JOINCODE_DOES_NOT_EXIST: { status: 404, message: 'HOUSE_JOINCODE_DOES_NOT_EXIST' },
	ISSUE_DOES_NOT_EXIST: { status: 404, message: 'ISSUE_DOES_NOT_EXIST' },
	ISSUE_DOES_NOT_HAVE_CORRECT_HOUSE_ID: {
		status: 404,
		message: 'ISSUE_DOES_NOT_HAVE_CORRECT_HOUSE_ID'
	},
	HOUSE_ISSUE_DOES_NOT_EXIST: {
		status: 404,
		message: 'HOUSE_ISSUE_DOES_NOT_EXIST'
	},
	FAILED_TO_CREATE_HOUSE_ISSUE: {
		status: 500,
		message: 'FAILED_TO_CREATE_HOUSE_ISSUE'
	},
	FAILED_TO_UPDATE_HOUSE_ISSUE: {
		status: 500,
		message: 'FAILED_TO_UPDATE_HOUSE_ISSUE'
	},
	FAILED_TO_CREATE_HOUSE: {
		status: 500,
		message: 'FAILED_TO_CREATE_HOUSE'
	},
	FAILED_TO_ONBOARD_USER: {
		status: 500,
		message: 'FAILED_TO_ONBOARD_USER'
	},
	FAILED_TO_CREATE_HOUSE_USER: {
		status: 500,
		message: 'FAILED_TO_CREATE_HOUSE_USER'
	},
	FAILED_TO_CREATE_HOUSE_CHAT: {
		status: 500,
		message: 'FAILED_TO_CREATE_HOUSE_CHAT'
	},
	FAILED_TO_DELETE_HOUSE_ISSUE_FORBIDDEN: {
		status: 500,
		message: 'FAILED_TO_DELETE_HOUSE_ISSUE_FORBIDDEN'
	},
	FAILED_TO_UPDATE_USER_AVATAR_URL: {
		status: 500,
		message: 'FAILED_TO_UPDATE_USER_AVATAR_URL'
	},
	FAILED_TO_CREATE_USER_FROM_GITHUB: {
		status: 500,
		message: 'FAILED_TO_CREATE_USER_FROM_GITHUB'
	},
	FAILED_TO_CREATE_USER_FROM_GOOGLE: {
		status: 500,
		message: 'FAILED_TO_CREATE_USER_FROM_GOOGLE'
	},
	USER_NAME_IS_EMPTY_AFTER_ONBOARDING: {
		status: 500,
		message: 'USER_NAME_IS_EMPTY_AFTER_ONBOARDING'
	}
} as const;

export type ErrorKey = keyof typeof ERRORS;

export function throwError(error_type: ErrorKey): never {
	const { status, message } = ERRORS[error_type];
	throw svelteError(status, message);
}
