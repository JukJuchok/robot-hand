<script lang="ts">
	import TitledRange from '$lib/feature/control/manual/TitledRange.svelte';
	import { robot } from '../../../stores/robotStore';

	let controls = [
		[
			{
				title: 'Pinky metacarpus flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Pinky proximal phalanx rotation',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Pinky proximal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Pinky middle and distal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			}
		],
		[
			{
				title: 'Ring finger metacarpus flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Ring finger proximal phalanx rotation',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Ring finger proximal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			}
		],
		[
			{
				title: 'Middle finger metacarpus flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Middle finger proximal phalanx rotation',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Middle finger proximal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			}
		],
		[
			{
				title: 'Index finger metacarpus flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Index finger proximal phalanx rotation',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Index finger proximal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			}
		],
		[
			{
				title: 'Thumb metacarpus flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Thumb proximal phalanx rotation',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Thumb proximal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			},
			{
				title: 'Thumb middle and distal phalanx flexion',
				value: 0,
				min: 0,
				max: 180
			}
		]
	];

	$: {
		if ($robot !== undefined) {
			let data: number[][] | number[] = controls.map((finger) => {
				return finger.map((slider) => {
					return Math.round(slider.value);
				});
			});
			data = data.flat();

			$robot.send(data);
		}
	}
</script>

<svelte:head>
	<title>Manual control</title>
</svelte:head>

<div class="grid">
	{#each controls as finger}
		<div class="column">
			{#each finger as range}
				<TitledRange bind:value={range.value} min={range.min} max={range.max}>
					{range.title}
				</TitledRange>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: flex;
		flex-wrap: wrap;
		gap: 64px;

		.column {
			width: 256px;
			display: flex;
			flex-direction: column;
			gap: 32px;
		}
	}
</style>
