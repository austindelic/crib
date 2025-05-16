<script lang="ts">
	import type { User } from '$lib/server/db/types';
	import Sidebar from '$lib/ui/components/Sidebar.svelte';
	let { user } = $props<{ user: User }>();
</script>

<main>
	<Sidebar {user}>
		<div>
			<h1>Hello, {user.username}</h1>
			<h1>Welcome to the crib.</h1>
			<p>HOME WELCOME PAGE</p>
			<p>Feel free to explore the rest of the site!</p>
		</div>
	</Sidebar>
</main>
