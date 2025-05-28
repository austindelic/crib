<script lang="ts">
	const { error, status }: { error: App.Error | null; status: number } = $props();
</script>

{#if status === 404}
	<!-- Shared 404 page -->
	<section class="p-8 text-center">
		<h1 class="mb-4 text-4xl font-bold">Page Not Found</h1>
		<p class="mb-6 text-lg">
			Sorry, we couldn't find what you were looking for. Let's get you back home!
		</p>
		<a href="/" class="text-blue-500 underline">Go to Home</a>
	</section>
{:else}
	<!-- Custom error for other status codes -->
	<section class="p-8 text-center">
		<h1 class="mb-4 text-4xl font-bold">Error {status}</h1>
		<p class="mb-6 text-lg">{error?.message ?? 'An unexpected error occurred.'}</p>
		<a href="/" class="text-blue-500 underline">Go to Home</a>
	</section>
{/if}
