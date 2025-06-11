<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/house/create_house.schema.js';
	import { enhance } from '$app/forms';
	let { form: form_prop } = $props();

	const { form_data, form } = $derived.by(() => {
		const form = superForm(form_prop, {
			validators: zodClient(schema)
		});
		return { form_data: form.form, form };
	});
</script>

<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST" action="/?create">
	<Field {form} name="house_name">
		<Control>
			{#snippet children({ props })}
				<Label>House Name</Label>
				<input {...props} type="text" bind:value={$form_data.house_name} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<button>Submit</button>
</form>
