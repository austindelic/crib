<script>
	import MdRender from '$ui/components/MdRenderer.svelte';
	import { mdToCleanHtml } from '$utils/md.utils';

	let markdown_text = $state('');
	const { clean_html } = $derived(mdToCleanHtml(markdown_text));
</script>

<div class="container">
	<div class="textbox">
		<textarea bind:value={markdown_text} placeholder="Type your markdown here..."></textarea>
	</div>
	<div class="preview">
		<MdRender html={clean_html} />
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100vh;
	}

	.textbox {
		flex: 1;
		padding: 1rem;
		border-right: 1px solid #ccc;
	}

	.preview {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	textarea {
		width: 100%;
		height: 100%;
		resize: none;
		font-family: monospace;
		font-size: 1rem;
	}
</style>
