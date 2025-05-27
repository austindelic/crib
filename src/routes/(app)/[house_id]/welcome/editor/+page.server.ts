import type { House } from '$schema_types';
import { mdToCleanHtml } from '$utils/markdown.utils';
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
		const new_page_md = formData.get('code') as string; //this is the mose MVP code i have ever seen.
		const { clean_html: new_clean_html } = mdToCleanHtml(new_page_md);
		return { new_clean_html };
	},
	publish: async ({ request }) => {
		//create and new code.
		const formData = await request.formData();
		const new_page_md = formData.get('code') as string; //this is the mose MVP code i have ever seen.
	}
};
