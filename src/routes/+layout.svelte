<script lang="ts">
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	import type { Snippet } from 'svelte';

	import '$css';
	let { children }: { children: Snippet } = $props();
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

{@render children()}
