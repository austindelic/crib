<script lang="ts">
	import { marked } from 'marked';
	let post: { title: string; content: string } = $props();

	const html = marked.parse(post.content);
</script>

<h1>{post.title}</h1>

<!-- Render as raw HTML -->
<div class="markdown">
	{@html html}
</div>
