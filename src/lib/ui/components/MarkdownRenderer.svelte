<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import 'highlight.js/styles/github.css';

	const data: { clean_html: string | null } = $props();

	const { clean_html } = $derived(data);
</script>

<div class="markdown-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html clean_html}
</div>
