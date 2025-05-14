<script lang="ts">
	import Dashboard from '$lib/ui/pages/Dashboard.svelte';
	import Home from '$lib/ui/pages/Home.svelte';
	import type { UserStrict } from '$lib/server/db/types';
	const { data } = $props();
	const { user } = data as { user: UserStrict };
</script>

{#if user}
	<Dashboard {user} />
{:else}
	<Home {user} />
{/if}
