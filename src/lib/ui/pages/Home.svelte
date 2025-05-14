<script lang="ts">
	import { enhance } from '$app/forms';
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import type { UserStrict } from '$lib/server/db/types';
	let { user } = $props();
</script>

<main>
	<Navbar {user} />
	<h1>Welcome to crib.</h1>
	<p>Need to add dashboard</p>

	<p>Sign up and login link.</p>
</main>
