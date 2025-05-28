<script lang="ts">
	import type { PageProps } from './$types';
	let text = $state('Select a House to get started.');
	const { data }: PageProps = $props();
	const { user, houses } = data;
	if (!houses) {
		text = 'need to join/create house';
	}
</script>

<p>Welcome {user.name}, {text}</p>
