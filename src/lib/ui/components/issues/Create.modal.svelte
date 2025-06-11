<script lang="ts">
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
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
		class="mx-auto flex max-w-md flex-col"
		method="POST"
		action="?/create"
	>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Field {form} name="name">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Name</Label>
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
			</div>
			<div class="w-full">
				<Field {form} name="description">
					<Control>
						{#snippet children({ props })}
							<Label {...props} class="mb-2">Description</Label>
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
			</div>

			<Button type="submit" class="w-32">Submit</Button>
		</div>
	</form>
</Modal>
