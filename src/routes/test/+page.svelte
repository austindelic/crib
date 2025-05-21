<script lang="ts">
	import type { House, HouseUser } from '$schema_types';
	import type { User } from '$schema_types';
	import { Select, Label } from 'flowbite-svelte';

	const {
		data
	}: {
		data: { user: User; houses: { houseUser: HouseUser; house: House }[] | null };
	} = $props();

	const { user, houses } = data;

	// Create options for the Select component
	const houseOptions =
		houses?.map(({ houseUser, house }) => ({
			value: house.id, // or houseUser.house_id if you prefer
			name: house.name
		})) ?? [];

	let selected = $state('');
</script>

<Label>
	Select a house
	<Select class="mt-2" items={houseOptions} bind:value={selected} />
	<p>{selected}</p>
</Label>
