<script lang="ts">
	import Home from '$lib/ui/pages/Home.svelte';
	import type { UserStrict } from '$lib/server/db/types';
	const { data } = $props();
	const { user } = data as { user: UserStrict };
</script>

<Home user />
