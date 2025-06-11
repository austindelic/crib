<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { SiGithub } from '@icons-pack/svelte-simple-icons';
	import googleIcon from '$lib/images/google.svg';

	let { is_open = $bindable() }: { is_open: boolean } = $props();
</script>

<Modal title="Sign in to Crib" bind:open={is_open} autoclose>
	<div class="flex flex-col items-center justify-center gap-4 p-6">
		<p class="max-w-sm text-center text-sm text-gray-500">
			Welcome! Please log in using your preferred account to continue.
		</p>

		<div class="flex w-full max-w-xs flex-col gap-3">
			<Button
				href="/api/login/google"
				class="flex items-center justify-center gap-2 border bg-white text-gray-800 transition hover:bg-gray-100"
			>
				<img src={googleIcon} alt="Google" class="h-5 w-5" />
				<span>Continue with Google</span>
			</Button>

			<Button
				href="/api/login/github"
				class="flex items-center justify-center gap-2 bg-gray-900 text-white transition hover:bg-gray-800"
			>
				<SiGithub size={20} title="GitHub" />
				<span>Continue with GitHub</span>
			</Button>
		</div>
	</div>
</Modal>
