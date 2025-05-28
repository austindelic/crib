<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import type { User } from '$lib/schema_types';
	import Footer from '$lib/ui/components/Footer.svelte';
	import '$css';
	let { children, data }: { data: { user: User | null }; children: Snippet } = $props();
	const { user } = $derived(data);
</script>

<Navbar {user} />
{@render children()}
<Footer />
