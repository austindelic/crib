<script lang="ts">
	import type { PageProps } from './$types';
	import 'github-markdown-css/github-markdown-light.css';
	import 'highlight.js/styles/github.css';
	import MdRenderer from '$ui/components/MdRenderer.svelte';
	let { data }: PageProps = $props();
	const { clean_html } = $derived(data);
</script>

{#if clean_html}
	<MdRenderer html={clean_html} />
{/if}
