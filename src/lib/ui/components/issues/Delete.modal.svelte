<script lang="ts">
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { enhance } from '$app/forms';
	import { Control, Field, FieldErrors } from 'formsnap';
	import { schema } from '$lib/form_schemas/issue/delete_issue.schema';

	import type { HouseIssue } from '$schema_types';

	let {
		issue,
		is_open = $bindable(),
		form: form_prop
	}: { issue: HouseIssue; is_open: boolean; form: SuperValidated<Infer<typeof schema>> } = $props();

	const { form_data, form } = $derived.by(() => {
		const form = superForm(form_prop, {
			validators: zodClient(schema)
		});
		return { form_data: form.form, form };
	});
</script>

<Modal title="Delete Issue" outsideclose={false} bind:open={is_open}>
	<form
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					is_open = false;
				}
				await update();
			};
		}}
		class="mx-auto flex max-w-md flex-col"
		method="POST"
		action="?/delete"
	>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Field {form} name="name">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Confirm Issue name to continue.</Label>
							<Label {...props} class="mb-2">{issue.name}</Label>
							<Input
								{...props}
								type="text"
								placeholder={issue.name}
								bind:value={$form_data.name}
								required
							/>
						{/snippet}
					</Control>
					<FieldErrors />
				</Field>
			</div>
			<input type="hidden" name="real_name" value={issue.name} />
			<input type="hidden" name="id" value={issue.id} />
			<Button type="submit" class="w-32">Delete</Button>
		</div>
	</form>
</Modal>
