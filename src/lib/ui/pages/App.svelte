<script lang="ts">
	import type { User } from '$lib/server/db/types';
	import Sidebar from '$lib/ui/components/Sidebar.svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import { Button, Modal } from 'flowbite-svelte';
	import { Plus } from '@lucide/svelte';
	let defaultModal = $state(true);
	const handleSubmit = () => {
		alert('Form submited.');
	};
	let { user } = $props<{ user: User }>();
</script>

<main>
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
	<Sidebar {user}>
		<div>
			<h1>Hello, {user.username}</h1>
			<h1>Welcome to the crib.</h1>
			<p>HOME WELCOME PAGE</p>
			<p>Feel free to explore the rest of the site!</p>
		</div>
	</Sidebar>
</main>
