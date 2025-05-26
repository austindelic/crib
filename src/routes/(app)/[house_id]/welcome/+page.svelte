<script lang="ts">
	import 'highlight.js/styles/github-dark.css'; // or any other theme you like
	import 'github-markdown-css/github-markdown.css'; // For overall Markdown styles
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let { page_md } = $derived(data.house);
</script>

<main class="markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html page_md}
</main>
