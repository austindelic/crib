<script lang="ts">
	import CreateOrJoinHouse from '$ui/components/houses/CreateOrJoinHouse.form.svelte';
	import CreateHouse from '$ui/components/houses/CreateHouse.modal.svelte';
	import JoinHouse from '$ui/components/houses/JoinHouse.modal.svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	const { data }: PageProps = $props();
	const code: string | null = page.url.searchParams.get('code');
	const { create_house_form, join_house_form } = $derived(data);
	let is_create_house_modal_open = $state(false);
	let is_join_house_modal_open = $state(false);
</script>

<CreateOrJoinHouse bind:is_create_house_modal_open bind:is_join_house_modal_open />

<CreateHouse bind:is_open={is_create_house_modal_open} form={create_house_form} />
<JoinHouse bind:is_open={is_join_house_modal_open} form={join_house_form} {code} />
