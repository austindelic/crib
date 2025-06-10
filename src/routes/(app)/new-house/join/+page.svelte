<script lang="ts">
	import UsejoinCodeForm from '$ui/components/join_code/UseJoinCode.form.svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	let { data }: PageProps = $props();
	const { code, form } = $derived.by(() => {
		return { code: page.url.searchParams.get('code'), form: data.form };
	});
</script>

<UsejoinCodeForm {form} {code} />
