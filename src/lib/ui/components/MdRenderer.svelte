<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import 'highlight.js/styles/github.css';

	const data: { html: string | null } = $props();
	const { html } = $derived(data);
</script>

{#if html}
	<div class="markdown-body">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</div>
{/if}
