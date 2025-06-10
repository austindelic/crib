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
	import ViewIssueModal from '$ui/components/issues/ViewIssue.modal.svelte';
	import CreateIssueModal from '$ui/components/issues/CreateIssue.modal.svelte';
	import EditIssueModal from '$ui/components/issues/EditIssue.modal.svelte';

	import type { HouseIssue } from '$schema_types';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { schema as CreateSchema } from '$lib/form_schemas/issue/create_issue.schema';
	import { schema as EditSchema } from '$lib/form_schemas/issue/edit_issue.schema';

	const {
		issues: issues_prop,
		create_form,
		edit_form
	}: {
		issues: HouseIssue[] | null;
		create_form: SuperValidated<Infer<typeof CreateSchema>>;
		edit_form: SuperValidated<Infer<typeof EditSchema>>;
	} = $props();

	const issues = $derived(issues_prop ?? []);
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
<CreateIssueModal form={create_form} bind:is_open={is_create_modal_open} />
<EditIssueModal form={edit_form} issue={selected_issue} bind:is_open={is_edit_modal_open} />
