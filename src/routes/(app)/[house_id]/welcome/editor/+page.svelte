<script lang="ts">
	import MdRender from '$ui/components/MarkdownRenderer.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import { BookOpen, Plus, SquarePen } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import MarkdownEditor from '$ui/components/MarkDownEditor.svelte';
	const { form, data }: PageProps = $props();
	const new_clean_html = $derived(form?.new_clean_html ?? null);
	let code = $state(data.house.page_md);
	let publish_model_is_open = $state(false);
</script>

<div class="flex h-screen flex-col">
	<div class="mb-4 flex gap-4">
		<form
			method="POST"
			use:enhance
			class="flex w-full items-center justify-start border-b border-gray-300 p-4"
			action="?/preview"
		>
			<Button type="submit" name="action" class="flex items-center gap-2">
				<BookOpen />
				<span>Preview</span>
			</Button>
			<input type="hidden" name="code" bind:value={code} />
		</form>
		<Button
			type="submit"
			class="flex items-center gap-2"
			onclick={() => {
				publish_model_is_open = true;
			}}
		>
			<SquarePen />
			<span>Publish</span>
		</Button>
	</div>

	<div class="flex flex-1 gap-4">
		<div class="h-[800px] flex-1 overflow-y-auto p-4">
			<MarkdownEditor class="w-full" bind:value={code} />
		</div>
		<div class="h-[800px] flex-1 overflow-y-auto p-4">
			{#if new_clean_html}
				<MdRender clean_html={new_clean_html} />
			{:else}
				<MdRender clean_html={data.clean_html ?? null} />
			{/if}
		</div>
	</div>
</div>

<Modal title="Add Product" bind:open={publish_model_is_open} autoclose>
	<form
		method="POST"
		use:enhance
		class="flex w-full items-center justify-start border-b border-gray-300 p-4"
		action="?/publish"
	>
		<div class="mb-4 grid gap-4 sm:grid-cols-2">
			<Button type="submit" class="w-52">
				<Plus />
				Are you sure you want to publish???
			</Button>
		</div>
		<input type="hidden" name="code" bind:value={code} />
	</form>
</Modal>
