<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/form_schemas/create_join_code.schema';
	import { Label, Button, Modal, Select } from 'flowbite-svelte';
	import type { House, HouseUser, User } from '$schema_types';
	let {
		data
	}: { data: { user: User; form: any; houses: { houseUser: HouseUser; house: House }[] | null } } =
		$props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: form_data, enhance } = form;
	const { houses } = data;

	// Create options for the Select component
	const houseOptions =
		houses?.map(({ house }) => ({
			value: house.id, // or houseUser.house_id if you prefer
			name: house.name
		})) ?? [];

	let selected = $state('');
</script>

<Modal title="Add Product" open={true} dismissable={false}>
	<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST">
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Field {form} name="name">
					<Control>
						<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
						{#snippet children({ props })}
							<Label>
								Select a house to create code for
								<Select class="mt-2" items={houseOptions} bind:value={$form_data.house_id} />
								<p>{selected}</p>
							</Label>
						{/snippet}
					</Control>
					<FieldErrors />
				</Field>
			</div>

			<Button class="w-32">Submit</Button>
		</div>
	</form>
</Modal>
