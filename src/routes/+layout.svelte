<script lang="ts">
	import type { Snippet } from 'svelte';

	import '../app.css';
	let { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
