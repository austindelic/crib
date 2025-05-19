<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import { Button, Modal } from 'flowbite-svelte';
	import { Plus } from '@lucide/svelte';
	let defaultModal = $state(false);
	const handleSubmit = () => {
		alert('Form submited.');
	};
</script>

<Section sectionClass="h-96">
	<Button onclick={() => (defaultModal = true)}>Login</Button>
	<Modal title="Add Product" bind:open={defaultModal} autoclose>
		<form onsubmit={handleSubmit}>
			<div class="mb-4 grid gap-4 sm:grid-cols-2">
				<Button href="/login/google" class="w-52">
					<Plus />
					Login with github
				</Button>
				<Button href="/login/github" class="w-52">
					<Plus />
					Login with github
				</Button>
			</div>
		</form>
	</Modal>
</Section>
