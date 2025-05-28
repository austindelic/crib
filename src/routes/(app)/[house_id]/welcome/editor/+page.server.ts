import type { House } from '$schema_types';
import { getHouseFromId, updateHouse } from '$server/db/queries/house';
import { mdToCleanHtml } from '$utils/markdown.utils';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ parent }) => {
	const { house }: { house: House } = await parent();
	if (!house.page_md) {
		return { html: null };
	}
	const { clean_html } = mdToCleanHtml(house.page_md);
	return { clean_html };
};

export const actions: Actions = {
	preview: async (event) => {
		//create and new code.
		const formData = await event.request.formData();
		const new_page_md = formData.get('code') as string; //this is the most MVP code i have ever seen.
		const { clean_html: new_clean_html } = mdToCleanHtml(new_page_md);
		return { new_clean_html };
	},
	publish: async ({ request, params }) => {
		//create and new code.
		const formData = await request.formData();
		const new_page_md = formData.get('code') as string;
		const house_id = params.house_id;
		const house = (await getHouseFromId(house_id)) as House; //what the MVP, i could have just made a new type. now its two requests for evey one haha
		house.last_updated = new Date(Date.now());
		house.page_md = new_page_md;
		await updateHouse(house);
		redirect(302, `/${house_id}/welcome`);
	}
};
