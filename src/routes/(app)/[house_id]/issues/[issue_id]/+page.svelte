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

<div>{issue.name}</div>
<div>{issue.description}</div>

<Modal
	title="Login"
	bind:open={is_open}
	onclose={() => {
		console.log('changed page');
		redirectToParent(page);
	}}
>
	<form>
		<div class="mb-4 grid gap-4 sm:grid-cols-2">
			<div>{issue.name}</div>
			<div>{issue.description}</div>
		</div>
	</form>
</Modal>
