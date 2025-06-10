<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { page } from '$app/state';
	import { redirectToChild } from '$utils/routing.utils';
	import type { LayoutProps } from './$types';

	const { children, data }: LayoutProps = $props();
	const issues = $derived(data.issues ?? []);
</script>

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
					redirectToChild(`${issue.id}`, page);
				}}
			>
				<TableBodyCell>{issue.name}</TableBodyCell>
				<TableBodyCell>{issue.description}</TableBodyCell>
				<TableBodyCell>{issue.created_at}</TableBodyCell>
				<TableBodyCell>High Priority!</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{@render children()}
