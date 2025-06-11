<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/house/join_house.schema.js';
	import { enhance } from '$app/forms';
	let {
		form: form_prop,
		code
	}: { form: SuperValidated<Infer<typeof schema>>; code: string | null } = $props();
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
</script>

<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST" action="?/submit">
	<Field {form} name="join_code">
		<Control>
			{#snippet children({ props })}
				<Label>Join Code</Label>
				<input {...props} type="text" bind:value={$form_data.join_code} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<button>Submit</button>
</form>
