<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
	import type { User } from '$lib/schema_types';
	import Avatar from './Avatar.svelte';

	import SelectLoginProvider from './login/SelectLoginProvider.modal.svelte';
	const { user }: { user: User | null } = $props();
	let is_login_provider_modal_open = $state(false);
</script>

<Navbar>
	<NavBrand href="/home">
		<span class="font-rubikvinyl ml-2 self-center text-xl whitespace-nowrap dark:text-white"
			>crib.</span
		>
	</NavBrand>
	<div class="flex md:order-2">
		<DarkMode />
		{#if user}
			<Avatar {user} />
		{:else}
			<Button onclick={() => (is_login_provider_modal_open = true)} size="sm">Sign in</Button>
		{/if}

		<NavHamburger />
	</div>
	<NavUl>
		{#if user}
			<NavLi href="/">App</NavLi>
		{/if}
		<NavLi href={user ? '/home' : '/'}>Home</NavLi>
		<NavLi href="/home/about">About</NavLi>
		<NavLi href="/home/pricing">Pricing</NavLi>
		<NavLi href="/home/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<SelectLoginProvider bind:is_open={is_login_provider_modal_open} />
