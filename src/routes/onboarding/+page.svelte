<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { allergies, schema, themes } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<!-- ... -->
</form>
<SuperDebug data={$formData} />
