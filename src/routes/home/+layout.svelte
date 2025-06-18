<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import type { User } from '$lib/schema_types';
	import Footer from '$lib/ui/components/Footer.svelte';
	import '$css';
	import { navigating } from '$app/state';
	let { children, data }: { data: { user: User | null }; children: Snippet } = $props();
	const { user } = $derived(data);
</script>

{#if navigating.complete}
	<!-- Skeleton or loader here -->
	<div
		class="from-primary-500 via-secondary-400 fixed top-0 left-0 h-1 w-full animate-[pulse_1.5s_ease-in-out_infinite] rounded-r-full bg-gradient-to-r to-pink-500 shadow-md"
	></div>
{/if}
<Navbar {user} />
{@render children()}
<Footer />
