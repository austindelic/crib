<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import type { User } from '$lib/server/db/types';
	import Avatar from './Avatar.svelte';
	import LoginModal from '../modals/Login.svelte';
	const { user } = $props<{ user: User | null }>();
</script>

<Navbar>
	<NavBrand href="/">
		<span class="font-rubikvinyl self-centre text-xl whitespace-nowrap dark:text-white">crib.</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		{#if user}
			<NavLi href="/">App</NavLi>
		{/if}
		<NavLi href={user ? '/home' : '/'}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
		{#if user}
			<Avatar {user} />
		{:else}
			<NavLi>
				<LoginModal />
			</NavLi>
		{/if}
		<DarkMode />
	</NavUl>
</Navbar>
