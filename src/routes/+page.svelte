<script lang="ts">
	import App from '$lib/ui/pages/App.svelte';
	import Home from '$lib/ui/pages/Home.svelte';
	import type { User } from '$lib/server/db/types';

	let { data } = $props<{ data: { user: User | null } }>();
	let { user } = data;
</script>

{#if user}
	<App {user} />
{:else}
	<Home user={null} />
{/if}
