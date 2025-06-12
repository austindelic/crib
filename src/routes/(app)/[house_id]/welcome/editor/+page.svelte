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

<div class="flex h-screen flex-col px-4 py-6">
	<!-- Toolbar -->
	<div class="mb-6 flex items-center gap-4">
		<!-- Preview Button -->
		<form method="POST" use:enhance class="flex items-center gap-2" action="?/preview">
			<input type="hidden" name="code" bind:value={code} />
			<Button type="submit" class="flex items-center gap-2">
				<BookOpen />
				<span>Preview</span>
			</Button>
		</form>

		<!-- Publish Button -->
		<Button onclick={() => (publish_model_is_open = true)} class="flex items-center gap-2">
			<SquarePen />
			<span>Publish</span>
		</Button>
	</div>

	<!-- Editor & Preview Pane -->
	<div class="flex flex-1 gap-6 overflow-hidden">
		<div
			class="flex-1 overflow-y-auto rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
		>
			<h2 class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Editor</h2>
			<MarkdownEditor class="w-full" bind:value={code} />
		</div>
		<div
			class="flex-1 overflow-y-auto rounded-lg border border-gray-200 p-4 dark:border-neutral-700"
		>
			<h2 class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Live Preview</h2>
			<MdRender clean_html={new_clean_html ?? data.clean_html ?? null} />
		</div>
	</div>
</div>

<!-- Publish Modal -->
<Modal title="Publish Page" bind:open={publish_model_is_open} autoclose>
	<form method="POST" use:enhance action="?/publish" class="space-y-4 p-6">
		<p class="text-sm text-gray-700 dark:text-gray-300">
			Are you sure you want to publish this page? This will update the shared house welcome page.
		</p>

		<input type="hidden" name="code" bind:value={code} />

		<div class="flex justify-end gap-3">
			<Button color="gray" onclick={() => (publish_model_is_open = false)} type="button">
				Cancel
			</Button>
			<Button type="submit" class="flex items-center gap-2">
				<Plus />
				Publish
			</Button>
		</div>
	</form>
</Modal>
