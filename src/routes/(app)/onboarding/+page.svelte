<script lang="ts">
	import OnboardingForm from '$ui/components/onboarding/Onboarding.form.svelte';
	let { data } = $props();
	const { form } = $derived(data);
</script>

<OnboardingForm {form} />
