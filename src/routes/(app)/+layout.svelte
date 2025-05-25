<script lang="ts">
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Sidebar from '$ui/components/Sidebar.svelte';
	import '$css';
	const { children, data }: { children: Snippet; data: LayoutData } = $props();
	const { user, houses } = $derived(data);
</script>

<Sidebar {user} {houses}>
	{@render children()}
</Sidebar>
