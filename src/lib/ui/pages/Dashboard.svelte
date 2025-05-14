<script lang="ts">
	import { enhance } from '$app/forms';
	let { user } = $props();
</script>

<main>
	<h1>Hello, {user.username}</h1>
	<h1>Welcome to the crib.</h1>
	<p>HOME WELCOME PAGE</p>

	<p>Feel free to explore the rest of the site!</p>
</main>
