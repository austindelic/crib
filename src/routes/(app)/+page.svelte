<script lang="ts">
	import App from '$lib/ui/pages/App.svelte';
	import type { User } from '$lib/server/db/types';

	let { data } = $props<{ data: { user: User } }>();
	let { user } = data;
</script>

<App {user} />
