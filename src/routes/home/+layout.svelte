<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import type { User } from '$lib/server/db/types';
	import Footer from '$lib/ui/components/Footer.svelte';

	let { children, data } = $props<{ data: LayoutData; children: Snippet }>();
	let user: User = data.user;
</script>

<Navbar {user} />
{@render children()}
<Footer />
