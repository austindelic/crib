<script lang="ts">
	import Dashboard from '$lib/ui/pages/Dashboard.svelte';
	import Home from '$lib/ui/pages/Home.svelte';
	import type { User } from '$lib/server/db/types';

	const { data } = $props();
	const { user }: { user: User | null } = data;
</script>

{#if user}
	<Dashboard {user} />
{:else}
	<Home user={null} />
{/if}
