<script lang="ts">
	import type { PageProps } from './$types';
	import 'github-markdown-css/github-markdown-light.css';
	import 'highlight.js/styles/github.css';
	import MdRenderer from '$ui/components/MarkdownRenderer.svelte';
	import { Button } from 'flowbite-svelte';
	import { SquarePen } from '@lucide/svelte';
	let { data }: PageProps = $props();
	const { clean_html } = $derived(data);
</script>

{#if clean_html}
	<MdRenderer {clean_html} />
{/if}
<Button class="flex items-center gap-2 " href="welcome/editor">
	<SquarePen />
	<span>Edit</span>
</Button>
