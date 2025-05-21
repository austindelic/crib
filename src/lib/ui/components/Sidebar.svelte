<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarButton,
		uiHelpers,
		SidebarBrand,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import { House as HouseIcon, Plus } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Avatar from './Avatar.svelte';
	import type { House, User } from '$schema_types';
	let { user, houses, children }: { user: User; children?: Snippet; houses: House[] } = $props();

	let activeUrl = $state(page.url.pathname);
	const demoSidebarUi = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = demoSidebarUi.close;
	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
		activeUrl = page.url.pathname;
	});
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="flex h-screen w-screen">
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

			{#each houses as house (house.id)}
				<SidebarDropdownWrapper label={house.name} btnClass="p-2">
					{#snippet icon()}
						<HouseIcon
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					{/snippet}
					<SidebarItem label="Dashboard" href="/{house.id}" />
					<SidebarItem label="Issues" href="/{house.id}/issues" />
					<SidebarItem label="Chores" href="/{house.id}/chores" />
					<SidebarItem label="Share" href="/{house.id}/share" />
				</SidebarDropdownWrapper>
			{/each}
			<SidebarItem label="New House" href="new_house">
				{#snippet icon()}
					<Plus
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
		<SidebarGroup border>
			<SidebarItem label="Account">
				{#snippet icon()}
					<Avatar {user} />
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>
	<div class="flex-1 overflow-auto p-4">
		<div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
