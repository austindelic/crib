<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		DarkMode,
		Button,
		Modal
	} from 'flowbite-svelte';
	import type { User } from '$lib/schema_types';
	import Avatar from './Avatar.svelte';
	import { Plus } from '@lucide/svelte';
	const { user }: { user: User | null } = $props();
	let is_open = $state(false);
</script>

<Navbar>
	<NavBrand href="/">
		<span class="font-rubikvinyl self-centre text-xl whitespace-nowrap dark:text-white">crib.</span>
	</NavBrand>
	<div class="flex md:order-2">
		<DarkMode />
		{#if user}
			<Avatar {user} />
		{:else}
			<Button onclick={() => (is_open = true)} size="sm">Login</Button>
		{/if}

		<NavHamburger />
	</div>
	<NavUl>
		{#if user}
			<NavLi href="/">App</NavLi>
		{/if}
		<NavLi href={user ? '/home' : '/'}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<Modal title="Add Product" bind:open={is_open} autoclose>
	<form>
		<div class="mb-4 grid gap-4 sm:grid-cols-2">
			<Button href="/api/login/google" class="w-52">
				<Plus />
				Login with Google
			</Button>
			<Button href="/api/login/github" class="w-52">
				<Plus />
				Login with Github
			</Button>
		</div>
	</form>
</Modal>
