<script lang="ts">
	import { Section, HeroHeader } from 'flowbite-svelte-blocks';
</script>

<p>This is a test</p>
<Section name="logos">
	<HeroHeader>
		{#snippet h2()}Select a House to get started.{/snippet}
	</HeroHeader>
</Section>
