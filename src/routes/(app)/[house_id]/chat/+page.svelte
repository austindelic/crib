<script lang="ts">
	import type { House, HouseChat, User } from '$schema_types';
	import { Input, Button, Card } from 'flowbite-svelte';
	import MarkdownRenderer from '$ui/components/MarkdownRenderer.svelte';
	import { enhance } from '$app/forms';
	import { supabase } from '$utils/supabase_client.utils.js';
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	const { data } = $props();
	const { user, house }: { user: User; house: House } = data;
	const { chats }: { chats: HouseChat[] } = $derived(data);
	let chat_input = $state('');
	const house_chat_channel = supabase.channel(house.id);
	house_chat_channel
		.on('broadcast', { event: 'new_chat' }, () => {
			if (browser) {
				invalidateAll();
			}
		})
		.subscribe();
</script>

<div
	class="flex h-screen w-full flex-col bg-white text-black dark:bg-neutral-900 dark:text-neutral-100"
>
	<header class="border-b border-gray-300 p-4 text-2xl font-bold dark:border-neutral-700">
		Chat
	</header>

	<main class="flex-1 space-y-4 overflow-y-auto p-6">
		{#each chats as chat (chat.id)}
			<Card
				class={`p-4 text-base ${
					chat.user_id === user.id
						? 'ml-auto bg-blue-500 text-white dark:bg-blue-600'
						: 'mr-auto bg-gray-200 text-black dark:bg-neutral-800 dark:text-neutral-100'
				} max-w-[70%] rounded-lg`}
			>
				<p class="mb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
					{chat.user_id}
				</p>
				<div class="overflow-hidden rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
					<MarkdownRenderer clean_html={chat.chat} />
				</div>
			</Card>
		{/each}
	</main>

	<footer class="flex items-center gap-2 border-t border-gray-300 p-4 dark:border-neutral-700">
		<form method="POST" use:enhance action="?/send">
			<Input
				placeholder="Type your message..."
				class="flex-1"
				name="chat"
				bind:value={chat_input}
			/>
			<Button type="submit" color="blue">Send</Button>
		</form>
	</footer>
</div>
