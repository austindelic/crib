<script lang="ts">
	import Error from '$ui/pages/Error.svelte';
	import { page } from '$app/state';
	let { error, status }: { error: App.Error | null; status: number } = $derived(page);
</script>

<Error {error} {status} />
