<script lang="ts">
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownGroup,
		Button,
		Modal
	} from 'flowbite-svelte';
	import type { User } from '$lib/schema_types';

	async function handleLogout() {
		const res = await fetch('/api/logout', {
			method: 'POST'
		});
		if (res.ok) {
			// Optional: redirect to login page
			window.location.href = '/';
		} else {
			alert('Logout failed, try again later.');
		}
	}

	const { user }: { user: User } = $props();

	let sign_out_modal_state = $state(false);
</script>

<Avatar id="user-drop" src={user.avatar_url ?? ''} class="cursor-pointer" />
<Dropdown triggeredBy="#user-drop">
	<DropdownHeader>
		<span class="block text-sm">{user.name}</span>
		<span class="block truncate text-sm font-medium">{user.email}</span>
	</DropdownHeader>
	<DropdownGroup>
		<DropdownItem href="/home">Home</DropdownItem>
	</DropdownGroup>
	<DropdownGroup>
		<DropdownItem onclick={() => (sign_out_modal_state = true)}>Sign out</DropdownItem>
	</DropdownGroup>
</Dropdown>

<Modal title="Sign Out" bind:open={sign_out_modal_state} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Signing out will log you out from all devices where you are currently signed in. This action
		cannot be undone.
	</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		If you proceed, you will need to sign in again on all devices to regain access to your account.
	</p>

	{#snippet footer()}
		<Button onclick={handleLogout}>Sign out</Button>
		<Button color="alternative">Cancel</Button>
	{/snippet}
</Modal>
