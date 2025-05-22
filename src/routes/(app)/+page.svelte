<script lang="ts">
	import type { House, User } from '$schema_types';
	let text = $state('Select a House to get started.');
	const { data }: { data: { user: User; houses: House[] | null } } = $props();
	const { user, houses } = data;
	if (!houses) {
		text = 'need to join/create house';
	}
</script>
<p>{text + ' ' + user.name}</p>

