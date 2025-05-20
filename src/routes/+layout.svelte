<script lang="ts">
	import type { Snippet } from 'svelte';

	import '$css';
	let { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
