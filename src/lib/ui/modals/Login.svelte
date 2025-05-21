<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import { Button, Modal } from 'flowbite-svelte';
	import { Plus } from '@lucide/svelte';
	let { is_open }: { is_open: boolean } = $props();
	const handleSubmit = () => {
		alert('Form submited.');
	};
</script>

<Section sectionClass="h-96">
	<Modal title="Add Product" bind:open={is_open} autoclose>
		<form onsubmit={handleSubmit}>
			<div class="mb-4 grid gap-4 sm:grid-cols-2">
				<Button href="/api/login/google" class="w-52">
					<Plus />
					Login with Google
				</Button>
				<Button href="/api/login/github" class="w-52">
					<Plus />
					Login with Github
				</Button>
			</div>
		</form>
	</Modal>
</Section>
