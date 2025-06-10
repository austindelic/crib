<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Modal,
		Label,
		Input
	} from 'flowbite-svelte';
	import { redirectToChild } from '$utils/routing.utils';
	import { page } from '$app/state';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/onboarding.schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { Control, Field, FieldErrors } from 'formsnap';
	import { enhance } from '$app/forms';
	import ViewIssueModal from '$ui/modals/issue/ViewIssue.modal.svelte';
	import type { PageProps } from './$types';
	import type { HouseIssue } from '$schema_types';
	const { data }: PageProps = $props();
	const create_form = superForm(data.create_form, {
		validators: zodClient(schema)
	});
	const { form: create_form_data } = create_form;
	const issues = $derived(data.issues ?? []);
	let s_issue_id = page.url.searchParams.get('issue');
	let s_issue = $derived(issues.find((i) => i.id === s_issue_id) as HouseIssue | null);
	let is_view_modal_open = $state(false);
	let is_create_modal_open = $state(false);
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
					redirectToChild(`?issue=${issue.id}`, page);
					s_issue = issues.find((i) => i.id === issue.id) as HouseIssue;
					is_view_modal_open = true;
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

<ViewIssueModal issue={s_issue} bind:is_open={is_view_modal_open} />

<Modal title="Create Issue" outsideclose={false} bind:open={is_create_modal_open}>
	<form
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					is_create_modal_open = false;
				}
				await update();
			};
		}}
		class="mx-auto flex max-w-md flex-col"
		method="POST"
		action="?/create"
	>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Field form={create_form} name="name">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Name</Label>
							<Input
								{...props}
								type="text"
								placeholder="Light in kitchen needs replacing..."
								bind:value={$create_form_data.name}
								required
							/>
						{/snippet}
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<div class="w-full">
				<Field form={create_form} name="description">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Description</Label>
							<Input
								{...props}
								type="text"
								placeholder="I noticed.... I feel.... I found..."
								bind:value={$create_form_data.description}
								required
							/>
						{/snippet}
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<Button type="submit" class="w-32">Submit</Button>
		</div>
	</form>
</Modal>

<Modal title="Create Issue" outsideclose={false} bind:open={is_create_modal_open}>
	<form
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					is_create_modal_open = false;
				}
				await update();
			};
		}}
		class="mx-auto flex max-w-md flex-col"
		method="POST"
		action="?/create"
	>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Field form={create_form} name="name">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Name</Label>
							<Input
								{...props}
								type="text"
								placeholder="Light in kitchen needs replacing..."
								bind:value={$create_form_data.name}
								required
							/>
						{/snippet}
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<div class="w-full">
				<Field form={create_form} name="description">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Description</Label>
							<Input
								{...props}
								type="text"
								placeholder="I noticed.... I feel.... I found..."
								bind:value={$create_form_data.description}
								required
							/>
						{/snippet}
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<Button type="submit" class="w-32">Submit</Button>
		</div>
	</form>
</Modal>
