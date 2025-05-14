<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownGroup } from 'flowbite-svelte';
	import type { User } from '$lib/server/db/types';

	function getAvatarUrl(user: User): string {
		if (user.avatar_provider === 'github') {
			return `https://avatars.githubusercontent.com/u/${user.id}?v=4`;
		} else {
			return '';
		}
	}

	const { user }: { user: User | null } = $props();
	if (!user) {
		throw new Error('User is not defined in Avatar');
	}
</script>

<Avatar id="user-drop" src={getAvatarUrl(user)} class="cursor-pointer" dot={{ color: 'green' }} />
<Dropdown triggeredBy="#user-drop">
	<DropdownHeader>
		<span class="block text-sm">Bonnie Green</span>
		<span class="block truncate text-sm font-medium">name@flowbite.com</span>
	</DropdownHeader>
	<DropdownGroup>
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownItem>Earnings</DropdownItem>
	</DropdownGroup>
	<DropdownGroup>
		<DropdownItem>Sign out</DropdownItem>
	</DropdownGroup>
</Dropdown>
