<script lang="ts">
	import type { PageData } from './$types';
	let text = $state('Select a House to get started.');
	const { data }: { data: PageData } = $props();
	const { user, houses } = data;
	if (!houses) {
		text = 'need to join/create house';
	}
</script>

<p>{text + ' ' + user.name}</p>
