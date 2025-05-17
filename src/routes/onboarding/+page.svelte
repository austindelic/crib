<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import { DateInput } from 'date-picker-svelte';
	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST">
	<Field {form} name="name">
		<Control>
			{#snippet children({ props })}
				<Label>Name</Label>
				<input {...props} type="text" bind:value={$formData.name} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<Field {form} name="email">
		<Control>
			{#snippet children({ props })}
				<Label>Email</Label>
				<input {...props} type="text" bind:value={$formData.email} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<Field {form} name="dob">
		<Control>
			{#snippet children({ props })}
				<Label>Date of Birth</Label>
				<DateInput bind:value={$formData.dob} format="dd-MM-yyyy" placeholder={'04-02-2007'} />
				<!-- Hidden input ensures value is submitted correctly -->
				<input type="hidden" name="dob" value={$formData.dob} />
			{/snippet}
		</Control>
		<Description>Used for age verification and personalisation.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="phone_number">
		<Control>
			{#snippet children({ props })}
				<Label>Phone Number</Label>
				<input {...props} type="text" bind:value={$formData.phone_number} />
			{/snippet}
		</Control>
		<FieldErrors />
	</Field>
	<button>Submit</button>
</form>
