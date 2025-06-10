<script lang="ts">
	import IssuesPage from '$ui/pages/Issues.page.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const issues = $derived(data);
</script>

<IssuesPage {issues} />
