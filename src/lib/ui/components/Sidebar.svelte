<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarButton,
		uiHelpers,
		SidebarBrand
	} from 'flowbite-svelte';
	import {
		ChartLine,
		LayoutGrid,
		Mailbox,
		User,
		House,
		BrushCleaning,
		MessageSquareWarning
	} from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Avatar from './Avatar.svelte';

	let { user, children } = $props<{
		user: User;
		children?: Snippet;
	}>();

	let activeUrl = $state(page.url.pathname);
	const spanClass = 'flex-1 ms-3 whitespace-nowrap';
	const demoSidebarUi = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = demoSidebarUi.close;
	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
		activeUrl = page.url.pathname;
	});
	const site = {
		name: 'crib.',
		href: '/',
		img: '/images/flowbite-svelte-icon-logo.svg',
		imgClass: 'font-rubikvinyl h-6 w-6 '
	};
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="relative">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		class="z-50 h-full"
		position="absolute"
		activeClass="p-2"
		nonActiveClass="p-2"
	>
		<SidebarGroup>
			<SidebarBrand class="flex items-center">
				<span class="font-rubikvinyl ml-2 self-center text-xl whitespace-nowrap dark:text-white"
					>crib.</span
				>
			</SidebarBrand>
			<SidebarItem label="Dashboard" href="/">
				{#snippet icon()}
					<ChartLine
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Issues" {spanClass} href="/">
				{#snippet icon()}
					<MessageSquareWarning
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Chores" {spanClass} href="/chores">
				{#snippet icon()}
					<BrushCleaning
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Houses">
				{#snippet icon()}
					<House
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Account">
				{#snippet icon()}
					<Avatar {user} />
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>
	<div class="h-96 overflow-auto px-4 md:ml-64">
		<div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
