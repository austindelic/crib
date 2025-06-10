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

<main>
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
</main>
