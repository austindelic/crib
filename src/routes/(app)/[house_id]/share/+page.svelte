<script lang="ts">
	import type { PageProps } from './$types';
	import { Button } from 'flowbite-svelte';
	import { Plus, QrCode, Link as LinkIcon, Hash } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import QRCode from 'qrcode';

	const { form }: PageProps = $props();
	const { join_code, join_code_url } = $derived.by(() => ({
		join_code: form?.join_code,
		join_code_url: form?.join_code_url
	}));

	let join_code_url_qr_code: string | null = $state(null);

	$effect(() => {
		const getQrCode = async () => {
			if (join_code_url) {
				join_code_url_qr_code = await QRCode.toDataURL(join_code_url);
			}
		};
		getQrCode();
	});
</script>

<div class="mx-auto mt-16 max-w-xl space-y-8 px-4 text-center sm:px-0">
	<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
		Generate a <span class="font-rubikvinyl text-primary-600">Join Code</span>
	</h1>

	<form method="POST" use:enhance>
		<Button type="submit" class="w-full justify-center sm:w-52">
			<Plus class="mr-2 h-4 w-4" />
			Generate Code!
		</Button>
	</form>

	{#if join_code}
		<div
			class="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100"
		>
			<Hash class="text-primary-500 h-5 w-5" />
			<span>Join Code:</span>
			<code class="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-neutral-800">{join_code}</code>
		</div>
	{/if}

	{#if join_code_url}
		<div class="flex flex-col items-center gap-2">
			<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
				<LinkIcon class="text-secondary-500 h-4 w-4" />
				<span>Join Link:</span>
				<a
					href={join_code_url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary-600 hover:text-primary-700 dark:text-primary-400 underline"
				>
					{join_code_url}
				</a>
			</div>
		</div>
	{/if}

	{#if join_code_url_qr_code}
		<div class="mt-6 flex flex-col items-center gap-2">
			<QrCode class="text-primary-500 h-5 w-5" />
			<img
				src={join_code_url_qr_code}
				alt="Join Code QR Code"
				class="w-40 rounded border border-gray-300 dark:border-neutral-700"
			/>
			<p class="text-sm text-gray-500 dark:text-gray-400">Scan to join this house</p>
		</div>
	{/if}
</div>
