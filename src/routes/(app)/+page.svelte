<script lang="ts">
	import type { PageProps } from './$types';
	import OnboardingModal from '$ui/components/onboarding/Onboarding.modal.svelte';
	import NewUser from '$ui/pages/NewUser.page.svelte';
	import { Spinner } from 'flowbite-svelte';

	const { data }: PageProps = $props();
	let is_onboarding_modal_open = $state(false);
</script>

<NewUser />
{#await data.onboarding_form}
	<Spinner />
{:then onboarding_form}
	<OnboardingModal
		form={onboarding_form}
		is_open={is_onboarding_modal_open}
		onboarding_needed={data.onboarding_needed}
	/>
{/await}
