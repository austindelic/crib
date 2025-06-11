<script lang="ts">
	import ChoresPage from '$ui/pages/Chores.page.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ChoresPage />
