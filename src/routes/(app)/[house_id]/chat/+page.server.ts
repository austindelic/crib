import type { House, HouseChat, HouseChatDraft, User } from '$schema_types';
import type { Actions, PageServerLoad } from './$types';
import { createHouseChat, getHouseChatsFromHouseId } from '$server/db/queries/chat';
import { mdToCleanHtml } from '$utils/markdown.utils';
import { supabase } from '$server/db';
export const load: PageServerLoad = async ({ locals, parent }) => {
	const user: User = locals.user;

	const { house }: { house: House } = await parent();
	const rawChats = await getHouseChatsFromHouseId(house.id);
	const chats: HouseChat[] = rawChats
		? rawChats.map((chat) => ({
				...chat,
				chat: mdToCleanHtml(chat.chat).clean_html ?? ''
			}))
		: [];

	return {
		user,
		house,
		chats,
		chat_input: '' //hack to reset chat_input
	};
};

export const actions: Actions = {
	send: async ({ locals, params, request }) => {
		const user: User = locals.user;

		const house_id = params.house_id;

		const form = await request.formData();
		const chat = form.get('chat');
		console.log(chat);
		const house_chat_data = {
			user_id: user.id,
			house_id,
			chat
		} as HouseChatDraft;
		const new_house_chat = await createHouseChat(house_chat_data); // TODO: Make sure this succeed
		if (new_house_chat) {
			await supabase.channel(house_id).send({
				type: 'broadcast',
				event: 'new_chat',
				payload: { payload: null }
			});
		}

		return {};
	}
};
