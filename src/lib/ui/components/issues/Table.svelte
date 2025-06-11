<script lang="ts">
	import type { HouseIssue, User } from '$schema_types';
	import { Eye, SquarePen, Trash2 } from '@lucide/svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';

	let {
		user,
		issues,
		selected_issue = $bindable(),
		is_edit_modal_open = $bindable(),
		is_view_modal_open = $bindable(),
		is_delete_modal_open = $bindable()
	}: {
		user: User;
		issues: HouseIssue[];
		selected_issue: HouseIssue;
		is_edit_modal_open: boolean;
		is_view_modal_open: boolean;
		is_delete_modal_open: boolean;
	} = $props();

	const MAX_NAME_CHAR_LIMIT = 50;
	const MAX_DESCRIPTION_CHAR_LIMIT = 30;
</script>

<Table striped={true}>
	<TableHead>
		<TableHeadCell />
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Date Created</TableHeadCell>
		<TableHeadCell />
		<TableHeadCell />
		<!-- TODO: <TableHeadCell>Priority</TableHeadCell> -->
	</TableHead>
	<TableBody>
		{#each issues as issue (issue.id)}
			<TableBodyRow
				onclick={() => {
					selected_issue = issues.find((i) => i.id === issue.id) as HouseIssue;
					if (!is_edit_modal_open && !is_delete_modal_open) {
						is_view_modal_open = true;
					}
				}}
			>
				<TableBodyCell>
					<Button
						onclick={() => {
							selected_issue = issue;
							is_view_modal_open = true;
						}}
					>
						<Eye />
					</Button>
				</TableBodyCell>
				<TableBodyCell
					>{issue.name.length > MAX_NAME_CHAR_LIMIT
						? `${issue.name.slice(0, MAX_NAME_CHAR_LIMIT)}...`
						: issue.name}</TableBodyCell
				>
				<TableBodyCell
					>{issue.description.length > MAX_DESCRIPTION_CHAR_LIMIT
						? `${issue.name.slice(0, MAX_DESCRIPTION_CHAR_LIMIT)}...`
						: issue.description}</TableBodyCell
				>
				<TableBodyCell>
					{issue.created_at
						? (() => {
								const createdDate = new Date(issue.created_at);
								const formattedDate = new Intl.DateTimeFormat('en-GB', {
									day: '2-digit',
									month: '2-digit',
									year: '2-digit'
								}).format(createdDate);
								const formattedTime = createdDate.toLocaleTimeString('en-GB', {
									hour: '2-digit',
									minute: '2-digit'
								});
								return `${formattedDate} at ${formattedTime}`;
							})()
						: 'N/A'}
				</TableBodyCell>

				{#if issue.user_id == user.id}
					<TableBodyCell>
						<Button
							onclick={() => {
								selected_issue = issue;
								is_edit_modal_open = true;
							}}
						>
							<SquarePen />
						</Button>
					</TableBodyCell>
					<TableBodyCell>
						<Button
							onclick={() => {
								selected_issue = issue;
								is_delete_modal_open = true;
							}}
						>
							<Trash2 />
						</Button>
					</TableBodyCell>
				{/if}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
