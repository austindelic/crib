<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import { redirectToParent } from '$utils/routing.utils';
	import { page } from '$app/state';
	const { data }: PageProps = $props();
	const { issue } = $derived(data);
	let is_open = $state(false);

	onMount(() => {
		is_open = true;
	});
</script>

<Modal
	title={`Issue: ${issue.name}`}
	bind:open={is_open}
	onclose={() => {
		redirectToParent(page);
	}}
>
	<form>
		<div class="mb-4 grid gap-4 sm:grid-cols-2">
			<div>{issue.name}</div>
			<div>{issue.description}</div>
			<div>{issue.created_at}</div>
		</div>
	</form>
</Modal>
