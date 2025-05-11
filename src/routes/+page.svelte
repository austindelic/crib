<script lang="ts">
    export let data;
    import Home from '$lib/components/pages/Home.svelte';
</script>

{#if data.user}
<div>
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
</div>
    
    
{:else}
    <Home/>
{/if}
