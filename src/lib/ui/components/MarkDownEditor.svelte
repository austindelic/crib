<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { markdown } from '@codemirror/lang-markdown';

	let { value = $bindable(), ...props } = $props();
</script>

<CodeMirror {...props} bind:value lang={markdown()} />
