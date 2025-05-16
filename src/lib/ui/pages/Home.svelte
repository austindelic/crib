<script lang="ts">
	import Navbar from '$lib/ui/components/Navbar.svelte';
	import { Banner } from 'flowbite-svelte';
	import type { User } from '$lib/server/db/types';
	let { user }: { user: User | null } = $props();
</script>

<main>
	<div class="relative h-10">
		<Banner color="gray" class="absolute">
			<p class="font-rubikvinyl">crib.</p>
			<p>is currently under development...</p>
		</Banner>
	</div>
	<Navbar {user} />
	<h1>Welcome to crib.</h1>
	<p>Need to add dashboard</p>
	<p>Need to add some content</p>
	<p>Sign up and login link.</p>
</main>
