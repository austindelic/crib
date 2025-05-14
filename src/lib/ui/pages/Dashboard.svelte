<script lang="ts">
	import type { User } from '$lib/server/db/types';

	let { user }: { user: User } = $props();
	console.log(user);
</script>

<main>
	<h1>Hello, {user.username}</h1>
	<h1>Welcome to the crib.</h1>
	<p>HOME WELCOME PAGE</p>
	<p>Feel free to explore the rest of the site!</p>
</main>
