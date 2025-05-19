<script>
	import { Button, Modal } from 'flowbite-svelte';
	let defaultModal = $state(false);
</script>

<Button onclick={() => (defaultModal = true)}>Default modal</Button>
<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		With less than a month to go before the European Union enacts new consumer privacy laws for its
		citizens, companies around the world are updating their terms of service agreements to comply.
	</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25
		and is meant to ensure a common set of data rights in the European Union. It requires
		organizations to notify users as soon as possible of high-risk data breaches that could
		personally affect them.
	</p>

	{#snippet footer()}
		<Button onclick={() => alert('Handle "success"')}>I accept</Button>
		<Button color="alternative">Decline</Button>
	{/snippet}
</Modal>
