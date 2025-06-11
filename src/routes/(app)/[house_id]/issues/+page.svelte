<script lang="ts">
	import IssuesPage from '$ui/pages/Issues.page.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const { issues, create_form, edit_form, delete_form, user } = $derived(data);
</script>

<IssuesPage {user} {issues} {create_form} {edit_form} {delete_form} />
