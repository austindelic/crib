import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		house_id: params.house_id
	};
};
