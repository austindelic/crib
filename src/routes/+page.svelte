<script lang="ts">
    export let data;
    import Home from '$lib/components/Home.svelte';
</script>

{#if data.user}
<div>
    <div>
        <h1>this is crib.</h1>
    </div>
    <div>
        <h1>Hello, {data.user.username}.</h1>
    </div>
</div>
    
    
{:else}
    <Home/>
{/if}
