<script lang="ts">
	import type { PageProps } from './$types';
	import OnboardingModal from '$ui/components/onboarding/Onboarding.modal.svelte';
	import NewUser from '$ui/pages/NewUser.page.svelte';
	const { data }: PageProps = $props();
	let { onboarding_needed, onboarding_form } = $derived(data);
	let is_onboarding_modal_open = $state(false);
</script>

<NewUser />

<OnboardingModal form={onboarding_form} is_open={is_onboarding_modal_open} {onboarding_needed} />
