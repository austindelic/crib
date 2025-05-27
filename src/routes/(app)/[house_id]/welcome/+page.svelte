<script lang="ts">
	import type { PageProps } from './$types';
	import 'github-markdown-css/github-markdown-light.css';
	import 'highlight.js/styles/github.css';
	let { data }: PageProps = $props();
	const { html } = $derived(data);
</script>

<div class="markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
