<script lang="ts">
	import type { House, HouseChat, User } from '$schema_types';
	import { Button, Card } from 'flowbite-svelte';
	import MarkdownRenderer from '$ui/components/MarkdownRenderer.svelte';
	import { enhance } from '$app/forms';
	import { supabase } from '$utils/supabase_client.utils';
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import MarkdownEditor from '$ui/components/MarkDownEditor.svelte';
	import { onDestroy } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { schema } from '$lib/form_schemas/chat/create_chat.schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Control, Field } from 'formsnap';

	const {
		form: form_prop,
		chats,
		user,
		house
	}: {
		form: SuperValidated<Infer<typeof schema>>;
		chats: (HouseChat & {
			user_name: string;
		})[];
		user: User;
		house: House;
	} = $props();

	const { form_data, form } = $derived.by(() => {
		const form = superForm(form_prop, {
			validators: zodClient(schema)
		});
		return { form_data: form.form, form };
	});

	let chat_container: HTMLElement | null = $state(null);

	const house_chat_channel = supabase.channel(house.id);
	house_chat_channel
		.on('broadcast', { event: 'new_chat' }, () => {
			if (browser) {
				invalidateAll();
			}
		})
		.subscribe();

	onDestroy(() => {
		if (house_chat_channel) {
			house_chat_channel.unsubscribe();
		}
	});
	$effect(() => {
		if (chat_container && chats) {
			// check chats because $effect will now run every time chats changes values.
			chat_container.scrollTop = chat_container.scrollHeight;
		}
	});
</script>

<div
	class="flex h-screen w-full flex-col bg-white text-black dark:bg-neutral-900 dark:text-neutral-100"
>
	<header class="border-b border-gray-300 p-4 text-2xl font-bold dark:border-neutral-700">
		Chat
	</header>

	<main bind:this={chat_container} class="space-y-4 overflow-y-auto p-6" style="max-height: 80vh;">
		{#each chats as chat (chat.id)}
			<Card
				class={`p-4 text-base ${
					chat.user_id === user.id
						? 'ml-auto bg-blue-500 text-white dark:bg-blue-600'
						: 'mr-auto bg-gray-200 text-black dark:bg-neutral-800 dark:text-neutral-100'
				} max-w-[70%] rounded-lg`}
			>
				<p class="mb-1 text-sm font-semibold text-white">
					{chat.user_name}
				</p>
				<div class="overflow-hidden rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
					<MarkdownRenderer clean_html={chat.chat} />
				</div>
			</Card>
		{/each}
	</main>

	<footer class="flex items-center gap-2 border-t border-gray-300 p-4 dark:border-neutral-700">
		<form use:enhance method="POST" action="?/send" class="flex w-full gap-2">
			<div class="flex-1">
				<MarkdownEditor class="w-full" bind:value={$form_data.chat} />
			</div>
			<Field {form} name="chat">
				<Control>
					<input type="hidden" name="chat" bind:value={$form_data.chat} />
				</Control>
			</Field>
			<Button type="submit" color="blue">Send</Button>
		</form>
	</footer>
</div>
