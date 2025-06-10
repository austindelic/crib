<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import type { HouseIssue } from '$schema_types';

	let { issue, is_open = $bindable() }: { issue: HouseIssue | null; is_open: boolean } = $props();
</script>

<Modal title={issue?.name} outsideclose={false} bind:open={is_open}>
	<div class="mb-4 grid gap-4 sm:grid-cols-2">
		<div>{issue?.description}</div>
		<div>{issue?.created_at}"</div>
		<div>priority</div>
	</div>
</Modal>
