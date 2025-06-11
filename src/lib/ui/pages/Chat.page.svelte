<script lang="ts">
	import type { House, HouseChat, User } from '$schema_types';
	import { Button, Card, Spinner } from 'flowbite-svelte';
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

	let is_sending = $state(false);
	let is_recieving = $state(false);
	let chat_container: HTMLElement | null = $state(null);

	const house_chat_channel = supabase.channel(house.id);
	house_chat_channel
		.on('broadcast', { event: 'new_chat' }, () => {
			if (browser) {
				is_recieving = true;
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
			is_sending = false;
			is_recieving = false;
		}
	});
</script>

<div
	class="flex h-screen w-full flex-col bg-white text-black dark:bg-neutral-900 dark:text-neutral-100"
>
	<header
		class="flex items-center gap-2 border-b border-gray-300 p-4 text-2xl font-bold dark:border-neutral-700"
	>
		Chat
		{#if is_recieving}
			<div class="h-3 w-3 rounded-full bg-blue-400"></div>
		{:else}
			<div class="h-3 w-3 rounded-full bg-green-400"></div>
		{/if}
	</header>

	<main bind:this={chat_container} class="space-y-4 overflow-y-auto p-6" style="max-height: 80vh;">
		{#each chats as chat (chat.id)}
			{#if chat.user_id === user.id}
				<Card
					class="ml-auto max-w-[70%] rounded-lg bg-blue-500 p-4 text-base text-white dark:bg-blue-600"
				>
					<p class="mb-1 text-sm font-semibold text-white">
						{chat.user_name}
					</p>
					<div class="overflow-hidden rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
						<MarkdownRenderer clean_html={chat.chat} />
					</div>
				</Card>
			{:else}<Card
					class="mr-auto max-w-[70%] rounded-lg bg-gray-200 p-4 text-base text-black dark:bg-neutral-800 dark:text-neutral-100"
				>
					<p class="mb-1 text-sm font-semibold text-blue-500">
						{chat.user_name}
					</p>
					<div class="overflow-hidden rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
						<MarkdownRenderer clean_html={chat.chat} />
					</div>
				</Card>
			{/if}
		{/each}
	</main>

	<footer class="flex items-center gap-2 border-t border-gray-300 p-4 dark:border-neutral-700">
		<form
			use:enhance={() => {
				is_sending = true;
			}}
			method="POST"
			action="?/send"
			class="flex w-full gap-2"
		>
			<div class="flex-1">
				<MarkdownEditor class="w-full" bind:value={$form_data.chat} />
			</div>
			<Field {form} name="chat">
				<Control>
					<input type="hidden" name="chat" bind:value={$form_data.chat} />
				</Control>
			</Field>
			{#if is_sending}
				<Button type="submit" color="blue" disabled>
					<Spinner class="me-3" color="primary" size="4" />
					Submitting...
				</Button>
			{:else}
				<Button type="submit" color="blue">Submit</Button>
			{/if}
		</form>
	</footer>
</div>
