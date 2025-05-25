<script lang="ts">
	import type { PageProps } from './$types';
	import { error } from '@sveltejs/kit';
	let { data }: PageProps = $props();
	const { house } = data;
	if (!house) {
		throw error(404, 'House not found');
	}
</script>

<p>this is a test {house.name}</p>
