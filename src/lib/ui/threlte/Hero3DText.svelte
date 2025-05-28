<script lang="ts">
	import { T } from '@threlte/core';
	import { Align, Float, OrbitControls, Text3DGeometry, Environment } from '@threlte/extras';

	export let text: string;
	export let bevelEnabled: boolean;
	export let bevelOffset: number;
	export let bevelSegments: number;
	export let bevelSize: number;
	export let bevelThickness: number;
	export let curveSegments: number;
	export let depth: number;
	export let size: number;
	export let smooth: number;
</script>

<Align>
	{#snippet children({ align })}
		<T.Mesh>
			<Text3DGeometry
				font="fonts/Rubik Vinyl_Regular.json"
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
				oncreate={() => {
					align();
				}}
			/>
			<T.MeshStandardMaterial color="#999999" toneMapped={false} metalness={1.0} roughness={0.2} />
		</T.Mesh>
	{/snippet}
</Align>

<!-- Add a light source -->
<T.PointLight position={[10, 10, 10]} intensity={10} />
<T.AmbientLight intensity={0.5} />
<Environment url="textures\equirect_ruined_room.jpg" isBackground={false} />

<Float rotationIntensity={[0, 3, 0]} rotationSpeed={1} floatingRange={[-5, 5]} speed={1}>
	<T.PerspectiveCamera makeDefault position.y={0} position.z={20} fov={90}>
		<OrbitControls enableDamping enablePan={false} enableZoom={false} />
	</T.PerspectiveCamera>
</Float>
