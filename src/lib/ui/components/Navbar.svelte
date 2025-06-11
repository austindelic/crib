<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Button } from 'flowbite-svelte';
	import type { User } from '$lib/schema_types';
	import Avatar from './Avatar.svelte';

	import SelectLoginProvider from './login/SelectLoginProvider.modal.svelte';
	import { MoveUp } from '@lucide/svelte';
	const { user }: { user: User | null } = $props();
	let is_login_provider_modal_open = $state(false);
</script>

<Navbar>
	<NavBrand href="/home">
		<span
			class="font-rubikvinyl text-primary-500 dark:text-primary-400 ml-2 self-center text-xl whitespace-nowrap"
			>crib.</span
		>
	</NavBrand>
	<div class="flex md:order-2">
		<DarkMode />
		{#if user}
			<Avatar {user} />
		{:else}
			<div class="relative">
				<Button onclick={() => (is_login_provider_modal_open = true)} size="sm">Sign in</Button>

				<!-- Tooltip BELOW button, slightly left -->
				<div
					class="absolute top-full left-1/2 z-40 mt-3 -ml-3 flex -translate-x-[44%] flex-col items-center text-center select-none"
				>
					<!-- ↑ Arrow pointing up -->
					<MoveUp
						class="text-primary-600 dark:text-primary-400 mb-1 h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					/>

					<!-- Wider, shifted text -->
					<div class="w-52 text-sm font-medium text-gray-700 dark:text-gray-300">
						Get started — you got this 💪
					</div>
				</div>
			</div>
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
