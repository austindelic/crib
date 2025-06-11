<script lang="ts">
	import type { PageProps } from './$types';

	import MdRenderer from '$ui/components/MarkdownRenderer.svelte';
	import { Button } from 'flowbite-svelte';
	import { SquarePen } from '@lucide/svelte';
	let { data }: PageProps = $props();
	const { clean_html } = $derived(data);
</script>

{#if clean_html}
	<MdRenderer {clean_html} />
{/if}

<!-- Edit Button -->
<div class="mt-8 text-right">
	<Button href="welcome/editor" class="flex items-center gap-2">
		<SquarePen class="h-4 w-4" />
		<span>Edit</span>
	</Button>
</div>
