<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '../../../../../lib/schemas/use_join_code.schema.js';
	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST">
	<Field {form} name="join_code">
		<Control>
			{#snippet children({ props })}
				<Label>Join Code</Label>
				<input {...props} type="text" bind:value={$formData.join_code} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<button>Submit</button>
</form>
