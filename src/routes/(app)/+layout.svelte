<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '$lib/ui/components/Sidebar.svelte';
	import '../../app.css';
	import type { User } from '$lib/server/types';
	const { children, data } = $props<{ children: Snippet; data: { user: User } }>();
	const { user } = data;
</script>

<Sidebar {user}>
	{@render children()}
</Sidebar>
