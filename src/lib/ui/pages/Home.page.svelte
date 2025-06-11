<script lang="ts">
	import Hero3DText from '$ui/components/Hero3DText.svelte';
	import { Canvas } from '@threlte/core';

	let text = 'crib.';
	let bevelEnabled = false;
	let bevelOffset = 0;
	let bevelSegments = 20;
	let bevelSize = 0.2;
	let bevelThickness = 0.1;
	let curveSegments = 12;
	let depth = 1;
	let size = 10;
	let smooth = 0.1;
</script>

<main class="relative isolate min-h-screen overflow-hidden px-6 py-24 text-center sm:px-12">
	<!-- 3D Canvas Background -->
	<div class="absolute inset-0 -z-10">
		<Canvas>
			<Hero3DText
				{text}
				{bevelEnabled}
				{bevelOffset}
				{bevelSegments}
				{bevelSize}
				{bevelThickness}
				{curveSegments}
				{depth}
				{size}
				{smooth}
			/>
		</Canvas>
	</div>

	<!-- Foreground Content -->
	<div class="relative z-10 mx-auto max-w-3xl">
		<h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
			Welcome to <span class="font-rubikvinyl text-primary-500">crib.</span>
		</h1>
		<p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
			A smarter way to live together. Share tasks, track bills, chat live, and stay organised — all
			in one home.
		</p>
	</div>
</main>
