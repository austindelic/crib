<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import type { User } from '$lib/server/db/types';
	import Footer from '$lib/ui/components/Footer.svelte';

	let { children, data } = $props<{ data: { user: User }; children: Snippet }>();
	let user = data.user;
</script>

<Navbar {user} />
{@render children()}
<Footer />
