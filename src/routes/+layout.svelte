<script>
	let { children } = $props();
	import '../app.css';
</script>

<svelte:head>
	<title>crib.</title>
</svelte:head>
{@render children()}
