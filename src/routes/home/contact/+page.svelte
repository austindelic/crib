<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<section class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
	<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
		Get in touch with <span class="font-rubikvinyl text-primary-500">crib.</span>
	</h1>
	<p class="mb-8 max-w-xl text-lg text-gray-600 dark:text-gray-300">
		Have questions, feedback, or just want to say hi? We’d love to hear from you. Reach out and
		we’ll get back to you as soon as we can.
	</p>

	<!-- Optional contact UI (placeholder) -->
	<div class="w-full max-w-md space-y-4">
		<input
			type="text"
			placeholder="Your name"
			class="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
		/>
		<input
			type="email"
			placeholder="Your email"
			class="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
		/>
		<textarea
			rows="4"
			placeholder="Your message"
			class="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
		></textarea>
		<Button
			disabled
			class="bg-primary-500 w-full cursor-not-allowed rounded-lg px-4 py-2 font-semibold text-white opacity-70"
		>
			Send Message (coming soon)
		</Button>
	</div>
</section>
