<script lang="ts">
	import { TabItem, Tabs } from 'flowbite-svelte';
</script>

<TabItem open title="Your Chores">
	<Tabs tabStyle="underline">
		<TabItem title="Settings">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Settings:</b>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</TabItem>
		<TabItem title="Users">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Users:</b>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</TabItem>
		<TabItem disabled>
			{#snippet titleSlot()}
				<span class="text-gray-400 dark:text-gray-500">Disabled</span>
			{/snippet}
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Disabled:</b>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</TabItem>
	</Tabs>
</TabItem>
