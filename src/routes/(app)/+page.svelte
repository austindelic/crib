<script lang="ts">
	import type { House, User } from '$schema_types';
	import { HeroHeader } from 'flowbite-svelte-blocks';
	let text = $state('Select a House to get started.');
	const { data }: { data: { user: User; houses: House[] | null } } = $props();
	const { user, houses } = data;
	if (!houses) {
		text = 'need to join/create house';
	}
</script>

<HeroHeader>
	{#snippet h2()}
		{text + ' ' + user.name}
	{/snippet}
</HeroHeader>
