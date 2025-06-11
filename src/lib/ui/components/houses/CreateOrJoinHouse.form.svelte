<script lang="ts">
	import { Home, LogIn } from '@lucide/svelte';

	let {
		is_create_house_modal_open = $bindable(),
		is_join_house_modal_open = $bindable()
	}: { is_create_house_modal_open: boolean; is_join_house_modal_open: boolean } = $props();
</script>

<div class="mx-auto mt-24 max-w-2xl">
	<h1 class="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
		Welcome to <span class="font-rubikvinyl text-primary-500">crib.</span>
	</h1>
	<p class="mb-10 text-gray-600 dark:text-gray-300">
		Manage your shared space with ease. Create a house or join one with a code —
		<span class="font-rubikvinyl">crib</span>
		helps you live better together.
	</p>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<button
			onclick={() => {
				is_create_house_modal_open = true;
			}}
			class="group bg-primary-50 hover:bg-primary-100 flex flex-col items-center justify-center rounded-xl border border-gray-300 px-6 py-6 text-center transition dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
		>
			<Home class="text-primary-500 mb-3 h-8 w-8 transition-transform group-hover:scale-110" />
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Create a House</h2>
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
				Start your own space and invite friends.
			</p>
		</button>

		<button
			onclick={() => {
				is_join_house_modal_open = true;
			}}
			class="group bg-secondary-50 hover:bg-secondary-100 flex flex-col items-center justify-center rounded-xl border border-gray-300 px-6 py-6 text-center transition dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
		>
			<LogIn class="text-secondary-600 mb-3 h-8 w-8 transition-transform group-hover:scale-110" />
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Join with a Code</h2>
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
				Enter a join code from a friend’s house.
			</p>
		</button>
	</div>

	<p class="mt-10 text-center text-sm text-gray-400 dark:text-neutral-500">
		You can join or create multiple houses anytime.
	</p>
</div>
