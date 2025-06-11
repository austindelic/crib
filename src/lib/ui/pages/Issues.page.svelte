<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import ViewIssueModal from '$ui/components/issues/View.modal.svelte';
	import CreateIssueModal from '$ui/components/issues/Create.modal.svelte';
	import EditIssueModal from '$ui/components/issues/Edit.modal.svelte';
	import TabledIssues from '$ui/components/issues/Table.svelte';
	import SortButtons from '$ui/components/issues/SortButtons.svelte';
	import DeleteIssueModal from '$ui/components/issues/Delete.modal.svelte';
	import type { HouseIssue, User } from '$schema_types';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { schema as CreateSchema } from '$lib/form_schemas/issue/create_issue.schema';
	import { schema as EditSchema } from '$lib/form_schemas/issue/edit_issue.schema';
	import { schema as DeleteSchema } from '$lib/form_schemas/issue/delete_issue.schema';
	import { Plus, RefreshCcw } from '@lucide/svelte';
	import { invalidateAll } from '$app/navigation';

	let {
		user,
		issues,
		create_form,
		edit_form,
		delete_form
	}: {
		user: User;
		issues: HouseIssue[];
		create_form: SuperValidated<Infer<typeof CreateSchema>>;
		edit_form: SuperValidated<Infer<typeof EditSchema>>;
		delete_form: SuperValidated<Infer<typeof DeleteSchema>>;
	} = $props();

	let selected_issue = $state({}) as HouseIssue;

	let is_view_modal_open: boolean = $state(false);
	let is_create_modal_open: boolean = $state(false);
	let is_edit_modal_open: boolean = $state(false);
	let is_delete_modal_open: boolean = $state(false);
</script>

<div class="flex items-center space-x-2">
	<Button onclick={() => (is_create_modal_open = true)}>
		<Plus />
	</Button>
	<SortButtons bind:issues />
	<Button onclick={() => invalidateAll()}>
		<RefreshCcw />
	</Button>
</div>

<TabledIssues
	bind:is_view_modal_open
	bind:is_edit_modal_open
	bind:is_delete_modal_open
	bind:selected_issue
	{issues}
	{user}
/>

<DeleteIssueModal bind:is_open={is_delete_modal_open} issue={selected_issue} form={delete_form} />
<ViewIssueModal bind:is_open={is_view_modal_open} issue={selected_issue} />
<CreateIssueModal bind:is_open={is_create_modal_open} form={create_form} />
<EditIssueModal bind:is_open={is_edit_modal_open} form={edit_form} issue={selected_issue} />
