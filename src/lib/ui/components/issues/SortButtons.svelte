<script lang="ts">
	import type { HouseIssue } from '$schema_types';
	import { Label, Select } from 'flowbite-svelte';

	let { issues = $bindable() }: { issues: HouseIssue[] } = $props();
	let selected: string = $state('dl_n');

	let sort_options: { value: string; name: string }[] = [
		{ value: 'dl_n', name: 'Date Listed: Newest First' },
		{ value: 'dl_o', name: 'Date Listed: Oldest First' },
		{ value: 'du_n', name: 'Date Updated: Newest First' },
		{ value: 'du_o', name: 'Date Updated: Oldest First' },
		{ value: 'n_az', name: 'Name: A..Z' },
		{ value: 'n_za', name: 'Name: Z..A' }
	];
	$effect(() => {
		issues = [...issues].sort((a, b) => {
			switch (selected) {
				case 'dl_n':
					// newest first by created_at
					return (b.created_at?.getTime() ?? 0) - (a.created_at?.getTime() ?? 0);
				case 'dl_o':
					// oldest first by created_at
					return (a.created_at?.getTime() ?? 0) - (b.created_at?.getTime() ?? 0);
				case 'du_n':
					// newest first by last_updated
					return (b.last_updated?.getTime() ?? 0) - (a.last_updated?.getTime() ?? 0);
				case 'du_o':
					// oldest first by last_updated
					return (a.last_updated?.getTime() ?? 0) - (b.last_updated?.getTime() ?? 0);
				case 'n_az':
					return a.name.localeCompare(b.name);
				case 'n_za':
					return b.name.localeCompare(a.name);
				default:
					return 0;
			}
		});
	});
</script>

<Select class="mt-2" items={sort_options} bind:value={selected} />
