<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	import ViewIssueModal from '$ui/modals/issue/ViewIssue.modal.svelte';
	import CreateIssueModal from '$ui/modals/issue/CreateIssue.modal.svelte';
	import EditIssueModal from '$ui/modals/issue/EditIssue.modal.svelte';

	import type { PageProps } from './$types';
	import type { HouseIssue } from '$schema_types';

	const { data }: PageProps = $props();

	const issues = $derived(data.issues ?? []);
	let selected_issue = $state({}) as HouseIssue;

	let is_view_modal_open: boolean = $state(false);
	let is_create_modal_open: boolean = $state(false);
	let is_edit_modal_open: boolean = $state(false);
</script>

<Button
	onclick={() => {
		is_create_modal_open = true;
	}}>Create Issue</Button
>
<Table>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Date Created</TableHeadCell>
		<TableHeadCell>Priority</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each issues as issue (issue.id)}
			<TableBodyRow
				onclick={() => {
					selected_issue = issues.find((i) => i.id === issue.id) as HouseIssue;
					if (!is_edit_modal_open) {
						is_view_modal_open = true;
					}
				}}
			>
				<TableBodyCell>{issue.name}</TableBodyCell>
				<TableBodyCell>{issue.description}</TableBodyCell>
				<TableBodyCell>{issue.created_at}</TableBodyCell>
				<TableBodyCell>High Priority!</TableBodyCell>
				<TableBodyCell>
					<Button
						onclick={() => {
							selected_issue = issue;
							is_edit_modal_open = true;
						}}>Edit Issue</Button
					>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<ViewIssueModal issue={selected_issue} bind:is_open={is_view_modal_open} />
<CreateIssueModal form={data.create_form} bind:is_open={is_create_modal_open} />
<EditIssueModal issue={selected_issue} form={data.edit_form} bind:is_open={is_edit_modal_open} />
