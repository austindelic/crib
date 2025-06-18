<script lang="ts">
	import { Button, Input, Label, Modal, Select } from 'flowbite-svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import { enhance } from '$app/forms';
	import { Control, Field, FieldErrors } from 'formsnap';
	import { schema } from '$lib/form_schemas/issue/create_issue.schema';

	import type { SuperValidated, Infer } from 'sveltekit-superforms';

	let {
		form: form_prop,
		is_open = $bindable()
	}: { form: SuperValidated<Infer<typeof schema>>; is_open: boolean } = $props();

	const { form_data, form } = $derived.by(() => {
		const form = superForm(form_prop, {
			validators: zodClient(schema)
		});
		return { form_data: form.form, form };
	});
</script>

<Modal title="Create Issue" outsideclose={false} bind:open={is_open}>
	<form
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					is_open = false;
				}
				await update();
			};
		}}
		class="mx-auto w-full max-w-lg space-y-6 p-4"
		method="POST"
		action="?/create"
	>
		<Field {form} name="name">
			<Control>
				{#snippet children({ props })}
					<Label {...props} class="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
						>Name</Label
					>
					<Input
						{...props}
						type="text"
						placeholder="Light in kitchen needs replacing..."
						bind:value={$form_data.name}
						required
					/>
				{/snippet}
			</Control>
			<FieldErrors />
		</Field>

		<Field {form} name="description">
			<Control>
				{#snippet children({ props })}
					<Label {...props} class="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
						>Description</Label
					>
					<Input
						{...props}
						type="text"
						placeholder="I noticed.... I feel.... I found..."
						bind:value={$form_data.description}
						required
					/>
				{/snippet}
			</Control>
			<FieldErrors />
		</Field>

		<Field {form} name="priority">
			<Control>
				{#snippet children({ props })}
					<Label {...props} class="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
						>Priority</Label
					>
					<Select {...props} bind:value={$form_data.priority} required>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</Select>
				{/snippet}
			</Control>
			<FieldErrors />
		</Field>

		<div class="pt-4">
			<Button type="submit" class="w-full sm:w-40">Submit</Button>
		</div>
	</form>
</Modal>
