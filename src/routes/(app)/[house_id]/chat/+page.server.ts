import type { House, HouseChat, HouseChatDraft, User } from '$schema_types';
import type { Actions, PageServerLoad } from './$types';
import { createHouseChat, getHouseChatsFromHouseIdWithUserName } from '$server/db/queries/chat';
import { mdToCleanHtml } from '$utils/markdown.utils';
import { supabase } from '$server/db';
import { superValidate } from 'sveltekit-superforms';
import { schema } from '$lib/form_schemas/chat/create_chat.schema';
import { zod } from 'sveltekit-superforms/adapters';
import { throwError } from '$utils/error.utils';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const user: User = locals.user;

	const { house }: { house: House } = await parent();
	const rawChats = await getHouseChatsFromHouseIdWithUserName(house.id);
	const chats: (HouseChat & {
		user_name: string;
	})[] = rawChats
		? rawChats.map((chat) => ({
				...chat,
				chat: mdToCleanHtml(chat.chat).clean_html ?? ''
			}))
		: [];
	const form = await superValidate(zod(schema));
	return {
		user,
		house,
		chats,
		form
	};
};

export const actions: Actions = {
	send: async (event) => {
		const user: User = event.locals.user;

		const house_id = event.params.house_id;

		const form = await superValidate(event, zod(schema));
		const chat = form.data.chat;
		const house_chat_data = {
			user_id: user.id,
			house_id,
			chat
		} as HouseChatDraft;
		const new_house_chat = await createHouseChat(house_chat_data); // TODO: Make sure this succeed
		if (!new_house_chat) {
			throwError('FAILED_TO_CREATE_HOUSE_CHAT');
		}
		await supabase.channel(house_id).send({
			type: 'broadcast',
			event: 'new_chat',
			payload: { payload: null }
		});
		return {};
	}
};
