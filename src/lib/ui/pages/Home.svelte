<script lang="ts">
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import type { User } from '$lib/server/db/types';
	let { user }: { user: User | null } = $props();
</script>

<main>
	<Navbar {user} />
	<h1>Welcome to crib.</h1>
	<p>Need to add dashboard</p>
	<p>Need to add some content</p>
	<p>Sign up and login link.</p>
</main>
