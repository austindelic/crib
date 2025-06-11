<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { Field, Control, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/onboarding/onboarding.schema.js';
	import { DateInput } from 'date-picker-svelte';
	import { FloatingLabelInput, Input, Label, Button, Spinner, Modal } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let {
		form: form_prop,
		is_open,
		onboarding_needed
	}: {
		form: SuperValidated<Infer<typeof schema>>;
		is_open: boolean;
		onboarding_needed: boolean;
	} = $props();

	const { form_data, form } = $derived.by(() => {
		const form = superForm(form_prop, {
			validators: zodClient(schema)
		});
		return { form_data: form.form, form };
	});
	let is_submitting: boolean = $state(false);
	onMount(() => {
		if (onboarding_needed) {
			is_open = true;
		}
	});
</script>

<Modal title="Onboarding" outsideclose={false} dismissable={false} bind:open={is_open}>
	<form
		use:enhance={() => {
			is_submitting = true;
			return async ({ result, update }) => {
				if (result.type === 'success') {
					is_submitting = false;
					is_open = false;
				}
				await update();
			};
		}}
		class="mx-auto mt-4 max-w-md space-y-6"
		method="POST"
		action="?/submit"
	>
		<div class="grid gap-6 sm:grid-cols-2">
			<!-- Name -->
			<div class="sm:col-span-2">
				<Field {form} name="name">
					<Control>
						{#snippet children({ props })}
							<FloatingLabelInput
								{...props}
								type="text"
								variant="outlined"
								bind:value={$form_data.name}
								required
							>
								Name
							</FloatingLabelInput>
						{/snippet}
					</Control>
					<FieldErrors class="text-secondary-600 dark:text-secondary-400 text-sm" />
				</Field>
			</div>

			<!-- Email -->
			<div>
				<Field {form} name="email">
					<Control>
						{#snippet children({ props })}
							<FloatingLabelInput
								{...props}
								type="text"
								variant="outlined"
								bind:value={$form_data.email}
								required
							>
								Email
							</FloatingLabelInput>
						{/snippet}
					</Control>
					<FieldErrors class="text-secondary-600 dark:text-secondary-400 text-sm" />
				</Field>
			</div>

			<!-- DOB -->
			<div>
				<Field {form} name="dob">
					<Control>
						<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
						{#snippet children({ props })}
							<Label class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
								>Date of Birth</Label
							>
							<DateInput
								bind:value={$form_data.dob}
								format="dd-MM-yyyy"
								placeholder="04-02-2007"
								min={new Date('1900-01-01')}
								max={new Date(Date.now())}
							/>
							<input type="hidden" name="dob" value={$form_data.dob} />
						{/snippet}
					</Control>
					<FieldErrors class="text-secondary-600 dark:text-secondary-400 text-sm" />
				</Field>
			</div>

			<!-- Phone Number -->
			<div class="sm:col-span-2">
				<Field {form} name="phone_number">
					<Control>
						{#snippet children({ props })}
							<FloatingLabelInput
								{...props}
								variant="outlined"
								type="text"
								bind:value={$form_data.phone_number}
							>
								Phone Number
							</FloatingLabelInput>
						{/snippet}
					</Control>
					<FieldErrors class="text-secondary-600 dark:text-secondary-400 text-sm" />
				</Field>
			</div>
		</div>

		<!-- Submit -->
		<Button
			type="submit"
			disabled={is_submitting}
			class="bg-primary-600 hover:bg-primary-700 w-full justify-center rounded-lg py-2.5 text-white transition disabled:opacity-50"
		>
			{#if is_submitting}
				<Spinner class="me-3 text-white" color="gray" size="4" />
				Submitting...
			{:else}
				Submit
			{/if}
		</Button>
	</form>
</Modal>
