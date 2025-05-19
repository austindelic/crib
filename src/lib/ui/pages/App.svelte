<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { User } from '$lib/server/types';
	import Sidebar from '$lib/ui/components/Sidebar.svelte';
	let { user, children } = $props<{ user: User; children: Snippet }>();
</script>

<main>
	<Sidebar {user}>
		{@render children()}
	</Sidebar>
</main>
