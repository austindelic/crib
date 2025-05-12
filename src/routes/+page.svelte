<script lang="ts">
	const props = $props();
	const { user } = props.data;
	import Home from '$lib/components/pages/Home.svelte';
	import Dashboard from '$lib/components/pages/Dashboard.svelte';
</script>

{#if user}
	<Dashboard {user} />
{:else}
	<Home />
{/if}
