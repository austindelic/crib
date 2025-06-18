<script lang="ts">
	import ChatPage from '$ui/pages/Chat.page.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { form, chats, user, house } = $derived(data);
</script>

{#await data}
	Loading comments...
{:then data}
	<ChatPage {form} {chats} {user} {house} />
{:catch error}
	<p>error loading comments: {error.message}</p>
{/await}

<p>THis is a test</p>
