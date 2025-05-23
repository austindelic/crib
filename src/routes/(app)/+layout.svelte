<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '$ui/components/Sidebar.svelte';
	import '$css';
	import type { House, User } from '$lib/schema_types';
	const { children, data }: { children: Snippet; data: { user: User; houses: House[] } } = $props();
	const { user, houses } = $derived(data);
</script>

<Sidebar {user} {houses}>
	{@render children()}
</Sidebar>
