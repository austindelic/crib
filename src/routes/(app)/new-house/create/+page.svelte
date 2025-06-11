<script lang="ts">
	import CreateHouseForm from '$ui/components/houses/CreateHouse.form.svelte';
	let { data } = $props();

	const { form } = $derived(data);
</script>

<CreateHouseForm {form} />
