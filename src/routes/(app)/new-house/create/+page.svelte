<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/create_house.schema.js';
	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST">
	<Field {form} name="house_name">
		<Control>
			{#snippet children({ props })}
				<Label>House Name</Label>
				<input {...props} type="text" bind:value={$formData.house_name} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<button>Submit</button>
</form>
