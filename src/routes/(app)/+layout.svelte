<script lang="ts">
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Sidebar from '$ui/components/Sidebar.svelte';
	import '$css';
	import { navigating } from '$app/state';
	const { children, data }: { children: Snippet; data: LayoutData } = $props();
	const { user, houses } = $derived(data);
</script>

<Sidebar {user} {houses}>
	<div class="relative h-full w-full">
		<!-- Loader with fade animation -->
		<div
			class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-300"
			class:opacity-100={navigating.complete}
			class:opacity-0={!navigating.complete}
		>
			<!-- Gradient blurred spinner -->
			<div class="relative aspect-square w-12 animate-spin rounded-full">
				<div
					class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500"
					style="mask-image: radial-gradient(circle, transparent 40%, black 41%); -webkit-mask-image: radial-gradient(circle, transparent 40%, black 41%); filter: blur(4px);"
				></div>
			</div>
		</div>

		<!-- Children render -->
		<div
			class="transition-opacity duration-300"
			class:opacity-0={navigating.complete}
			class:opacity-100={!navigating.complete}
		>
			{@render children()}
		</div>
	</div>
</Sidebar>
