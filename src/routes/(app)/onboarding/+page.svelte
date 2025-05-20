<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Section } from 'flowbite-svelte-blocks';
	import { Field, Control, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '../../../lib/schemas/onboarding.schema.js';
	import { DateInput } from 'date-picker-svelte';
	import { FloatingLabelInput, Input, Label, Button, Modal } from 'flowbite-svelte';
	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<Section sectionClass="h-96">
	<Modal title="Add Product" open={true} dismissable={false}>
		<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST">
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
				<div class="sm:col-span-2">
					<Field {form} name="name">
						<Control>
							{#snippet children({ props })}
								<Label {...props} class="mb-2">Name</Label>
								<Input
									{...props}
									type="text"
									placeholder="Type Full Name"
									bind:value={$formData.name}
									required
								/>
							{/snippet}
						</Control>
						<FieldErrors />
					</Field>
				</div>
				<div class="w-full">
					<Field {form} name="email">
						<Control>
							{#snippet children({ props })}
								<Label {...props} class="mb-2">Email</Label>
								<Input
									{...props}
									type="text"
									placeholder="example@email.com"
									bind:value={$formData.email}
									required
								/>
							{/snippet}
						</Control>
						<FieldErrors />
					</Field>
				</div>
				<div class="w-full">
					<Field {form} name="dob">
						<Control>
							<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
							{#snippet children({ props })}
								<Label>Date of Birth</Label>
								<DateInput
									bind:value={$formData.dob}
									format="dd-MM-yyyy"
									placeholder="04-02-2007"
								/>
								<!-- Hidden input ensures value is submitted correctly -->
								<input type="hidden" name="dob" value={$formData.dob} />
							{/snippet}
						</Control>
						<FieldErrors />
					</Field>
				</div>
				<div class="sm:col-span-2">
					<Field {form} name="phone_number">
						<Control>
							{#snippet children({ props })}
								<FloatingLabelInput
									{...props}
									variant="outlined"
									type="text"
									bind:value={$formData.phone_number}>Phone Number</FloatingLabelInput
								>
							{/snippet}
						</Control>
						<FieldErrors />
					</Field>
				</div>

				<Button class="w-32">Submit</Button>
			</div>
		</form>
	</Modal>
</Section>
