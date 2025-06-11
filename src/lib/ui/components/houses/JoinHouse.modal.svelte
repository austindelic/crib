<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/house/join_house.schema';
	import { enhance } from '$app/forms';
	import { Button, Input, Modal, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { KeyRound } from '@lucide/svelte';
	let {
		form: form_prop,
		code,
		is_open = $bindable()
	}: {
		form: SuperValidated<Infer<typeof schema>>;
		code: string | null;
		is_open: boolean;
	} = $props();

	const { form_data, form } = $derived.by(() => {
		const form = superForm(form_prop, {
			validators: zodClient(schema)
		});
		if (code) {
			form.form.set({
				join_code: code
			});
		}
		return { form_data: form.form, form };
	});

	let is_submitting: boolean = $state(false);
	onMount(() => {
		if (code) {
			is_open = true;
		}
	});
</script>

<Modal title="Join New House" outsideclose={false} bind:open={is_open}>
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
		class="mx-auto mt-4 flex max-w-md flex-col space-y-6"
		method="POST"
		action="?/join"
	>
		<Field {form} name="join_code">
			<Control>
				{#snippet children({ props })}
					<Label
						class="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						<KeyRound class="text-primary-500 h-4 w-4" />
						Join Code
					</Label>
					<Input
						{...props}
						type="text"
						bind:value={$form_data.join_code}
						class="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
					/>
				{/snippet}
			</Control>
			<FieldErrors class="text-secondary-600 dark:text-secondary-400 text-sm" />
		</Field>

		<Button
			type="submit"
			disabled={is_submitting}
			class="bg-primary-600 hover:bg-primary-700 w-full justify-center rounded-lg py-2.5 text-white transition disabled:opacity-50"
		>
			{#if is_submitting}
				<Spinner class="me-3" color="gray" size="4" />
				Submitting...
			{:else}
				Join House
			{/if}
		</Button>
	</form>
</Modal>
