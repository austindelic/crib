<script lang="ts">
	import type { PageProps } from './$types';
	import { Button } from 'flowbite-svelte';
	import { Plus } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import QRCode from 'qrcode';

	const { form, data }: PageProps = $props();
	const { join_code, join_code_url } = $derived.by(() => {
		let result: { join_code: string | null; join_code_url: string | null } = {
			join_code: null,
			join_code_url: null
		};
		if (!form) {
			return result;
		}
		result.join_code = form.join_code;
		result.join_code_url = form.join_code_url;
		return result;
	});
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

<form method="POST" use:enhance>
	<input type="hidden" name="house_id" value={data.house.id} />
	<Button type="submit" class="w-52">
		<Plus />
		Generate Code!
	</Button>
</form>

{#if join_code}
	<p>Join Code: {join_code}</p>
{/if}

{#if join_code_url}
	<p>
		Join Code URL: <a href={join_code_url} target="_blank" rel="noopener noreferrer"
			>{join_code_url}</a
		>
	</p>
{/if}
{#if join_code_url_qr_code}
	<img src={join_code_url_qr_code} alt="Join Code QR Code" />
{/if}
