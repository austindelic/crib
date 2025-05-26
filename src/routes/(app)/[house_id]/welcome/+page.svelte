<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	const { html } = $derived(data);
</script>

<div class="markdown">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
