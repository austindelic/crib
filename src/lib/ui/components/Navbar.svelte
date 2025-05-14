<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import type { UserStrict } from '$lib/server/db/types';
	import Avatar from './Avatar.svelte';
	const { user } = $props() as { user: UserStrict };
</script>

<Navbar>
	<NavBrand href="/">
		<span class="font-rubikvinyl self-centre text-xl whitespace-nowrap dark:text-white">crib.</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		{#if user}
			<NavLi href="/home">Home</NavLi>
		{:else}
			<NavLi href="/">Home</NavLi>
		{/if}
		<NavLi href="/about">About</NavLi>
		<NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
		{#if user}
			<div>
				<NavLi href="/account">Account</NavLi>
			</div>
			<div>
				<Avatar {user} />
			</div>
		{:else}
			<NavLi href="/login">Login</NavLi>
		{/if}
	</NavUl>
</Navbar>
