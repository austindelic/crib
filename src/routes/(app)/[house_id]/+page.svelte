<script lang="ts">
	import { throwError } from '$utils/error.utils';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	const { house } = data;
	if (!house) {
		throwError('HOUSE_NOT_FOUND');
	}
</script>

<p>{house.name}: Dashboard</p>
