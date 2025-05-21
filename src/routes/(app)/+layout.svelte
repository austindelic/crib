<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '$lib/ui/components/Sidebar.svelte';
	import '../../app.css';
	import type { House, User } from '$lib/schema_types';
	const { children, data }: { children: Snippet; data: { user: User; houses: House[] } } = $props();
	const { user, houses } = data;
</script>

<Sidebar {user} {houses}>
	{@render children()}
</Sidebar>
