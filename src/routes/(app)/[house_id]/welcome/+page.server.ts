import type { House } from '$schema_types';
import { mdToCleanHtml } from '$utils/markdown.utils';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ parent }) => {
	const { house }: { house: House } = await parent();
	if (!house.page_md) {
		return { html: null };
	}
	const { clean_html } = mdToCleanHtml(house.page_md);
	return { clean_html };
};
