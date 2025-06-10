<script lang="ts">
	import ChatPage from '$ui/pages/Chat.page.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { form, chats, user, house } = $derived(data);
</script>

<ChatPage {form} {chats} {user} {house} />
