<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { User } from '$lib/schema_types';
	import Sidebar from '$lib/ui/components/Sidebar.svelte';
	let { user, children }: { user: User; children: Snippet } = $props();
</script>

<main>
	<Sidebar {user}>
		{@render children()}
	</Sidebar>
</main>
