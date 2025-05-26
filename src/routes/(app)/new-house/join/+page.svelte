<script lang="ts">
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/join_code.schema.js';
	import { page } from '$app/state';
	let { data }: PageProps = $props();
	const code = $derived(page.url.searchParams.get('code'));

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
	$effect(() => {
		$formData.join_code = code ?? '';
	});
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
