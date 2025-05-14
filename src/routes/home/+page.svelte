<script lang="ts">
	import Home from '$lib/ui/pages/Home.svelte';
	import type { User } from '$lib/server/db/types';
	const { data } = $props();
	const { user }: { user: User | null } = data;
</script>

<Home {user} />
