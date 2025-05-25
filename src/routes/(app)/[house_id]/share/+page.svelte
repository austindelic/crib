<script lang="ts">
	import type { PageProps } from './$types';
	import { Button } from 'flowbite-svelte';
	import { Plus } from '@lucide/svelte';
	import { enhance } from '$app/forms';

	const { form, data }: PageProps = $props();
	let join_code = $derived(form?.join_code);
</script>

<form method="POST" use:enhance>
	<input type="hidden" name="house_id" value={data.house.id} />
	<Button type="submit" class="w-52">
		<Plus />
		Generate Code
	</Button>
</form>

{#if join_code}
	<p>Join Code: {join_code}</p>
{/if}
